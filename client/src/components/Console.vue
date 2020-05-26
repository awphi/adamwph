<template>
  <div class="console-root">
    <div class="console-bar"></div>
    <div class="console-body"></div>
  </div>
</template>

<script>
export default {
  name: "Console"
};
</script>

<style scoped>
.console-root {
  display: grid;
  grid-template-rows: 1fr 15fr;
  min-height: 500px;
  max-width: 800px;
}

.console-bar {
  background-color: #afafaf;
  border: 1px #5a5a5a solid;
  border-radius: 0.5rem 0.5rem 0 0;
}

.console-body {
  background-color: #171717;
  border-radius: 0 0 0.5rem 0.5rem;
}
</style>
