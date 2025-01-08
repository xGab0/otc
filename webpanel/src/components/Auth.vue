<script setup lang="ts">
import { onMounted, ref } from 'vue';

const username = ref();
const password = ref();

onMounted(async () => {
})
</script>

<template>
  <form class="body">
    <div>
      <span>{{username}}</span>
      <input v-model="username" type="text" placeholder="username" class="input-box"></input>
    </div>

    <div>
      <span>{{password}}</span>
      <input v-model="password" type="password" placeholder="password" class="input-box"></input>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.body {
    width: 50%;

    display: flex;
    flex-direction: column;
    gap: 6px;

    .input-box {
        border-style: solid;
        border-width: 2px;
        border-color: #1D434C;

        &:focus {
            outline: none;
        }
    }
}
</style>
