<template>
  <div class="card-shift">
    <div class="element">
      <span class="key">Checkin</span>
      <span class="value">10:47:32</span>
    </div>

    <div class="element">
      <span class="key">Checkin</span>
      <span class="value">10:47:32</span>
    </div>

    <div class="element">
      <span class="key">Hours</span>
      <span class="value">1:32</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-shift {
  display: flex;
  justify-content: space-between;
  gap: 16px;

  padding: 6px 12px 6px 12px;
  border-radius: 16px;
  background-color: rgb(235, 241, 254);

  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  .element {
    display: flex;
    flex-direction: column;

    .key {
      font-size: 13px;
      font-weight: 300;
      color: rgb(82, 82, 82)
    }

    .value {
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>