<script setup>
import { ref, onMounted } from 'vue';
import EventCard from '@/components/EventCard.vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingEventCard from '@/components/LoadingEventCard.vue';

const events = ref([]);
const eventLoading = ref(false);

const fetchEvents = async () => {
  eventLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
    // console.log(events.value);
  } finally {
    eventLoading.value = false;
  }
};

onMounted(fetchEvents);
</script>
<template>
  <div class="container mx-auto my-8 space-y-8 p-5">
    <h1 class="text-4xl">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <div class="grid grid-cols-2 gap-8">
      <template v-if="!eventLoading">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :title="event.title"
          :date="event.date"
          :description="event.description"
          @register="console.log('dfdf')"
        />
      </template>
      <template v-else>
       <LoadingEventCard v-for="i in 3" :key="i"/>
      </template>
    </div>
   
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-">
      <BookingItem />
    </section>
  </div>
</template>
