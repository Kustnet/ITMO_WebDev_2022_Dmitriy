<template xmlns:CounterValue="http://www.w3.org/1999/html">
  <h1>
    App Counter
  </h1>


  <CounterValue v-for="obj in [
      {index:1,text:'Clicked'},
  ]" :title="obj.text" :value ="counter" :key ="obj.index"/>
  <p v-html="innerHTML"></p>
  <button v-on:click="onPlus">+</button>
  <button v-if="canRenderMinusBtnVisible" @click="onMinus">-</button>
</template>
<script>
import CounterValue from "@/components/CounterValue.vue";
export default {
  components: {CounterValue},
  data() {
    return {
      counter: 0,
      innerHTML:`<h2>Hello</h2>`
    }
  },
  computed:{
    canRenderMinusBtnVisible(){
      return this.counter > 0;
    },

  },
  methods:{
    onPlus(){
      this.counter++;
    },
    onMinus(){
      this.counter--;
    },
  }
};
</script>
<style>
  p.counter-value{
    color: red;
    font-size: 3rem;
    font-weight: bolder;
  }
</style>