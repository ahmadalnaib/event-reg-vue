<script setup>
import EventCard from '@/components/EventCard.vue';
</script>
<template>
  <div class="container mx-auto my-8 space-y-8 p-5">
    <h1 class="text-4xl">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <div class="grid grid-cols-2 gap-8">
      <EventCard title="test" date="30-12-1988" description="dfdf"  @register="console.log('dfdf')"/>
    </div>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
  </div>
</template>
