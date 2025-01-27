<script setup lang="ts">
const { userId } = defineProps<{ userId: [number, string] }>();
</script>

<template>
  <div class="user">
    <span>{{ userId[1] }}</span>
    <AvatarOdooUser size="24px" :user-id="userId[0]" />
  </div>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 6px;

  padding-left: .275rem;
  padding-right: .275rem;
  padding-top: .175rem;
  padding-bottom: .175rem;

  border-radius: 6px;
  cursor: pointer;

  span {
    font-size: 13px;
    color: rgb(75, 75, 75);
  }

  &:hover {
    background-color: rgb(242, 242, 242);
  }
}
</style>