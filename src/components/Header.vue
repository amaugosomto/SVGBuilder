<template>
  <nav>
    <h1 class="logo">SVG Builder</h1>
    <ul>
      <li><a href="#" class="btn">Home</a></li>
      <li><a href="#" class="btn btn-danger" @click="resetAll">Reset</a></li>

    </ul>
  </nav>
</template>

<style lang="scss">
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul {
      display: flex;
      list-style-type: none;
    }

    li {
      padding: 5px;
    }

    a {
      color: set-text-color($primary-color);
    }

    a:hover {
      color: $secondary_color;
    }
  }
</style>

<script>
export default {
  methods: {
    resetAll() {
      this.$store.commit("resetAll");
    }
  }
}
</script>
