import { defineNuxtRouteMiddleware } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Se l'utente non è autenticato e cerca di accedere a una rotta protetta, lo reindirizziamo
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login');
  }
})
