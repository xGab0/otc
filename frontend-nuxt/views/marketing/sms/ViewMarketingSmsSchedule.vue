<script setup lang="ts">
import IconTime from '~/components/icons/IconTime.vue';
import type { Marketing } from '~/hooks/marketing';
import type { ModelQueryBuilder } from '~/hooks/odoo/wrapper';

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

interface Props {
  modelQueryBuilder: ModelQueryBuilder<Marketing.Sms>,
  marketingSms: Marketing.Sms
}

const { modelQueryBuilder, marketingSms } = defineProps<Props>();

const emit = defineEmits<{
  recordScheduled: [oldSms: Marketing.Sms, newSms: Marketing.Sms, date: Date],
  recordModified: [sms: Marketing.Sms]
}>()

const selectedDay = ref<Date>();

const schedule = async (marketingSms: Marketing.Sms) => {
  console.log(`scheduling a new sms (${marketingSms.id})`);

  if (selectedDay.value === undefined) {
    console.error('A date must be selected for scheduling the sms');
    return;
  }

  const recordBody = {
    scheduled_date: formatDate(selectedDay.value),
    status: 'scheduled'
  };

  const result = await modelQueryBuilder.writeRecord(marketingSms.id, recordBody);

  console.log('scheduleSms result:', result);

  const newSms: Marketing.Sms = (await modelQueryBuilder.searchReadRecords([['id', '=', marketingSms.id]]))[0];

  if (newSms === undefined) {
    console.error('For some reasons the just modified record is not retrieved');
    return;
  } else {
    emit('recordModified', newSms);
    emit('recordScheduled', marketingSms, newSms, selectedDay.value);
  }
}
</script>

<template>
  <div class="schedule-menu">
    <WidgetCalendar
      :attendances="[]"
      lang="it-IT"
      @day-selected="(day, index) => selectedDay = day"
    />

    <div class="button" @mousedown.left="async () => await schedule(marketingSms)">
      <IconTime :size="16" fill="green" />
      <span>schedule</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.schedule-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: .475rem;
  border-radius: 12px;
  outline: solid 1px rgb(219, 219, 219);

  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: brightness(200%) blur(4px);

  > .button {
    width: fit-content;

    display: flex;
    align-items: center;
    gap: 6px;

    padding-left: .275rem;
    padding-right: .275rem;
    padding-top: .125rem;
    padding-bottom: .125rem;

    border-radius: 6px;
    background-color: rgb(195, 255, 200);

    > span {
      font-size: 14px;
      font-weight: 500;
      color: rgb(40, 141, 57);
    }
  }
}
</style>