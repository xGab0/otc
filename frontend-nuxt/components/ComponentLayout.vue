<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import IconHexagon from './icons/shapes/IconHexagon.vue';
import Models from '~/pages/models.vue';
import type { OdooModelData } from '~/hooks/odoo/data';
import IconGrid from './icons/IconGrid.vue';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();

const model = ref<OdooModelData>();
const records = ref<HrAttendance[]>();
const viewedRecord = ref<HrAttendance>();

onMounted(async () => {
  //records.value = await authStore.odooUser!.searchRecords('hr.attendance');

  const queryBuilder = authStore.odooUser!.modelQueryBuilder<HrAttendance>('hr.attendance');
  model.value = (await queryBuilder.searchData())[0];
  records.value = await queryBuilder.searchReadRecords();
  viewedRecord.value = records.value[0];

  console.debug('ComponentLayout | modeldata');
  console.debug(model.value);

  console.debug('ComponentLayout | records');
  console.debug(records.value);
});
</script>

<template>
  <div v-if="model && records" class="model-context">
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

    <div class="workspace paper-squared">
      <div class="container">
        <Models :records="records"/>
      </div>

      <div class="container">
        <RecordDetails v-if="viewedRecord" :record="viewedRecord"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.model-context {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

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
          width: 60px;
          height: 60px;

          border-radius: 16px;
          background-color: rgb(255, 236, 188);

          svg {
            width: 60px;
            height: 60px;
          }
        }

        &:nth-child(2) {
          display: flex;
          flex-direction: column;

          .title {
            font-size: 32px;
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

              font-size: 15px;
              font-weight: 500;

              padding-top: 2px;
              padding-bottom: 2px;
              padding-left: 6px;
              padding-right: 6px;

              border-radius: 8px;
              background-color: rgb(255, 241, 214);
            }
          }
        }
      }
    }
  }

  .workspace {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: auto auto;
    gap: 30px;

    .container {
      width: 100%;
      height: fit-content;

      padding: 14px;
      border-radius: 12px;

      //background-color: rgb(226, 226, 226);
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    }
  }
}
</style>