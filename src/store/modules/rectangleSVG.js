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
  },
  setRectangleInitialState: (state, data) => {
    Object.assign(state, data)
  },
  setRectangleComponentState: (state, payload) => {
    Object.assign(state.rectangleOptionsComponent, payload);
  }
}

const actions = {
  setRectangleOptionsComponentUpdate: ({ commit }, payloads) => {
    let data = {
      label : "",
      value: ""
    };

    for (let payload in payloads) {
      data.label = payload;
      data.value = payloads[payload];
    }

    commit("rectangleOptionsComponentUpdate", data);
    commit("saveToLocalStorage");
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
