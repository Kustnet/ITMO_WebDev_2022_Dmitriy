<template>
  <h1 ref="header">App Counter</h1>
  <CounterValue
      class="counter"
      v-for="obj in [{ index: 1, text: 'Clicked' }]"
      :title="obj.text"
      :value="counter"
      :key="obj.index"
  />

  <button v-on:click="onPlus" style="background-color: greenyellow">+</button>
  <button v-if="canRenderMinusButton" @click="onMinus" style="background-color: red">-</button>
</template>
<script>
import CounterValue from './components/CounterValue.vue';

const LOCAL_KEY_COUNTER = 'counter';

const saveCounter = (value) => localStorage.setItem(LOCAL_KEY_COUNTER, value);
let counterWatcher = null
export default {
  components: {
    CounterValue,
  },
  data() {
    return {
      counter: 0,
    };
  },
  created() {
    console.log('> created: ', this.counter);
    this.counter = localStorage.getItem(LOCAL_KEY_COUNTER) || 0;
    counterWatcher = this.$watch(
        () => this.counter,
        (newValue, oldValue) => {
      saveCounter(newValue);
    });
  },
  mounted() {
    console.log('> mounted: ', this.counter);
  },
  computed: {
    canRenderMinusButton() {
      return this.counter > 0;
    },
  },
  methods: {
    onPlus() {
      this.counter++;
      if(this.counter > 0){
        this.$refs.header.innerHTML = 'App Counter'}

      console.log('> Counter -> onPlus:', this.counter);
    },
    onMinus() {
      this.counter--;
      if(this.counter === 0){
      this.$refs.header.innerHTML = 'Hello'}
      console.log('> Counter -> onMinus:', this.counter);
    },
  },
};
</script>
<style lang="scss" scoped>
.counter {
  color: green;
}
</style>
