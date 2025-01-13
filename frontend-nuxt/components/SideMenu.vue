<script setup lang="ts">
import IconUser from './icons/IconUser.vue';
import LogoPrometika from './icons/LogoPrometika.vue';
import IconRhombus from './icons/shapes/IconRhombus.vue';

</script>

<template>
  <div class="sidebar">
    <div class="section">
      <!--LogoPrometika/-->

      <div class="header">
        <span>generale</span>
      </div>

      <div class="body">
        <div class="element">
          <IconUser/>
          <span>utenti</span>
        </div>

        <div class="element">
          <IconUser/>
          <span>modelli</span>
        </div>

        <div class="element">
          <IconUser/>
          <span>presenze</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="header">
        <span>generale</span>
      </div>

      <div class="body">
        <div class="element">
          <IconRhombus/>
          <span>contatti</span>
        </div>

        <div class="element">
          <IconRhombus/>
          <span>aziende</span>
        </div>

        <div class="element">
          <IconRhombus/>
          <span>persone</span>
        </div>

        <div class="element">
          <IconRhombus/>
          <span>modelli</span>
        </div>

        <div class="element">
          <IconRhombus/>
          <span>presenze</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .sidebar {
    width: 13%;

    margin-right: 24px;
    padding-left: 10px;
    padding-right: 10px;

    display: flex;
    flex-direction: column;
    gap: 100px;

    .section {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .header {
        span {
          font-size: 13px;
          font-weight: 600;
        }
      }

      .body {
        display: flex;
        flex-direction: column;

        .element {
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 8px;
          padding-bottom: 8px;

          border-radius: 8px;

          display: flex;
          align-items: center;
          gap: 6px;

          svg {
            width: 16px;
            height: 16px;
          }

          span {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            font-weight: 500;
          }

          &:hover {
            background-color: white;
            box-shadow: 0px 2px 3px 0px rgb(229, 229, 229);

            cursor: pointer;
          }
        }
      }
    }
  }
</style>