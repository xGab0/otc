<script setup lang="ts">
import ViewMarketingGroupsTable from './ViewMarketingGroupsTable.vue';

const { mailings } = defineProps<{ mailings: Mailing[] }>();
const userDataStore = useUserDataStore();

</script>

<template>
  <div v-if="mailings" class="drafts">
    <ViewMarketingGroupsTable :mailings />
  </div>
</template>

<style lang="scss" scoped>
.drafts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
