<template>
  <!-- Show the password gate until the user is authenticated -->
  <AuthGate v-if="!isAuthenticated" />

  <!-- Main app (only after sign-in) -->
  <DefaultLayout v-else>
    <router-view />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthGate from '@/components/AuthGate.vue'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'

export default {
  name: 'App',
  components: { DefaultLayout, AuthGate },
  setup() {
    const { isAuthenticated } = useAuth()
    const { isDark, toggleDark } = useTheme()
    return { isAuthenticated, isDark, toggleDark }
  },
}
</script>
