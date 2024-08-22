<script setup>
import SectionCard from '@/components/SectionCard.vue';
import RoundButton from '@/components/RoundButton.vue';

defineProps({
  title: String,
});
</script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <h3>{{ title }}</h3>

      <RoundButton variant="danger">
        Cancel
      </RoundButton>
    </div>
  </SectionCard>
</template>
