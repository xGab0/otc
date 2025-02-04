<script setup lang="ts">
import Card from '~/components/cards/Card.vue';
import CardAttendances from '~/components/cards/CardAttendances.vue';
import CardContact from '~/components/cards/CardContacts.vue';
import CardTasks from '~/components/cards/CardTasks.vue';
import IconMoreVert from '~/components/icons/IconMoreVert.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import ModularNavigation from '~/components/navigation/new/ModularNavigation.vue';
import type { Mailing } from '~/hooks/mailing';
import type { OdooUserData } from '~/hooks/odoo/data';
import ViewMailingDraft from '~/views/mailing/ViewMailingDraft.vue';
import ViewMailingInQueue from '~/views/mailing/ViewMailingInQueue.vue';
import ViewMailingSending from '~/views/mailing/ViewMailingSending.vue';
import ViewMailingSent from '~/views/mailing/ViewMailingSent.vue';
import ViewAttendances from '~/views/ViewAttendances.vue';
import ViewContacts from '~/views/ViewContacts.vue';

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

const mailings = ref<Mailing[]>([]);

onMounted(async () => {
  await userDataStore.init();
  userData.value = userDataStore.userData;

  console.log('Marketing | userData');
  console.log(userData.value);

  mailings.value = await authStore.odooUser!.searchReadRecords('mailing.mailing');

  console.log('Home | mailings');
  console.log(mailings.value);

  console.log(
    `Marketing | Dashboard
    - campaigns:`, await authStore.odooUser!.searchReadRecords('marketing.campaign')
  );

  console.log(
    `Marketing | Dashboard
    - groups:`, await authStore.odooUser!.searchReadRecords('marketing.group')
  );

  console.log(
    `Marketing | Dashboard
    - plans:`, await authStore.odooUser!.searchReadRecords('marketing.plan')
  );

  console.log(
    `Marketing | Dashboard
    - sms:`, await authStore.odooUser!.searchReadRecords('marketing.sms')
  );
})
</script>

<template>
  <div class="mailings">
    <Card title="Draft">
      <template v-slot:header>
        <div class="flex gap-2">
          <IconPlus />
          <IconMoreVert />
        </div>
      </template>

      <template v-slot:body>
        <ViewMailingDraft :mailings="mailings.filter(mailing => mailing.state === 'draft')" />
      </template>
    </Card>

    <Card title="InQueue">
      <template v-slot:header>
        <div class="operations">
          <IconPlus />
        </div>
      </template>

      <template v-slot:body>
        <ViewMailingInQueue :mailings="mailings.filter(mailing => mailing.state === 'in_queue')" />
      </template>
    </Card>

    <Card title="Sent">
      <template v-slot:header>
        <div class="operations">
          <IconPlus />
        </div>
      </template>

      <template v-slot:body>
        <ViewMailingSent :mailings="mailings.filter(mailing => mailing.state === 'done')" />
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
