<template>
  <footer id="footer" class="footer">
    <div class="footer__items">
      <a>Privacy Policy</a>
      <a>Terms and Conditions</a>
      <a>Made by Rayel</a>
    </div>
  </footer>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
.footer {
  background: $gray;
  color: $primary;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__items {
    padding: 2px;
  }
}
</style>
