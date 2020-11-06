<template>
  <svg width="400px" height="180px" class="rectangleSVG" viewBox="200 0 200 200">
    <rect v-bind="points" v-bind:style="styleObject" />
</svg>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      "getRectangleSVGOptions"
    ]),
    points() {
      return {
        x : this.getRectangleSVGOptions.x,
        y : this.getRectangleSVGOptions.y,
        rx : this.getRectangleSVGOptions.rx,
        ry : this.getRectangleSVGOptions.ry,
        width : this.getRectangleSVGOptions.width,
        height : this.getRectangleSVGOptions.height
      }
    },
    styleObject() {
      return {
        fill: this.getRectangleSVGOptions.fill,
        stroke: this.getRectangleSVGOptions.stroke,
        "stroke-width": this.getRectangleSVGOptions.strokeWidth,
        "fill-opacity": this.getRectangleSVGOptions.fillOpacity,
        "stroke-opacity": this.getRectangleSVGOptions.strokeOpacity
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rectangleSVG{
  overflow: visible;
  position: absolute;
}
</style>