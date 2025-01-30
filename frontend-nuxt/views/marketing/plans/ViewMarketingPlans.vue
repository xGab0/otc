<script setup lang="ts">
import ViewMarketingPlansTable from './ViewMarketingPlansTable.vue';
import type { Marketing } from '~/hooks/marketing';

const { plans } = defineProps<{ plans: Marketing.Plan[] }>();
const authStore = useAuthStore();
const userDataStore = useUserDataStore();

</script>

<template>
  <!--span @mousedown="() => {
    authStore.odooUser?.createRecord('marketing.plan', { name: 'gold', sms_daily_count: 50, sms_max_length: 1024 });
    console.info('created test record');
  }">create test record</span-->
  <div v-if="plans" class="view">
    <ViewMarketingPlansTable :plans />
  </div>
</template>