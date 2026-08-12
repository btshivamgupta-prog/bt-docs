<template>
  <div class="space-y-0.5">
    <div v-for="item in items" :key="item.slug">
      <!-- Item row: chevron (if has children) + link -->
      <div
        class="flex items-center rounded-md"
        :class="isActive(depth, item.slug) ? 'bg-primary-50 dark:bg-primary-950' : ''"
      >
        <!-- Collapse/expand toggle (only when the item has children) -->
        <button
          v-if="item.children && item.children.length"
          class="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0 ml-1"
          @click.stop="toggleExpanded(itemPath(item))"
          :aria-label="isExpanded(itemPath(item)) ? 'Collapse' : 'Expand'"
        >
          <svg
            class="w-3 h-3 transition-transform duration-200"
            :class="isExpanded(itemPath(item)) ? 'rotate-90' : ''"
            fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <!-- Spacer when no children, to keep titles aligned -->
        <span v-else class="w-[18px] shrink-0"></span>

        <router-link
          :to="itemPath(item)"
          class="sidebar-link flex-1"
          :class="isActive(depth, item.slug) ? 'sidebar-link-active' : 'sidebar-link-inactive'"
          @click="$emit('navigate')"
        >
          {{ item.title }}
        </router-link>
      </div>

      <!-- Nested children (shown when expanded) -->
      <div
        v-if="item.children && item.children.length && isExpanded(itemPath(item))"
        class="ml-3 border-l border-gray-200 dark:border-gray-800 pl-2 mt-0.5"
      >
        <SidebarMenu
          :items="item.children"
          :base-path="itemPath(item)"
          :depth="depth + 1"
          :segments="segments"
          @navigate="$emit('navigate')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'SidebarMenu',
  emits: ['navigate'],
  props: {
    items: { type: Array, default: () => [] },
    basePath: { type: String, default: '' },
    depth: { type: Number, default: 0 },
    segments: { type: Array, default: () => [] },
  },
  setup(props) {
    // Which nodes are expanded, keyed by full path.
    const expanded = ref(new Set())

    function isExpanded(path) {
      return expanded.value.has(path)
    }

    function toggleExpanded(path) {
      const set = new Set(expanded.value)
      if (set.has(path)) {
        set.delete(path)
      } else {
        set.add(path)
      }
      expanded.value = set
    }

    // Auto-expand every node on the active path so the current page is visible.
    watch(
      () => props.segments && props.segments.join('/'),
      (activePath) => {
        if (!activePath) return
        // Build all prefixes of the active path and expand them.
        const set = new Set(expanded.value)
        const parts = activePath.split('/')
        let acc = props.basePath
        set.add(acc)
        for (let i = 0; i < parts.length; i++) {
          acc = `${acc}/${parts[i]}`
          set.add(acc)
        }
        expanded.value = set
      },
      { immediate: true, deep: true }
    )

    return { isExpanded, toggleExpanded }
  },
  methods: {
    itemPath(item) {
      return `${this.basePath}/${item.slug}`
    },
    isActive(depth, slug) {
      return this.segments && this.segments[depth] === slug
    },
  },
}
</script>