<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import IconHexagon from './icons/shapes/IconHexagon.vue';
import Models from '~/pages/models-old.vue';
import type { OdooModelData } from '~/hooks/odoo/data';
import IconGrid from './icons/IconGrid.vue';
import RecordCreator from './RecordCreator.vue';
import { OdooRecordSyntax, type ModelQueryBuilder } from '~/hooks/odoo/wrapper';
import LayoutCollapsable from '~/layouts/LayoutCollapsable.vue';
import RecordDetails from './RecordDetails.vue';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();

const model = ref<OdooModelData>();
const fields = ref();
const queryBuilder = ref<ModelQueryBuilder<HrAttendance>>();
const records = ref<HrAttendance[]>();
const viewedRecord = ref<HrAttendance>();

const showMenuRecordsList = ref<boolean>(false);
const showMenuRecordsCreate = ref<boolean>(false);
const showMenuRecordInfo = ref<boolean>(false);

const show = ref<boolean>(true);
const childRef = ref<InstanceType<typeof RecordCreator> | null>(null);

watch(childRef, (newchildRef) => {
  console.log(`ComponentLayout | watcher
    - childRef is ${newchildRef}
  `);
  console.log(newchildRef);
})

onMounted(async () => {
  //records.value = await authStore.odooUser!.searchRecords('hr.attendance');

  queryBuilder.value = authStore.odooUser!.modelQueryBuilder<HrAttendance>('hr.attendance');
  model.value = (await queryBuilder.value.searchData())[0];
  fields.value = await queryBuilder.value.searchFieldTypes();
  records.value = await queryBuilder.value.searchReadRecords();
  viewedRecord.value = records.value[0];

  const perms = await authStore.odooUser!.searchReadRecord('ir.model.access', [['model_id.model', '==', 'hr.attendance']], [], undefined, 1);

  console.debug('ComponentLayout | modeldata');
  console.debug(model.value);

  console.debug('ComponentLayout | fieldTypes');
  console.debug(fields.value);

  console.debug('ComponentLayout | records');
  console.debug(records.value);

  console.debug('ComponentLayout | perms');
  console.debug(perms);
});
</script>

<template>
  <div v-if="model && records && queryBuilder" class="model-context">
    <!--button @mousedown="() => { records?.push({
      employee_id: [99, 'Prova'],
      id: 0,
      department_id: [99, 'Fake'],
      check_in: '',
      check_in_latitude: 0,
      check_in_longitude: 0,
      check_out: '',
      check_out_latitude: 0,
      check_out_longitude: 0,
      worked_hours: 0
    }) }">Add fake record</button-->
    <!--button @mousedown="() => show = !show">CLICK</button-->
    <div class="header">
      <div class="left">
        <div class="logo">
          <IconHexagon fill="rgb(255, 197, 52)"/>
        </div>
        <div class="details">
          <span class="title">{{model.display_name}} <span class="description">{{ model.model }}</span> </span>
          <div class="modules">
            <span
              v-for="module in model.modules.split(',')"
              class="module"
            >
              {{ module }}
            </span>
          </div>
        </div>
      </div>

      <div class="buttons">
        <IconGrid/>
      </div>
    </div>

    <div class="workspace">
      <div class="container">
        <Models
          :records="records"
          :is-creation-open="showMenuRecordsCreate"
          :creating-record="childRef?.prova"
          @open-menu="() => { showMenuRecordsCreate = true }"
          @close-menu="() => { showMenuRecordsCreate = false }"
          @open-menu-details="(record, index) => { viewedRecord = record, showMenuRecordInfo = true}"
        />
      </div>

      <LayoutCollapsable v-if="showMenuRecordsCreate"  :collapsed="showMenuRecordsCreate" class="container creator">
        <RecordCreator v-if="showMenuRecordsCreate"
          ref="childRef"
          :fields="Object.entries(fields)"
          :query-builder="queryBuilder"
          @create-record="(record) => {
            records?.push(record);
          }"
          @close="() => showMenuRecordsCreate = false"
        />
      </LayoutCollapsable>

      <!--div class="container">
        <QueryBuilder/>
      </div-->

      <LayoutCollapsable v-if="showMenuRecordInfo" :collapsed="showMenuRecordInfo" class="container details">
        <RecordDetails
          v-if="showMenuRecordInfo && viewedRecord"
          :fields="Object.entries(fields)"
          :record="viewedRecord"
          :admin="authStore.odooUser!.uid"
          :query-builder="queryBuilder"
          @modify-record="(oldRecord, newRecord) => {
            const index = records!.findIndex(item => item.id === newRecord.id);
            records!.splice(index, 1, newRecord);

            console.log('record replaced for checkout');
          }"
          @close="() => showMenuRecordInfo = false"
        />
      </LayoutCollapsable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.model-context {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
  row-gap: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    .buttons {
      svg {
        width: 48px;
        height: 48px;
      }
    }

    .left {
      display: flex;
      align-items: center;
      gap: 16px;

      div {
        &:nth-child(1) {
          width: 70px;
          height: 70px;

          border-radius: 16px;
          background-color: rgb(255, 236, 188);

          svg {
            width: 70px;
            height: 70px;
          }
        }

        &:nth-child(2) {
          display: flex;
          flex-direction: column;

          .title {
            font-size: 38px;
            font-weight: 700;
          }

          .description {
            font-size: 18px;
            font-weight: 500;
          }

          .modules {
            display: flex;
            flex-direction: row;
            gap: 6px;

            .module {
              width: fit-content;

              font-size: 14px;
              font-weight: 500;

              padding-top: 2px;
              padding-bottom: 2px;
              padding-left: 6px;
              padding-right: 6px;

              border-radius: 8px;
              background-color: rgb(255, 241, 214);
              border: solid 2px rgb(255, 232, 186);
            }
          }
        }
      }
    }
  }

  .workspace {
    width: 100%;
    height: 100%;

    //display: grid;
    //grid-template-columns: repeat(2, auto);
    //grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    //grid-template-columns: repeat(auto-fill, 1fr);

    display: flex;
    gap: 14px;

    .container {
      height: fit-content;

      padding: 14px;
      border-radius: 12px;

      //background-color: rgb(226, 226, 226);
      background: linear-gradient(to bottom, #fffef4, #ffffff);

      //background-color: rgba(255, 255, 255, 0.925);
      backdrop-filter: saturate(160%) blur(32px);
      box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;

      //background: linear-gradient(90deg, rgb(253, 255, 243), rgb(255, 252, 247));
      //backdrop-filter: blur(3px);

      &.creator {
        width: 60%;
      }

      &.details {
        width: 60%;
      }
    }
  }
}
</style>
