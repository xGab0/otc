<script setup lang="ts">
import CardMailingDraft from '~/components/cards/mailing/CardMailingDraft.vue';
import IconHexagon from '~/components/icons/shapes/IconHexagon.vue';
import type { Mailing } from '~/hooks/mailing';

const { mailings } = defineProps<{ mailings: Mailing[] }>();
const userDataStore = useUserDataStore();

</script>

<template>
  <div v-if="mailings" class="drafts">
    <CardMailingDraft v-for="mailing in mailings" :mailing />
  </div>
</template>

<style lang="scss" scoped>
.drafts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
