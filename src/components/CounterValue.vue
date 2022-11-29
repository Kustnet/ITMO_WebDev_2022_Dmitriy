<template>
  <p
     class='value' :class="{alert: isAlert}">
    <span style="color: blue">
      {{title}}
    </span>
    :{{value}}
  </p>
</template>
<script>
export default {
  props:{
    title: "",
    value: 0,
  },
  computed:{
    isAlert(){
      return this.value >=10
    }
  },
};
</script>
<style lang="scss" scoped>
  .value {
    color: red;
    font-size: 3rem;
    font-weight: bolder;

    &.alert {
      background-color: lightgrey;
    }
  }


</style>