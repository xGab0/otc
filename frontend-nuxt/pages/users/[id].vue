<script setup lang="ts">
const router = useRouter();
const route = useRoute();
</script>

<template>
  users/{{ route.params.id }}
</template>

<script setup lang="ts">
</script>