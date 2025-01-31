
<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'html-main'
  },
  bodyAttrs: {
    class: 'main-body'
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style lang="scss">
.html-main{
  --font-geist-mono: 'GiestMono',
  --font-geist-sans: 'GeistSans';

  overflow-y: scroll;

  scrollbar-color: rgb(255, 255, 255) transparent;
  scrollbar-width: auto;

  /*
  height: 100vh;

  margin: 0;
  padding: 0;

  box-sizing: border-box;
  border: 0px solid cyan;

  display: grid;
  */
}

.main-body {
  min-height: 100vh;

  margin: 0;
  padding: 1rem;

  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;

  background-color: rgb(227, 227, 227);
  /*
  span {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  */
}

#__nuxt {
  //height: 100%;
}

span {
  line-height: normal;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.paper-squared {
  background-image:
    linear-gradient(90deg, #f0efef 1px, transparent 1px),  /* Linee verticali */
    linear-gradient(0deg, #f0efef 1px, transparent 1px);  /* Linee orizzontali */
  background-size: 20px 20px;  /* Imposta la dimensione della griglia (es. 20x20px per quadretti piccoli) */
  background-position: 0 0;  /* Posizione di partenza */
  background-repeat: repeat;  /* Ripetizione del pattern */
}

/*
.text-xs {
  line-height: 1.25rem;
  font-size: .875rem;
  color: hsl(var(--muted-foreground));
}

.text-sm {
  line-height: 1.25rem;
  font-size: .875rem;
  color: hsl(var(--muted-foreground));
}

.text-base {
  line-height: 1.25rem;
  font-size: .875rem;
  color: hsl(var(--muted-foreground));
}

.text-lg {
  line-height: 1.55rem;
  font-size: 1.275rem;
  font-weight: 500;
}

.text-xl {
  line-height: 1.55rem;
  font-size: 1.775rem;
  font-weight: 600;
}

.text-2xl {
  line-height: 2.55rem;
  font-size: 2.075rem;
  font-weight: 700;
}

.text-3xl {
  line-height: 1.55rem;
  font-size: 1.875rem;
  font-weight: 800;
  color: hsl(var(--muted-foreground));
}

.text-4xl {
  line-height: 1.55rem;
  font-size: 1.875rem;
  font-weight: 900;
  color: hsl(var(--muted-foreground));
}
*/

/*
.card {
  &.title {
    @apply text-lg;
  }

  &.description {
    @apply text-base;
    color: rgb(113, 113, 113);
  }
}
*/

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  //filter: blur(1rem);
}
</style>
