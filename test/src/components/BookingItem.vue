<script setup>
import SectionCard from '@/components/SectionCard.vue';
import RoundButton from '@/components/RoundButton.vue';
</script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <h3>Booking for vue</h3>

      <RoundButton variant="danger">
        Cancel
      </RoundButton>
    </div>
  </SectionCard>
</template>
