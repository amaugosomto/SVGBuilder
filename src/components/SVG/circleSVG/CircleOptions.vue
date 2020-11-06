<template>
  <div class="mt-2" id="circle">
    <h5 id="title">CIRCLE SVG OPTIONS</h5>

    <div class="mb-1">
      <label for="preset">Select preset options</label>
      <select name="" id="preset" v-model="preset" class="form-control" @change="setPresetValues($event)">
        <option value="select">select</option>
        <option value="redGreenCircle">red bordered green circle</option>
        <option value="greenBrownCircle">green bordered brown circle</option>
        <option value="blueCircle">blue circle</option>
        <option value="whiteCircle">white circle</option>
      </select>
    </div>

    <div class="options">
      <div>
        <label for="cx"> <span style="color: red">*</span> cx</label>
        <input class="form-control" type="number" min="0" 
          id="cx"  name="search" placeholder="cx.."
          :value="cx" @input="updateValue($event)">
          <small id="ctxValidation" class="validator" style="display:none"></small>
      </div>
      
      <div class="mx-1">
        <label for="cy"> <span style="color: red">*</span> cy</label>
        <input type="number" min="0" id="cy" class="form-control" 
          name="search" placeholder="cy.." :value="cy" @input="updateValue($event)">
          <small id="cyValidation" class="validator" style="display:none"></small>
      </div>
      
      <div>
        <label for="r"> <span style="color: red">*</span> r</label>
        <input type="number" min="0" id="r" class="form-control" 
          name="search" placeholder="radius.." :value="r" @input="updateValue($event)">
          <small id="rValidation" class="validator" style="display:none"></small>
      </div>
      
    </div>

    <div class="options mt-1">
      <div>
        <label for="stroke"> <span style="color: red">*</span> stroke</label>
        <select name="" id="stroke" class="form-control" :value="stroke" @input="updateValue($event)">
          <option value="select">select</option>
          <option v-for="color in colors" :key="color" v-bind:value="color">
            {{ color }}
          </option>
        </select>
        <small id="strokeValidation" class="validator" style="display:none"></small>
      </div>
      
      <div class="mx-1">
        <label for="strokewidth"> <span style="color: red">*</span> stroke width</label>
        <input type="number" min="0" id="strokewidth" class="form-control" 
          name="search" placeholder="stroke width" :value="strokeWidth" @input="updateValue($event)">
        <small id="strokewidthValidation" class="validator" style="display:none"></small>
      </div>
      
      <div>
        <label for="fill"> <span style="color: red">*</span> fill</label>
        <select name="" id="fill" class="form-control" :value="fill" @input="updateValue($event)">
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
#circle {
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
</style>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

import { required } from "../../../misc/validators";
import { generalMixin } from "../../../misc/mixins";

export default {
  data() {
    return {
      presetColors: {
        redGreenCircle: {
          cx: 50,
          cy: 50,
          r: 40,
          strokeWidth:4,
          stroke: "Red",
          fill: "Green"
        },
        greenBrownCircle: {
          cx: 50,
          cy: 50,
          r: 40,
          strokeWidth:4,
          stroke: "Green",
          fill: "Brown"
        },
        blueCircle: {
          cx: 50,
          cy: 50,
          r: 40,
          strokeWidth:4,
          stroke: "Blue",
          fill: "Blue"
        },
        whiteCircle: {
          cx: 50,
          cy: 50,
          r: 40,
          strokeWidth:4,
          stroke: "White",
          fill: "White"
        }
      }
    }
  },
  methods: {
    setPresetValues(event) {
      let value = event.target.value;

      if (value !== "select"){
        let presetValue = this.presetColors[value];

        this.circleState.circleOptionsComponent.cx = presetValue.cx;
        this.circleState.circleOptionsComponent.cy = presetValue.cy;
        this.circleState.circleOptionsComponent.r = presetValue.r;
        this.circleState.circleOptionsComponent.strokeWidth = presetValue.strokeWidth;
        this.circleState.circleOptionsComponent.stroke = presetValue.stroke;
        this.circleState.circleOptionsComponent.fill = presetValue.fill;

        this.$store.commit("saveToLocalStorage");
      }
      
    },
    ...mapActions([
      "saveSVGValues",
      "setCircleOptionsComponentUpdate"
    ]),
    validateCircleSVGOptions(){
      
      let ctx = required("cx");
      let cy = required("cy");
      let r = required("r");
      let stroke = required("stroke");
      let strokewidth = required("strokewidth");
      let fill = required("fill");

      this.toggleValidationElement("ctxValidation", ctx);
      this.toggleValidationElement("cyValidation", cy);
      this.toggleValidationElement("rValidation", r);
      this.toggleValidationElement("strokeValidation", stroke);
      this.toggleValidationElement("strokewidthValidation", strokewidth);
      this.toggleValidationElement("fillValidation", fill);

      if (!ctx || !cy || !r || !stroke || !strokewidth || !fill)
        return false;

      return true;
    },
    clearFields(){
      this.circleState.circleOptionsComponent.cx = "",
      this.circleState.circleOptionsComponent.cy = "",
      this.circleState.circleOptionsComponent.r = "",
      this.circleState.circleOptionsComponent.strokeWidth = "",
      this.circleState.circleOptionsComponent.stroke = "select",
      this.circleState.circleOptionsComponent.fill = "select"
      this.$store.state.circleState.circleSVGPreset = "select";

      var x = document.getElementsByClassName("validator");
      for (var i = 0; i < x.length; i++) {
          x[i].style.display = "none";
          x[i].innerHTML = "";
      }

      this.$store.commit("saveToLocalStorage");
    },
    updateValue(event){
      let payload = {
        [event.target.id] : event.target.value,
        mode: ""
      }

      this.setCircleOptionsComponentUpdate(payload);
    }
  },
  computed: {
    ...mapState(["circleState"]),
    ...mapGetters({colors : 'getColors'}),
    cx() {
      return this.circleState.circleOptionsComponent.cx;
    },
    cy() {
      return this.circleState.circleOptionsComponent.cy;
    },
    r() {
      return this.circleState.circleOptionsComponent.r;
    },
    stroke() {
      return this.circleState.circleOptionsComponent.stroke;
    },
    strokeWidth() {
      return this.circleState.circleOptionsComponent.strokeWidth;
    },
    fill() {
      return this.circleState.circleOptionsComponent.fill;
    },
    preset: {
      get() {
        return this.circleState.circleSVGPreset
      },
      set (value) {
        this.circleState.circleSVGPreset = value;
        this.$store.commit("saveToLocalStorage");
      }
    }

  },
  mixins: [ generalMixin ]
}
</script>