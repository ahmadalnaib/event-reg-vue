 <script setup>
import SectionCard from '@/components/SectionCard.vue';
import RoundButton from '@/components/RoundButton.vue';
import { LoaderCircle,Check } from 'lucide-vue-next';
import { computed } from 'vue';

const props= defineProps({
  title: String,
  status: String,
});

const pending=computed(()=>props.status==='pending');

const icon=computed(()=>pending.value?LoaderCircle:Check);

defineEmits(['cancelled']);
</script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <h3>{{ title }}</h3>
        <div><component :is="icon" :class="{'animate-spin':pending}"/> </div>
      </div>

      <RoundButton variant="danger" @click="$emit('cancelled')"> Cancel </RoundButton>
    </div>
  </SectionCard>
</template>
