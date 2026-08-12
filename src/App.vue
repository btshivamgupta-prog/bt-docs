<template>
  <!-- Show the password gate until the user is authenticated -->
  <AuthGate v-if="!isAuthenticated" />

  <!-- Main app (only after sign-in) -->
  <DefaultLayout v-else>
    <router-view />
  </DefaultLayout>
</template>

<script>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthGate from '@/components/AuthGate.vue'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'App',
  components: { DefaultLayout, AuthGate },
  setup() {
    const { isAuthenticated } = useAuth()

    const isDark = ref(false)

    function toggleDark() {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }

    return { isAuthenticated, isDark, toggleDark }
  },
}
</script>
