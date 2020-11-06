const state = {
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
    width: "",
    height: "",
    fillOpacity: "",
    strokeOpacity: "",
    stroke: "select",
    strokeWidth: "",
    fill: "select"
  },
  rectangleSVGPreset: "select"
}

const getters = {
  getRectangleSVGOptions: state => {
    return state.rectangleSVGOptions;
  },
  getRectangleOptionsComponent: state => {
    return state.rectangleOptionsComponent
  }
}

const mutations = {
  setRectangleSvgOptions: (state, values) => {
    for (const value in values) {
      state.rectangleSVGOptions[value] = values[value];
    }
  },
  rectangleOptionsComponentUpdate: (state, data) => {
    state.rectangleOptionsComponent[data.label] = data.value;
  }
}

const actions = {
  setRectangleOptionsComponentUpdate: ({ commit }, payloads = {mode : "init"}) => {
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

    commit("rectangleOptionsComponentUpdate", data);
    payloads.mode !== "init" ? commit("saveToLocalStorage") : "";
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
