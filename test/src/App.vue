<script setup>
import {  onMounted } from 'vue';

import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import EventList from '@/components/EventList.vue';
import useBookings from '@/composables/useBookings';


const {bookings,fetchBookings,loading,cancelBooking }= useBookings();



onMounted(() => {
  fetchBookings();
});
</script>
<template>
  <div class="container mx-auto my-8 space-y-8 p-5">
    <h1 class="text-4xl">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <EventList />

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
