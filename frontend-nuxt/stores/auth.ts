import { defineStore } from 'pinia'
import { ref } from 'vue'
import { OdooConnection, OdooUser } from '~/hooks/odoo/wrapper';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const odooConnection = ref<OdooConnection>();
  const odooUser = ref<OdooUser>();
  const isAuthenticated = ref<boolean>(false);

  const login = async (host: string, database: string, username: string, password: string) => {
    const connection = await OdooConnection.connect(host);
    const user = await connection.login(database, username, password);

    odooConnection.value = connection;
    odooUser.value = user;
    isAuthenticated.value = true;

    console.debug('AuthStore | logged successfully');

    router.push('/home');
  }

  const logout = () => {
    odooConnection.value = undefined;
    odooUser.value = undefined;
    isAuthenticated.value = false;
  }

  return {
    odooConnection,
    odooUser,
    isAuthenticated,
    login,
    logout
  }
})
