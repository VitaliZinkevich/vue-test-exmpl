// counter.js
import { mapActions } from "vuex";
export default {
  template: `
  <div>
  <span class="count">{{ count }}</span>
  <button @click="increment">Increment</button>
  <select v-if="options">
    <option v-for="i in options" v-bind:key="i.id" :value="i.id">{{i.name}}</option>
  </select>
</div>
  `,

  data() {
    return {
      count: 0,
      count2: 0,
      options: null
    };
  },

  methods: {
    increment() {
      this.count++;
      this.incrementStore();
    },
    ...mapActions(["incrementStore"])
  },
  mounted: async function mounted() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    this.options = response.body;
  },
  created: function() {
    this.count2 = 10;
  }
};
