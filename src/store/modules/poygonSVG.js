const state = {
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

const actions = {
  setPolygonOptionsComponentUpdate: ({ commit }, payloads = {mode : "init"}) => {
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

    commit("polygonOptionsComponentUpdate", data);
    payloads.mode !== "init" ? commit("saveToLocalStorage") : "";
  }
}

const mutations = {
  setPolygonSvgOptions: (state, values) => {
    for (const value in values) {
      state.polygonSVGOptions[value] = values[value];
    }
  },
  polygonOptionsComponentUpdate: (state, data) => {
    state.polygonOptionsComponent[data.label] = data.value;
  }
}

const getters = {
  getPolygonSVGOptions: state => {
    return state.polygonSVGOptions;
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
