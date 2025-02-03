<script setup lang="ts">
import IconMore from '~/components/icons/IconMore.vue';
import type { Mailing } from '~/hooks/mailing';
import type { Marketing } from '~/hooks/marketing';

const { campaigns } = defineProps<{ campaigns: Marketing.Campaign[] }>();

const router = useRouter();

const emit = defineEmits<{
  recordView: [plan: Marketing.Campaign]
}>()


const authStore = useAuthStore();
const userDataStore = useUserDataStore();


onMounted(async () => {
})
</script>

<template>
  <div v-if="campaigns" class="table">
    <div class="header">
      <div class="column selection">
        <input type="checkbox" />
      </div>

      <div class="column data">
        <span>Name</span>
      </div>

      <div class="column data">
        <span>Group</span>
      </div>

      <div class="column data">
        <span>SMS</span>
      </div>

      <div class="column actions">
      </div>
    </div>

    <div class="body">
      <div v-for="(campaign, index) in campaigns" :key="index" class="row">
        <div class="column selection">
          <input type="checkbox" />
        </div>

        <div class="column data">
          {{ campaign.name }}
        </div>

        <div class="column data">
          {{ campaign.marketing_group_id[1] }}
        </div>

        <div class="column data">
          {{ campaign.sms_ids.length }}
        </div>

        <div class="column actions">
          <span @mousedown="() => router.push(`/marketing/campaign/${campaign.id}`)">open</span>
          <IconMore @mousedown="() => emit('recordView', campaign)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-direction: column;
  gap: 6px;

  > .header {
    display: flex;
    align-items: end;
    padding-left: .675rem;
    padding-right: .675rem;

    > .column {
      font-size: 13px;
      font-weight: 500;
      color: rgb(75, 75, 75);

      &.selection {
        width: 12%;
        min-width: 20px;
      }
      &.data {
        width: 100%;
        text-align: left;
      }
      &.actions {
        width: 10%;
      }
    }
  }

  > .body {
    display: flex;
    flex-direction: column;
    gap: 2px;

    border-radius: 12px;
    //border: solid 1px rgb(219, 219, 219);

    > .row {
      width: 100%;
      display: flex;
      //flex-direction: column;
      //gap: 6px;

      padding: .675rem;
      
      //background-color: rgb(242, 242, 242);
      background-color: white;

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }

      > .column {
        &.selection {
          width: 12%;
          min-width: 20px;
        }
        &.data {
          width: 100%;
          text-align: left;
        }
        &.actions {
          width: 10%;
        }
      }
    }
  }
}
</style>
