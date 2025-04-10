<template>
  <section>
    <template v-for="(landmarkGroup, type) in landmarkData" :key="type">
      <h1>{{ type.charAt(0).toUpperCase() + type.slice(1) }} Landmarks</h1>
      <div v-if="landmarkGroup.length">
        <div v-for="(set, i) in landmarkGroup" :key="i">
          <h2>{{ type }} {{ i + 1 }}</h2>
          <ul>
            <li v-for="(landmark, j) in set" :key="j">
              X: {{ landmark.x }}, Y: {{ landmark.y }}, Z: {{ landmark.z }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup>
defineProps({ landmarkData: Object });
</script>

<style scoped>
section {
  margin-top: 20px;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
