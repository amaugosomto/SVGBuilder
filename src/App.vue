<template>
  <AppBody  />
</template>

<script>
import Body from "./components/Body.vue";

export default {
  name: "App",
  components: {
    AppBody: Body
  }
};
</script>

<style lang="scss">

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
