<script setup>
import SectionCard from '@/components/SectionCard.vue';
import RoundButton from '@/components/RoundButton.vue';

defineProps({
  title: String,
  status: String,
});

defineEmits(['cancelled']);
</script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <h3>{{ title }}</h3>
        <div>{{ status }}</div>
      </div>

      <RoundButton variant="danger" @click="$emit('cancelled')"> Cancel </RoundButton>
    </div>
  </SectionCard>
</template>
