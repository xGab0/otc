<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import Navigation from './navigation/Navigation.vue';

const { record } = defineProps<{record: HrAttendance}>();

const selectedPage = ref(0);
const routes = [
  { name: 'check in', selected: true },
  { name: 'check out', selected: false }
];
const pages = [
  { content: 'Contenuto Check In' },
  { content: 'Contenuto Check Out' }
];

const pageChanged = (index: number) => {
  selectedPage.value = index;
}
</script>

<template>
  <div class="details">

    <NavigationBar/>
    
    <Navigation :selectedPage="selectedPage" :routes="routes" :pages="pages" @pageChanged="pageChanged">
      <template #page-0>
        <div>Contenuto della pagina 1</div>
      </template>
      <template #page-1>
        <div>Contenuto della pagina 2</div>
      </template>
    </Navigation>

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