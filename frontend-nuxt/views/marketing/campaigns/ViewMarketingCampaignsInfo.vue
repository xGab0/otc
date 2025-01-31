<script setup lang="ts">
import type { Marketing } from '~/hooks/marketing';
import type { ModelQueryBuilder } from '~/hooks/odoo/wrapper';

interface Props {
  modelQueryBuilder: ModelQueryBuilder<Marketing.Campaign>,
  viewingRecord: Marketing.Campaign
}

const authStore = useAuthStore();

const { modelQueryBuilder, viewingRecord } = defineProps<Props>();

const emit = defineEmits<{
  recordModify: [campaign: Marketing.Campaign],
  recordDelete: [id: number]
}>()

const formName = ref<string>(viewingRecord.name);
const formSmsDailyCount = ref<number>(viewingRecord.sms_daily_count);
const formSmsMaxLength = ref<number>(viewingRecord.sms_max_length);

const modifyPlan = async (name: string, smsDailyCount: number, smsMaxLength: number) => {
  console.log(`modifying a group named ${name}`);

  const foundRecords = await modelQueryBuilder.searchRecords([['name', '=', name]]);

  if (foundRecords.length > 0) {
    console.error(`There is already a plan with the name ${name}`);
    return
  }

  const recordBody = {
    name: name,
    sms_daily_count: smsDailyCount,
    sms_max_length: smsMaxLength
  };

  const recordId = await modelQueryBuilder.createRecord(recordBody);

  console.log('createPlan result:', recordId);

  const newPlan = (await modelQueryBuilder.searchReadRecords<Marketing.Plan>([['id', '=', recordId]]))[0];

  emit('recordModify', newPlan);
}

const deletePlan = async (id: number) => {
  const foundRecords = await authStore.odooUser!.searchRecords('marketing.group', [['marketing_plan_id', '=', id]]);

  if (foundRecords.length > 0) {
    console.error(`You can't delete this plan because it's assigned to some marketing groups ${foundRecords.length}`);
    return
  }

  const deleted = await modelQueryBuilder.deleteRecord(id);

  if (deleted) {
    console.log('deletePlan result:', deleted);
    emit('recordDelete', id);
  }
}
</script>

<template>
  <div class="creation">
    <form>
      <div class="option">
        <span class="key">Id</span>
        <span class="value">{{ viewingRecord.id }}</span>
      </div>

      <div class="option">
        <span class="key">Name</span>
        <input class="value" v-model="formName" type="text" placeholder="compile this field" />
      </div>

      <div class="option">
        <span class="key">SMS daily count</span>
        <input class="value" v-model="formSmsDailyCount" type="number" placeholder="compile this field" />
      </div>

      <div class="option">
        <span class="key">SMS max length</span>
        <input class="value" v-model="formSmsMaxLength" type="number" placeholder="compile this field" />
      </div>
    </form>

    <div class="footer">
      <span class="modify" @mousedown="async () => await modifyPlan(formName, formSmsDailyCount, formSmsMaxLength)">Modify</span>
      <span class="delete" @mousedown="async () => await deletePlan(viewingRecord.id)">Delete</span>
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

      > .key {
        font-size: 13px;
        font-weight: 500;
        color: rgb(83, 83, 83);

        > .obbligatory {
          color: red;
        }
      }

      > .value {
        outline: none;

        padding-left: .325rem;
        padding-right: .325rem;

        font-size: 16px;
        font-weight: 400;

        background-color: white;
      }
    }
  }

  > .footer {
    display: flex;
    justify-content: space-between;

    > .modify {
      color: green;
    }

    > .delete {
      color: darkred;
    }
  }
}
</style>