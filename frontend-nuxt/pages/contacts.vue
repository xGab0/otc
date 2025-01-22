<script setup lang="ts">
import CardAttendances from '~/components/cards/CardAttendances.vue';
import CardContact from '~/components/cards/CardContacts.vue';
import CardTasks from '~/components/cards/CardTasks.vue';
import type { OdooUserData } from '~/hooks/odoo/data';
import ViewContacts from '~/views/ViewContacts.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'main',
  /*pageTransition: {
    name: 'rotate'
  }*/
});

const router = useRouter();
const authStore = useAuthStore();
const userDataStore = useUserDataStore();
const userData = ref<OdooUserData>();
const partners = ref<any[]>();

onMounted(async () => {
  partners.value = await authStore.odooUser!.searchReadRecord('res.partner');

  console.log('Contacts | partners');
  console.log(partners.value);
})
</script>

<template>
  <div class="sos" v-if="partners">
    <span class="title">Contacts</span>

    <div class="contacts">
      <div v-for="partner in partners" class="partner">
        <div class="header">
          <AvatarBase64 size="32px" color="rgb(240, 240, 255)" :name="partner.display_name" :image-base64="partner.avatar_1920" />
          <div class="info">
            <span>{{ partner.display_name }}</span>
            <span>{{ partner.email }}</span>
          </div>
        </div>

        <div class="content">
          <span>More</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sos {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 12px 6px 6px 6px;
  border-radius: 24px;
  background-color: rgb(242, 242, 242);

  .title {
    margin-left: 16px;
    font-size: 30px;
    font-weight: 500;
  }
}

.contacts {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 6px;

  .partner {
    display: flex;
    flex-direction: column;
    gap: 20px;

    padding: 16px 18px 16px 18px;

    border-radius: 24px;
    background-color: white;

    .header {
      display: flex;
      align-items: center;
      gap: 16px;

      .info {
        display: flex;
        flex-direction: column;

      }
    }

    .content {
      display: flex;
      justify-content: right;
    }
  }
}
</style>