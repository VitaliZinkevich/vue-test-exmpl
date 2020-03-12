// Import the mount() method from the test utils
// and the component you want to test
import { mount, shallow, createLocalVue } from "@vue/test-utils";
import Counter from "./counter";
import Vue from "vue";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);

let actions = {
  incrementStore: jest.fn()
};

let storeExmpl = {
  state: {
    clicks: 0
  },
  actions
};

const store = new Vuex.Store({
  ...storeExmpl
});

require("jest-fetch-mock").enableMocks();
fetchMock.doMock();

describe("Counter", () => {
  // Now mount the component and you have the wrapper

  describe("Counter user input", () => {
    test("button should increment the count manipulation with dom", async () => {
      const wrapper = mount(Counter);
      const button = wrapper.find("button");
      button.trigger("click");
      var count = wrapper.find(".count");
      // await Vue.nextTick();
      expect(count.text()).toContain("1");
    });
    test("button should increment the count manipulation with instance", () => {
      const wrapper = mount(Counter);
      wrapper.vm.count = 11;
      const button = wrapper.find("button");
      button.trigger("click");
      expect(wrapper.vm.count).toBe(12);
    });
  });

  describe("Counter store actions", () => {
    // beforeEach(()=>{
    //   wrapper = ;
    // })

    // it's also easy to check for the existence of elements
    // it('has a button', () => {
    //   expect(wrapper.contains('button')).toBe(true)
    // })

    test('dispatches "incrementStore" when button add value on UI', () => {
      const wrapper = shallow(Counter, { store, localVue });
      const button = wrapper.find("button");
      button.trigger("click");
      expect(actions.incrementStore).toHaveBeenCalled();
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("Counter async call (hooks)", () => {
    test("created hook finished", async () => {
      const wrapper = mount(Counter);
      await Vue.nextTick();
      expect(wrapper.vm.count2).toEqual(10);
    });
    test("before mount hook not finished view", async () => {
      const wrapper = mount(Counter);
      expect(wrapper.html()).toMatchSnapshot();
    });

    test("async mounted hook finished with created hook stuff tests", async () => {
      const wrapper1 = mount(Counter);
      expect(wrapper1.vm.count2).toEqual(10);
      expect(wrapper1.vm.options).toBeFalsy();
      await Vue.nextTick();
      expect(wrapper1.vm.count2).toEqual(10);
      expect(wrapper1.vm.options).toBeTruthy();
      expect(wrapper1.html()).toMatchSnapshot();
    });
  });
});
