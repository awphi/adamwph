<template>
  <div class="footer">
    <h2 class="footer-text">
      <span id="name">Adam Hodson</span><br />
      Graduate Software Engineer
      <br />ComSci Class of 2022 @ Durham University
    </h2>

    <div class="socials-box">
      <div class="social-ico" @click="socialClick" link="https://www.linkedin.com/in/adam-hodson-a77275197/">
        <LinkedinIcon />
      </div>
      <div @click="socialClick" link="https://github.com/awphi" class="social-ico">
        <GithubIcon id="git-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { GithubIcon, LinkedinIcon } from "vue-feather-icons";
export default {
  name: "Footer",
  components: {
    GithubIcon,
    LinkedinIcon,
  },
  methods: {
    socialClick(e) {
      window.open(e.currentTarget.getAttribute("link"));
    },
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.social-ico {
  margin: 0 0.25rem 0 0.25rem;
  border-radius: 20rem;
  background-color: #6f6f6f;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.2rem;
  height: 4.2rem;
  cursor: pointer;
}

.social-ico:hover {
  background-color: #5b5b5b;
}

#git-icon {
  transform: translate(0px, 2px);
}

svg {
  width: 60%;
  height: 60%;
  color: var(--cl-bg-grey);
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
