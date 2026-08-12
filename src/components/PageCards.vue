<template>
  <div class="space-y-2">
    <div v-for="item in items" :key="item.slug">
      <router-link
        :to="`${basePath}/${item.slug}`"
        class="group block rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-sm transition-all"
      >
        <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
          {{ item.title }}
        </h4>
      </router-link>

      <!-- Nested children (any depth) -->
      <div v-if="item.children && item.children.length" class="ml-4 mt-2 space-y-1">
        <PageCards
          :items="item.children"
          :base-path="`${basePath}/${item.slug}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageCards',
  props: {
    items: { type: Array, default: () => [] },
    basePath: { type: String, default: '' },
  },
}
</script>