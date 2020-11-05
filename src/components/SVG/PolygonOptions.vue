<template>
  <div class="mt-2" id="polygon">
    <h5 id="title">POLYGON SVG OPTIONS</h5>

    <div class="mb-1">
      <label for="preset">Select preset options</label>
      <select name="" id="polygonPreset" v-model="preset" class="form-control" >
        <option value="select">select</option>
        <option value="purpleGreenTriangle">purple bordered green triangle</option>
        <option value="fourBrownBlueTriangle">brown bordered blue triangle</option>
        <option value="purpleGreenStar">green bordered green star</option>
        <option value="redBrownStar">red bordered brown star</option>
      </select>
    </div>

    <div class="options">
      <div class="mr-1 form-group">
        <label for="points"> <span style="color: red">*</span> points</label>
        <input class="form-control" type="text"
          id="points"  name="search" placeholder="points.."
          v-model="points">
          <small id="pointsValidation" class="validator" style="display:none"></small>
      </div>

      <div class="form-group">
        <label for="fillrule">fill rule</label>
        <select name="" id="fillrule" class="form-control" v-model="fillrule">
          <option value="select">select</option>
          <option value="nonzero">nonzero</option>
          <option value="evenodd">evenodd</option>
        </select>
        <small id="fillruleValidation" class="validator" style="display:none"></small>
      </div>
    </div>

    <div class="options mt-1">
      <div class="form-group">
        <label for="stroke"> <span style="color: red">*</span> stroke</label>
        <select name="" id="stroke" class="form-control" v-model="stroke">
          <option value="select">select</option>
          <option v-for="color in colors" :key="color" v-bind:value="color">
            {{ color }}
          </option>
        </select>
        <small id="strokeValidation" class="validator" style="display:none"></small>
      </div>
      
      <div class="mx-1 form-group">
        <label for="strokewidth"> <span style="color: red">*</span> stroke width</label>
        <input type="number" min="0" id="strokewidth" class="form-control" 
          name="search" placeholder="stroke width" v-model="strokeWidth">
        <small id="strokewidthValidation" class="validator" style="display:none"></small>
      </div>
      
      <div class="form-group">
        <label for="fill"> <span style="color: red">*</span> fill</label>
        <select name="" id="fill" class="form-control" v-model="fill">
          <option value="select">select</option>
          <option v-for="color in colors" :key="color" v-bind:value="color">
            {{ color }}
          </option>
        </select>
        <small id="fillValidation" class="validator" style="display:none"></small>
      </div>
      
    </div>
    
    <div class="text-right mt-2">
      <button class="btn btn-primary" @click="clearFields"> Clear Fields</button>
      <button class="btn btn-secondary" @click="drawSVG"> Draw SVG</button>
    </div>
         
  </div>
</template>

<style lang="scss" scoped>
#polygon {
  input {
    margin: 0 5px;
  }
  & .options {
    display: flex;
  }
  label {
    display: block;
  }
}
small{
  color: red;
}
.form-group{
  width: 100%;;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({colors : 'getColors'})
  }
}
</script>
