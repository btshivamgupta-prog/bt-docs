<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <div v-for="item in items" :key="item.slug">
      <router-link
        :to="`${basePath}/${item.slug}`"
        class="group block rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-900"
      >
        <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
          {{ item.title }}
        </h4>
        <div v-if="item.children && item.children.length" class="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {{ item.children.length }} sub-page{{ item.children.length > 1 ? "s" : "" }}
        </div>
      </router-link>

      <!-- Nested children (any depth) -->
      <div v-if="item.children && item.children.length" class="ml-4 mt-2 space-y-1">
        <router-link
          v-for="child in item.children"
          :key="child.slug"
          :to="`${basePath}/${item.slug}/${child.slug}`"
          class="block px-3 py-1 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          + {{ child.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageCards",
  props: {
    items: { type: Array, default: () => [] },
    basePath: { type: String, default: "" },
  },
}
</script>
