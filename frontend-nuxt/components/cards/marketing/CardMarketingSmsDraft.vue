<script setup lang="ts">
import BadgeMailingType from '~/components/badges/mailing/BadgeMailingType.vue';
import ButtonOdooUser from '~/components/buttons/ButtonOdooUser.vue';
import IconCalendar from '~/components/icons/IconCalendar.vue';
import IconGrid from '~/components/icons/IconGrid.vue';
import IconMoreVert from '~/components/icons/IconMoreVert.vue';
import IconTime from '~/components/icons/IconTime.vue';
import IconTrash from '~/components/icons/IconTrash.vue';
import ItemMailingName from '~/components/items/mailing/ItemMailingName.vue';
import WidgetCalendar from '~/components/widget/WidgetCalendar.vue';
import type { Marketing } from '~/hooks/marketing';

function formatDateToText(date: Date): [month: string, day: string] {
  const formatter = new Intl.DateTimeFormat('it-IT', {
      month: 'short',
      day: 'numeric'
  });

  const formattedDate = formatter.format(date);

  const [day, month] = formattedDate.split(' ');
  
  return [month, day];
}

const router = useRouter();

const { sms } = defineProps<{ sms: Marketing.Sms }>();
const date = ref<[month: string, day: string]>(formatDateToText(new Date(sms.create_date)));

const showContextMenu = ref<boolean>(false);
const showScheduleMenu = ref<boolean>(false);
</script>

<template>
  <div class="draft">
    <div class="header">
      <div class="data">
        <BadgeMailingType type="sms" />
        <ItemMailingName type="sms" :name="sms.name" />
      </div>

      <IconMoreVert :width="20" :height="20" class="icon" @mousedown.left="() => showContextMenu = true"/>
    </div>
    
    <div class="body">
      <span>{{ sms.body }}</span>
    </div>

    <div class="separator" />

    <div class="footer">
      <div class="date">
        <IconCalendar :width="16" :height="16" fill_0="rgb(80, 80, 80)" fill_1="rgb(69, 69, 69)" />
        <span class="month">{{ date[0] }}</span>
        <span class="day">{{ date[1] }}</span>
      </div>

      <ButtonOdooUser :user-id="sms.write_uid" />
    </div>

    <div v-if="showContextMenu" class="context-menu">
      <div class="actions">
        <div @mousedown="() => router.push(`/marketing/mailing/${sms.id}`)">
          <IconGrid :width="20" :height="20" />
          <span>modify</span>
        </div>

        <div @mousedown.left="() => showScheduleMenu = !showScheduleMenu">
          <IconTime :width="20" :height="20"  />
          <span>schedule</span>

          <div v-if="showContextMenu" class="schedule-menu">
            <WidgetCalendar :attendances="[]" lang="it-IT" />
            <span>schedule</span>
          </div>
        </div>

        <div>
          <IconTrash :width="20" :height="20" fill_0="darkred" fill_1="darkred" fill_2="darkred" />
          <span>delete</span>
        </div>
      </div>

      <span @mousedown="() => showContextMenu = false">close</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.schedule-menu {
  position: absolute;
  left: 110%;
  top: 0px;

  padding: .475rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: brightness(200%) blur(4px);
}

.context-menu {
  position: absolute;
  //left: 100%; /* Sposta il div completamente a destra del genitore */
  right: 0;
  top: 0px;
  height: 100%;
  //background-color: #ff0000;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  text-align: right;

  padding-bottom: .475rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3px);

  > span {
    align-self: center;
    font-size: 14px;
    font-weight: 500;
    color: rgb(179, 0, 0);

    cursor: pointer;
  }

  .actions {
    > div {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 6px;

      padding: .375rem;

      border-radius: 12px;
      text-align: left;

      cursor: pointer;

      > span {
        width: 100%;
        font-size: 14px;
        font-weight: 400;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
    }
  }
}

.draft {
  position: relative;
  min-width: 200px;

  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: .675rem;
  border-radius: 12px;

  outline: dashed 1px rgb(219, 219, 219);
  background-color: white;

  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    > .data {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    > .icon {
      opacity: 0;
      transition: opacity .2s ease-in-out;
      cursor: pointer;
    }
  }

  > .body {
    max-width: 96%;

    line-height: normal;
    text-wrap: wrap;
    text-align: left;

    span {
      font-size: 14px;
      color: rgb(75, 75, 75);
    }
  }

  > .separator {
    border-top-style: dashed;
    border-top-width: 2px;
    border-top-color: rgb(233, 233, 233);
  }

  > .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;

    span {
      color: red;
    }

    > .date {
      display: flex;
      align-items: center;
      gap: 4px;

      padding-left: .175rem;
      padding-right: .375rem;
      padding-top: .075rem;
      padding-bottom: .075rem;

      border-radius: 6px;
      border: solid 1px rgb(233, 233, 233);

      > .month {
        font-size: 12px;
        font-weight: 500;
        text-transform: capitalize;
        color: rgb(80, 80, 80);
      }

      > .day {
        font-size: 12px;
        font-weight: 500;
        color: rgb(80, 80, 80);
      }
    }
  }

  &:hover {
    > .header {
      > .icon {
        opacity: 1;
      }
    }
  }
}
</style>
