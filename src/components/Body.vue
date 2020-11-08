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
                
                <div class="inputGroup">
                  <label for="history">Select History</label>
                  <div style="display:flex">
                    <select name="history" id="history" v-model="history" class="form-control" @change="onHistoryChange($event.target.value)">
                      <option value="select" selected>Select</option>
                      <option v-for="history in getHistories" :key="history.payload.labelName" :value="history.payload.labelName">
                        {{ history.payload.label +  history.payload.time}}
                      </option>
                    </select>
                    <img :src="image" alt="" srcset="" width="30" class="ml-1" @click="clearHistory()">
                  </div>
                </div>
                
              </div>
              
              <keep-alive>
                <transition name="fade" mode="out-in">
                  <component v-bind:is="svgBuilderOptionsComponent" /> 
                </transition>
              </keep-alive>

            </div>
          </div>
        </div>

        <div class="mb-2">
          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @enter-cancelled="enterCancelled"

            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
            @leave-cancelled="leaveCancelled"
            :css="false"
            >
            <component v-bind:is="getSVGViewComponent" v-if="showSVGComponent"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

import image from "../assets/trash.png";

import Header from "./Header";
import CircleOptions from './SVG/circleSVG/CircleOptions';
import PolygonOptions from './SVG/polygonSVG/PolygonOptions';
import RectangleOptions from './SVG/rectangleSVG/rectangleOptions';
import emptyComponent from "./emptyComponent";

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
    RectangleSVG,
    emptyComponent
  },
  data (){
    return {
      image
    }
  },
  methods: {
    onSVGOptionsChange(event) {
      let value = event.target.value;
      this.toggleComponent(value);
    },
    ...mapActions([
      'toggleComponent',
      'setBaseState',
      "onHistoryChange",
      "clearHistory"
    ]),
    beforeEnter(el) {
      this.elementWidth = 100;
      el.style.width = this.elementWidth + 'px';
    },
    enter(el, done) {
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = (this.elementWidth + round * 10) + 'px';
        round++;
        if (round > 15) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter() {
      // console.log('afterEnter');
    },
    enterCancelled() {
      // console.log('enterCancelled');
    },
    beforeLeave(el) {
      this.elementWidth = 300;
      el.style.width = this.elementWidth + 'px';
    },
    leave(el, done) {
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = (this.elementWidth - round * 10) + 'px';
        round++;
        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave() {
      // console.log('afterLeave');
    },
    leaveCancelled() {
      // console.log('leaveCancelled');
    }
  },
  computed: {
    ...mapGetters([
      'svgBuilderOptionsComponent',
      'getSVGViewComponent',
      "showSVGComponent",
      "getHistories"
    ]),
    svgMode : {
      get() {
        return this.$store.state.svgMode;
      },
      set(value) {
        this.$store.commit("svgModeUpdate", value);
      }
    },
    history : {
      get() {
        return this.$store.state.history;
      },
      set(value) {
        this.$store.state.history = value;
        this.$store.commit("saveToLocalStorage");
      }
    }
  },
  created() {
    let localStorageVal = localStorage.getItem("userState");

    if (localStorageVal !== null){
      this.setBaseState(JSON.parse(localStorageVal));
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
  min-height: 100vh;
  background-image: linear-gradient(to right , lighten(#d6ffff, 30%), #C0C0C0);
  &-content {
    height: 100%;
    width: 100%;
    display: flex;

    & > div{
      display: flex;
      align-items: center;
      width: 50%;
      justify-content: center;
      margin-top: 30px;
      position: relative;
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

img {
  cursor: pointer;
}

.card {
  border-radius: 10px;
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

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .4s;
}

.fade-leave-active {
  transition: opacity .4s;
  opacity: 0;
}

.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity .5s;
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
}

@media(max-width: 700px){
  .showcase {
    &-content{
      flex-direction: column;

      & > div {
        width: 100%;
      }

      & > div:nth-child(2){
        margin-top: 10px;
      }

      h1 {
        font-size: 30px;
        line-height: 1.2;
      }

    }
  }
  
  #title{
    font-size: 14px;
    line-height: 20px;
  }

}

@keyframes slide-in {
  from{
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from{
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}
</style>