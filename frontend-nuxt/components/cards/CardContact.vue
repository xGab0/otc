<script setup lang="ts">
import IconMail from '~/components/icons/IconMail.vue';
import IconPhone from '~/components/icons/IconPhone.vue';
import IconWork from '~/components/icons/IconWork.vue';
</script>

<template>
  <div class="card">
    <span class="title">Contact</span>

    <div class="content">
      <div class="element">
        <span class="key">First Name</span>
        <span class="value">Mitchell</span>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Last Name</span>
        <span class="value">Admin</span>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Job Title</span>
        <div class="value">
          <span class="value">Developer</span>
          <IconWork/>
        </div>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Business Phone</span>
        <div class="value">
          <span class="value">+39 393 939 3939</span>
          <IconPhone/>
        </div>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Business Email</span>
        <div class="value">
          <span>business@mail.com</span>
          <IconMail/>
        </div>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Personal Phone</span>
        <div class="value">
          <span class="value">+39 393 939 3939</span>
          <IconPhone/>
        </div>
        <div class="separator"/>
      </div>

      <div class="element">
        <span class="key">Personal Email</span>
        <div class="value">
          <span>personal@mail.com</span>
          <IconMail/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 34px;

  border-radius: 32px;
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