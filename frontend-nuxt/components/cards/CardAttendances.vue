<script setup lang="ts">
import IconMail from '~/components/icons/IconMail.vue';
import IconPhone from '~/components/icons/IconPhone.vue';
import IconWork from '~/components/icons/IconWork.vue';
import CardAttendance from './CardAttendance.vue';
import CardCalendar from './CardCalendar.vue';
</script>

<template>
  <div class="card">
    <span class="title">Attendances</span>

    <div class="body">
      <CardAttendance/>

      <div class="content">
        <CardCalendar :start-date="new Date()"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  border-radius: 32px;
  background-color: white;

  .title {
    font-size: 26px;
    font-weight: 400;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 18px;

    .content {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
  }
}

.separator {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.102);
}

svg {
  height: 22px
}
</style>