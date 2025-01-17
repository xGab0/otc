
<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'html'
  },
  bodyAttrs: {
    class: 'main-body'
  }
})
</script>

<template>
  <NuxtPage/>
</template>

<style lang="scss">
.html {
  --font-geist-mono: 'GiestMono',
  --font-geist-sans: 'GeistSans'

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
  margin: 0;
  padding: 0;

  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;

  background-color: rgb(246, 246, 246);

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
</style>
