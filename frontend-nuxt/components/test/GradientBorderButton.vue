<template>
  <a class="gradient-border">Go back home</a>
</template>

<style lang="scss" scoped>
// background-color: hsla(0, 100%, 50%, 0.3);
// padding 1.5rem;

.gradient-border {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: .5rem;
  position: relative
} 

@media (prefers-color-scheme:light) {
  .gradient-border { 
    background-color: hsla(0, 0%, 100%, .3)
  }
  
  .gradient-border:before {
    background: linear-gradient(90deg, #e2e2e2, #e2e2e2 25%, #00dc82 50%, #36e4da 75%, #0047e1)
  }
}

@media (prefers-color-scheme:dark) {
  .gradient-border {
    background-color: hsla(0, 0%, 8%, .3)
  }
  
  .gradient-border:before {
    background: linear-gradient(90deg, #303030, #303030 25%, #00dc82 50%, #36e4da 75%, #0047e1)
  }
}

.gradient-border:before {
  content: "";

  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;

  width: 100%;

  opacity: .5;
  padding: 2px;

  background-size: 400% auto;
  border-radius: .5rem;

  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  transition: background-position .3s ease-in-out, opacity .2s ease-in-out;
}

.gradient-border:hover:before {
  background-position:-50% 0;
  opacity:1
}
</style>