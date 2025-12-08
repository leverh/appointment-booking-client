import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './StylistsManager.css';

const StylistsManager = () => {
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    photo_url: '',
    selectedServices: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch stylists with their services
    const { data: stylistsData, error: stylistsError } = await supabase
      .from('stylists')
      .select(`
        *,
        stylist_services (
          service_id
        )
      `);

    // Fetch all services
    const { data: servicesData, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .order('name');

    if (stylistsError) {
      console.error('Error fetching stylists:', stylistsError);
    } else {
      setStylists(stylistsData);
    }

    if (servicesError) {
      console.error('Error fetching services:', servicesError);
    } else {
      setServices(servicesData);
    }
    
    setLoading(false);
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      bio: '',
      photo_url: '',
      selectedServices: []
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (stylist) => {
    setFormData({
      name: stylist.name,
      bio: stylist.bio || '',
      photo_url: stylist.photo_url || '',
      selectedServices: stylist.stylist_services.map(ss => ss.service_id)
    });
    setEditingId(stylist.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this stylist?')) {
      return;
    }

    const { error } = await supabase
      .from('stylists')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting stylist:', error);
      alert('Failed to delete stylist');
    } else {
      fetchData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Update existing stylist
      const { error: updateError } = await supabase
        .from('stylists')
        .update({
          name: formData.name,
          bio: formData.bio,
          photo_url: formData.photo_url || null
        })
        .eq('id', editingId);

      if (updateError) {
        console.error('Error updating stylist:', updateError);
        alert('Failed to update stylist');
        return;
      }

      // Delete existing service associations
      await supabase
        .from('stylist_services')
        .delete()
        .eq('stylist_id', editingId);

      // Add new service associations
      if (formData.selectedServices.length > 0) {
        const serviceAssociations = formData.selectedServices.map(serviceId => ({
          stylist_id: editingId,
          service_id: serviceId
        }));

        await supabase
          .from('stylist_services')
          .insert(serviceAssociations);
      }

    } else {
      // Create new stylist
      const { data: newStylist, error: insertError } = await supabase
        .from('stylists')
        .insert([{
          name: formData.name,
          bio: formData.bio,
          photo_url: formData.photo_url || null
        }])
        .select()
        .single();

      if (insertError) {
        console.error('Error creating stylist:', insertError);
        alert('Failed to create stylist');
        return;
      }

      // Add service associations
      if (formData.selectedServices.length > 0) {
        const serviceAssociations = formData.selectedServices.map(serviceId => ({
          stylist_id: newStylist.id,
          service_id: serviceId
        }));

        await supabase
          .from('stylist_services')
          .insert(serviceAssociations);
      }
    }

    setShowForm(false);
    fetchData();
  };

  const toggleService = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const getStylistServices = (stylist) => {
    const serviceIds = stylist.stylist_services.map(ss => ss.service_id);
    return services
      .filter(s => serviceIds.includes(s.id))
      .map(s => s.name)
      .join(', ');
  };

  if (loading) {
    return <div className="loading">Loading stylists...</div>;
  }

  return (
    <div className="stylists-manager">
      <div className="manager-header">
        <h2>Manage Stylists</h2>
        <button className="btn-add" onClick={handleAdd}>
          + Add Stylist
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? 'Edit Stylist' : 'Add New Stylist'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Photo URL</label>
                <input
                  type="text"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({...formData, photo_url: e.target.value})}
                  placeholder="Leave empty to use default mapping"
                />
                <small>For demo: leave empty and frontend will map to /images/stylists/[name].jpg</small>
              </div>

              <div className="form-group">
                <label>Services Offered *</label>
                <div className="services-checkboxes">
                  {services.map(service => (
                    <label key={service.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.selectedServices.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                      />
                      <span>{service.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {stylists.length === 0 ? (
        <div className="empty-state">
          <p>No stylists found. Add one to get started!</p>
        </div>
      ) : (
        <div className="stylists-grid">
          {stylists.map(stylist => (
            <div key={stylist.id} className="stylist-item">
              <div className="stylist-info">
                <h3>{stylist.name}</h3>
                {stylist.bio && <p className="bio">{stylist.bio}</p>}
                <div className="services-list">
                  <strong>Services:</strong> {getStylistServices(stylist) || 'None'}
                </div>
              </div>
              <div className="stylist-actions">
                <button className="btn-edit" onClick={() => handleEdit(stylist)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(stylist.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StylistsManager;