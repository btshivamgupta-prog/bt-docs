<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
    <div class="w-full max-w-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
          <div class="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
            BT
          </div>
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">BT Docs</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Restricted access</p>
        </div>

        <!-- Error message -->
        <div
          v-if="error"
          class="mb-4 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-300"
        >
          Incorrect password. Please try again.
        </div>

        <!-- Password form -->
        <form @submit.prevent="submit">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="password">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="Enter password"
            class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            @keyup.enter="submit"
          />

          <button
            type="submit"
            class="mt-4 w-full px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
          >
            Sign In
          </button>
        </form>

        <p class="mt-6 text-xs text-center text-gray-400 dark:text-gray-500">
          This site is private. Please enter the password to continue.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'AuthGate',
  setup() {
    const { login } = useAuth()
    const password = ref('')
    const error = ref(false)

    function submit() {
      if (!password.value) return
      const ok = login(password.value)
      if (ok) {
        password.value = ''
        error.value = false
        // Auth state change in useAuth will cause App.vue to re-render.
      } else {
        error.value = true
        password.value = ''
      }
    }

    return { password, error, submit }
  },
}
</script>