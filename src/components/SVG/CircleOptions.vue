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
          v-model="cx">
          <small id="ctxValidation" class="validator" style="display:none"></small>
      </div>
      
      <div class="mx-1">
        <label for="cy">cy</label>
        <input type="number" min="0" id="cy" class="form-control" 
          name="search" placeholder="cy.." v-model="cy">
          <small id="cyValidation" class="validator" style="display:none"></small>
      </div>
      
      <div>
        <label for="r">r</label>
        <input type="number" min="0" id="r" class="form-control" 
          name="search" placeholder="radius.." v-model="r">
          <small id="rValidation" class="validator" style="display:none"></small>
      </div>
      
    </div>

    <div class="options mt-1">
      <div>
        <label for="stroke">stroke</label>
        <select name="" id="stroke" class="form-control" v-model="stroke">
          <option value="select">select</option>
          <option v-for="color in colors" :key="color" v-bind:value="color">
            {{ color }}
          </option>
        </select>
        <small id="strokeValidation" class="validator" style="display:none"></small>
      </div>
      
      <div class="mx-1">
        <label for="strokewidth">stroke width</label>
        <input type="number" min="0" id="strokewidth" class="form-control" 
          name="search" placeholder="stroke width" v-model="strokeWidth">
        <small id="strokewidthValidation" class="validator" style="display:none"></small>
      </div>
      
      <div>
        <label for="fill">fill</label>
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
import { mapState } from "vuex";

import { required } from "../../misc/validators";
import { validatorMixin } from "../../misc/mixins";

export default {
  data() {
    return {
      colors : [
        "AliceBlue",
        "AntiqueWhite",
        "Aqua",
        "Aquamarine",
        "Azure",
        "Beige",
        "Bisque",
        "Black",
        "BlanchedAlmond",
        "Blue",
        "BlueViolet",
        "Brown",
        "BurlyWood",
        "CadetBlue",
        "Chartreuse",
        "Chocolate",
        "Coral",
        "CornflowerBlue",
        "Cornsilk",
        "Crimson",
        "Cyan",
        "DarkBlue",
        "DarkCyan",
        "DarkGoldenRod",
        "DarkGray",
        "DarkGrey",
        "DarkGreen",
        "DarkKhaki",
        "DarkMagenta",
        "DarkOliveGreen",
        "DarkOrange",
        "DarkOrchid",
        "DarkRed",
        "DarkSalmon",
        "DarkSeaGreen",
        "DarkSlateBlue",
        "DarkSlateGray",
        "DarkSlateGrey",
        "DarkTurquoise",
        "DarkViolet",
        "DeepPink",
        "DeepSkyBlue",
        "DimGray",
        "DimGrey",
        "DodgerBlue",
        "FireBrick",
        "FloralWhite",
        "ForestGreen",
        "Fuchsia",
        "Gainsboro",
        "GhostWhite",
        "Gold",
        "GoldenRod",
        "Gray",
        "Grey",
        "Green",
        "GreenYellow",
        "HoneyDew",
        "HotPink",
        "IndianRed",
        "Indigo",
        "Ivory",
        "Khaki",
        "Lavender",
        "LavenderBlush",
        "LawnGreen",
        "LemonChiffon",
        "LightBlue",
        "LightCoral",
        "LightCyan",
        "LightGoldenRodYellow",
        "LightGray",
        "LightGrey",
        "LightGreen",
        "LightPink",
        "LightSalmon",
        "LightSeaGreen",
        "LightSkyBlue",
        "LightSlateGray",
        "LightSlateGrey",
        "LightSteelBlue",
        "LightYellow",
        "Lime",
        "LimeGreen",
        "Linen",
        "Magenta",
        "Maroon",
        "MediumAquaMarine",
        "MediumBlue",
        "MediumOrchid",
        "MediumPurple",
        "MediumSeaGreen",
        "MediumSlateBlue",
        "MediumSpringGreen",
        "MediumTurquoise",
        "MediumVioletRed",
        "MidnightBlue",
        "MintCream",
        "MistyRose",
        "Moccasin",
        "NavajoWhite",
        "Navy",
        "OldLace",
        "Olive",
        "OliveDrab",
        "Orange",
        "OrangeRed",
        "Orchid",
        "PaleGoldenRod",
        "PaleGreen",
        "PaleTurquoise",
        "PaleVioletRed",
        "PapayaWhip",
        "PeachPuff",
        "Peru",
        "Pink",
        "Plum",
        "PowderBlue",
        "Purple",
        "RebeccaPurple",
        "Red",
        "RosyBrown",
        "RoyalBlue",
        "SaddleBrown",
        "Salmon",
        "SandyBrown",
        "SeaGreen",
        "SeaShell",
        "Sienna",
        "Silver",
        "SkyBlue",
        "SlateBlue",
        "SlateGray",
        "SlateGrey",
        "Snow",
        "SpringGreen",
        "SteelBlue",
        "Tan",
        "Teal",
        "Thistle",
        "Tomato",
        "Turquoise",
        "Violet",
        "Wheat",
        "White",
        "WhiteSmoke",
        "Yellow",
        "YellowGreen",
      ],
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

        this.circleOptionsComponent.cx = presetValue.cx;
        this.circleOptionsComponent.cy = presetValue.cy;
        this.circleOptionsComponent.r = presetValue.r;
        this.circleOptionsComponent.strokeWidth = presetValue.strokeWidth;
        this.circleOptionsComponent.stroke = presetValue.stroke;
        this.circleOptionsComponent.fill = presetValue.fill;

        this.$store.commit("saveToLocalStorage");
      }
      
    },
    drawSVG(){
      let svgOptionsValue = document.getElementById("svgMode").value;
      let validated = false;

      if (svgOptionsValue === "circle"){
        validated = this.validateCircleSVGOptions();
      }

      if (validated === false)
        return;

      let circleData = {
        cx: this.circleOptionsComponent.cx,
        cy: this.circleOptionsComponent.cy,
        r: this.circleOptionsComponent.r,
        strokeWidth: this.circleOptionsComponent.strokeWidth,
        stroke: this.circleOptionsComponent.stroke,
        fill: this.circleOptionsComponent.fill,
      }

      let payload = {
        data : circleData,
        svgSelectedOption: document.getElementById("svgMode").value
      }

      this.saveSVGValues(payload);
    },
    ...mapActions([
      "saveSVGValues"
    ]),
    validateCircleSVGOptions(){
      
      let ctx = required("cx");
      let cy = required("cy");
      let r = required("r");
      let stroke = required("stroke");
      let strokewidth = required("strokewidth");
      let fill = required("fill");

      if (ctx === false){
        this.toggleValidationElement("ctxValidation", false);
      } else {
        this.toggleValidationElement("ctxValidation", true);
      }

      if (cy === false ) {
        this.toggleValidationElement("cyValidation", false);
      } else {
        this.toggleValidationElement("cyValidation", true);
      }

      if (r === false ) {
        this.toggleValidationElement("rValidation", false);
      } else {
        this.toggleValidationElement("rValidation", true);
      }

      if (stroke === false ) {
        this.toggleValidationElement("strokeValidation", false);
      } else {
        this.toggleValidationElement("strokeValidation", true);
      }

      if (strokewidth === false ) {
        this.toggleValidationElement("strokewidthValidation", false);
      } else {
        this.toggleValidationElement("strokewidthValidation", true);
      }

      if (fill === false ) {
        this.toggleValidationElement("fillValidation", false);
      } else {
        this.toggleValidationElement("fillValidation", true);
      }

      if (!ctx || !cy || !r || !stroke || !strokewidth || !fill)
        return false;

      return true;
    },
    clearFields(){
      this.circleOptionsComponent.cx = "",
      this.circleOptionsComponent.cy = "",
      this.circleOptionsComponent.r = "",
      this.circleOptionsComponent.strokeWidth = "",
      this.circleOptionsComponent.stroke = "select",
      this.circleOptionsComponent.fill = "select"
      this.$store.state.circleSVGPreset = "select";

      var x = document.getElementsByClassName("validator");
      for (var i = 0; i < x.length; i++) {
          x[i].style.display = "none";
          x[i].innerHTML = "";
      }

      this.$store.commit("saveToLocalStorage");
    }
  },
  computed: {
    ...mapState(["circleOptionsComponent"]),
    cx: {
      get() {
        return this.circleOptionsComponent.cx;
      },
      set (value) {
        let payload = {"cx" : value, mode: ""};
        this.$store.dispatch("setCircleOptionsComponentUpdate", payload);
      }
    },
    cy: {
      get() {
        return this.circleOptionsComponent.cy;
      },
      set (value) {
        let payload = {"cy" : value, mode: ""};
        this.$store.dispatch("setCircleOptionsComponentUpdate", payload);
      }
    },
    r: {
      get() {
        return this.circleOptionsComponent.r;
      },
      set (value) {
        let payload = {"r" : value, mode: ""};
        this.$store.dispatch("setCircleOptionsComponentUpdate", payload);
      }
    },
    stroke: {
      get() {
        return this.circleOptionsComponent.stroke;
      },
      set (value) {
        let payload = {"stroke" : value, mode: ""};
        this.$store.dispatch("setCircleOptionsComponentUpdate", payload);
      }
    },
    strokeWidth: {
      get() {
        return this.circleOptionsComponent.strokeWidth;
      },
      set (value) {
        let payload = {"strokeWidth" : value, mode: ""};
        this.$store.dispatch("setCircleOptionsComponentUpdate", payload);
      }
    },
    fill: {
      get() {
        return this.circleOptionsComponent.fill;
      },
      set (value) {
        let payload = {"fill" : value, mode: ""};
        this.$store.dispatch("setCircleOptionsComponentUpdate", payload);
      }
    },
    preset: {
      get() {
        return this.$store.state.circleSVGPreset
      },
      set (value) {
        this.$store.state.circleSVGPreset = value;
        this.$store.commit("saveToLocalStorage");
      }
    }

  },
  mixins: [ validatorMixin ]
}
</script>