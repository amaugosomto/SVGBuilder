import Vue from "vue";
import Vuex from "vuex";

import circleState from './modules/circleSVG';
import polygonState from './modules/polygonSVG';
import rectangleState from './modules/rectangleSVG';

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

const initialState = {
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
      circleSVGPreset: "select",
      r: "",
      stroke: "select",
      strokeWidth: "",
      fill: "select"
    }
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
      polygonSVGPreset: "select",
      stroke: "select",
      strokeWidth: "",
      fill: "select"
    }
  },
  rectangleState: {
    rectangleSVGOptions: {
      x: "",
      y: "",
      rx: "",
      ry: "",
      width: "",
      height: "",
      fillOpacity: "",
      strokeOpacity: "",
      stroke: "select",
      strokeWidth: "",
      fill: "select"
    },
    rectangleOptionsComponent: {
      x: "",
      y: "",
      rx: "",
      ry: "",
      rectangleSVGPreset: "select",
      width: "",
      height: "",
      fillOpacity: "",
      strokeOpacity: "",
      stroke: "select",
      strokeWidth: "",
      fill: "select"
    }
  }
  
}

export default new Vuex.Store({
  state:{ 
    svgBuilderOptionsComponent: "",
    svgViewComponent: "",
    svgMode: "select",
    show: true,
    history: "select",
    histories: [],
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
    },
    getInitialCircleOptionsState: () => {
      return { ...initialState.circleState.circleOptionsComponent };
    },
    getInitialPolygonOptionsState: () => {
      return { ...initialState.polygonState.polygonOptionsComponent };
    },
    getInitialRectangleOptionsState: () => {
      return { ...initialState.rectangleState.rectangleOptionsComponent };
    },
    showSVGComponent: state => {
      return state.show;
    },
    getHistories: state => {
      return state.histories;
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
      
      Object.assign(state, initialState);

      localStorage.removeItem("userState");
    },
    setHistoryValue: (state, payload) => {
      state.histories = payload.histories;
      state.history = payload.history;
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
        case "rectangle":
          commit("svgBuilderOptionsComponent", "RectangleOptions");
          break;
        default:
          commit("svgBuilderOptionsComponent", "");
      }

      commit("saveToLocalStorage");
    },
    saveSVGValues: ({ commit, state }, payload) => {
      let svgOptions = payload.svgSelectedOption;
      
      state.show = false;

      setTimeout(function() {
        switch (svgOptions) {
          case "circle":
            commit("setCircleSvgOptions", payload.data);
            commit("setSVGViewComponent", "CircleSVG");
  
            break;
          
          case "polygon":
            commit("setPolygonSvgOptions", payload.data);
            commit("setSVGViewComponent", "PolygonSVG");
  
            break;
          
          case "rectangle":
            commit("setRectangleSvgOptions", payload.data);
            commit("setSVGViewComponent", "RectangleSVG");
  
            break;
  
          default:
            break;
        }

        let today = new Date();
        let hour = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();
        let timeFormat = ` :${hour}:${min}:${sec} ${hour < 11 ? "am" : "pm"}`;

        let historyObject = {
          svgBuilderOptionsComponent: state.svgBuilderOptionsComponent,
          svgViewComponent: state.svgViewComponent,
          svgMode: state.svgMode,
          payload: {
            label : svgOptions,
            time: timeFormat,
            labelName : svgOptions + timeFormat,
            data : payload.data
          }
        }

        state.histories.push(historyObject);
        commit("saveToLocalStorage");
        state.show = true;
      }, 1000);
      
    },
    setBaseState: ({ commit }, payload) => {
      commit("svgBuilderOptionsComponent", payload.svgBuilderOptionsComponent);
      commit("setSVGViewComponent", payload.svgViewComponent);
      commit("svgModeUpdate", payload.svgMode);
      commit("setPolygonInitialState", payload.polygonState);
      commit("setRectangleInitialState", payload.rectangleState);
      commit("setCircleInitialState", payload.circleState);

      let data = {
        histories: [...payload.histories], 
        history: payload.history
      }
      commit("setHistoryValue", data);
    },
    onHistoryChange: ({commit, state}, payload) => {
      let history = state.histories.find(element => element.payload.labelName === payload);
      if (typeof history !== "undefined"){
        
        let componentData = {...history.payload.data};
        let svgData = {...history.payload.data};

        switch (history.payload.label) {
          case "circle": {
            let data = {
              circleOptionsComponent: componentData,
              circleSVGOptions: svgData
            }

            commit("setCircleInitialState", data);
            break;
          }
          case "rectangle": {
            let data = {
              rectangleOptionsComponent: componentData,
              rectangleSVGOptions: svgData
            }

            commit("setRectangleInitialState", data);
            break;
          }
          case "polygon": {
            let data = {
              polygonOptionsComponent: componentData,
              polygonSVGOptions: svgData
            }

            commit("setPolygonInitialState", data);
            break;
          }
          default:
            break;
        }
      }
      state.show = false;

      setTimeout(function() {
        commit("svgBuilderOptionsComponent", history.svgBuilderOptionsComponent);
        commit("setSVGViewComponent", history.svgViewComponent);
        commit("svgModeUpdate", history.svgMode);
        state.show = true;
        commit("saveToLocalStorage");
      }, 500)
      
    },
    clearHistory: ({commit, state}) => {
      state.histories = [];
      state.history = "select";

      commit("saveToLocalStorage");
    }
  },
  modules: {
    circleState,
    polygonState,
    rectangleState
  }
});
