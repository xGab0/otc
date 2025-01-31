<script setup lang="ts">
import type { Marketing } from '~/hooks/marketing';
import type { ModelQueryBuilder } from '~/hooks/odoo/wrapper';

interface Props {
  modelQueryBuilder: ModelQueryBuilder<Marketing.Group>,
  viewingRecord: Marketing.Group
}

const authStore = useAuthStore();

const { modelQueryBuilder, viewingRecord } = defineProps<Props>();

const emit = defineEmits<{
  recordModify: [group: Marketing.Group],
  recordDelete: [id: number]
}>()

const originalName = computed(() => viewingRecord.name)
const originalPlan =  computed(() => viewingRecord.marketing_plan_id)
const originalMembers = computed(() => viewingRecord.member_ids)

const formName = ref<string>(viewingRecord.name);
const formPlanId = ref<any>(viewingRecord.marketing_plan_id);
const formMembersIds = ref<any>(viewingRecord.members_ids);

const showTendina = ref<boolean>(false);

const plans = ref<Marketing.Plan[]>([]);
const selectedPlan = ref<Marketing.Plan>();

const users = ref<any[]>([]);
const availableUsers = computed(() => users.value.filter(user => !selectedMembers.value.some(selected => selected.id === user.id)));

const selectedMembers = ref<any[]>([]);
const selectedIds = computed(() => selectedMembers.value.map(member => member.id));

const modifyPlan = async (name: string, marketing_plan_id: any, members_ids: any) => {
  console.log(`modifying a group named ${name}`);

  const foundRecords = await modelQueryBuilder.searchRecords([['name', '=', name]]);

  if (foundRecords.length > 0) {
    console.error(`There is already a group with the name ${name}`);
    return
  }

  const recordBody = {
    name: name,
    marketing_plan_id: marketing_plan_id,
    members_ids: members_ids
  };

  const recordId = await modelQueryBuilder.createRecord(recordBody);

  console.log('createPlan result:', recordId);

  const newGroup = (await modelQueryBuilder.searchReadRecords<Marketing.Group>([['id', '=', recordId]]))[0];

  emit('recordModify', newGroup);
}

const deletePlan = async (id: number) => {
  //const foundRecords = await authStore.odooUser!.searchRecords('marketing.group', [['marketing_plan_id', '=', id]]);

  //if (foundRecords.length > 0) {
  //  console.error(`You can't delete this group because it's assigned to some marketing groups ${foundRecords.length}`);
  //  return
  //}

  const deleted = await modelQueryBuilder.deleteRecord(id);

  if (deleted) {
    console.log('deleteGroup result:', deleted);
    emit('recordDelete', id);
  }
}

watch(() => viewingRecord, (newRecord, oldRecord) => {
  formName.value = newRecord.name,
  selectedPlan.value = newRecord.marketing_plan_id;
  selectedMembers.value = newRecord.member_ids;
});

onMounted(async() => {
  plans.value = await authStore.odooUser!.searchReadRecords<Marketing.Plan>('marketing.plan');
  users.value = await authStore.odooUser!.searchReadRecords('res.users');

  console.log('originalMembers:', originalMembers.value);
})
</script>

<template>
  <div class="creation">
    <form>
      <div class="option">
        <span class="key">Id</span>
        <span class="value">{{ viewingRecord.id }}</span>
      </div>

      <div class="option name">
        <span class="key">Name <span v-show="originalName != formName" class="changed">(changed)</span></span>
        <input tabindex="0" v-model="formName" type="text" placeholder="compile this field" />
      </div>

      <div class="option plan">
        <span class="key">Plan <span v-show="originalPlan[0] != selectedPlan?.id" class="changed">(changed)</span></span>
        <span tabindex="1" @focus="showTendina = true" @blur="showTendina = false" class="selector">
          {{ selectedPlan === undefined ? 'select a plan' : selectedPlan }}
        </span>
        <div v-show="showTendina" class="tendina">
          <span v-for="plan in plans" @mousedown="() => selectedPlan = plan">
            {{ plan.name }}
          </span>
        </div>
      </div>

      <div class="option members">
        <div class="selected">
          <span>Added members</span>
          <div class="elements">
            <div v-for="member in selectedMembers" @mousedown="() => {
                const indexToRemove = selectedMembers.findIndex(foundMember => foundMember.id === member.id);

                if (indexToRemove !== -1) {
                  selectedMembers.splice(indexToRemove, 1);
                }
              }"
              class="element"
            >
              <AvatarBase64 :image-base64="member.avatar_1920" />
              <span> {{ member.display_name }}</span>
            </div>
          </div>
        </div>

        <div class="available">
          <span>Available users</span>
          <div class="elements">
            <div v-for="user in availableUsers" @mousedown="() => selectedMembers.push(user)" class="element">
              <AvatarBase64 :image-base64="user.avatar_1920" />
              <span> {{ user.display_name }}</span>
            </div>
          </div>
        </div>
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
      position: relative;

      display: flex;
      flex-direction: column;
      gap: 4px;

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

      > .selector {
        padding-left: .325rem;
        padding-right: .325rem;

        font-size: 16px;
        font-weight: 400;
        text-align: left;

        background-color: white;
      }

      > .key {
        font-size: 13px;
        font-weight: 500;
        color: rgb(83, 83, 83);

        > .obbligatory {
          color: red;
        }

        > .changed {
          color: rgb(51, 120, 210);
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