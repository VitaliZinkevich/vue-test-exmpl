// store-config.spec.js

import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeConfig from "./store-config";
import { cloneDeep } from "lodash";
describe("store mutations", () => {
  test('increments "count" value when "incrementStore" is committed', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(cloneDeep(storeConfig));
    expect(store.state.count).toBe(0);
    store.commit("incrementStore");
    expect(store.state.count).toBe(1);
  });

  test('updates "evenOrOdd" getter when "incrementStore" is committed', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(cloneDeep(storeConfig));
    expect(store.getters.evenOrOdd).toBe("even");
    store.commit("incrementStore");
    expect(store.getters.evenOrOdd).toBe("odd");
  });
});
