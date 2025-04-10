<template>
  <nav class="breadcrumb__nav">
    <Breadcrumb :model="breadcrumbItems" class="breadcrumb">
      <template #item="{ item }">
        <router-link v-if="item.to" :to="item.to" class="breadcrumb-item">
          <span>{{ item.label }}</span>
        </router-link>
        <a
          v-else :href="item.url"
          :target="item.target"
          class="breadcrumb-item"
        >
          <span>{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </nav>
</template>

<script setup lang="ts">
const breadcrumbItems = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Mediapipe', to: '/mediapipe' },
]);
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: 1.125rem;

  &__nav {
    background-color: $light;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba($dark-gray, 0.1);
    margin: 20px 0;
  }

  &__item {
    color: $dark-gray;
    text-decoration: none;
    font-weight: 500;
    padding: 0 10px;
    transition: color 0.3s ease, text-decoration 0.3s ease;
    display: flex;
    align-items: center;

    &:hover {
      color: $hover;
      border-radius: 8px;
    }

    &:not(:last-child)::after {
      content: '|';
      margin: 0 10px;
      color: $white;
      font-weight: bold;
      font-size: 1.5rem;
    }

    &__item span {
      color: inherit;
    }
  }
}
</style>
