<script setup lang="ts">
import IconMail from '~/components/icons/IconMail.vue';
import IconPhone from '~/components/icons/IconPhone.vue';
import IconWork from '~/components/icons/IconWork.vue';
import LayoutCollapsable from '~/layouts/LayoutCollapsable.vue';
import GradientBorderButton from '../test/GradientBorderButton.vue';

const authStore = useAuthStore();
const userData = ref<any>();
const companies = ref<any>();

onMounted(async () => {
  userData.value = (await authStore.odooUser!.searchReadRecord('res.users', [['id', '=', authStore.odooUser?.uid]], [], undefined, 1))[0];

  console.log('CardContacts | users');
  console.log(userData.value);

  companies.value = await authStore.odooUser!.searchReadRecord('res.company');

  console.log('CardContacts | companies');
  console.log(companies.value);

})
</script>

<template>
  <div class="card" v-if="userData">
    <span class="title">Contacts</span>

    <!--GradientBorderButton /-->

    <div class="content">
      <div class="element">
        <span class="key">First Name</span>
        <input>
        <span class="value">{{ userData.employee_id[1].split(' ')[0] }}</span>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Last Name</span>
        <span class="value">{{ userData.employee_id[1].split(' ')[1] }}</span>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Company</span>
        <div class="value">
          <span class="value">{{ userData.company_id[1] }}</span>
          <IconWork/>
        </div>

        <!--LayoutCollapsable :collapsed="true">
          <div class="flex flex-col gap-1">
            <span v-for="company in companies">{{ company.display_name }}</span>
          </div>
        </LayoutCollapsable-->

        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Job Title</span>
        <div class="value">
          <span class="value">{{ userData.job_title }}</span>
          <IconWork/>
        </div>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Business Phone</span>
        <div class="value">
          <span class="value">{{ userData.work_phone}}</span>
          <IconPhone/>
        </div>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Business Email</span>
        <div class="value">
          <span>{{ userData.work_email }}</span>
          <IconMail/>
        </div>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Personal Phone</span>
        <div class="value">
          <span class="value">{{ userData.phone }}</span>
          <IconPhone/>
        </div>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Personal Email</span>
        <div class="value">
          <span>{{ userData.private_email }}</span>
          <IconMail/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 12px 24px 16px 24px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  border-radius: 24px;
  background-color: white;

  .title {
    font-size: 26px;
    font-weight: 400;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 14px;

    .element {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .key {
        font-size: 13px;
        font-weight: 400;
        color: rgb(82, 82, 82)
      }

      .value {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;

        span {
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
  }
}

.separator {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.102);
}

svg {
  height: 22px
}
</style>