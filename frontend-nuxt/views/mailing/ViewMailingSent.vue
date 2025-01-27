<script setup lang="ts">
import CardMailingInQueue from '~/components/cards/mailing/CardMailingInQueue.vue';
import CardMailingSent from '~/components/cards/mailing/CardMailingSent.vue';
import type { Mailing } from '~/hooks/mailing';

const { mailings } = defineProps<{ mailings: Mailing[] }>();
const userDataStore = useUserDataStore();

</script>

<template>
  <div v-if="mailings" class="drafts">
    <CardMailingSent v-for="mailing in mailings" :mailing />
  </div>
</template>

<style lang="scss" scoped>
.drafts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>