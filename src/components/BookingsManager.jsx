import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { format } from 'date-fns';
import './BookingsManager.css';

const BookingsManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, cancelled, completed

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        stylists (name),
        services (name, price)
      `)
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
    } else {
      setBookings(data);
    }
    
    setLoading(false);
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId);

    if (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    } else {
      fetchBookings(); // Refresh the list
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);

    if (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    } else {
      fetchBookings(); // List refresh
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'confirmed': return '#4caf50';
      case 'cancelled': return '#f44336';
      case 'completed': return '#2196f3';
      default: return '#999';
    }
  };

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  return (
    <div className="bookings-manager">
      <div className="manager-header">
        <h2>Manage Bookings</h2>
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({bookings.length})
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button
            className={filter === 'confirmed' ? 'active' : ''}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({bookings.filter(b => b.status === 'completed').length})
          </button>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings found</p>
        </div>
      ) : (
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Stylist</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking.id}>
                  <td>
                    <div className="date-time">
                      <div className="date">{format(new Date(booking.appointment_date), 'MMM d, yyyy')}</div>
                      <div className="time">{format(new Date(`2000-01-01T${booking.appointment_time}`), 'h:mm a')}</div>
                    </div>
                  </td>
                  <td>
                    <strong>{booking.customer_name}</strong>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div>{booking.customer_email}</div>
                      {booking.customer_phone && <div>{booking.customer_phone}</div>}
                    </div>
                  </td>
                  <td>
                    <div>
                      {booking.services?.name}
                      <div className="price">€{booking.services?.price}</div>
                    </div>
                  </td>
                  <td>{booking.stylists?.name}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(booking.status) }}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {booking.status === 'pending' && (
                        <button
                          className="btn-action btn-confirm"
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          title="Confirm booking"
                        >
                          ✓
                        </button>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          className="btn-action btn-complete"
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          title="Mark as completed"
                        >
                          ✓✓
                        </button>
                      )}
                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <button
                          className="btn-action btn-cancel"
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          title="Cancel booking"
                        >
                          ✕
                        </button>
                      )}
                      <button
                        className="btn-action btn-delete"
                        onClick={() => deleteBooking(booking.id)}
                        title="Delete booking"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingsManager;