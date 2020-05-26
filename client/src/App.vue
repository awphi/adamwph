<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;700&display=swap");

html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
}

:root {
  --cl-bg-grey: #e5e5e5;
  --cl-text-grey: rgba(0, 0, 0, 0.26);
}

h1,
h2,
h3,
p,
a {
  font-family: "Roboto Mono", monospace;
  font-weight: normal;
}

h2 {
  font-size: 24pt;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--cl-bg-grey);
}
</style>
