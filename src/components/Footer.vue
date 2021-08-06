<template>
  <div class="footer">
    <h2 class="footer-text">
      <span id="name">Adam Hodson</span><br />
      aspiring software engineer &amp;
      <br />BSc ComSci student @ Durham University
    </h2>

    <div class="socials-box">
      <div
        class="social-ico"
        style="width: 50px; height: 50px; background-color: red"
      />
      <div
        class="social-ico"
        style="width: 50px; height: 50px; background-color: red"
      />
      <div
        class="social-ico"
        style="width: 50px; height: 50px; background-color: red"
      />
    </div>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.social-ico {
  margin: 0 0.25rem 0 0.25rem;
}

.socials-box {
  margin-top: 1rem;
  display: flex;
  align-items: center;
}

#name {
  font-size: 1.1em;
  font-weight: 800;
}

.home {
  flex-direction: column;
}

h2 {
  margin: 0;
}

.footer-text {
  min-width: fit-content;
  flex: 1;
  color: var(--cl-text-grey);
}
</style>
