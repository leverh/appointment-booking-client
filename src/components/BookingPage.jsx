import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { getStylistPhoto } from '../utils/imageHelpers';
import './BookingPage.css';

const BookingPage = () => {
  // State for booking flow
  const [step, setStep] = useState(1); // 1: Service, 2: Stylist, 3: Date/Time, 4: Customer Info, 5: Confirmation
  
  // Data from database
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [availableStylists, setAvailableStylists] = useState([]);
  
  // Selected booking details
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // Booking confirmation
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching services:', error);
      setError('Failed to load services');
    } else {
      setServices(data);
    }
  };

  // Fetch stylists who offer the selected service
  const fetchAvailableStylists = async (serviceId) => {
    const { data, error } = await supabase
      .from('stylist_services')
      .select(`
        stylists (
          id,
          name,
          bio,
          photo_url
        )
      `)
      .eq('service_id', serviceId);
    
    if (error) {
      console.error('Error fetching stylists:', error);
      setError('Failed to load stylists');
    } else {
      // Extract stylists from the nested structure
      const stylistList = data.map(item => item.stylists);
      setAvailableStylists(stylistList);
    }
  };

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedStylist(null); // Reset stylist when service changes
    fetchAvailableStylists(service.id);
    setStep(2);
  };

  // Handle stylist selection
  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
    setStep(3);
  };

  // Generate available dates (next 14 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    let currentDate = new Date();
    
    for (let i = 0; i < 20; i++) {
      const date = addDays(currentDate, i);
      // Skip Sundays (0 = Sunday)
      if (date.getDay() !== 0) {
        dates.push(date);
      }
      if (dates.length >= 14) break;
    }
    
    return dates;
  };

  // Generate time slots (9 AM to 5 PM, 1-hour blocks)
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      if (hour < 17) { // Don't show 5 PM as it would go past closing
        slots.push(setMinutes(setHours(new Date(), hour), 0));
      }
    }
    return slots;
  };

  // Check if a time slot is available
  const checkSlotAvailability = async (date, time) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const timeStr = format(time, 'HH:mm:ss');
    
    const { data, error } = await supabase
      .from('bookings')
      .select('id')
      .eq('stylist_id', selectedStylist.id)
      .eq('appointment_date', dateStr)
      .eq('appointment_time', timeStr)
      .neq('status', 'cancelled');
    
    if (error) {
      console.error('Error checking availability:', error);
      return false;
    }
    
    return data.length === 0; // Available if no bookings found
  };

  // Handle date/time selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = async (time) => {
    setLoading(true);
    const isAvailable = await checkSlotAvailability(selectedDate, time);
    
    if (isAvailable) {
      setSelectedTime(time);
      setStep(4);
    } else {
      alert('This time slot is no longer available. Please choose another time.');
    }
    setLoading(false);
  };

  // Handle customer info submission
  const handleCustomerInfoSubmit = (e) => {
    e.preventDefault();
    setStep(5);
  };

  // Confirm and create booking
  const confirmBooking = async () => {
    setLoading(true);
    setError(null);
    
    const booking = {
      stylist_id: selectedStylist.id,
      service_id: selectedService.id,
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      appointment_date: format(selectedDate, 'yyyy-MM-dd'),
      appointment_time: format(selectedTime, 'HH:mm:ss'),
      status: 'pending'
    };
    
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select();
    
    if (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
      setLoading(false);
    } else {
      setBookingConfirmed(true);
      setLoading(false);
    }
  };

  // Go back to previous step
  const goBack = () => {
    setStep(step - 1);
  };

  // Start a new booking
  const startNewBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerInfo({ name: '', email: '', phone: '' });
    setBookingConfirmed(false);
    setError(null);
  };

  // Render different steps
  if (bookingConfirmed) {
    return (
      <div className="booking-container">
        <div className="confirmation-card">
          <div className="confirmation-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <div className="booking-details">
            <p><strong>Service:</strong> {selectedService.name}</p>
            <p><strong>Stylist:</strong> {selectedStylist.name}</p>
            <p><strong>Date:</strong> {format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
            <p><strong>Time:</strong> {format(selectedTime, 'h:mm a')}</p>
            <p><strong>Customer:</strong> {customerInfo.name}</p>
            <p><strong>Email:</strong> {customerInfo.email}</p>
          </div>
          <p className="confirmation-message">
            We've received your booking request. You'll receive a confirmation email shortly.
          </p>
          <button className="btn btn-primary" onClick={startNewBooking}>
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="booking-hero">
        <div className="booking-hero-content">
          <h1>Book Your Appointment</h1>
          <p>Choose your service and preferred time in just a few steps</p>
        </div>
      </div>

      <div className="booking-header">
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Service</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Stylist</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Date & Time</div>
          <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Your Info</div>
          <div className={`step ${step >= 5 ? 'active' : ''}`}>5. Confirm</div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="step-content">
          <h2>Choose a Service</h2>
          <div className="services-grid">
            {services.map(service => (
              <div 
                key={service.id} 
                className="service-card"
                onClick={() => handleServiceSelect(service)}
              >
                <h3>{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-details">
                  <span className="duration">{service.duration_minutes} min</span>
                  <span className="price">€{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Stylist */}
{step === 2 && (
  <div className="step-content">
    <button className="btn-back" onClick={goBack}>← Back</button>
    <h2>Choose Your Stylist</h2>
    <div className="stylists-grid">
      {availableStylists.map(stylist => (
        <div 
          key={stylist.id} 
          className="stylist-card"
          onClick={() => handleStylistSelect(stylist)}
        >
          <img 
            src={getStylistPhoto(stylist)} 
            alt={stylist.name}
            className="stylist-photo"
          />
          <h3>{stylist.name}</h3>
          <p className="stylist-bio">{stylist.bio}</p>
        </div>
      ))}
    </div>
  </div>
)}

      {/* Step 3: Select Date and Time */}
      {step === 3 && (
        <div className="step-content">
          <button className="btn-back" onClick={goBack}>← Back</button>
          <h2>Select Date & Time</h2>
          
          {!selectedDate ? (
            <div className="dates-grid">
              {getAvailableDates().map(date => (
                <div 
                  key={date.toISOString()} 
                  className="date-card"
                  onClick={() => handleDateSelect(date)}
                >
                  <div className="date-day">{format(date, 'EEE')}</div>
                  <div className="date-number">{format(date, 'd')}</div>
                  <div className="date-month">{format(date, 'MMM')}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="selected-date">
                <strong>Selected Date:</strong> {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                <button className="btn-change" onClick={() => setSelectedDate(null)}>
                  Change Date
                </button>
              </div>
              
              <h3>Available Times</h3>
              <div className="times-grid">
                {getTimeSlots().map(time => (
                  <button 
                    key={time.toISOString()} 
                    className="time-slot"
                    onClick={() => handleTimeSelect(time)}
                    disabled={loading}
                  >
                    {format(time, 'h:mm a')}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Customer Information */}
      {step === 4 && (
        <div className="step-content">
          <button className="btn-back" onClick={goBack}>← Back</button>
          <h2>Your Information</h2>
          
          <form onSubmit={handleCustomerInfoSubmit} className="customer-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                id="name"
                required
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input 
                type="email" 
                id="email"
                required
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Continue to Confirmation
            </button>
          </form>
        </div>
      )}

      {/* Step 5: Confirmation */}
      {step === 5 && (
        <div className="step-content">
          <button className="btn-back" onClick={goBack}>← Back</button>
          <h2>Confirm Your Booking</h2>
          
          <div className="booking-summary">
            <div className="summary-item">
              <strong>Service:</strong>
              <span>{selectedService.name} (€{selectedService.price})</span>
            </div>
            <div className="summary-item">
              <strong>Stylist:</strong>
              <span>{selectedStylist.name}</span>
            </div>
            <div className="summary-item">
              <strong>Date:</strong>
              <span>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="summary-item">
              <strong>Time:</strong>
              <span>{format(selectedTime, 'h:mm a')}</span>
            </div>
            <div className="summary-item">
              <strong>Duration:</strong>
              <span>{selectedService.duration_minutes} minutes</span>
            </div>
            <hr />
            <div className="summary-item">
              <strong>Name:</strong>
              <span>{customerInfo.name}</span>
            </div>
            <div className="summary-item">
              <strong>Email:</strong>
              <span>{customerInfo.email}</span>
            </div>
            {customerInfo.phone && (
              <div className="summary-item">
                <strong>Phone:</strong>
                <span>{customerInfo.phone}</span>
              </div>
            )}
          </div>
          
          <button 
            className="btn btn-primary btn-confirm"
            onClick={confirmBooking}
            disabled={loading}
          >
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;