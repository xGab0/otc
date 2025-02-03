<script setup lang="ts">
import type { Marketing } from '~/hooks/marketing';
import type { ModelQueryBuilder } from '~/hooks/odoo/wrapper';

interface Props {
  modelQueryBuilder: ModelQueryBuilder<Marketing.Plan>
}

const { modelQueryBuilder } = defineProps<Props>();

const emit = defineEmits<{
  recordCreate: [plan: Marketing.Plan]
}>()

const formName = ref<string>('');
const formSmsMaxCount = ref<number>(100);
const formSmsMaxDailyCount = ref<number>(10);
const formSmsMaxLength = ref<number>(256);

const createPlan = async (name: string, smsMaxCount: number, smsMaxDailyCount: number, smsMaxLength: number) => {
  console.log(`creating a new plan named ${name}`);

  const foundRecords = await modelQueryBuilder.searchRecords([['name', '=', name]]);

  if (foundRecords.length > 0) {
    console.error(`There is already a plan with the name ${name}`);
    return
  }

  const recordBody = {
    name: name,
    sms_max_count: smsMaxCount,
    sms_max_daily_count: smsMaxDailyCount,
    sms_max_length: smsMaxLength
  };

  const recordId = await modelQueryBuilder.createRecord(recordBody);

  console.log('createPlan result:', recordId);

  const newPlan = (await modelQueryBuilder.searchReadRecords<Marketing.Plan>([['id', '=', recordId]]))[0];

  emit('recordCreate', newPlan);
}
</script>

<template>
  <div class="creation">
    <form>
      <div class="option">
        <span>Name <span class="obbligatory">*</span></span>
        <input v-model="formName" type="text" placeholder="compile this field" />
      </div>

      <div class="option">
        <span>SMS max count <span class="obbligatory">*</span></span>
        <input v-model="formSmsMaxCount" type="number" placeholder="compile this field" />
      </div>

      <div class="option">
        <span>SMS max daily count <span class="obbligatory">*</span></span>
        <input v-model="formSmsMaxDailyCount" type="number" placeholder="compile this field" />
      </div>

      <div class="option">
        <span>SMS max length <span class="obbligatory">*</span></span>
        <input v-model="formSmsMaxLength" type="number" placeholder="compile this field" />
      </div>
    </form>

    <div class="footer">
      <span @mousedown="async () => await createPlan(formName, formSmsMaxCount, formSmsMaxDailyCount, formSmsMaxLength)">Create</span>
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
      display: flex;
      flex-direction: column;
      gap: 4px;

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