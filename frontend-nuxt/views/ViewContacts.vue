<script setup lang="ts">
import IconMail from '~/components/icons/IconMail.vue';
import IconPhone from '~/components/icons/IconPhone.vue';
import IconWork from '~/components/icons/IconWork.vue';
import type { OdooUserData } from '~/hooks/odoo/data';

const { userData } = defineProps<{ userData: OdooUserData }>();

const firstName = ref<string>(userData.employee_id[1].split(' ')[0]);
const lastName = ref<string>(userData.employee_id[1].split(' ')[1]);
const company = ref<string>(userData.company_id[1]);
const jobTitle = ref<string>(userData.job_title);

const businessPhone = ref<string>(userData.work_phone);
const businessEmail = ref<string>(userData.work_email);

const personalPhone = ref<string>(userData.phone);
const personalEmail = ref<string>(userData.private_email);
</script>

<template>
  <div class="card" v-if="userData">
    <span class="title">Contacts</span>

    <!--GradientBorderButton /-->

    <div class="content">
      <div class="section">
        <span>public data</span>

        <div class="element-container">
          <div class="element">
            <span class="key">First Name</span>
            <div class="value">
              <input v-model="firstName" :readonly="true">
              <IconPhone/>
            </div>
            <div class="separator"/>
          </div>

          <div class="element">
            <span class="key">Last Name</span>
            <div class="value">
              <input v-model="lastName" :readonly="true">
              <IconMail/>
            </div>
            <div class="separator"/>
          </div>
        </div>
      </div>

      <div class="section">
        <span>business data</span>

        <div class="element-container">
          <div class="element">
            <span class="key">Company</span>
            <div class="value">
              <input v-model="company" :readonly="true">
              <IconPhone/>
            </div>
            <div class="separator"/>
          </div>

          <div class="element">
            <span class="key">Job Title</span>
            <div class="value">
              <input v-model="jobTitle" :readonly="true">
              <IconMail/>
            </div>
            <div class="separator"/>
          </div>
        </div>
      </div>

      <div class="section">
        <span>business contacts</span>

        <div class="element-container">
          <div class="element">
            <span class="key">Business Phone</span>
            <div class="value">
              <input v-model="businessPhone" :readonly="true">
              <IconPhone/>
            </div>
            <div class="separator"/>
          </div>

          <div class="element">
            <span class="key">Business Email</span>
            <div class="value">
              <input v-model="businessEmail" :readonly="true">
              <IconMail/>
            </div>
            <div class="separator"/>
          </div>
        </div>
      </div>


      <div class="section">
        <span>personal contacts</span>

        <div class="element-container">
          <div class="element">
            <span class="key">Personal Phone</span>
            <div class="value">
              <input v-model="personalPhone" :readonly="true">
              <IconPhone/>
            </div>
            <div class="separator"/>
          </div>

          <div class="element">
            <span class="key">Personal Email</span>
            <div class="value">
              <input v-model="personalEmail" :readonly="true">
              <IconMail/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  min-width: 400px;

  padding: 12px 24px 16px 24px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: 24px;
  background-color: white;

  .title {
    font-size: 30px;
    font-weight: 500;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 28px;

    .section {
      display: flex;
      flex-direction: column;
      gap: 16px;

      > span {
        font-size: 15px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: .035rem;
        color: rgba(0, 0, 0, 0.86);
      }

      .element-container {
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
            line-height: normal;
            color: rgb(82, 82, 82)
          }

          .value {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;

            input {
              width: 100%;
              font-size: 16px;
              font-weight: 400;
              line-height: normal;

              &:focus {
                outline: none;
              }
            }
          }
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
