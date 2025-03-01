<script setup lang="ts">
import CardMarketingDraft from '~/components/cards/marketing/CardMarketingSmsDraft.vue';
import type { Marketing } from '~/hooks/marketing';
import type { ModelQueryBuilder } from '~/hooks/odoo/wrapper';

interface Props {
  modelQueryBuilder: ModelQueryBuilder<Marketing.Sms>,
  messages: Marketing.Sms[]
}

const { modelQueryBuilder, messages } = defineProps<Props>();

const emit = defineEmits<{
  recordScheduled: [oldSms: Marketing.Sms, newSms: Marketing.Sms, date: Date],
  recordDelete: [sms: Marketing.Sms]
}>()
</script>

<template>
  <div v-if="messages" class="drafts">
    <TransitionGroup name="list">
      <CardMarketingDraft
        v-for="sms in messages"
        :key="sms.id"
        :model-query-builder="modelQueryBuilder"
        :sms="sms"
        @record-scheduled="(oldSms, newSms, date) => emit('recordScheduled', oldSms, newSms, date)"
        @record-delete="(record) => emit('recordDelete', record)"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.drafts {
  z-index: 11;

  display: grid;
  flex-direction: column;
  gap: 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}


.list-enter-active {
  animation: bounce-in 0.5s;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all .5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/*
    ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly.
*/
.list-leave-active {
  position: absolute;
}
</style>
