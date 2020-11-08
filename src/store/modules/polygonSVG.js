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
    polygonSVGPreset: "select",
    stroke: "select",
    strokeWidth: "",
    fill: "select"
  }
}

const actions = {
  setPolygonOptionsComponentUpdate: ({ commit }, payloads) => {
    let data = {
      label : "",
      value: ""
    };

    for (let payload in payloads) {
      data.label = payload;
      data.value = payloads[payload];
    }

    commit("polygonOptionsComponentUpdate", data);
    commit("saveToLocalStorage");
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
  },
  setPolygonInitialState: (state, data) => {
    Object.assign(state, data)
  },
  setPolygonComponentState: (state, payload) => {
    Object.assign(state.polygonOptionsComponent, payload);
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
