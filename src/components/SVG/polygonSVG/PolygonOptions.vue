<template>
  <div class="mt-2" id="polygon">
    <h5 id="title">POLYGON SVG OPTIONS</h5>

    <div class="mb-1">
      <label for="preset">Select preset options</label>
      <select name="" id="polygonPreset" v-model="preset" class="form-control" @change="setPresetValues($event)">
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
          :value="points" @input="updateValue($event)">
          <small id="pointsValidation" class="validator" style="display:none"></small>
      </div>

      <div class="form-group" style="width: 50%">
        <label for="fillrule">fill rule</label>
        <select name="" id="fillrule" class="form-control" 
          :value="fillrule" @input="updateValue($event)">
          <option value="select">select</option>
          <option value="nonzero">nonzero</option>
          <option value="evenodd">evenodd</option>
        </select>
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
      
      <div class="mx-1 form-group">
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
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

import { required } from "../../../misc/validators";
import { generalMixin } from "../../../misc/mixins";

export default {
  data() {
    return {
      presetValues: {
        purpleGreenTriangle: {
          points: "200,20 270,210 150,210",
          fillrule: "select",
          strokeWidth:2,
          stroke: "Purple",
          fill: "Lime"
        },
        fourBrownBlueTriangle: {
          points: "220,10 300,210 170,250 123,234",
          fillrule: "select",
          strokeWidth:2,
          stroke: "Brown",
          fill: "Blue"
        },
        purpleGreenStar: {
          points: "100,10 40,198 190,78 10,78 161,198",
          fillrule: "nonzero",
          strokeWidth:2,
          stroke: "Brown",
          fill: "Blue"
        }, 
        redBrownStar: {
          points: "100,10 40,198 190,78 10,78 160,198",
          fillrule: "evenodd",
          strokeWidth:2,
          stroke: "Red",
          fill: "Brown"
        }
      }
    }
  },
  computed: {
    ...mapState(["polygonState"]),
    ...mapGetters({
      colors : 'getColors',
      initialState: "getInitialPolygonOptionsState"
    }),
    points() {
      return this.polygonState.polygonOptionsComponent.points;
    },
    fillrule() {
      return this.polygonState.polygonOptionsComponent.fillrule;
    },
    stroke() {
      return this.polygonState.polygonOptionsComponent.stroke;
    },
    strokeWidth() {
      return this.polygonState.polygonOptionsComponent.strokeWidth;
    },
    fill() {
      return this.polygonState.polygonOptionsComponent.fill;
    },
    preset: {
      get() {
        return this.polygonState.polygonOptionsComponent.polygonSVGPreset;
      },
      set (value) {
        this.polygonState.polygonOptionsComponent.polygonSVGPreset = value;
        this.$store.commit("saveToLocalStorage");
      }
    }
  },
  methods: {
    ...mapActions([
      "saveSVGValues",
      "setPolygonOptionsComponentUpdate"
    ]),
    setPresetValues(event) {
      let value = event.target.value;
      
      if (value !== "select"){
        let presetValue = this.presetValues[value];
        presetValue.polygonSVGPreset = this.preset;

        this.$store.commit("setPolygonComponentState", presetValue);
        this.$store.commit("saveToLocalStorage");
      }
       
    },
    validatePolygonSVGOptions(){
      
      let points = required("points");
      let stroke = required("stroke");
      let strokewidth = required("strokeWidth");
      let fill = required("fill");

      this.toggleValidationElement("pointsValidation", points);
      this.toggleValidationElement("strokeValidation", stroke);
      this.toggleValidationElement("strokewidthValidation", strokewidth);
      this.toggleValidationElement("fillValidation", fill);

      if (!points || !stroke || !strokewidth || !fill)
        return false;

      return true;
    },
    updateValue(event){
      let payload = {
        [event.target.id] : event.target.value,
        mode: "",
        isLast: true
      }

      this.setPolygonOptionsComponentUpdate(payload);
    },
    clearFields(){
      
      let initialPolygonState = this.initialState;

      this.$store.commit("setPolygonComponentState", initialPolygonState);

      var x = document.getElementsByClassName("validator");
      for (var i = 0; i < x.length; i++) {
          x[i].style.display = "none";
          x[i].innerHTML = "";
      }

      this.$store.commit("saveToLocalStorage");
    }
  },
  mixins: [ generalMixin ],
  created() {
    let localStorageVal = JSON.parse(localStorage.getItem("userState"));
    let hasStateProperty = Object.prototype.hasOwnProperty.call(localStorageVal, "polygonState");

    if (localStorageVal !== null){
      if (hasStateProperty){
        this.$store.commit("setPolygonInitialState", ({...localStorageVal.polygonState}));
      }else {
        this.$store.commit("setPolygonInitialState", this.initialState);
      }
    } else {
      this.$store.commit("setPolygonInitialState", this.initialState);
    }
  }
}
</script>
