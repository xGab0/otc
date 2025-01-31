<script setup lang="ts">
import Card from '~/components/cards/Card.vue';
import IconClose from '~/components/icons/IconClose.vue';
import IconMoreVert from '~/components/icons/IconMoreVert.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import type { Marketing } from '~/hooks/marketing';
import type { OdooUserData } from '~/hooks/odoo/data';
import { ModelQueryBuilder } from '~/hooks/odoo/wrapper';
import ViewMarketingCampaignsCreation from '~/views/marketing/campaigns/ViewMarketingCampaignsCreation.vue';
import ViewMarketingCampaignsInfo from '~/views/marketing/campaigns/ViewMarketingCampaignsInfo.vue';
import ViewMarketingCampaignsTable from '~/views/marketing/campaigns/ViewMarketingCampaignsTable.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'main',
  pageTransition: { name: 'page', mode: 'out-in' }
});

const router = useRouter();
const authStore = useAuthStore();
const userDataStore = useUserDataStore();
const userData = ref<OdooUserData>();

const modelQueryBuilder = ref<ModelQueryBuilder<Marketing.Campaign>>();
const campaigns = ref<Marketing.Campaign[]>([]);

const creatingRecord = ref<boolean>(false);
const viewingRecord = ref<Marketing.Campaign>();

onMounted(async () => {
  await userDataStore.init();
  userData.value = userDataStore.userData;

  modelQueryBuilder.value = authStore.odooUser?.modelQueryBuilder<Marketing.Campaign>('marketing.campaign');

  campaigns.value = await modelQueryBuilder.value!.searchReadRecords();

  console.log('Marketing | Campaigns');
  console.log(campaigns.value);
})
</script>

<template>
  <div class="mailings">
    <Card
      title="Campaigns"
      subtitle="View all the campaigns"
    >
      <template v-slot:header>
        <div class="flex gap-2">
           <IconPlus @mousedown="() => { creatingRecord = true; console.log('opening record creation...') }" />
           <IconMoreVert />
        </div>
      </template>

      <template v-slot:body>
        <ViewMarketingCampaignsTable
          :campaigns
          @record-view="(campaign) => {
            viewingRecord = campaign;
            console.log('campaign viewed: ', campaign);
          }"
        />
      </template>
    </Card>

    <Card v-if="creatingRecord && modelQueryBuilder"
        title="Create new Campaign"
        subtitle="Compile the form to make a new campaign"
    >
      <template v-slot:header>
        <div class="flex gap-2">
          <IconClose fill="red" @mousedown="() => creatingRecord = false"/>
        </div>
      </template>

      <template v-slot:body>
        <ViewMarketingCampaignsCreation
          :model-query-builder="modelQueryBuilder"
          @record-create="(campaign) => {
            campaigns.push(campaign);
            creatingRecord = false;
            console.log('campaign pushed: ', campaign);
          }"
        />
      </template>
    </Card>

    <Card v-if="viewingRecord && modelQueryBuilder"
        title="Campaign"
        subtitle="View and modify this campaign"
    >
      <template v-slot:header>
        <div class="flex gap-2">
          <IconClose fill="darkred" @mousedown="() => viewingRecord = undefined"/>
        </div>
      </template>

      <template v-slot:body>
        <ViewMarketingCampaignsInfo
          :model-query-builder="modelQueryBuilder"
          :viewing-record="viewingRecord"
          @record-modify="(campaign) => {
            //plans.push(plan);
            console.log('campaign modified: ', campaign);
          }"
          @record-delete="(id) => {
            const indexToRemove = campaigns.findIndex(campaign => campaign.id === id);

            if (indexToRemove !== -1) {
              campaigns.splice(indexToRemove, 1);
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
