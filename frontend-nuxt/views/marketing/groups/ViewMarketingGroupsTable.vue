<script setup lang="ts">
import type { Mailing } from '~/hooks/mailing';
import type { Marketing } from '~/hooks/marketing';

const { mailings } = defineProps<{ mailings: Mailing[] }>();

const authStore = useAuthStore();
const userDataStore = useUserDataStore();

const sos: Marketing.Group | null = null;
const groups = ref<Marketing.Group[]>([]);

onMounted(async () => {
    const modelQueryBuilder = authStore.odooUser!.modelQueryBuilder('marketing.group');
    groups.value = await modelQueryBuilder.searchReadRecords<Marketing.Group>();
})
</script>

<template>
  <div v-if="mailings" class="table">
  </div>
</template>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
