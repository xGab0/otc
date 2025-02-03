<script setup lang="ts">
import Card from '~/components/cards/Card.vue';
import CardMarketingDraft from '~/components/cards/marketing/CardMarketingSmsDraft.vue';
import IconClose from '~/components/icons/IconClose.vue';
import IconGrid from '~/components/icons/IconGrid.vue';
import IconLayoutList from '~/components/icons/IconLayoutList.vue';
import IconMoreVert from '~/components/icons/IconMoreVert.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import IconCircle from '~/components/icons/shapes/IconCircle.vue';
import ModularNavigation from '~/components/navigation/ModularNavigation.vue';
import type { Marketing } from '~/hooks/marketing';
import { ModelQueryBuilder } from '~/hooks/odoo/wrapper';
import ViewMailingDraft from '~/views/mailing/ViewMailingDraft.vue';
import ViewMailingInQueue from '~/views/mailing/ViewMailingInQueue.vue';
import ViewMailingSent from '~/views/mailing/ViewMailingSent.vue';
import ViewMarketingSmsCreation from '~/views/marketing/sms/ViewMarketingSmsCreation.vue';
import ViewMarketingSmsDraft from '~/views/marketing/sms/ViewMarketingSmsDraft.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'main'
});

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const campaign = ref<Marketing.Campaign>();
const modelQueryBuilder = ref<ModelQueryBuilder<Marketing.Sms>>();
const messages = ref<Marketing.Sms[]>();

const showMenuCreate = ref<boolean>(false);

onMounted(async () => {
  campaign.value = (await authStore.odooUser!.searchReadRecords<Marketing.Campaign>('marketing.campaign'))[0];
  modelQueryBuilder.value =  authStore.odooUser!.modelQueryBuilder<Marketing.Sms>('marketing.sms');
  messages.value = await modelQueryBuilder.value.searchReadRecords([['marketing_campaign_id', '=', route.params.id]])
  //messages.value = await authStore.odooUser!.callFunction<any[]>('res.users', 'get_marketing_sms', []);

  //if (messages.value === undefined) return;

  console.log(`marketing/campaign/${route.params.id}`);
  console.log(messages.value);

  messages.value = await modelQueryBuilder.value.searchReadRecords();
  console.log('all messages: ', await modelQueryBuilder.value.searchReadRecords());
})
</script>

<template>
  <Teleport to="#teleports">
    <div v-if="showMenuCreate" class="modal">
      <div class="window">
        <Card v-if="showMenuCreate"
          title="Create a new SMS"
          subtitle="Compile the form to make a new SMS"
        >
          <template v-slot:header>
            <div class="flex gap-2">
              <IconCircle fill-color="darkred" :size="24" style="cursor: pointer" @mousedown.left="() => showMenuCreate = false"/>
            </div>
          </template>

          <template v-slot:body>
            <ViewMarketingSmsCreation :model-query-builder="modelQueryBuilder!" :marketing-campaign-id="Number(route.params.id)" />
          </template>
        </Card>
      </div>
    </div>
  </Teleport>

  <div v-if="campaign">
    <div class="wtf flex justify-between">
      <div class="flex flex-col">
        <span>{{ campaign.name }}</span>
        <span>{{ campaign.description }}</span>
      </div>

      <div class="selector layout">
        <IconGrid :size="32"/>
        <IconGrid :size="32"/>
        <IconGrid :size="32"/>
        <IconGrid :size="32"/>

        <!--ModularNavigation>
          <template v-slot:bubble>
            <div class="bubble" />
          </template>

          <template v-slot:elements>
            <IconGrid
              :size="32"

            />

            <IconGrid
              :size="32"

            />
          </template>
        </ModularNavigation -->
      </div>
    </div>

    <div class="campaign">
      <Card title="Draft">
        <template v-slot:header>
          <div class="flex gap-2">
            <IconPlus style="cursor: pointer" @mousedown="() => showMenuCreate = true" />
            <IconMoreVert style="cursor: pointer" />
          </div>
        </template>

        <template v-slot:body v-if="messages">
          <ViewMarketingSmsDraft :messages="messages.filter(message => message.status === 'draft')" />
        </template>
      </Card>

      <Card title="InQueue">
        <template v-slot:header>
          <div class="operations">
            
          </div>
        </template>

        <template v-slot:body>
          <!--ViewMailingInQueue :mailings="messages.filter(message => message.status === 'scheduled')" /-->
        </template>
      </Card>

      <Card title="Sent">
        <template v-slot:header>
          <div class="operations">
            
          </div>
        </template>

        <template v-slot:body>
          <!--ViewMailingSent :mailings="messages.filter(message => message.status === 'sent')" /-->
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selector.layout {
  display: flex;
  gap: 8px;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
  background-color: rgba(0, 0, 0, .8);

  backdrop-filter: blur(4px);
  /*
  position: absolute;
  top: 50%;
  left: 50%;
  */

  .window {
    width: 50%;
  }
}

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

.campaign {
  display: flex;
  grid-template-columns: auto auto auto auto;
  gap: 12px;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.102);
}
</style>