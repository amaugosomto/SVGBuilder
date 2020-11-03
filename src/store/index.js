import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    svgBuilderOptionsComponent: "",
    svgViewComponent: "",
    circleSVGOptions: {
      cx: "",
      cy: "",
      r: "",
      stroke: "select",
      strokeWidth: "",
      fill: "select"
    },
    svgMode: "select",
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
  getters: {
    svgBuilderOptionsComponent: state => {
      return state.svgBuilderOptionsComponent;
    },
    getSVGViewComponent: state => {
      return state.svgViewComponent;
    },
    getCircleSVGOptions: state => {
      return state.circleSVGOptions;
    } 
  },
  mutations: {
    svgBuilderOptionsComponent: (state, value) => {
      state.svgBuilderOptionsComponent = value;
    },
    setCircleSvgOptions: (state, value) => {
      state.circleSVGOptions.cx = value.cx;
      state.circleSVGOptions.cy = value.cy;
      state.circleSVGOptions.r = value.r;
      state.circleSVGOptions.stroke = value.stroke;
      state.circleSVGOptions.strokeWidth = value.strokeWidth;
      state.circleSVGOptions.fill = value.fill;
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
    circleOptionsComponentUpdate: (state, data) => {
      state.circleOptionsComponent[data.label] = data.value;
    },
    resetAll : state => {
      let initialState = {
        svgBuilderOptionsComponent: "",
        svgViewComponent: "",
        circleSVGOptions: {
          cx: "",
          cy: "",
          r: "",
          stroke: "select",
          strokeWidth: "",
          fill: "select"
        },
        svgMode: "select",
        circleOptionsComponent: {
          cx: "",
          cy: "",
          r: "",
          stroke: "select",
          strokeWidth: "",
          fill: "select"
        },
        circleSVGPreset: "select"
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
    },
    saveSVGValues: ({ commit }, payload) => {
      let svgOptions = payload.svgSelectedOption;
      
      commit("setCircleSvgOptions", payload.data);

      switch (svgOptions) {
        case "circle":
          commit("setSVGViewComponent", "CircleSVG");
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
      commit("setCircleSvgOptions", payload.circleSVGOptions);
      state.circleSVGPreset = payload.circleSVGPreset;
      
      for (var data in payload.circleOptionsComponent){
        let dat = {label : data, value: payload.circleOptionsComponent[data]};

        commit("circleOptionsComponentUpdate", dat);
      }
    },
    setCircleOptionsComponentUpdate: ({ commit }, payloads = {mode : "init"}) => {
      let data = {
        label : "",
        value: ""
      };

      for (let payload in payloads) {
        if (payload !== "mode"){
          data.label = payload;
          data.value = payloads[payload];
        }
      }

      commit("circleOptionsComponentUpdate", data);
      payloads.mode !== "init" ? commit("saveToLocalStorage") : "";
    }
  },
  modules: {}
});
