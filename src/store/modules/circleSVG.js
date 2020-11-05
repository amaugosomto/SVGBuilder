const state = {
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
}

const getters = {
  getCircleSVGOptions: state => {
    return state.circleSVGOptions;
  }
}

const mutations = {
  setCircleSvgOptions: (state, value) => {
    state.circleSVGOptions.cx = value.cx;
    state.circleSVGOptions.cy = value.cy;
    state.circleSVGOptions.r = value.r;
    state.circleSVGOptions.stroke = value.stroke;
    state.circleSVGOptions.strokeWidth = value.strokeWidth;
    state.circleSVGOptions.fill = value.fill;
  },
  circleOptionsComponentUpdate: (state, data) => {
    state.circleOptionsComponent[data.label] = data.value;
  }
}

const actions = {
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
}

export default {
  state,
  getters,
  mutations,
  actions
}
