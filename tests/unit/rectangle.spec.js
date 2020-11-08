import rectangle from "@/store/modules/rectangleSVG.js";


test("setRectangleSvgOptions mutates state.rectangleSVGOptions", () => {
  const state = {
    rectangleSVGOptions: {
      x: ""
    }
  }

  const items = {x : "2"};
  rectangle.mutations.setRectangleSvgOptions(state, items);
  expect(state.rectangleSVGOptions.x).toBe(items.x);
});

test("rectangleOptionsComponentUpdate mutates a value in state.rectangleOptionsComponent", () => {
  const state = {
    rectangleOptionsComponent: {
      x: ""
    }
  }

  const items = {label:"x", value : "2"};
  rectangle.mutations.rectangleOptionsComponentUpdate(state, items);
  expect(state.rectangleOptionsComponent.x).toBe(items.value);
});

test("setRectangleComponentState mutates state.rectangleOptionsComponent", () => {
  const state = {
    rectangleOptionsComponent: {
      x: "",
      y: 4
    }
  }

  const items = {
    x: 5,
    y: 10
  };
  rectangle.mutations.setRectangleComponentState(state, items);
  expect(state.rectangleOptionsComponent).toEqual(items);
});

test("setRectangleInitialState mutates rectangle state", () => {
  const state = {
    rectangleSVGOptions: {
      x: ""
    },
    rectangleOptionsComponent: {
      x: ""
    }
  }

  const items = {
    rectangleSVGOptions: {
      x: 7
    },
    rectangleOptionsComponent: {
      x: 7
    }
  };

  rectangle.mutations.setRectangleInitialState(state, items);
  expect(state.rectangleSVGOptions.x).toBe(items.rectangleSVGOptions.x);
  expect(state.rectangleOptionsComponent.x).toBe(items.rectangleOptionsComponent.x);
});

test("getRectangleSVGOptions gets rectangle svg state", () => {
  const state = {
    rectangleSVGOptions: {
      x: "10",
      y: "20"
    }
  }

  const results = rectangle.getters.getRectangleSVGOptions(state);

  expect(results).toEqual(state.rectangleSVGOptions);
});

test("getRectangleOptionsComponent gets rectangle svg state", () => {
  const state = {
    rectangleOptionsComponent: {
      x: "10",
      y: "20"
    }
  }

  const results = rectangle.getters.getRectangleOptionsComponent(state);

  expect(results).toEqual(state.rectangleOptionsComponent);
});

test("setRectangleOptionsComponentUpdate tests with a mock commit", () => {
  const state = {
    rectangleOptionsComponent: {
      x: "10",
    }
  }

  let mockCommit = (commit, payload) => {
    if (commit === "rectangleOptionsComponentUpdate"){
      state.rectangleOptionsComponent.x = payload.value;
    }
  }
  const items = {label:"x", value : "2"};

  rectangle.actions.setRectangleOptionsComponentUpdate({commit: mockCommit}, items);
  
  expect(state.rectangleOptionsComponent.x).toEqual(items.value);
});
