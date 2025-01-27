<script setup lang="ts">
import auth from '~/middleware/auth';

interface Props {
  size?: string,
  color?: string,
  name?: string,
  userId: number
}

const authStore = useAuthStore();

const {
  size = '16px',
  color = 'rgb(255, 255, 195)',
  name = 'placeholder',
  userId
} = defineProps<Props>();

const imageBase64 = ref<string>();

onMounted(async () => {
    imageBase64.value = (await authStore.odooUser!.searchReadRecords('res.users', [['id', '=', authStore.odooUser!.uid]], [], undefined, 1))[0].avatar_1920;
})
</script>

<template>
  <img v-if="userId"
    :src="`data:image/png;base64,${imageBase64}`"
    alt="avatar"
    class="avatar-dummy"
    :style="{ width: size, height: size, backgroundColor: color }"
  />
  <AvatarDummy v-else :size :color name="A" />
</template>

<style lang="scss" scoped>
.avatar-dummy {
  width: 16px;
  height: 16px;
  background-color: rgb(255, 255, 195);
  border-radius: 100%;
}
</style>