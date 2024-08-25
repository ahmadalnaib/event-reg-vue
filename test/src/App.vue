<script setup>
import {  onMounted } from 'vue';

import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import EventList from '@/components/EventList.vue';
import useBookings from '@/composables/useBookings';


const {bookings,fetchBookings,loading }= useBookings();


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

onMounted(() => {
  fetchBookings();
});
</script>
<template>
  <div class="container mx-auto my-8 space-y-8 p-5">
    <h1 class="text-4xl">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <EventList  @register="handleREgistration($event)"/>

    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-">
      <template v-if="!loading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancelled="cancelBooking(booking.id)"
        />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 3" :key="i" />
      </template>
    </section>
  </div>
</template>
