import circle from "@/store/modules/circleSVG.js"

test("setCircleSvgOptions mutates state.circleSVGOptions", () => {
  const state = {
    circleSVGOptions: {
      cx: ""
    }
  }

  const items = {cx : "2"};
  circle.mutations.setCircleSvgOptions(state, items);
  expect(state.circleSVGOptions.cx).toBe(items.cx);
});

test("circleOptionsComponentUpdate mutates state.circleOptionsComponent", () => {
  const state = {
    circleOptionsComponent: {
      cx: ""
    }
  }

  const items = {label:"cx", value : "2"};
  circle.mutations.circleOptionsComponentUpdate(state, items);
  expect(state.circleOptionsComponent.cx).toBe(items.value);
});

test("setCircleInitialState mutates circle state", () => {
  const state = {
    circleSVGOptions: {
      cx: ""
    },
    circleOptionsComponent: {
      cx: ""
    }
  }

  const items = {
    circleSVGOptions: {
      cx: 7
    },
    circleOptionsComponent: {
      cx: 3
    }
  };
  circle.mutations.setCircleInitialState(state, items);
  expect(state.circleSVGOptions.cx).toBe(items.circleSVGOptions.cx);
  expect(state.circleOptionsComponent.cx).toBe(items.circleOptionsComponent.cx);
});

test("getCircleSVGOptions gets circle svg state", () => {
  const state = {
    circleSVGOptions: {
      cx: "10",
      cy: "20"
    }
  }

  const results = circle.getters.getCircleSVGOptions(state);

  expect(results).toEqual(state.circleSVGOptions);
});

test("setCircleOptionsComponentUpdate tests with a mock commit", () => {
  const state = {
    circleOptionsComponent: {
      cx: "10",
    }
  }

  let mockCommit = (commit, payload) => {
    if (commit === "circleOptionsComponentUpdate"){
      state.circleOptionsComponent.cx = payload.value;
    }
  }
  const items = {label:"cx", value : "2"};

  circle.actions.setCircleOptionsComponentUpdate({commit: mockCommit}, items);
  
  expect(state.circleOptionsComponent.cx).toEqual(items.value);
});
