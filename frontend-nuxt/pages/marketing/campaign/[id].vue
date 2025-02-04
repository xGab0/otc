<script setup lang="ts">
import { ssrGetDynamicModelProps } from 'vue/server-renderer';
import BadgeDynamic from '~/components/badges/BadgeDynamic.vue';
import Card from '~/components/cards/Card.vue';
import UsersDropdown from '~/components/dropdowns/UsersDropdown.vue';
import IconGrid from '~/components/icons/IconGrid.vue';
import IconMoreVert from '~/components/icons/IconMoreVert.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import IconCircle from '~/components/icons/shapes/IconCircle.vue';
import type { Marketing } from '~/hooks/marketing';
import { ModelQueryBuilder } from '~/hooks/odoo/wrapper';
import ViewMarketingSmsCreation from '~/views/marketing/sms/ViewMarketingSmsCreation.vue';
import ViewMarketingSmsDraft from '~/views/marketing/sms/ViewMarketingSmsDraft.vue';
import ViewMarketingSmsScheduled from '~/views/marketing/sms/ViewMarketingSmsScheduled.vue';

definePageMeta({
  middleware: 'auth',
  //pageTransition: { name: 'page', mode: 'out-in' }
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
            <ViewMarketingSmsCreation
              :model-query-builder="modelQueryBuilder!"
              :marketing-campaign-id="Number(route.params.id)"
              @record-create="(record) => {
                showMenuCreate = false;
                messages!.push(record);
              }"
            />
          </template>
        </Card>
      </div>
    </div>
  </Teleport>

  <div v-if="campaign && modelQueryBuilder" class="campaign">
    <div class="header">
      <div class="bio">
        <BadgeDynamic name="campaign" :color="{ r: 255, g: 225, b: 222 }" style="font-size: 11px;" />
        <span class="title">{{ campaign.name }}</span>
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

    <div class="messages">
      <Card title="Draft" style="z-index: 40">
        <template v-slot:header>
          <div class="flex gap-2">
            <IconPlus style="cursor: pointer" @mousedown="() => showMenuCreate = true" />
            <IconMoreVert style="cursor: pointer" />
          </div>
        </template>

        <template v-slot:body v-if="messages">
          <ViewMarketingSmsDraft
            :model-query-builder="modelQueryBuilder"
            :messages="messages.filter(message => message.status === 'draft')"
            @record-scheduled="(oldSms, newSms, date) => {
              const index = messages!.findIndex(foundMessage => foundMessage.id === oldSms.id);

              if (index !== -1) {
                messages!.splice(index, 1, newSms);
                console.info('scheduled record with id ', oldSms.id);
              }
            }"
            @record-delete="(sms) => {
              const index = messages!.findIndex(foundMessage => foundMessage.id === sms.id);

              if (index !== -1) {
                messages!.splice(index, 1)
              }
            }"
          />
        </template>
      </Card>

      <Card title="Scheduled" style="z-index: 30">
        <template v-slot:header>
          <div class="operations">
            
          </div>
        </template>

        <template v-slot:body v-if="messages">
          <!--ViewMailingInQueue :mailings="messages.filter(message => message.status === 'scheduled')" /-->
          <ViewMarketingSmsScheduled
            :model-query-builder="modelQueryBuilder"
            :messages="messages.filter(message => message.status === 'scheduled')"
            @record-delete="(sms) => {
              const index = messages!.findIndex(foundMessage => foundMessage.id === sms.id);

              if (index !== -1) {
                messages!.splice(index, 1)
              }
            }"
          />
        </template>
      </Card>

      <Card title="Sent" style="z-index: 20">
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

.campaign {
  display: flex;
  flex-direction: column;
  gap: 10px;

  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .bio {
      display: flex;
      align-items: center;
      gap: 6px;

      > .title {
        font-size: 22px;
        font-weight: 500;
        text-transform: capitalize;
        color: rgb(33, 33, 33);
      }
    }
  }

  > .messages {
    display: flex;
    grid-template-columns: auto auto auto auto;
    gap: 12px;
  }
}
</style>