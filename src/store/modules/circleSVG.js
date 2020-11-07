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
    circleSVGPreset: "select",
    stroke: "select",
    strokeWidth: "",
    fill: "select"
  }
}

const getters = {
  getCircleSVGOptions: state => {
    return state.circleSVGOptions;
  }
}

const mutations = {
  setCircleSvgOptions: (state, values) => {
    for (const value in values) {
      state.circleSVGOptions[value] = values[value];
    }
  },
  circleOptionsComponentUpdate: (state, data) => {
    state.circleOptionsComponent[data.label] = data.value;
  },
  setCircleInitialState: (state, data) => {
    Object.assign(state, data)
  },
  setCircleComponentState: (state, payload) => {
    Object.assign(state.circleOptionsComponent, payload);
  }
}

const actions = {
  setCircleOptionsComponentUpdate: ({ commit }, payloads) => {
    let data = {
      label : "",
      value: ""
    };

    for (let payload in payloads) {
      data.label = payload;
      data.value = payloads[payload];
    }

    commit("circleOptionsComponentUpdate", data);
    commit("saveToLocalStorage");
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
