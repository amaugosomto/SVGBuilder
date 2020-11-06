import Vue from "vue";
import Vuex from "vuex";

import circleState from './modules/circleSVG';
import polygonState from './modules/poygonSVG';

Vue.use(Vuex);

const colors = [
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
]

export default new Vuex.Store({
  state:{ 
    svgBuilderOptionsComponent: "",
    svgViewComponent: "",
    svgMode: "select",
    colors
  },
  getters: {
    svgBuilderOptionsComponent: state => {
      return state.svgBuilderOptionsComponent;
    },
    getSVGViewComponent: state => {
      return state.svgViewComponent;
    },
    getColors : state => {
      return state.colors
    }
  },
  mutations: {
    svgBuilderOptionsComponent: (state, value) => {
      state.svgBuilderOptionsComponent = value;
    },
    setSVGViewComponent: (state, value) => {
      state.svgViewComponent = value;
    },
    saveToLocalStorage: state => {
      localStorage.setItem("userState", JSON.stringify(state));
    },
    svgModeUpdate: (state, value) => {
      state.svgMode = value;
    },
    resetAll : state => {
      let initialState = {
        svgBuilderOptionsComponent: "",
        svgViewComponent: "",
        svgMode: "select",
        colors,
        circleState : {
          circleSVGOptions: {
            cx: "",
            cy: "",
            r: "",
            stroke: "select",
            strokeWidth: "",
            fill: "select"
          },
          circleOptionsComponent: {
            cx: "",
            cy: "",
            r: "",
            stroke: "select",
            strokeWidth: "",
            fill: "select"
          },
          circleSVGPreset: "select"
        },
        polygonState: {
          polygonSVGOptions: {
            points: "",
            fillrule: "",
            stroke: "select",
            strokeWidth: "",
            fill: "select"
          },
          polygonOptionsComponent: {
            points: "",
            fillrule: "select",
            stroke: "select",
            strokeWidth: "",
            fill: "select"
          },
          polygonSVGPreset: "select"
        }
        
      }

      Object.assign(state, initialState);

      localStorage.removeItem("userState");
    }
  },
  actions: {
    toggleComponent: ({ commit }, value) => {
      switch (value) {
        case "circle":
          commit("svgBuilderOptionsComponent", "CircleOptions");
          break;
        case "polygon":
          commit("svgBuilderOptionsComponent", "PolygonOptions");
          break;
        default:
          commit("svgBuilderOptionsComponent", "");
      }

      commit("saveToLocalStorage");
    },
    saveSVGValues: ({ commit }, payload) => {
      let svgOptions = payload.svgSelectedOption;
      
      switch (svgOptions) {
        case "circle":
          commit("setCircleSvgOptions", payload.data);
          commit("setSVGViewComponent", "CircleSVG");

          break;
        
        case "polygon":
          commit("setPolygonSvgOptions", payload.data);
          commit("setSVGViewComponent", "PolygonSVG");

          break;

        default:
          break;
      }

      commit("saveToLocalStorage");
    },
    setInitialState: ({ commit, state }, payload) => {
      commit("svgBuilderOptionsComponent", payload.svgBuilderOptionsComponent);
      commit("setSVGViewComponent", payload.svgViewComponent);
      commit("svgModeUpdate", payload.svgMode);
      commit("setCircleSvgOptions", payload.circleState.circleSVGOptions);
      commit("setPolygonSvgOptions", payload.polygonState.polygonSVGOptions);
      state.circleState.circleSVGPreset = payload.circleState.circleSVGPreset;
      state.polygonState.polygonSVGPreset = payload.polygonState.polygonSVGPreset;

      for (let data in payload.circleState.circleOptionsComponent){
        let dat = {label : data, value: payload.circleState.circleOptionsComponent[data]};

        commit("circleOptionsComponentUpdate", dat);
      }

      for (let data in payload.polygonState.polygonOptionsComponent){
        let dat = {label : data, value: payload.polygonState.polygonOptionsComponent[data]};

        commit("polygonOptionsComponentUpdate", dat);
      }
    }
  },
  modules: {
    circleState,
    polygonState
  }
});
