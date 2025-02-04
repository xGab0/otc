<script setup lang="ts">
import Card from '~/components/cards/Card.vue';
import IconClose from '~/components/icons/IconClose.vue';
import IconMoreVert from '~/components/icons/IconMoreVert.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import type { Mailing } from '~/hooks/mailing';
import type { Marketing } from '~/hooks/marketing';
import type { OdooUserData } from '~/hooks/odoo/data';
import { ModelQueryBuilder } from '~/hooks/odoo/wrapper';
import ViewMarketingPlans from '~/views/marketing/plans/ViewMarketingPlans.vue';
import ViewMarketingPlansCreation from '~/views/marketing/plans/ViewMarketingPlansCreation.vue';
import ViewMarketingPlansInfo from '~/views/marketing/plans/ViewMarketingPlansInfo.vue';
import ViewMarketingPlansTable from '~/views/marketing/plans/ViewMarketingPlansTable.vue';

definePageMeta({
  middleware: 'auth',
  pageTransition: { name: 'page', mode: 'out-in' }
  /*pageTransition: {
    name: 'rotate'
  }*/
});

const router = useRouter();
const authStore = useAuthStore();
const userDataStore = useUserDataStore();
const userData = ref<OdooUserData>();

const modelQueryBuilder = ref<ModelQueryBuilder<Marketing.Plan>>();
const plans = ref<Marketing.Plan[]>([]);
const mailings = ref<Mailing[]>([]);

const creatingRecord = ref<boolean>(false);
const viewingRecord = ref<Marketing.Plan>();

onMounted(async () => {
  await userDataStore.init();
  userData.value = userDataStore.userData;

  console.log('Marketing | userData');
  console.log(userData.value);

  modelQueryBuilder.value = authStore.odooUser?.modelQueryBuilder<Marketing.Plan>('marketing.plan');

  plans.value = await modelQueryBuilder.value!.searchReadRecords();

  console.log('Marketing | Plans');
  console.log(plans.value);
})
</script>

<template>
  <div class="mailings">
    <Card
      title="Plans"
      subtitle="View all the plans"
    >
      <template v-slot:header>
        <div class="flex gap-2">
           <IconPlus @mousedown="() => { creatingRecord = true; console.log('opening record creation...') }" />
           <IconMoreVert />
        </div>
      </template>

      <template v-slot:body>
        <ViewMarketingPlansTable
          :plans
          @record-view="(plan) => {
            viewingRecord = plan;
            console.log('plan viewed: ', plan);
          }"
        />
      </template>
    </Card>

    <Card v-if="creatingRecord && modelQueryBuilder"
        title="Create new Plan"
        subtitle="Compile the form to make a new plan"
    >
      <template v-slot:header>
        <div class="flex gap-2">
          <IconClose fill="red" @mousedown="() => creatingRecord = false"/>
        </div>
      </template>

      <template v-slot:body>
        <ViewMarketingPlansCreation
          :model-query-builder="modelQueryBuilder"
          @record-create="(plan) => {
            plans.push(plan);
            creatingRecord = false;
            console.log('plan pushed: ', plan);
          }"
        />
      </template>
    </Card>

    <Card v-if="viewingRecord && modelQueryBuilder"
        title="Plan"
        subtitle="View and modify this plan"
    >
      <template v-slot:header>
        <div class="flex gap-2">
          <IconClose fill="darkred" @mousedown="() => viewingRecord = undefined"/>
        </div>
      </template>

      <template v-slot:body>
        <ViewMarketingPlansInfo
          :model-query-builder="modelQueryBuilder"
          :viewing-record="viewingRecord"
          @record-modify="(plan) => {
            //plans.push(plan);
            console.log('plan modified: ', plan);
          }"
          @record-delete="(id) => {
            const indexToRemove = plans.findIndex(plan => plan.id === id);

            if (indexToRemove !== -1) {
              plans.splice(indexToRemove, 1);
              viewingRecord === undefined;
            } else {
              console.error('Record not found!');
            }
          }"
        />
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.sos {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: .875rem;
  border-radius: 24px;
  //background-color: rgb(242, 242, 242);
  background-color: white;

  > .header {
    display: flex;
    justify-content: space-between;

    > .section {
      display: flex;
      align-items: center;

      &.title {
        width: 20%;

        span {
          font-size: 26px;
          font-weight: 500;
        }
      }

      &.navigation {
        width: 60%;
        justify-content: center;
      }

      &.controls {
        width: 20%;
        justify-content: right;
      }
    }
  }
}

.mailings {
  display: flex;
  grid-template-columns: auto auto auto auto;
  gap: 12px;
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
