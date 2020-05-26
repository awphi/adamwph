<template>
  <div class="home">
    <Console />
    <div class="footer">
      <h2 class="footer-text">
        aspiring software engineer &amp;
        <br />BSc ComSci student @ Durham University
      </h2>

      <div class="socials-box">
        <div class="social-ico" style="width: 50px; height: 50px; background-color: red;"></div>
        <div class="social-ico" style="width: 50px; height: 50px; background-color: red;"></div>
        <div class="social-ico" style="width: 50px; height: 50px; background-color: red;"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Console from "@/components/Console.vue";

export default {
  name: "Home",
  components: {
    Console
  }
};
</script>

<style scoped>
.home {
  display: grid;
  padding: 1rem;
  grid-template-rows: 1fr auto;
  height: 100%;
}

.footer {
  display: flex;
}

.social-ico {
  margin-left: 0.5rem;
}

.socials-box {
  display: flex;
  align-items: center;
}

.home {
  flex-direction: column;
}

h2 {
  margin: 0;
}

.footer-text {
  flex: 1;
  color: var(--cl-text-grey);
}
</style>
