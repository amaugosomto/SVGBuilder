import polygon from "@/store/modules/polygonSVG.js";

test("setPolygonSvgOptions mutates state.polygonSVGOptions", () => {
  const state = {
    polygonSVGOptions: {
      points: ""
    }
  }

  const items = {points : "2"};
  polygon.mutations.setPolygonSvgOptions(state, items);
  expect(state.polygonSVGOptions.points).toBe(items.points);
});

test("polygonOptionsComponentUpdate mutates a value in state.polygonOptionsComponent", () => {
  const state = {
    polygonOptionsComponent: {
      points: ""
    }
  }

  const items = {label:"points", value : "2"};
  polygon.mutations.polygonOptionsComponentUpdate(state, items);
  expect(state.polygonOptionsComponent.points).toBe(items.value);
});

test("setPolygonComponentState mutates state.polygonOptionsComponent", () => {
  const state = {
    polygonOptionsComponent: {
      points: "",
      strokeWith: 4
    }
  }

  const items = {
    points: 5,
    strokeWith: 10
  };
  polygon.mutations.setPolygonComponentState(state, items);
  expect(state.polygonOptionsComponent).toEqual(items);
});

test("setPolygonInitialState mutates polygon state", () => {
  const state = {
    polygonSVGOptions: {
      points: ""
    },
    polygonOptionsComponent: {
      points: ""
    }
  }

  const items = {
    polygonSVGOptions: {
      points: 7
    },
    polygonOptionsComponent: {
      points: 7
    }
  };

  polygon.mutations.setPolygonInitialState(state, items);
  expect(state.polygonSVGOptions.points).toBe(items.polygonSVGOptions.points);
  expect(state.polygonOptionsComponent.points).toBe(items.polygonOptionsComponent.points);
});

test("getPolygonSVGOptions gets polygon svg state", () => {
  const state = {
    polygonSVGOptions: {
      points: "10",
      strokeWith: "20"
    }
  }

  const results = polygon.getters.getPolygonSVGOptions(state);

  expect(results).toEqual(state.polygonSVGOptions);
});

test("setPolygonOptionsComponentUpdate tests with a mock commit", () => {
  const state = {
    polygonOptionsComponent: {
      points: "10",
    }
  }

  let mockCommit = (commit, payload) => {
    if (commit === "polygonOptionsComponentUpdate"){
      state.polygonOptionsComponent.points = payload.value;
    }
  }
  const items = {label:"points", value : "2"};

  polygon.actions.setPolygonOptionsComponentUpdate({commit: mockCommit}, items);
  
  expect(state.polygonOptionsComponent.points).toEqual(items.value);
});
