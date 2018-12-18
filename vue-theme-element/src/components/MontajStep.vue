<template>
  <div v-if="product.montaj.isUsed">
    <step-header :stepNum="product.montaj.step" :stepTitle="product.montaj.name"/>
    <div class="p15 columns is-grouped-multiline is-multiline is-mobile">
      <div class="column">
        <b-field v-for="(item, index) in product.montaj.items" :key="index">
          <b-radio :value="item.isActive"
                   @input="deselectOthers(index, 'montaj')"
                   native-value="true">
            {{ item.name }}
          </b-radio>
        </b-field>

      </div>

      <div class="column is-hidden-mobile is-flex is-vcentered is-size-7">
        {{product.montaj.description}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import StepHeader from './elements/StepHeader'

export default {
  name: 'MontajStep',
  components: { StepHeader },
  methods: {
    deselectOthers (index, key) {
      this.product[key].items.forEach((item, itemIndex) => { item.isActive = itemIndex === index })

      const thumb = this.product[key].items[index].thumb
      if (thumb) {
        this.$emit('changeThumb', `${process.env.VUE_APP_URL}${this.product.base.nameDB}/montaj/thumb/${thumb}`)
      }
    }
  },
  computed: {
    ...mapFields([
      'product'
    ])
  }
}
</script>

<style scoped>

</style>
