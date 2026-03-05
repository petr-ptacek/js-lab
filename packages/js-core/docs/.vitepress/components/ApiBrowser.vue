<script setup lang="ts">
import { ref, computed } from "vue";
import data from "../data/utilities.json";

const selectedTag = ref<string | null>(null);

const utilities = data.utilities;

const tags = Array.from(
  new Set(
    utilities.flatMap(u => u.tags ?? []),
  ),
).sort();

const filtered = computed(() => {
  if (!selectedTag.value) return utilities;
  return utilities.filter(u =>
    (u.tags ?? []).includes(selectedTag.value!),
  );
});

function selectTag(tag: string | null) {
  selectedTag.value = tag;
}
</script>

<template>
  <div>
    <div class="tags">
      <button
        class="tag"
        :class="{ active: selectedTag === null }"
        @click="selectTag(null)"
      >
        all
      </button>

      <button
        v-for="tag in tags"
        :key="tag"
        class="tag"
        :class="{ active: selectedTag === tag }"
        @click="selectTag(tag)"
      >
        {{ tag }}
      </button>
    </div>

    <div class="vp-grid">
      <a
        v-for="u in filtered"
        :key="u.id"
        class="vp-card"
        :href="`/api/generated/${u.category}/${u.id}`"
      >
        <h3>{{ u.name }}</h3>
        <p>{{ u.description }}</p>
        <small>{{ u.category }}</small>
      </a>
    </div>
  </div>
</template>
