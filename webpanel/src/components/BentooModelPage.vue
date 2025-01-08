<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { OdooConnection, OdooUser } from '../../../typescript/lib/wrapper';
import { type OdooField } from '../../../typescript/lib/fields';
import { OdooModule } from '../../../typescript/lib/module';
import { type OdooModelData } from '../../../typescript/lib/data';
import IconRhombus from './icons/shapes/IconRhombus.vue';
import IconChevron from './icons/IconChevron.vue';
import AttendanceRow from './table/AttendanceRow.vue';
import type { TableField } from '../scripts/table';
import type { HrAttendance } from '../scripts/hr';
import ButtonDelete from './buttons/ButtonDelete.vue';
import ButtonExport from './buttons/ButtonExport.vue';
import IconExcel from './icons/office/IconExcel.vue';
import BadgeModel from './badges/BadgeModel.vue';
const connection = ref<OdooConnection>();
const user = ref<OdooUser>();

const model = ref<OdooModelData>();
const fields = ref<OdooField[]>();
//const records = ref<any[]>();

const tableRecords = ref<TableField[]>([]);
const allSelected = ref<boolean>(false);
  
const loaded = ref<boolean>(false);

function handleSelection(index: number, selected: boolean) {
  tableRecords.value[index].selected = selected;
  console.log(`Updated row [${index}] to ${selected}`);
}

function toggleAllSelections() {
  allSelected.value = !allSelected.value
  tableRecords.value.forEach(record => record.selected = allSelected.value);
}

onMounted(async () => {
  console.log('connecting...');

  connection.value = await OdooConnection.connect('/odoo');
  user.value = await connection.value.login('odoo-otc-db', 'admin', 'admin');

  console.log('connected');

  const queryBuilder = user.value.modelQueryBuilder<HrAttendance>('hr.attendance');
  model.value = await queryBuilder.searchData();
  fields.value = await queryBuilder.searchFieldTypes();
  tableRecords.value = (await queryBuilder.searchReadRecords())
      .map(record => { return { selected: false, record: record }});

  console.log('modelDetails');
  console.log(model.value);

  loaded.value = true;
})
</script>

<template>
  <div v-if="loaded" class="bento">
    <div class="upper">
      <div>
        <span class="model-name">{{model[0]?.name}}</span>
        <div class="models">
          <BadgeModel v-for="model in model[0]?.modules.split(',').trim()" :name="model"/>
        </div>
      </div>
      <p>{{model[0]?.count}} records</p>
    </div>

    <div class="controls">
      <ButtonDelete/>
      <ButtonExport/>
    </div>

    <div class="table">
      <div class="header">
        <input type="checkbox" @input="toggleAllSelections"/>

        <div class="column">
          <span>Employee</span>
          <IconChevron/>
        </div>

        <div class="column">
          <span>Check In</span>
          <IconChevron/>
        </div>

        <div class="column">
          <span>Check Out</span>
          <IconChevron/>
        </div>

        <div class="column">
          <span>Work Hours</span>
          <IconChevron/>
        </div>
      </div>

      <div class="body">
        <AttendanceRow v-for="(record, index) in tableRecords" 
          :index
          :selected="record.selected"
          :record="record.record"
          @toggle-selected="handleSelection"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bento {
  width: 100%;

  padding: 10px;

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

  .table {
    width: 100%;

    .header {
      width: 100%;
      display: flex;

      padding-left: 12px;
      padding-right: 12px;
      padding-bottom: 4px;

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
          font-size: 11px;
          font-weight: 600;
          text-wrap: nowrap;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.82);
        }
      }
    }

    .body {
      padding-top: 12px;
      padding-bottom: 12px;

      border-radius: 20px;
      //background-color: rgba(255, 255, 255, 0.7);
      background-color: rgba(245, 245, 245);
      backdrop-filter: blur(30px);

      .row {
        width: 100%;
        display: flex;
        align-items: center;

        padding-top: 4px;
        padding-left: 12px;
        padding-right: 12px;
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
            text-wrap: nowrap;
          }
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.9);
        }
      }
    }
  }
}
</style>
