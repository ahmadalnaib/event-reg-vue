<script setup>
import { onMounted } from 'vue';

import useBookings from '@/composables/useBookings';
import LoadingBookingItem from './LoadingBookingItem.vue';
import BookingItem from './BookingItem.vue';
const { bookings, fetchBookings, loading, cancelBooking } = useBookings();

onMounted(() => {
  fetchBookings();
});
</script>

<template>
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
</template>
