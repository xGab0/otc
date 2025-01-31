<script setup lang="ts">
import type { Marketing } from '~/hooks/marketing';
import type { ModelQueryBuilder } from '~/hooks/odoo/wrapper';

interface Props {
  modelQueryBuilder: ModelQueryBuilder<Marketing.Group>
}

const authStore = useAuthStore();

const { modelQueryBuilder } = defineProps<Props>();

const emit = defineEmits<{
  recordCreate: [group: Marketing.Group]
}>()

const formName = ref<string>('');
const formSmsMaxLength = ref<number>(256);

const showTendina = ref<boolean>(false);

const plans = ref<Marketing.Plan[]>([]);
const selectedPlan = ref<Marketing.Plan>();

const users = ref<any[]>([]);
const availableUsers = computed(() => users.value.filter(user => !selectedMembers.value.some(selected => selected.id === user.id)));

const selectedMembers = ref<any[]>([]);
const selectedIds = computed(() => selectedMembers.value.map(member => member.id));

const openedUsersMenu = ref<boolean>(false);

const createGroup = async (name: string, marketing_plan_id: number, member_ids: number[] = []) => {
  console.log(`creating a new group named ${name}`);

  const foundRecords = await modelQueryBuilder.searchRecords([['name', '=', name]]);

  if (foundRecords.length > 0) {
    console.error(`There is already a group with the name ${name}`);
    return
  }

  const recordBody = {
    name: name,
    marketing_plan_id: marketing_plan_id,
    member_ids: member_ids
  };

  const recordId = await modelQueryBuilder.createRecord(recordBody);

  console.log('createPlan result:', recordId);

  const newGroup = (await modelQueryBuilder.searchReadRecords<Marketing.Group>([['id', '=', recordId]]))[0];

  emit('recordCreate', newGroup);
}

onMounted(async() => {
  plans.value = await authStore.odooUser!.searchReadRecords<Marketing.Plan>('marketing.plan');
  users.value = await authStore.odooUser!.searchReadRecords('res.users');
})
</script>

<template>
  <div class="creation">
    <form>
      <div class="option name">
        <span>Name <span class="obbligatory">*</span></span>
        <input tabindex="0" v-model="formName" type="text" placeholder="compile this field" />
      </div>

      <div class="option plan">
        <span>Plan <span class="obbligatory">*</span></span>
        <span tabindex="1" @focus="showTendina = true" @blur="showTendina = false" class="selector">
          {{ selectedPlan === undefined ? 'select a plan' : selectedPlan.name }}
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

    <div v-if="formName && selectedPlan" class="footer">
      <span @mousedown="async () => await createGroup(formName, selectedPlan.id, selectedIds)">Create</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/*
.users-menu {
  display: flex;
  gap: 8px;

  > .member {
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
  }
}

.available-members {
  display: flex;
  gap: 8px;

  > .member {
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
  }

  > .add {
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

    color: rgb(53, 140, 53);
    background-color: rgb(234, 255, 225);
  }
}
*/

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