<script setup lang="ts">
import { computed, ref } from "vue";
import data from "../data/items.json";

const selectedTag = ref<string | null>(null);
const selectedKind = ref<string | null>(null);

const items = data.items;

const tags = Array.from(new Set(items.flatMap((u) => u.tags ?? []))).sort();
const kinds = Array.from(new Set(items.map((u) => u.kind))).sort();

const kindLabel: Record<string, string> = {
  composable: "Composable",
  component: "Component",
  utility: "Utility",
  type: "Type",
};

const filtered = computed(() => {
  return items.filter((u) => {
    const matchTag = !selectedTag.value || (u.tags ?? []).includes(selectedTag.value);
    const matchKind = !selectedKind.value || u.kind === selectedKind.value;
    return matchTag && matchKind;
  });
});
</script>

<template>
  <div>
    <div class="filters">
      <div class="filter-group">
        <button
          class="tag"
          :class="{ active: selectedKind === null }"
          @click="selectedKind = null"
        >
          all kinds
        </button>
        <button
          v-for="kind in kinds"
          :key="kind"
          class="tag"
          :class="{ active: selectedKind === kind }"
          @click="selectedKind = kind"
        >
          {{ kindLabel[kind] ?? kind }}
        </button>
      </div>

      <div class="filter-group">
        <button
          class="tag"
          :class="{ active: selectedTag === null }"
          @click="selectedTag = null"
        >
          all tags
        </button>
        <button
          v-for="tag in tags"
          :key="tag"
          class="tag"
          :class="{ active: selectedTag === tag }"
          @click="selectedTag = tag"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <p
      v-if="filtered.length === 0"
      class="no-results"
    >
      No items match the selected filters.
    </p>

    <div class="vp-grid">
      <a
        v-for="item in filtered"
        :key="item.id"
        class="vp-card"
        :href="`/js-lab/vue-core/api/${item.kind}/${item.id}`"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <small>{{ kindLabel[item.kind] ?? item.kind }}</small>
      </a>
    </div>
  </div>
</template>
