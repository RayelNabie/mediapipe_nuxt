<template>
  <nav>
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem
        v-for="(item, index) in breadcrumbItems"
        :key="index"
        class="breadcrumb__item-wrapper"
      >
        <NuxtLink :to="item.to" class="breadcrumb__item">
          {{ item.label }}
        </NuxtLink>
        <span v-if="index < breadcrumbItems.length - 1" class="breadcrumb__separator">></span>
      </BreadcrumbItem>
    </Breadcrumb>
  </nav>
</template>

<script lang="ts" setup>
const breadcrumbItems = [
  { label: 'Home', to: '/' },
  { label: 'Mediapipe', to: '/mediapipe' },
];
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  margin: 0;
  padding: 12px;
  background-color: $light;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;

  &__item-wrapper {
    display: inline-flex;
    align-items: center;
    position: relative;
  }

  &__item {
    color: $primary;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 4px;
    font-weight: 500;
    text-transform: capitalize;
    transition: color 0.3s ease, background-color 0.3s ease;

    &:hover {
      color: $white;
      background-color: $secondary;
      text-decoration: none;
    }
  }

  .breadcrumb__separator {
    margin: 0 8px;
    color: $gray;
    font-size: 1.5rem;
    font-weight: bold;
    opacity: 0.8;
  }
};
</style>
