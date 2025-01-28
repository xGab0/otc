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

const title = ref<string>('');

// textarea
const textarea = ref<string>('');
const maxChars = 200; // Imposta qui il tuo limite massimo
const remainingChars = computed(() => maxChars - textarea.value.length);

onMounted(async () => {
  mailing.value = await authStore.odooUser!.readRecord('mailing.mailing', Number(route.params.id));

  if (mailing.value === undefined) return;

  title.value = mailing.value.sms_subject;
  textarea.value = mailing.value.body_plaintext;

  console.log(`marketing/sms/${route.params.id}`);
  console.log(mailing.value);
})
</script>

<template>
  <div v-if="mailing" class="card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <span class="subtitle">Manage this mailing</span>
    </div>

    <div class="body">
      <form>
        <div class="field">
          <span>Title</span>
          <input v-model="title" type="text" />
        </div>

        <div class="field">
          <span>Message, caratteri rimanenti: {{ remainingChars }}</span>
          <div class="grow-wrap">
            <textarea
              v-model="textarea"
              name="text"
              id="text"
              rows="4"
              :maxlength="maxChars"
            >
              {{ textarea }}
            </textarea>
          </div>
        </div>
      </form>

      <div>
        <!--div class="flex flex-col">
          <span>Title</span>
          <input v-model="title" type="text" />
        </div>

        <div class="flex flex-col">
          <span>Message</span>
          <input v-model="textarea" type="textfield" />
        </div-->
      </div>
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
  height: 100%;
  padding: .575rem .775rem .875rem .775rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  border-radius: 20px;
  //background-color: white;
  background-color: rgb(242, 242, 242);

  border: solid 1px rgb(234, 234, 234);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;

  > .header {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 20px;
      font-weight: 500;
      color: rgb(71, 71, 71);
    }

    .subtitle {
      font-size: 14px;
      font-weight: 500;
      color: rgb(113, 113, 113);
    }
  }

  > .body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 100px;

    > form {
      display: flex;
      flex-direction: column;
      gap: 14px;

      > .field {
        display: flex;
        flex-direction: column;
        gap: 2px;

        > input {
          padding: .325rem;
          border-radius: 12px;
          border: solid 1px rgb(228, 228, 228);
          outline: none;

          font-size: 14px;
          color: rgb(75, 75, 75);
        }

        textarea {
          padding: .325rem;
          border-radius: 12px;
          border: solid 1px rgb(228, 228, 228);
          outline: none;

          font-size: 14px;
          color: rgb(75, 75, 75);
        }

        span {
          font-size: 15px;
          font-weight: 500;
          color: rgb(54, 54, 54);
        }
      }
    }
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



.grow-wrap {
  /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
  display: grid;
}
.grow-wrap::after {
  /* Note the weird space! Needed to preventy jumpy behavior */
  content: attr(data-replicated-value) " ";

  /* This is how textarea text behaves */
  white-space: pre-wrap;

  /* Hidden from view, clicks, and screen readers */
  visibility: hidden;
}
.grow-wrap > textarea {
  /* You could leave this, but after a user resizes, then it ruins the auto sizing */
  resize: none;

  /* Firefox shows scrollbar on growth, you can hide like this. */
  //overflow: hidden;

  outline: none;
}
.grow-wrap > textarea,
.grow-wrap::after {
  /* Identical styling required!! */
  border: 1px solid rgb(174, 174, 174);
  //padding: 0.5rem;
  font: inherit;

  /* Place on top of each other */
  grid-area: 1 / 1 / 2 / 2;
}
</style>
