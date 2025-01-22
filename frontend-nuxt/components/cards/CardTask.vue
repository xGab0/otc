<script setup lang="ts">
import BadgeDynamic from '../badges/BadgeDynamic.vue';
import IconMore from '../icons/IconMore.vue';
import IconMoreVert from '../icons/IconMoreVert.vue';

</script>

<template>
  <!--BadgeDynamic name="max priority" :color="{r: 255, g: 240, b: 240}" /-->
  <div class="card-task">
    <div class="flex flex-col gap-1">
      <div class="header">
        <div>
          <div class="point"/>
          <span class="key">Complete the new frontend</span>
        </div>
        <IconMoreVert :width="20" :height="20"/>
      </div>

      <div class="tags">
        <span>max priority</span>
        <span>breaking</span>
      </div>
    </div>

    <div class="element flex flex-col">
      <span>Creato da</span>
      <div class="flex items-center gap-2">
        <AvatarDummy size="24px" color="rgb(255, 255, 195)" name="ciao"/>
        <span>Gabriele</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  padding: 6px 12px 6px 12px;
  border-radius: 16px;
  background-color: rgb(244, 244, 244);

  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;

    > div {
      display: flex;
      align-items: center;
      gap: 6px;
    }


    span {
      font-size: 18px;
      font-weight: 400;
    }

    .point {
      width: 12px;
      height: 12px;

      border-radius: 100%;
      background-color: red;
    }
  }

  .tags {
    display: flex;
    gap: 4px;

    span {
      padding: 0 4px 0 4px;
      border-radius: 6px;

      font-size: 11px;
      font-weight: 500;
      letter-spacing: .02rem;
      color: rgb(110, 19, 5);

      background-color: rgb(255, 223, 218);
    }
  }

  .element {
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      font-weight: 400;
    }

    .key {
      font-size: 13px;
      font-weight: 300;
      color: rgb(82, 82, 82)
    }

    .value {
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>