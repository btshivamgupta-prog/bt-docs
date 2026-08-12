<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

<script>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default {
  name: 'App',
  components: { DefaultLayout },
  setup() {
    const isDark = ref(false)

    function toggleDark() {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }

    return { isDark, toggleDark }
  },
}
</script>
