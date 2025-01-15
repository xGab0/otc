import axios from 'axios';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { OdooUserData } from '~/hooks/odoo/data';
import { OdooConnection, OdooUser } from '~/hooks/odoo/wrapper';

export const useUserDataStore = defineStore('userdata', () => {
  const userData = ref<OdooUserData>();

  const init = async () => {
    const authStore = useAuthStore();
    const queryBuilder = authStore.odooUser!.modelQueryBuilder<OdooUserData>('res.users');
    const response = await queryBuilder.searchReadRecords([['id', '=', authStore.odooUser!.uid]], [], undefined, 1);

    userData.value = response[0];

    console.log('UserDataStore | response');
    console.log(response);

    console.debug('UserDataStore | init successfully');
  }

  return {
    userData,
    init
  }
})
