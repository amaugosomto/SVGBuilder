<template>
  <svg width="200px" height="200px" class="circleSVG" viewBox="0 0 100 100">
    <circle v-bind="circleSvgOptions" height="100px" weight="100px"/>
</svg>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getCircleSVGOptions'
    ]),
    circleSvgOptions() {
      return {
        cx : this.getCircleSVGOptions.ctx,
        cy : this.getCircleSVGOptions.cy,
        r : this.getCircleSVGOptions.r,
        stroke : this.getCircleSVGOptions.stroke,
        'stroke-width': this.getCircleSVGOptions.strokeWidth,
        fill : this.getCircleSVGOptions.fill
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.circleSVG{
  overflow: visible;
  position: absolute;
}
</style>