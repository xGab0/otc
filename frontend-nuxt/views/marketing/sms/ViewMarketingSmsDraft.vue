<script setup lang="ts">
import CardMarketingDraft from '~/components/cards/marketing/CardMarketingSmsDraft.vue';
import type { Marketing } from '~/hooks/marketing';

const { messages } = defineProps<{ messages: Marketing.Sms[] }>();
</script>

<template>
  <div v-if="messages" class="drafts">
    <CardMarketingDraft v-for="sms in messages" :sms />
  </div>
</template>

<style lang="scss" scoped>
.drafts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
