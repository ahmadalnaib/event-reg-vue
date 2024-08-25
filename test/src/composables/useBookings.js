import { ref } from 'vue';

const bookings = ref([]);
const loading = ref(false);

const fetchBookings = async () => {
  loading.value = true;
  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } finally {
    loading.value = false;
  }
};



const handleREgistration = async (event) => {
  if (bookings.value.some((booking) => booking.eventId === event.id)) {
    alert('You have already booked this event');
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending',
  };
  bookings.value.push(newBooking);

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed',
      }),
    });

    if (response.ok) {
      const index = findBookingIndex(newBooking.id);
      bookings.value[index] = await response.json();
    } else {
      throw new Error('Failed to confirm booking');
    }
  } catch (error) {
    console.error(error);
    bookings.value = bookings.value.filter(
      (booking) => booking.id !== newBooking.id
    );
  }
};

const cancelBooking = async (bookingId) => {
  const index = findBookingIndex(bookingId);
  const originalBooking = bookings.value[index];

  bookings.value.splice(index, 1);

  try {
    const response = await fetch(
      `http://localhost:3001/bookings/${bookingId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
  } catch (error) {
    console.error(error);
    bookings.value.splice(index, 0, originalBooking);
  }
};

const findBookingIndex = (bookingId) => {
  return bookings.value.findIndex((booking) => booking.id === bookingId);
};


export default  function useBookings() {
    return {
        bookings,
        loading,
        fetchBookings,
        cancelBooking,
        handleREgistration

    };
}