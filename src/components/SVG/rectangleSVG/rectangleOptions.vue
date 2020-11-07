<template>
  <div class="mt-2" id="rectangle">
    <h5 id="title">RECTANGLE SVG OPTIONS</h5>

    <div class="mb-1">
      <label for="rectanglePreset">Select preset options</label>
      <select name="" id="rectanglePreset" v-model="preset" class="form-control" @change="setPresetValues($event)">
        <option value="select">select</option>
        <option value="blueRedRectangle">blue bordered red rectangle</option>
        <option value="brownGreenOpaqRectangle">brown bordered green opaque rectangle</option>
        <option value="greenPurpleRoundOpaqRectangle">green bordered purple round opaque Rectangle</option>
      </select>
    </div>

    <div class="options">
      <div>
        <label for="x"> x</label>
        <input class="form-control" type="text"
          id="x"  name="search" placeholder="x.."
          :value="x" @input="updateValue($event)">
      </div>

      <div class="">
        <label for="y">y</label>
        <input class="form-control" type="text"
          id="y"  name="search" placeholder="y.."
          :value="y" @input="updateValue($event)">
      </div>

      <div>
        <label for="rx">rx</label>
        <input class="form-control" type="text"
          id="rx"  name="search" placeholder="rx.."
          :value="rx" @input="updateValue($event)">
      </div>

      <div class="">
        <label for="ry">ry</label>
        <input class="form-control" type="text"
          id="ry"  name="search" placeholder="ry.."
          :value="ry" @input="updateValue($event)">
      </div>
    </div>

    <div class="options mt-1">
      <div class="form-group">
        <label for="width"> <span style="color: red">*</span>  width</label>
        <input class="form-control" type="text"
          id="width"  name="search" placeholder="width.."
          :value="width" @input="updateValue($event)">
        <small id="widthValidation" class="validator" style="display:none"></small>
      </div>

      <div class="form-group">
        <label for="height"> <span style="color: red">*</span> height</label>
        <input class="form-control" type="text"
          id="height"  name="search" placeholder="height.."
          :value="height" @input="updateValue($event)">
        <small id="heightValidation" class="validator" style="display:none"></small>
      </div>

      <div class="form-group">
        <label for="fillOpacity">fill opacity</label>
        <input class="form-control" type="text"
          id="fillOpacity"  name="search" placeholder="fill opacity.."
          :value="fillOpacity" @input="updateValue($event)">
      </div>

      <div class="form-group">
        <label for="strokeOpacity">stroke opacity</label>
        <input class="form-control" type="text"
          id="strokeOpacity"  name="search" placeholder="stroke opacity.."
          :value="strokeOpacity" @input="updateValue($event)">
      </div>
    </div>

    <div class="options mt-1">
      <div class="form-group">
        <label for="stroke"> <span style="color: red">*</span> stroke</label>
        <select name="" id="stroke" class="form-control" 
          :value="stroke" @input="updateValue($event)">
          <option value="select">select</option>
          <option v-for="color in colors" :key="color" v-bind:value="color">
            {{ color }}
          </option>
        </select>
        <small id="strokeValidation" class="validator" style="display:none"></small>
      </div>
      
      <div class="form-group">
        <label for="strokeWidth"> <span style="color: red">*</span> stroke width</label>
        <input type="number" min="0" id="strokeWidth" class="form-control" 
          name="search" placeholder="stroke width" 
          :value="strokeWidth" @input="updateValue($event)">
        <small id="strokewidthValidation" class="validator" style="display:none"></small>
      </div>
      
      <div class="form-group">
        <label for="fill"> <span style="color: red">*</span> fill</label>
        <select name="" id="fill" class="form-control" 
          :value="fill" @input="updateValue($event)">
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
#rectangle {
  input {
    margin: 0 5px;
  }
  & .options {
    display: flex;
    
    & > div:nth-child(2){
      margin: 0 1rem;
    }
    
    & > div:nth-child(4){
      margin-left: 1rem;
    }
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
  
@media(max-width: 700px){
  #rectangle {
    & .options {
      flex-direction: column;

       & > div:nth-child(2){
        margin: 0;
      }

      & > div {
        width: 100% !important;
      }

      & > div:nth-child(4){
        margin-left: 0;
      }
    }
   
  }

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
      presetValues: {
        blueRedRectangle: {
          x: "",
          y: "",
          rx: "",
          ry: "",
          width: "150",
          height: "200",
          fillOpacity: "",
          strokeOpacity: "",
          stroke: "Blue",
          strokeWidth: "2",
          fill: "Red"
        },
        brownGreenOpaqRectangle: {
          x: "",
          y: "",
          rx: "",
          ry: "",
          width: "150",
          height: "150",
          fillOpacity: "0.3",
          strokeOpacity: "0.7",
          stroke: "Brown",
          strokeWidth: "2",
          fill: "Green"
        },
        greenPurpleRoundOpaqRectangle: {
          x: "50",
          y: "20",
          rx: "20",
          ry: "20",
          width: "150",
          height: "150",
          fillOpacity: "0.3",
          strokeOpacity: "0.7",
          stroke: "Green",
          strokeWidth: "2",
          fill: "Purple"
        }
      }
    }
  },
  computed: {
    ...mapState(["rectangleState"]),
    ...mapGetters({
      colors : 'getColors',
      initialState: "getInitialRectangleOptionsState"
    }),
    x() {
      return this.rectangleState.rectangleOptionsComponent.x;
    },
    y() {
      return this.rectangleState.rectangleOptionsComponent.y;
    },
    rx() {
      return this.rectangleState.rectangleOptionsComponent.rx;
    },
    ry() {
      return this.rectangleState.rectangleOptionsComponent.ry;
    },
    width() {
      return this.rectangleState.rectangleOptionsComponent.width;
    },
    height() {
      return this.rectangleState.rectangleOptionsComponent.height;
    },
    fillOpacity() {
      return this.rectangleState.rectangleOptionsComponent.fillOpacity;
    },
    strokeOpacity() {
      return this.rectangleState.rectangleOptionsComponent.strokeOpacity;
    },
    stroke() {
      return this.rectangleState.rectangleOptionsComponent.stroke;
    },
    strokeWidth() {
      return this.rectangleState.rectangleOptionsComponent.strokeWidth;
    },
    fill() {
      return this.rectangleState.rectangleOptionsComponent.fill;
    },
    preset: {
      get() {
        return this.rectangleState.rectangleOptionsComponent.rectangleSVGPreset;
      },
      set (value) {
        this.rectangleState.rectangleOptionsComponent.rectangleSVGPreset = value;
        this.$store.commit("saveToLocalStorage");
      }
    }
  },
  methods: {
    ...mapActions([
      "saveSVGValues",
      "setRectangleOptionsComponentUpdate"
    ]),
    setPresetValues(event) {
      let value = event.target.value;
      
      if (value !== "select"){
        let presetValue = this.presetValues[value];
        presetValue.rectangleSVGPreset = this.preset;

        this.$store.commit("setRectangleComponentState", presetValue);
        this.$store.commit("saveToLocalStorage");
      }
       
    },
    validateRectangleSVGOptions(){
      let width = required("width");
      let height = required("height");
      let stroke = required("stroke");
      let strokewidth = required("strokeWidth");
      let fill = required("fill");

      this.toggleValidationElement("widthValidation", width);
      this.toggleValidationElement("heightValidation", height);
      this.toggleValidationElement("strokeValidation", stroke);
      this.toggleValidationElement("strokewidthValidation", strokewidth);
      this.toggleValidationElement("fillValidation", fill);

      if (!width || !height || !stroke || !strokewidth || !fill)
        return false;

      return true;
    },
    updateValue(event){
      let payload = {
        [event.target.id] : event.target.value
      }

      this.setRectangleOptionsComponentUpdate(payload);
    },
    clearFields(){
      let initialRectangleState = this.initialState;

      this.$store.commit("setRectangleComponentState", initialRectangleState);

      var x = document.getElementsByClassName("validator");
      for (var i = 0; i < x.length; i++) {
          x[i].style.display = "none";
          x[i].innerHTML = "";
      }
      this.$store.commit("saveToLocalStorage");
    }
  },
  mixins: [ generalMixin ]
}
</script>
