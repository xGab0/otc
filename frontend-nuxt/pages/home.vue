<script setup lang="ts">
import BadgeModel from '~/components/badges/BadgeModel.vue';
import ButtonDelete from '~/components/buttons/ButtonDelete.vue';
import ButtonExport from '~/components/buttons/ButtonExport.vue';
import IconChevron from '~/components/icons/IconChevron.vue';
import IconUser from '~/components/icons/IconUser.vue';
import AttendanceColumn from '~/components/table/AttendanceColumn.vue';
import AttendanceRow from '~/components/table/AttendanceRow.vue';
import type { HrAttendance } from '~/hooks/hr';
import type { OdooField } from '~/hooks/odoo/fields';
import type { OdooModelData } from '~/hooks/odoo/wrapper';
import type { TableField } from '~/hooks/table';
import Models from './models.vue';
import FiltersTemplate from '~/components/FiltersTemplate.vue';
import IconHexagon from '~/components/icons/shapes/IconHexagon.vue';

definePageMeta({
  middleware: 'auth',
  /*
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
  */
});

onMounted(async () => {
})
</script>

<template>
  <div class="global">
    <SideMenu/>

    <ComponentLayout/>
    <!--div class="body paper-squared">
      <div class="header">
        <div>
          <IconHexagon fill="rgb(255, 197, 52)"/>
        </div>
        <div>
          <span class="title">Presenze</span>
          <span class="description">Modello per la gestione presenze</span>
        </div>
      </div>
      <div class="window-container">
        <div class="card">
          <Models/>
        </div>

        <div class="card">
        </div>
      </div>
    </div-->
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  gap: 30px;
}

.global {
  display: flex;

  width: 100%;
  height: 100%;

  padding-top: 20px;
  padding-bottom: 20px;

  .body {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 20px;

    .header {
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
        }
      }
    }

    .window-container {
      width: 100%;
      height: 100%;

      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: 1fr;
      gap: 10px;

      .card {
        height: fit-content;
        padding: 14px;
        border-radius: 12px;

        //background-color: rgb(226, 226, 226);
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
      }
    }
  }
}
</style>
