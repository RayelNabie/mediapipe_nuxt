<template>
  <footer id="footer" class="footer">
    <div class="footer__items">
      <Button label="Privacy Policy" class="footer__link" />
      <Button label="Terms and Conditions" class="footer__link" />
      <Button label="Made by Rayel" class="footer__link" />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: #f4f4f4;
  color: #007bff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 2rem;

  &__items {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  &__link {
    background: transparent;
    border: none;
    color: #007bff;
    text-transform: uppercase;
    font-weight: 500;
    padding: 0;
    cursor: pointer;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}
</style>
