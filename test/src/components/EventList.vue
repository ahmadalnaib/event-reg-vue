<script setup>
import { ref, onMounted } from 'vue';
import EventCard from '@/components/EventCard.vue';
import LoadingEventCard from '@/components/LoadingEventCard.vue';
import useBookings from '../composables/useBookings';


const { handleREgistration } = useBookings();


const events = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchEvents = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
    // console.log(events.value);
  } catch (err) {
    error.value = err.message;
  }
  finally {
    loading.value = false;
  }
};

onMounted(fetchEvents);
</script>

<template>
  <template v-if="error">
    <div class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
  </template>

  <template v-else>
    <div class="grid grid-cols-2 gap-8">
      <template v-if="!loading">
        <template v-if="events.length">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :title="event.title"
            :date="event.date"
            :description="event.description"
            @register="handleREgistration(event)"
          />
        </template>
        <template v-else>
          <div class="col-span-2 text-center text-gray-500">
            <p>No events found</p>
          </div>
        </template>
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 3" :key="i" />
      </template>
    </div>
  </template>
</template>

