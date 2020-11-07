<template>
  <svg width="200px" height="200px" class="polygonSVG">
    <polygon v-bind="points" v-bind:style="styleObject" />
</svg>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      "getPolygonSVGOptions"
    ]),
    points() {
      return {
        points : this.getPolygonSVGOptions.points
      }
    },
    styleObject() {
      return {
        fill: this.getPolygonSVGOptions.fill,
        stroke: this.getPolygonSVGOptions.stroke,
        "stroke-width": this.getPolygonSVGOptions.strokeWidth,
        "fill-rule": this.getPolygonSVGOptions.fillrule == "select" ? "" : this.getPolygonSVGOptions.fillrule
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.polygonSVG{
  overflow: visible;
}
</style>