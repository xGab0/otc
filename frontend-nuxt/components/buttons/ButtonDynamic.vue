<script setup lang="ts">
interface Props {
  name: string,
  color: { r: number, g: number, b: number },
}

defineProps<Props>();

function darkenRGB(color: { r: number, g: number, b: number }, percentage: number): { r: number, g: number, b: number } {
  // Assicurati che i valori siano tra 0 e 255
  const darken = (value: number, percent: number) => Math.max(0, Math.min(255, value * (1 - percent / 100)));

  const darkenedColor = {
    r: darken(color.r, percentage),
    g: darken(color.g, percentage),
    b: darken(color.b, percentage),
  };

  return darkenedColor;
}

function lightenRGB(color: { r: number, g: number, b: number }, percentage: number): { r: number, g: number, b: number } {
  // Funzione che aumenta la luminosità di un singolo valore RGB
  const lighten = (value: number, percent: number) => Math.max(0, Math.min(255, value * (1 + percent / 100)));

  const lightenedColor = {
    r: lighten(color.r, percentage),
    g: lighten(color.g, percentage),
    b: lighten(color.b, percentage),
  };

  return lightenedColor;
}


function darkenRGBToStyle(color: { r: number, g: number, b: number }, percentage: number): string {
  // Assicurati che i valori siano tra 0 e 255
  const darken = (value: number, percent: number) => Math.max(0, Math.min(255, value * (1 - percent / 100)));
  return `rgb(${darken(color.r, percentage)}, ${darken(color.g, percentage)}, ${darken(color.b, percentage)})`;
}

function lightenRGBToStyle(color: { r: number, g: number, b: number }, percentage: number): string {
  // Assicurati che i valori siano tra 0 e 255
  const lighten = (value: number, percent: number) => Math.max(0, Math.min(255, value * (1 + percent / 100)));
  return `rgb(${lighten(color.r, percentage)}, ${lighten(color.g, percentage)}, ${lighten(color.b, percentage)})`;
}

</script>

<template>
  <div class="badge" :style="{ 'background-color': darkenRGBToStyle(color, 0) }">
    <span :style="{ 'color': darkenRGBToStyle(color, 60) }">{{name}}</span>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  width: fit-content;

  padding-top: 4px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 4px;

  border-radius: 12px;

  display: flex;
  align-items: center;
  gap: 6px;
  //background-color: rgb(255, 240, 240);

  span {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: darkred
  }
}
</style>
