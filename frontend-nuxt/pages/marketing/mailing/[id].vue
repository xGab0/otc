<script setup lang="ts">
import type { Mailing } from '~/hooks/mailing';


definePageMeta({
  middleware: 'auth',
  layout: 'main'
});

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const mailing = ref<Mailing>();

const title = ref<string>();
const textfield = ref<string>();

onMounted(async () => {
  mailing.value = await authStore.odooUser!.readRecord('mailing.mailing', Number(route.params.id));

  if (mailing.value === undefined) return;

  title.value = mailing.value.sms_subject;
  textfield.value = mailing.value.body_plaintext;

  console.log(`marketing/sms/${route.params.id}`);
  console.log(mailing.value);
})
</script>

<template>
  <div v-if="mailing" class="card">
    <div class="flex flex-col">
      <span>Title</span>
      <input v-model="title" type="text" />
    </div>

    <div class="flex flex-col">
      <span>Message</span>
      <input v-model="textfield" type="textfield" />
    </div>

    <div class="footer">
      <span class="save">Save</span>
      <span class="discard" @mousedown="() => router.push(`/marketing/dashboard`)">Discard</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding: .575rem .775rem .875rem .775rem;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 20px;
  //background-color: white;
  background-color: rgb(242, 242, 242);

  border: solid 1px rgb(234, 234, 234);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;

  .title {
    font-size: 20px;
    font-weight: 500;
    color: rgb(71, 71, 71);
  }
}

.footer {
  > .save {
    color: green
  }

  > .discard {
    color: red;
  }
}
</style>
