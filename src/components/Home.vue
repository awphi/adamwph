<template>
  <div class="home">
    <Console />
  </div>
</template>

<script>
// @ is an alias to /src
import Console from "@/components/Console.vue";

export default {
  name: "Home",
  components: {
    Console,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
