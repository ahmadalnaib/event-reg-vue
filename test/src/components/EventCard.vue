<script setup>
import RoundButton from '@/components/RoundButton.vue';
import RoundedCard from '@/components/RoundedCard.vue';
import SectionCard from '@/components/SectionCard.vue';

defineProps({
  title: String,
  description: String,
  date: String,
});

defineEmits(['register']);
</script>

<template>
  <SectionCard>
    <template #header>
      {{ title }}
    </template>
    {{ date }}

    <template #footer>
      <p class="">{{ description }}</p>
      <section class="flex justify-end p-4">
        <RoundButton @click="$emit('register')"> Register </RoundButton>
      </section>
    </template>
  </SectionCard>
</template>
