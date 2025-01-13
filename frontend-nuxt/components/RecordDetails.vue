<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';

const { record } = defineProps<{record: HrAttendance}>();
</script>

<template>
  <div class="details">
    <span>Record n.</span>
    <span>{{ record.id }}</span>

    <div>
      <span>Employee: </span>
      <span>{{ record.employee_id[1] }}</span>
    </div>

    <div>
      <span>checkin: </span>
      <span>{{ record.check_in }}</span>
    </div>

    <div>
      <span>checkout: </span>
      <span>{{ record.check_in }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details {

}
</style>