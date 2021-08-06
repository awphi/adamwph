<template>
  <div id="app">
    <Home id="home" />
    <Footer />
  </div>
</template>

<script>
import Home from "@/components/Home.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Home,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;700&display=swap");

.unselectable {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

html,
body {
  height: 100%;
  overflow-x: auto;
}

#app {
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  min-height: 100%;
}

#home {
  flex: 1;
  padding: 1rem;
}

body {
  margin: 0;
}

:root {
  --cl-bg-grey: #e5e5e5;
  --cl-text-grey: rgba(0, 0, 0, 0.26);
  --cl-logo-grey: #6f6f6f;
}

h1,
h2,
h3,
p,
a {
  font-family: "Roboto Mono", monospace;
  font-weight: normal;
  margin: 0;
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
