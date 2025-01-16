
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

<style>
.html {
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
</style>
