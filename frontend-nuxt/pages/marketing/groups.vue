<script setup lang="ts">
import Card from '~/components/cards/Card.vue';
import IconClose from '~/components/icons/IconClose.vue';
import IconMoreVert from '~/components/icons/IconMoreVert.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import type { Mailing } from '~/hooks/mailing';
import type { Marketing } from '~/hooks/marketing';
import type { OdooUserData } from '~/hooks/odoo/data';
import { ModelQueryBuilder } from '~/hooks/odoo/wrapper';
import ViewMarketingGroups from '~/views/marketing/groups/ViewMarketingGroups.vue';
import ViewMarketingGroupsCreation from '~/views/marketing/groups/ViewMarketingGroupsCreation.vue';
import ViewMarketingGroupsInfo from '~/views/marketing/groups/ViewMarketingGroupsInfo.vue';
import ViewMarketingGroupsTable from '~/views/marketing/groups/ViewMarketingGroupsTable.vue';

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

const modelQueryBuilder = ref<ModelQueryBuilder<Marketing.Group>>();
const groups = ref<Marketing.Group[]>([]);

const creatingRecord = ref<boolean>(false);
const viewingRecord = ref<Marketing.Group>();

onMounted(async () => {
  await userDataStore.init();
  userData.value = userDataStore.userData;

  console.log('Marketing | userData');
  console.log(userData.value);

  modelQueryBuilder.value = authStore.odooUser?.modelQueryBuilder<Marketing.Group>('marketing.group');

  groups.value = await modelQueryBuilder.value!.searchReadRecords();

  console.log('Marketing | Groups');
  console.log(groups.value);
})
</script>

<template>
  <div class="mailings">
    <Card
      title="Groups"
      subtitle="View all the groups"
    >
      <template v-slot:header>
        <div class="flex gap-2">
           <IconPlus @mousedown="() => { creatingRecord = true; console.log('opening record creation...') }" />
           <IconMoreVert />
        </div>
      </template>

      <template v-slot:body>
        <ViewMarketingGroupsTable
          :groups
          @record-view="(plan) => {
            viewingRecord = plan;
            console.log('plan viewed: ', plan);
          }"
        />
      </template>
    </Card>

    <Card v-if="creatingRecord && modelQueryBuilder"
        title="Create new Group"
        subtitle="Compile the form to make a new group"
    >
      <template v-slot:header>
        <div class="flex gap-2">
          <IconClose fill="red" @mousedown="() => creatingRecord = false"/>
        </div>
      </template>

      <template v-slot:body>
        <ViewMarketingGroupsCreation
          :model-query-builder="modelQueryBuilder"
          @record-create="(group) => {
            groups.push(group);
            creatingRecord = false;
            console.log('group pushed: ', group);
          }"
        />
      </template>
    </Card>

    <Card v-if="viewingRecord && modelQueryBuilder"
        title="Group"
        subtitle="View and modify this group"
    >
      <template v-slot:header>
        <div class="flex gap-2">
          <IconClose fill="darkred" @mousedown="() => viewingRecord = undefined"/>
        </div>
      </template>

      <template v-slot:body>
        <ViewMarketingGroupsInfo
          :model-query-builder="modelQueryBuilder"
          :viewing-record="viewingRecord"
          @record-modify="(group) => {
            //groups.push(group);
            console.log('group modified: ', group);
          }"
          @record-delete="(id) => {
            const indexToRemove = groups.findIndex(group => group.id === id);

            if (indexToRemove !== -1) {
              groups.splice(indexToRemove, 1);
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
