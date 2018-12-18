<template>
  <div>
    <div class="classic-border header-line has-text-weight-light is-uppercase">
      <h1 class="has-text-left is-size-4">{{ product.base.nameRu }}</h1>
      <div v-if="product.base.discount" class="discount is-hidden-mobile has-background-danger is-size-4">
        <span>СКИДКА </span><span>-</span> {{product.base.discount}}%
      </div>
    </div>
    <p class="p15">{{ product.base.description }}</p>
  </div>

</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'HelloWorld',
  props: [],
  computed: {
    ...mapFields([
      'product'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header-line {
    padding-left: 15px;
    position: relative;
    height: 38px;
  }
  .discount{
    position: absolute;
    right: 0;
    top: 0;
    color: white;
    &::after {
      content: "";
      border-width: 18px;
      border-style: solid;
      border-color: transparent #ff3860 transparent transparent;
      border-image: none;
      top: 0px;
      left: -36px;
      position: absolute;
    }
  }
</style>
