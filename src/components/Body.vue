<template>
  <div class="showcase">
    <div class="container">
      <AppHeader />

      <div class="showcase-content">
        <div>
          <div class="card p-2">

            <div class="mt-1">
              <div>
                <div class="inputGroup">
                  <label for="svgMode">Select SVG Mode</label>
                  <select name="selectMode" id="svgMode" v-model="svgMode" class="form-control" @change="onSVGOptionsChange($event)">
                    <option value="select" selected>Select</option>
                    <option value="circle">Circle</option>
                    <option value="polygon">Polygon</option>
                    <option value="rectangle">Rectangle</option>
                  </select>
                </div>
                
              </div>
              
              <keep-alive>
                <component v-bind:is="svgBuilderOptionsComponent" /> 
              </keep-alive>

            </div>
          </div>
        </div>

        <div>
            <component v-bind:is="getSVGViewComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

import Header from "./Header";
import CircleOptions from './SVG/circleSVG/CircleOptions';
import PolygonOptions from './SVG/polygonSVG/PolygonOptions';
import RectangleOptions from './SVG/rectangleSVG/rectangleOptions';

import CircleSVG from './SVG/circleSVG/CircleSVG';
import PolygonSVG from './SVG/polygonSVG/PolygonSVG';
import RectangleSVG from './SVG/rectangleSVG/rectangleSVG';

export default {
  components: {
    AppHeader: Header,
    CircleOptions,
    CircleSVG,
    PolygonOptions,
    PolygonSVG,
    RectangleOptions,
    RectangleSVG
  },
  data (){
    return {
    }
  },
  methods: {
    onSVGOptionsChange(event) {
      let value = event.target.value;
      this.toggleComponent(value);
    },
    ...mapActions([
      'toggleComponent',
      'setInitialState'
    ])
  },
  computed: {
    ...mapGetters([
      'svgBuilderOptionsComponent',
      'getSVGViewComponent'
    ]),
    svgMode : {
      get() {
        return this.$store.state.svgMode;
      },
      set(value) {
        this.$store.commit("svgModeUpdate", value);
      }
    }
  },
  created() {
    let localStorageVal = localStorage.getItem("userState");

    if (localStorageVal !== null){
      this.setInitialState(JSON.parse(localStorageVal));
    }
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}

body {
  background-color: $light-color;
  line-height: 1.6;
}

.showcase {
  @include set-background($dark-color);
  height: 100vh;
  
  &-content {
    height: 100%;
    width: 100%;
    display: flex;

    & > div{
      display: flex;
      align-items: center;
      width: 50%;
      //justify-content: center;
      margin-top: 30px;
    }

    & > div:nth-child(2){
      justify-content: flex-end;
    }

    h1 {
      font-size: 50px;
      line-height: 1.2;
    }

    button {
      justify-self: end;
    }
  }
}
.card {
  border-radius: 5px;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
  width: 100%;
  margin: 0 10px;
}

h5{
  color: black;
}

label {
  color: lighten-color($dark-color, 50%);
}

#title{
  margin: 1em 0 .6em 0;
	padding: 0 0 0 20px;
	font-weight: normal;
	color: black;
	font-family: 'Hammersmith One', sans-serif;
	text-shadow: 0 -1px 0 rgba(0,0,0,0.4);
	position: relative;
	font-size: 20px;
	line-height: 40px;
}

#title:after{
  position: absolute;
	content: "";
	left: 0;
	top: 0;
	bottom: 0;
	width: 5px;
	border-radius: 2px;
	box-shadow: 
		inset 0 1px 1px rgba(0,0,0,0.5), 
    0 1px 1px rgba(255,255,255,0.3);
  background: #3BF;
}

</style>