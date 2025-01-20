<script setup lang="ts">
import Papa from 'papaparse';
import BadgeDynamic from '~/components/badges/BadgeDynamic.vue';
import BadgeModel from '~/components/badges/BadgeModel.vue';
import ButtonCreate from '~/components/buttons/ButtonCreate.vue';
import ButtonDelete from '~/components/buttons/ButtonDelete.vue';
import ButtonExport from '~/components/buttons/ButtonExport.vue';
import ButtonFilters from '~/components/buttons/ButtonFilters.vue';
import IconChevron from '~/components/icons/IconChevron.vue';
import AttendanceColumn from '~/components/table/AttendanceColumn.vue';
import AttendanceRow from '~/components/table/AttendanceRow.vue';
import CheckboxesColumn from '~/components/table/CheckboxesColumn.vue';
import CreatingRow from '~/components/table/CreatingRow.vue';
import type { HrAttendance } from '~/hooks/hr';
import type { OdooField } from '~/hooks/odoo/fields';
import type { OdooModelData, OdooRecordSyntax } from '~/hooks/odoo/wrapper';
import type { TableField } from '~/hooks/table';
import LayoutCollapsable from '~/layouts/LayoutCollapsable.vue';

definePageMeta({
  middleware: 'auth',
  /*
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
  */
});

interface Page {
  from: number
  to: number
}

const { records, isCreationOpen, creatingRecord } = defineProps<{
  records: HrAttendance[],
  isCreationOpen: boolean,
  creatingRecord: OdooRecordSyntax | undefined
}>();

const emit = defineEmits<{
  openMenu: [menuName: string]
  closeMenu: [menuName: string]
  openMenuDetails: [record: HrAttendance, index: number]
}>()


const authStore = useAuthStore();
//const model = ref<OdooModelData>();
//const fields = ref<OdooField[]>();

const newTableRecords = computed<TableField<HrAttendance>[]>(() => {
  return records.map(record => { return { selected: false, record: record }});
})

//const tableRecords = ref<TableField<HrAttendance>[]>([]);  // Dati completi
const recordsPerPage = ref<number>(10);  // Numero di record per pagina
const selectedPage = ref<number>(0);   // Pagina selezionata
const pages = ref<Page[]>([]);  // Indici delle pagine

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

const sortIds = ref<boolean>(false);
const sortEmployeers = ref<boolean>(true);
const sortCheckIns = ref<boolean>(true);
const sortCheckInsLat = ref<boolean>(false);
const sortCheckInsLon = ref<boolean>(false);
const sortCheckOuts = ref<boolean>(true);
const sortCheckOutsLat = ref<boolean>(false);
const sortCheckOutsLon = ref<boolean>(false);
const sortWorkedHours = ref<boolean>(true);

watch([newTableRecords, recordsPerPage], () => {
  pages.value = getPageIndexes(newTableRecords.value.length, recordsPerPage.value);
});

// Riferimento per i record da visualizzare
const viewRecords = computed(() => {
  // Calcola l'indice iniziale e finale in base alla pagina selezionata
  const from = selectedPage.value * recordsPerPage.value;
  const to = Math.min((selectedPage.value + 1) * recordsPerPage.value, newTableRecords.value.length);

  // Restituisce i record da visualizzare
  return newTableRecords.value.slice(from, to);
});

function getPageIndexes(totalRecords: number, recordsPerPage: number): { from: number, to: number }[] {
  const pageIndexes: { from: number, to: number }[] = [];

  // Calcolare quante pagine sono necessarie
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  for (let page = 0; page < totalPages; page++) {
    const from = page * recordsPerPage;
    const to = Math.min((page + 1) * recordsPerPage - 1, totalRecords - 1);

    pageIndexes.push({ from, to });
  }

  return pageIndexes;
}

function validateInput(event) {
    const input = event.target;
    // Permetti solo numeri (includendo numeri decimali)
    input.value = input.value.replace(/[^0-9.]/g, '');
}

// Funzione per generare il CSV
function generateCSV(records: TableField<HrAttendance>[]) {
  if (records.length === 0) return '';

  const headers = Object.keys(records[0].record) as Array<keyof HrAttendance>;
  const csvRows = [];
  csvRows.push(headers.join(','));

  for (const recordField of records) {
    const row = headers.map(header => {
      const value = recordField.record[header];
      return `"${(value ?? '').toString().replace(/"/g, '""')}"`;
    });
    csvRows.push(row.join(','));
  }

  return csvRows.join('\n');
}

// Funzione per scaricare il CSV
function downloadCSV(records: TableField<HrAttendance>[]) {
  const csv = generateCSV(records);
  
  // Crea un Blob con il contenuto CSV
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

  // Crea un URL temporaneo per il Blob
  const url = URL.createObjectURL(blob);

  // Rilascia l'URL dopo il download
  URL.revokeObjectURL(url);
}

// Funzione per scaricare solo i record selezionati
function downloadSelectedRecords() {
  const selected = selectedRecords.value.filter(record => record.selected);
  downloadCSV(selected);
}

const sortAlpha = () => {
  newTableRecords.value.sort((a, b) => {
    return a.record.employee_id[1].localeCompare(b.record.employee_id[1]);
  });

  console.debug('sorted employeers');
}

const sortAlphaInverse = () => {
  newTableRecords.value.sort((a, b) => {
    return b.record.employee_id[1].localeCompare(a.record.employee_id[1]);
  });

  console.debug('inverse sorted employeers');
}

const sortCheckin = () => {
  newTableRecords.value.sort((a, b) => {
    const dateA = new Date(a.record.check_in);  // Converti la data in oggetto Date
    const dateB = new Date(b.record.check_in);
    return dateA - dateB;  // Ordina per millisecondi
  });

  console.debug('sorted checkins');
}

const sortCheckinInverse = () => {
  newTableRecords.value.sort((a, b) => {
    const dateA = new Date(a.record.check_in);
    const dateB = new Date(b.record.check_in);
    return dateB - dateA;  // Ordina per millisecondi, invertito per decrescente
  });

  console.debug('inverse sorted checkins');
}


const sortNumber = () => {
  newTableRecords.value.sort((a, b) => {
    return a.record.worked_hours - b.record.worked_hours;
  });

  console.debug('sorted worked hours');
}

const sortNumberInverse = () => {
  newTableRecords.value.sort((a, b) => {
    return b.record.worked_hours - a.record.worked_hours;
  });


  console.debug('inverse sorted worked hours');
}

function handleSelection(index: number, selected: boolean) {
  const tableRecord = newTableRecords.value[index];
  tableRecord.selected = selected;

  if (selected) {
    selectedRecords.value[index] = tableRecord;
  } else {
    selectedRecords.value.splice(index, 1);
  }

  console.log(`Updated row [${index}] to ${selected}`);
}

function toggleAllSelections() {
  const selected = allSelected.value = !allSelected.value;

  newTableRecords.value.forEach(record => {
    record.selected = selected;

    if (selected) {
      selectedRecords.value.push(record);
    } else {
      selectedRecords.value.length = 0;
    }
  });
}

onMounted(() => {
  //const queryBuilder = authStore.odooUser!.modelQueryBuilder<HrAttendance>('hr.attendance');
  //model.value = await queryBuilder.searchData();
  //fields.value = await queryBuilder.searchFieldTypes();
  console.log('records');
  console.log(records);

  //tableRecords.value = records.map(record => { return { selected: false, record: record }});

  console.log('tableRecords');
  console.log(newTableRecords.value);

  employeers.value = newTableRecords.value.map(value => value.record.employee_id[1]);
  checkIns.value = newTableRecords.value.map(value => value.record.check_in);
  checkOuts.value = newTableRecords.value.map(value => value.record.check_out);
  workedHours.value = newTableRecords.value.map(value => value.record.worked_hours);

  console.log('employers');
  console.log(employeers.value);

  pages.value = getPageIndexes(newTableRecords.value.length, recordsPerPage.value)

  loaded.value = true;

  console.log(`
    Models | onMounted
    - isCreationOpen: ${isCreationOpen}
    - creatingRecord: ${creatingRecord}
  `);
})
</script>

<template>
  <div v-if="loaded" class="bento">
    <div class="flex flex-col">
      <span class="text-2xl font-bold">Records list</span>
      <span class="text-normal text-gray-600 font-normal">View and modify the records for this model</span>
    </div>

    <div class="header">
      <div>
        <ButtonCreate @mousedown="() => { emit('openMenu', 'create-record') }"/>
        <ButtonExport/>
        <ButtonFilters/>

        <!--span>records length: {{ tableRecords.length }}</span>
        <span> | </span>
        <span>records per page: {{ recordsPerPage }}</span>
        <span> | </span>
        <span>generated pages: {{ pages.length }}</span>
        <span> | </span>
        <span>selected page: {{ selectedPage }}</span-->
      </div>
      <div class="search-wrapper">
        <BadgeDynamic name="Employee" :color="{ r: 250, g: 240, b: 230}"/>
        <input type="search" placeholder="search elements"/>
        <IconsIconSearch/>
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
          <IconsIconSortAz @click="() => { }"/>
        </div>

        <div v-if="showEmployeers" class="column">
          <span>Employee</span>
          <IconsIconSort :inverse="sortEmployeers" @click="() => { 
            if (sortEmployeers) {
              sortAlpha();
              sortEmployeers = false;
            } else {
              sortAlphaInverse();
              sortEmployeers = true;
            }
          }"/>
          <!--IconsIconSortAz @click="() => { sortAlpha() }"/-->
        </div>

        <div v-if="showCheckIns" class="column">
          <span>Check In</span>
          <IconsIconSortAz @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showCheckInsLat" class="column">
          <span>Check In Latitude</span>
          <IconsIconSortAz @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showCheckInsLon" class="column">
          <span>Check In Longitude</span>
          <IconsIconSortAz @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showCheckOuts" class="column">
          <span>Check Out</span>
          <IconsIconSortAz/>
        </div>

        <div v-if="showCheckOutsLat" class="column">
          <span>Check Out Latitude</span>
          <IconsIconSortAz @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showCheckOutsLon" class="column">
          <span>Check Out Longitude</span>
          <IconsIconSortAz @click="() => { sortCheckin() }"/>
        </div>

        <div v-if="showWorkedHours" class="column">
          <span>Work Hours</span>
          <IconsIconSortAz @click="() => { sortNumber() }"/>
        </div>
      </div>

      <LayoutCollapsable class="table-body" :collapsed="true">
        <div class="row-wrapper fadeInUp-item" v-if="isCreationOpen && creatingRecord">
          <CreatingRow
            :record="creatingRecord"
            :show="[showIds, showEmployeers, showCheckIns, showCheckInsLat, showCheckInsLon, showCheckOuts, showCheckOutsLat, showCheckOutsLon, showWorkedHours]"
          />
        </div>

        <div 
          v-for="(record, index) in viewRecords"
          :style="{ animationDelay: `${index * 50}ms`}"
          class="row-wrapper fadeInUp-item "
        >
          <AttendanceRow
            :index
            :selected="record.selected"
            :record="record.record"
            :show="[showIds, showEmployeers, showCheckIns, showCheckInsLat, showCheckInsLon, showCheckOuts, showCheckOutsLat, showCheckOutsLon, showWorkedHours]"
            @toggle-selected="handleSelection"
            @mousedown="() => emit('openMenuDetails', record.record, index)"
          />

          <div v-if="index != viewRecords.length - 1" class="separator"/>
        </div>
      </LayoutCollapsable>
      <!--div class="table-body">
        <div class="row-wrapper fadeInUp-item" v-if="isCreationOpen && creatingRecord">
          <CreatingRow
            :record="creatingRecord"
            :show="[showIds, showEmployeers, showCheckIns, showCheckInsLat, showCheckInsLon, showCheckOuts, showCheckOutsLat, showCheckOutsLon, showWorkedHours]"
          />
        </div>

        <div 
          v-for="(record, index) in viewRecords"
          :style="{ animationDelay: `${index * 50}ms`}"
          class="row-wrapper fadeInUp-item "
        >
          <AttendanceRow
            :index
            :selected="record.selected"
            :record="record.record"
            :show="[showIds, showEmployeers, showCheckIns, showCheckInsLat, showCheckInsLon, showCheckOuts, showCheckOutsLat, showCheckOutsLon, showWorkedHours]"
            @toggle-selected="handleSelection"
          />

          <div v-if="index != viewRecords.length - 1" class="separator"/>
        </div>
      </div-->
    </div>


    <div class="table-controllers">
      <div class="left">
        <span class="value">{{ recordsPerPage }}</span>
        <span> results of </span>
        <span class="value">{{ newTableRecords.length }}</span>
      </div>

      <div class="right">
        <div>
          <span>elements per page </span>
          <input
            v-model="recordsPerPage"
            type="number"
            id="quantity"
            name="quantity"
            :placeholder="recordsPerPage.toString"
            :min="1"
            :max="newTableRecords.length"
          >
        </div>

        <div>
          <span>page </span>
          <input
            v-model="selectedPage"
            type="number"
            id="quantity"
            name="quantity"
            :placeholder="selectedPage.toString()"
            :min="0"
            :max="pages.length - 1"
          >
          <span> of </span>
          <span class="value">{{ pages.length - 1 }}</span>
        </div>
      </div>
    </div>

    <ToolBar v-if="selectedRecords.length > 0" :fields="newTableRecords" :selected-fields="selectedRecords"/>
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

  //padding: 14px;

  display: flex;
  flex-direction: column;
  gap: 16px;

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

    .search-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;

      padding-left: 8px;
      padding-right: 8px;

      border-radius: 8px;
      outline: none;
      border: none;
      background-color: rgb(245, 245, 245);
    }

    div {
      &:nth-child(1) {
        display: flex;
        gap: 6px;
      }
      &:nth-child(2) {
        display: flex;
        justify-content: flex-end;

        input {
          width: 100%;
          outline: none;
          border: none;
          background: none;
        }
      }
    }
  }

  .table {
    //overflow-x: scroll;
    width: 100%;

    padding-top: 10px;

    .header {
      width: 100%;

      padding-left: .35rem;
      padding-right: .35rem;
      padding-bottom: .35rem;

      display: flex;

      input {
        margin-right: 16px;
      }

      .column {
        width: 100%;
        //margin-right: 26px;

        display: flex;
        justify-content: left;
        align-items: center;
        gap: 2px;

        span {
          font-size: 14px;
          font-weight: 600;
          text-wrap: wrap;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.82);
        }
      }
    }

    .table-body {
      /*
      padding-left: .35rem;
      padding-right: .35rem;

      padding-top: .40rem;
      padding-bottom: .40rem;
      */

      border-radius: 12px;

      background-color: rgb(255, 255, 255);
      box-shadow: rgba(0, 0, 0, 0.04) 0px 2px 4px,
      rgba(0, 0, 0, 0.04) 0px -2px 4px;

      //background-color: rgba(255, 255, 255, 0.7);
      //background-color: rgba(245, 245, 245);
      //backdrop-filter: blur(30px);

      .row-wrapper {
        display: flex;
        flex-direction: column;

        opacity: 0;

        .separator {
          width: 97%;
          height: 2px;

          align-self: flex-end;

          background-color: rgb(245, 245, 245);
        }
      }
    }
  }

  .table-controllers {
    display: flex;
    justify-content: space-between;

    .left {
      .value {
        font-weight: 600;

      }
    }

    .right {
      display: flex;
      gap: 30px;

      div {
        .value {
          font-weight: 600;
        }

        input[type=number] {
          padding-top: .25rem;
          padding-bottom: .25rem;
          padding-left: .75rem;

          border: solid 1px hsl(240 5.9% 90%);
          border-radius: 0.4rem;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);

          outline: none;

          //-moz-appearance: textfield;
          //appearance: textfield;

          &::-webkit-inner-spin-button,
          ::-webkit-outer-spin-button {
            -webkit-appearance: none; 
            opacity: 0;
          }
        }
      }
    }
  }

  @keyframes fadeInUp {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .fadeInUp-item {
    animation: 1.5s fadeInUp forwards;
  }
}
</style>
