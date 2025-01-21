<script setup lang="ts">
import IconMail from '~/components/icons/IconMail.vue';
import IconPhone from '~/components/icons/IconPhone.vue';
import IconWork from '~/components/icons/IconWork.vue';
</script>

<template>
  <div class="card-attendance">
    <div class="working">
      <span class="title">In turno</span>

      <div class="body">
        <div class="element">
          <span class="key">Checkin</span>
          <span>21-01-2025 10:47:32</span>
        </div>

        <div class="element">
          <span class="key">Hours</span>
          <span>1:16</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-attendance {
  border-radius: 16px;
  background: linear-gradient(90deg, rgba(240,252,255,1) 0%, rgba(225,250,255,1) 100%);
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 1px 2px 0px,
    inset 0px 0px 0px 2px rgba(0, 0, 0, 0.01);

  .working {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .title {
      font-size: 18px;
      font-weight: 500;
    }

    .body {
      display: flex;
      justify-content: space-between;
      gap: 22px;

      .element {
        display: flex;
        flex-direction: column;

        .key {
          font-size: 13px;
          font-weight: 400;
          color: rgb(82, 82, 82)
        }
      }
    }
  }
}
</style>