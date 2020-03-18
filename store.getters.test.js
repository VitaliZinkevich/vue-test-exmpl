import getters from "./getters";

describe("Counter", () => {
  describe("Counter getters", () => {
    test('"evenOrOdd" returns even if "state.count" is even', () => {
      const state = {
        count: 2
      };
      expect(getters.evenOrOdd(state)).toBe("even");
    });

    test('"evenOrOdd" returns odd if "state.count" is odd', () => {
      const state = {
        count: 1
      };
      expect(getters.evenOrOdd(state)).toBe("odd");
    });
  });
  describe("Counter mutations", () => {});
});
