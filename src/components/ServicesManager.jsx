import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './ServicesManager.css';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    duration_minutes: 60,
    price: '',
    description: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching services:', error);
    } else {
      setServices(data);
    }
    
    setLoading(false);
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      duration_minutes: 60,
      price: '',
      description: ''
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      duration_minutes: service.duration_minutes,
      price: service.price,
      description: service.description || ''
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    } else {
      fetchServices();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      name: formData.name,
      duration_minutes: parseInt(formData.duration_minutes),
      price: parseFloat(formData.price),
      description: formData.description
    };

    if (editingId) {
      // Update existing service
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', editingId);

      if (error) {
        console.error('Error updating service:', error);
        alert('Failed to update service');
        return;
      }
    } else {
      // Create new service
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);

      if (error) {
        console.error('Error creating service:', error);
        alert('Failed to create service');
        return;
      }
    }

    setShowForm(false);
    fetchServices();
  };

  if (loading) {
    return <div className="loading">Loading services...</div>;
  }

  return (
    <div className="services-manager">
      <div className="manager-header">
        <h2>Manage Services</h2>
        <button className="btn-add" onClick={handleAdd}>
          + Add Service
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Service Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Duration (minutes) *</label>
                  <input
                    type="number"
                    required
                    min="15"
                    step="15"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({...formData, duration_minutes: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Price (€) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
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

      {services.length === 0 ? (
        <div className="empty-state">
          <p>No services found. Add one to get started!</p>
        </div>
      ) : (
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-item">
              <div className="service-header">
                <h3>{service.name}</h3>
                <div className="service-price">€{service.price}</div>
              </div>
              <div className="service-duration">{service.duration_minutes} minutes</div>
              {service.description && (
                <p className="service-description">{service.description}</p>
              )}
              <div className="service-actions">
                <button className="btn-edit" onClick={() => handleEdit(service)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(service.id)}>
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

export default ServicesManager;