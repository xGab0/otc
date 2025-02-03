<script setup lang="ts">
import type { Marketing } from '~/hooks/marketing';
import type { ModelQueryBuilder } from '~/hooks/odoo/wrapper';

interface Props {
  modelQueryBuilder: ModelQueryBuilder<Marketing.Campaign>
}

const authStore = useAuthStore();

const { modelQueryBuilder } = defineProps<Props>();

const emit = defineEmits<{
  recordCreate: [campaign: Marketing.Campaign]
}>()

const formName = ref<string>('');
const formSmsDailyCount = ref<number>(10);
const formSmsMaxLength = ref<number>(256);

const showTendina = ref<boolean>(false);
const groups = ref<Marketing.Group[]>([]);
const selectedGroup = ref<Marketing.Group>();

const createCampaign = async (name: string, marketing_group_id: number) => {
  console.log(`creating a new campaign named ${name}`);

  const foundRecords = await modelQueryBuilder.searchRecords([['name', '=', name]]);

  if (foundRecords.length > 0) {
    console.error(`There is already a campaign with the name ${name}`);
    return
  }

  const recordBody = {
    name: name,
    marketing_group_id: marketing_group_id
  };

  const recordId = await modelQueryBuilder.createRecord(recordBody);

  console.log('createCampaign result:', recordId);

  const newCampaign: Marketing.Campaign = (await modelQueryBuilder.searchReadRecords([['id', '=', recordId]]))[0];

  if (newCampaign === undefined) {
    console.error('For some reasons the just created record is not retrieved');
    return;
  } else {
    emit('recordCreate', newCampaign);
  }
}

onMounted(async() => {
  groups.value = await authStore.odooUser!.searchReadRecords<Marketing.Group>('marketing.group');
})
</script>

<template>
  <div class="creation">
    <form>
      <div class="option">
        <span>Name <span class="obbligatory">*</span></span>
        <input v-model="formName" type="text" placeholder="compile this field" />
      </div>

      <div class="option plan">
        <span>Group <span class="obbligatory">*</span></span> {{ selectedGroup }}
        <span tabindex="1" @focus="showTendina = true" @blur="showTendina = false" class="selector">
          {{ selectedGroup === undefined ? 'select a group' : selectedGroup.name }}
        </span>
        <div v-show="showTendina" class="tendina">
          <span v-for="group in groups" @mousedown="() => selectedGroup = group">
            {{ group.name }}
          </span>
        </div>
      </div>

      <div class="option sms">
        <span>SMS <span class="obbligatory">*</span></span>
        <input v-model="formName" type="text" placeholder="compile this field" />
      </div>
    </form>

    <div class="footer">
      <span
        v-if="formName && selectedGroup"
        @mousedown="async () => await createCampaign(formName, selectedGroup!.id)"
      >
        Create
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.creation {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 34px;

  > form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    > .option {
      position: relative;

      display: flex;
      flex-direction: column;
      gap: 4px;

      &.members {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        > .selected {
          > .elements {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            > .element {
              width: fit-content;

              display: flex;
              align-items: center;
              gap: 6px;

              padding-left: .425rem;
              padding-right: .425rem;
              padding-top: .125rem;
              padding-bottom: .125rem;

              border-radius: 12px;
              border: dashed 1px rgb(212, 212, 212);

              background-color: white;

              cursor: pointer;
            }
          }
        }

        > .available {
          > .elements {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            > .element {
              width: fit-content;

              display: flex;
              align-items: center;
              gap: 6px;

              padding-left: .425rem;
              padding-right: .425rem;
              padding-top: .125rem;
              padding-bottom: .125rem;

              border-radius: 12px;
              border: dashed 1px rgb(212, 212, 212);

              background-color: white;

              cursor: pointer;
            }
          }
        }
      }

      &.plan {
        > .tendina {
          z-index: 1;
          position: absolute;
          top: 100%;

          width: 100%;

          display: flex;
          flex-direction: column;

          padding: .325rem;

          background-color: white;
        }
      }

      > .selector {
        padding-left: .325rem;
        padding-right: .325rem;

        font-size: 16px;
        font-weight: 400;
        text-align: left;

        background-color: white;
      }

      > span {
        font-size: 13px;
        font-weight: 500;
        color: rgb(83, 83, 83);

        > .obbligatory {
          color: red;
        }
      }

      > input {
        outline: none;

        padding-left: .325rem;
        padding-right: .325rem;

        font-size: 16px;
        font-weight: 400;
        text-align: left;

        background-color: white;
      }

      > select {
        background-color: white;
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