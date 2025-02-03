<script setup lang="ts">
import ListWithClick from '~/components/items/ListWithClick.vue';
import type { Marketing } from '~/hooks/marketing';
import { OdooUserData } from '~/hooks/odoo/data';
import type { ModelQueryBuilder } from '~/hooks/odoo/wrapper';

interface Props {
  modelQueryBuilder: ModelQueryBuilder<Marketing.Sms>,
  marketingCampaignId: number
}

const authStore = useAuthStore();

const { modelQueryBuilder, marketingCampaignId } = defineProps<Props>();

const emit = defineEmits<{
  recordCreate: [sms: Marketing.Sms]
}>()

const formSmsName = ref<string>('');
const formSmsDescription = ref<string>('');
const formSmsBody = ref<string>('');
const formSmsDailyCount = ref<number>(10);
const formSmsMaxLength = ref<number>(256);

// textarea
const textarea = ref<string>('');
const maxChars = 200;
const remainingChars = computed(() => maxChars - textarea.value.length);

const showTendina = ref<boolean>(false);


const contacts = ref<any[]>([]);
const selectedContacts = ref<any[]>([]);
const remainingContacts = computed(() => {
  return contacts.value.filter(item => !selectedContacts.value.includes(item));
});

const selectedUsers = ref<OdooUserData[]>([]);

const createSms = async (name: string, description: string, body: string, partner_ids: number[]) => {
  console.log(`creating a new sms named ${name}`);

  const foundRecords = await modelQueryBuilder.searchRecords([['name', '=', name]]);

  if (foundRecords.length > 0) {
    console.error(`There is already a sms with the body ${body}`);
    return
  }

  const recordBody = {
    name: name,
    description: description,
    body: body,
    partner_ids: partner_ids,
    marketing_campaign_id: marketingCampaignId
  };

  const recordId = await modelQueryBuilder.createRecord(recordBody);

  console.log('createSms result:', recordId);

  const newSms: Marketing.Sms = (await modelQueryBuilder.searchReadRecords([['id', '=', recordId]]))[0];

  if (newSms === undefined) {
    console.error('For some reasons the just created record is not retrieved');
    return;
  } else {
    emit('recordCreate', newSms);
  }
}

// Lista di esempio degli elementi
const myItems = ref([
  { id: 1, name: 'Elemento 1' },
  { id: 2, name: 'Elemento 2' },
  { id: 3, name: 'Elemento 3' }
])

// Funzione di gestione del click, che riceve l'elemento cliccato
function onItemClick(item: any) {
  console.log('Hai cliccato:', item)
}

onMounted(async() => {
  contacts.value = await authStore.odooUser!.searchReadRecords<any>('res.partner');
})
</script>

<template>
  <div class="view creation sms">
    <form>
      <div class="option">
        <span class="key">Name <span class="obbligatory">*</span></span>
        <input v-model="formSmsName"  class="value" type="text" placeholder="compile this field" />
      </div>

      <div class="option">
        <span class="key">Description <span class="obbligatory">*</span></span>
        <input v-model="formSmsDescription" class="value" type="text" placeholder="compile this field" />
      </div>

      <div class="option body">
        <span class="key">Body <span class="obbligatory">*</span></span>
        <textarea
          v-model="formSmsBody"
          class="value"
          name="text"
          id="text"
          rows="4"
          :maxlength="maxChars"
        >
          {{ textarea }}
        </textarea>
      </div>

      <div class="inline">
        <div class="option contacts">
          <span class="key">Contacts</span>

          <ListWithClick v-if="contacts" :items="remainingContacts" @item-click="onItemClick" class="value">
            <!-- Definiamo il template per ogni elemento utilizzando lo slot "item" -->
            <template #item="{ item, index }">
              <span class="contact" @mousedown.left="() => { selectedContacts.push(item); }"><strong>{{ index + 1 }}.</strong> {{ item.name }}</span>
            </template>
          </ListWithClick>
        </div>

        <div class="option selected-contacts">
          <span class="key">Selected Contacts</span>
          <div class="value">
            <span v-for="contact in selectedContacts"
              @mousedown.left="() => {
                const indexToRemove = contacts.findIndex(foundContact => foundContact.id === contact.id);

                if (indexToRemove !== -1) {
                  selectedContacts.splice(indexToRemove, 1);
                }
              }"
            >
              {{ contact.display_name }}
            </span>
          </div>
        </div>
      </div>
    </form>

    <div class="footer">
      <span @mousedown="async () => await createSms(formSmsName, formSmsDescription, formSmsBody, selectedContacts.map(contact => contact.id))">Create</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view.creation.sms {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;

  > form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    > .option {
      position: relative;

      display: flex;
      flex-direction: column;
      gap: 4px;

      > .key {
        font-size: 13px;
        font-weight: 500;

        text-transform: capitalize;
        color: rgb(83, 83, 83);

        > .obbligatory {
          color: red;
        }
      }

      > .value {
        outline: none;

        padding-left: .325rem;
        padding-right: .325rem;

        border-radius: 6px;
        border: solid 1px rgb(233, 233, 233);

        font-size: 16px;
        font-weight: 400;

        color: rgb(60, 60, 60);

        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px, rgba(0, 0, 0, 0.04) 0px 1px 0px;

        &::placeholder {
          font-size: 13px;
          color: rgb(181, 181, 181);
        }
      }

      &.body {
          > textarea {
            // Impedisci il resize che, dopo una modifica da parte dell'utente,
            // potrebbe compromettere l'auto-sizing
            resize: none;
            // Firefox mostra la scrollbar in caso di crescita, la nascondiamo così
            overflow: hidden;

            // Stili identici richiesti (come per ::after)
            //border: 1px solid black;
            padding: 0.5rem;
            font: inherit;
            grid-area: 1 / 1 / 2 / 2;
          }
      }

      &.contacts {
        > .tendina {
          z-index: 1;
          position: absolute;
          top: 100%;

          overflow-y: auto;

          display: flex;
          flex-direction: column;

          max-height: 100px;
          padding: .325rem;
          background-color: white;
        }
      }

      &.scheduled {

      }
    }

    > .inline {
      height: 100%;

      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
      column-gap: 10%;

      > .option {
        position: relative;

        display: flex;
        flex-direction: column;
        gap: 4px;

        > .key {
          font-size: 13px;
          font-weight: 500;

          text-transform: capitalize;
          color: rgb(83, 83, 83);

          > .obbligatory {
            color: red;
          }
        }

        > .value {
          outline: none;

          border-radius: 6px;
          border: solid 1px rgb(233, 233, 233);

          font-size: 16px;
          font-weight: 400;

          color: rgb(60, 60, 60);
          background-color: white;;
          box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px, rgba(0, 0, 0, 0.04) 0px 1px 0px;

          &::placeholder {
            font-size: 13px;
            color: rgb(181, 181, 181);
          }

          > .contact {
            padding-top: .425rem;
            padding-bottom: .425rem;
            padding-left: .325rem;
            padding-right: .325rem;

            font-size: 13px;

            cursor: pointer;

            &:hover {
              background-color: rgba(0, 0, 0, 0.03);
            }
          }
        }

        &.selected-contacts {
          display: flex;
          flex-direction: column;
          
          > .value {
            display: flex;
            flex-direction: column;
            min-height: 140px;

            > span {
              padding-top: .325rem;
              padding-bottom: .325rem;
              padding-left: .325rem;
              padding-right: .325rem;

              font-size: 13px;
            }
          }
        }
      }
    }
  }

  > .footer {
    span {
      color: green;
    }
  }
}
</style>