<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';

const { record } = defineProps<{record: HrAttendance}>();
</script>

<template>
  <div class="record info">
    <div class="flex flex-col">
      <span class="text-2xl font-bold">Record info</span>
      <span class="text-normal text-gray-600 font-normal">View the record data</span>
    </div>

    <div class="body">
      <!--GoogleMapsAttendance/-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.record.info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>