<script setup lang="ts">
import BadgeModel from '~/components/badges/BadgeModel.vue';
import ButtonDelete from '~/components/buttons/ButtonDelete.vue';
import ButtonExport from '~/components/buttons/ButtonExport.vue';
import ButtonFilters from '~/components/buttons/ButtonFilters.vue';
import IconChevron from '~/components/icons/IconChevron.vue';
import AttendanceColumn from '~/components/table/AttendanceColumn.vue';
import AttendanceRow from '~/components/table/AttendanceRow.vue';
import CheckboxesColumn from '~/components/table/CheckboxesColumn.vue';
import type { HrAttendance } from '~/hooks/hr';
import type { OdooField } from '~/hooks/odoo/fields';
import type { OdooModelData } from '~/hooks/odoo/wrapper';
import type { TableField } from '~/hooks/table';

definePageMeta({
  middleware: 'auth',
  /*
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
  */
});

const { records } = defineProps<{records: HrAttendance[]}>();

const authStore = useAuthStore();
//const model = ref<OdooModelData>();
//const fields = ref<OdooField[]>();

const tableRecords = ref<TableField<HrAttendance>[]>([]);
const selectedRecords = ref<TableField<HrAttendance>[]>([]);
const allSelected = ref<boolean>(false);

const loaded = ref<boolean>(false);

const employeers = ref<string[]>([]);
const checkIns = ref<number[]>([]);
const checkOuts = ref<number[]>([]);
const workedHours = ref<number[]>([]);

const showIds = ref<boolean>(false);
const showEmployeers = ref<boolean>(true);
const showCheckIns = ref<boolean>(true);
const showCheckInsLat = ref<boolean>(false);
const showCheckInsLon = ref<boolean>(false);
const showCheckOuts = ref<boolean>(true);
const showCheckOutsLat = ref<boolean>(false);
const showCheckOutsLon = ref<boolean>(false);
const showWorkedHours = ref<boolean>(true);

const sortAlpha = () => {
  tableRecords.value.sort((a, b) => {
    return a.record.employee_id[1].localeCompare(b.record.employee_id[1]);
  });

  console.debug('sorted employeers');
}

const sortAlphaInverse = () => {
  tableRecords.value.sort((a, b) => {
    return b.record.employee_id[1].localeCompare(a.record.employee_id[1]);
  });

  console.debug('inverse sorted employeers');
}

const sortCheckin = () => {
  tableRecords.value.sort((a, b) => {
    const dateA = new Date(a.record.check_in);  // Converti la data in oggetto Date
    const dateB = new Date(b.record.check_in);
    return dateA - dateB;  // Ordina per millisecondi
  });

  console.debug('sorted checkins');
}

const sortCheckinInverse = () => {
  tableRecords.value.sort((a, b) => {
    const dateA = new Date(a.record.check_in);
    const dateB = new Date(b.record.check_in);
    return dateB - dateA;  // Ordina per millisecondi, invertito per decrescente
  });

  console.debug('inverse sorted checkins');
}


const sortNumber = () => {
  tableRecords.value.sort((a, b) => {
    return a.record.worked_hours - b.record.worked_hours;
  });

  console.debug('sorted worked hours');
}

const sortNumberInverse = () => {
  tableRecords.value.sort((a, b) => {
    return b.record.worked_hours - a.record.worked_hours;
  });


  console.debug('inverse sorted worked hours');
}

function handleSelection(index: number, selected: boolean) {
  tableRecords.value[index].selected = selected;
  console.log(`Updated row [${index}] to ${selected}`);
}

function toggleAllSelections() {
  allSelected.value = !allSelected.value
  tableRecords.value.forEach(record => record.selected = allSelected.value);
}

onMounted(() => {
  //const queryBuilder = authStore.odooUser!.modelQueryBuilder<HrAttendance>('hr.attendance');
  //model.value = await queryBuilder.searchData();
  //fields.value = await queryBuilder.searchFieldTypes();
  console.log('records');
  console.log(records);

  tableRecords.value = records.map(record => { return { selected: false, record: record }});

  console.log('tableRecords');
  console.log(tableRecords.value);

  employeers.value = tableRecords.value.map(value => value.record.employee_id[1]);
  checkIns.value = tableRecords.value.map(value => value.record.check_in);
  checkOuts.value = tableRecords.value.map(value => value.record.check_out);
  workedHours.value = tableRecords.value.map(value => value.record.worked_hours);

  console.log('employers');
  console.log(employeers.value);

  loaded.value = true;
})
</script>

<template>
  <div v-if="loaded" class="bento">
    <div class="header">
      <div>
        <ButtonFilters/>
        <ButtonFilters/>
        <ButtonFilters/>
      </div>
      <div>
        <input type="search" placeholder="search elements"/>
      </div>
    </div>
    <!--div class="test">
      <CheckboxesColumn :length="tableRecords.length"/>
      <div class="data-columns">
        <AttendanceColumn name="Employee" :data="employeers"/>
        <AttendanceColumn name="Check In" :data="checkIns"/>
        <AttendanceColumn name="Check Out" :data="checkOuts"/>
        <AttendanceColumn name="Work Hours" :data="workedHours"/>
      </div>
    </div-->

    <div class="table">
      <div class="header">
        <input type="checkbox" @input="toggleAllSelections"/>

        <div v-if="showIds" class="column">
          <span>Id</span>
          <IconChevron @click="() => { }"/>
        </div>

        <div v-if="showEmployeers" class="column">
          <span>Employee</span>
          <IconChevron @click="() => { sortAlpha() }"/>
        </div>

        <div v-if="showCheckIns" class="column">
          <span>Check In</span>
          <IconChevron @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showCheckInsLat" class="column">
          <span>Check In Latitude</span>
          <IconChevron @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showCheckInsLon" class="column">
          <span>Check In Longitude</span>
          <IconChevron @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showCheckOuts" class="column">
          <span>Check Out</span>
          <IconChevron/>
        </div>

        <div v-if="showCheckOutsLat" class="column">
          <span>Check Out Latitude</span>
          <IconChevron @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showCheckOutsLon" class="column">
          <span>Check Out Longitude</span>
          <IconChevron @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showWorkedHours" class="column">
          <span>Work Hours</span>
          <IconChevron @click="() => { sortNumber() }"/>
        </div>
      </div>

      <div class="table-body">
        <div v-for="(record, index) in tableRecords" class="row-wrapper">
          <AttendanceRow
            :index
            :selected="record.selected"
            :record="record.record"
            :show="[showIds, showEmployeers, showCheckIns, showCheckInsLat, showCheckInsLon, showCheckOuts, showCheckOutsLat, showCheckOutsLon, showWorkedHours]"
            @toggle-selected="handleSelection"
          />

          <div v-if="index != tableRecords.length - 1" class="separator"/>
        </div>
      </div>
    </div>

    <ToolBar/>
  </div>
</template>

<style scoped lang="scss">
.test {
  display: flex;
  gap: 10px;

  .data-columns {
    display: flex;
    gap: 30px;
  }
}

.bento {
  width: 100%;

  //padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 36px;

  border-radius: 24px;
  //background-color: rgba(230, 230, 230);

  .model-name {
    font-size: 36px;
    font-weight: 600;
  }

  .controls {
    display: flex;
    gap: 16px;
  }

  .header {
    display: grid;
    grid-template-columns: auto auto;

    div {
      &:nth-child(1) {
        display: flex;
        gap: 6px;
      }
      &:nth-child(2) {
        display: flex;
        justify-content: flex-end;

        input {
          padding-left: 8px;

          border-radius: 8px;
          outline: none;
          border: none;
          background-color: rgb(245, 245, 245);
        }
      }
    }
  }

  .table {
    //overflow-x: scroll;
    width: 100%;

    .header {
      width: 100%;
      display: flex;

      input {
        margin-right: 16px;
      }

      .column {
        width: 100%;
        margin-right: 26px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-family: 'Segoe UI', sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-wrap: wrap;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.82);
        }
      }
    }

    .table-body {
      padding-top: 4px;
      padding-bottom: 12px;

      border-radius: 20px;
      //background-color: rgba(255, 255, 255, 0.7);
      //background-color: rgba(245, 245, 245);
      backdrop-filter: blur(30px);

      .row-wrapper {
        display: flex;
        flex-direction: column;

        .row {
          width: 100%;
          display: flex;
          align-items: center;

          padding-top: 4px;
          //padding-left: 12px;
          //padding-right: 12px;
          padding-bottom: 4px;

          border-radius: 8px;

          input {
            margin-right: 16px;
          }

          .column {
            width: 100%;
            text-align: left;

            span {
              font-size: 13px;
              text-wrap: wrap;
            }
          }

          &:hover {
            background-color: rgba(255, 255, 255, 0.9);
          }
        }

        .separator {
          width: 97%;
          height: 2px;
          
          align-self: flex-end;

          background-color: rgb(245, 245, 245);
        }
      }
    }
  }
}
</style>
