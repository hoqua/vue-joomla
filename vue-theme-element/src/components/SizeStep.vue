<template>
  <div>
    <step-header :stepNum="product.size.step" :stepTitle="product.size.name"/>
    <div class="columns p15">
      <div class="column">

        <b-field label="Высота (мм)">
          <b-input v-model="product.size.height"
                   placeholder="Ширина"
                   type="number"
                   :min="product.size.min"
                   :max="product.size.max">
          </b-input>
        </b-field>

        <b-field label="Ширина (мм)">
          <b-input v-model="product.size.width"
                   placeholder="Ширина"
                   type="number"
                   :min="product.size.min"
                   :max="product.size.max">
          </b-input>
        </b-field>
      </div>

      <div class="column is-hidden-mobile is-flex is-vcentered is-size-7">
        {{product.size.description}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

import StepHeader from './elements/StepHeader'
export default {
  name: 'SizeStep',
  components: { StepHeader },
  computed: {
    ...mapFields([
      'product'
    ])
  }
}
</script>

<style scoped>

</style>
