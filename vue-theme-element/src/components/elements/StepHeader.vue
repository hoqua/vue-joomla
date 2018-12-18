<template>
  <div class="step-header classic-border has-background-white ">
    <div class="discount is-size-5">
      <div class="step-header__figure has-background-primary is-uppercase">
        <span>{{stepNum}}</span>
      </div>
      <div class="has-text-primary"> {{ stepTitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stepNum', 'stepTitle'],
  name: 'StepHeader'
}
</script>

<style scoped lang="scss">
  .step-header{
    position: relative;
    padding-left: 100px;
    &__figure{
      color: white;
      position: absolute;
      left: 0;
      top: 0;
      padding: 0 5px;
      &::after {
        content: "";
        border-width: 15px;
        border-style: solid;
        border-color: transparent transparent transparent #7957d5;
        border-image: none;
        top: 0px;
        right: -30px;
        position: absolute;
      }
    }
  }
</style>
