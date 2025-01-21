<script setup lang="ts">
import CardAttendances from '~/components/cards/CardAttendances.vue';
import CardContact from '~/components/cards/CardContact.vue';
import CardTasks from '~/components/cards/CardTasks.vue';
const router = useRouter();
</script>

<template>
  <div class="flex flex-row">
    <IconGrid/>
    <LogosLogoPrometika/>
  </div>

  <div class="cards">
    <CardContact/>
    <CardAttendances/>
    <CardTasks/>
  </div>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  grid-template-columns: auto auto auto auto;
  gap: 24px;
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