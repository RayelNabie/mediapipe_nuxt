<template>
  <Html>
    <Head>
      <Title>Mediapipe</Title>
    </Head>
    <Body>
      <div class="layout">
        <LayoutTheNavbar />
        <main
          id="main-content"
          class="content"
        >
          <slot />
        </main>
        <LayoutTheFooter />
      </div>
    </Body>
  </Html>
</template>
