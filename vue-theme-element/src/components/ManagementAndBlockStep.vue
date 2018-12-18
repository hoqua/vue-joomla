<template>
  <div >
    <div v-if="product.management.isUsed">
      <step-header :stepNum="product.management.step" :stepTitle="product.management.name"/>
        <div class="p15 columns is-grouped-multiline is-multiline is-mobile">
          <div v-for="(item, index) in product.management.items" :key="index"
               class="column is-3-tablet is-2-desktop">
            <b-radio  :value="product.management.items[index].isActive"
                      @input="deselectOthers(index, 'management')"
                      native-value="true">
              {{ item.name }}
            </b-radio>
          </div>
        </div>
    </div>

    <div v-if="product.block.isUsed">
      <step-header :stepNum="product.block.step" :stepTitle="product.block.name"/>
        <div class="p15 columns is-grouped-multiline is-multiline is-mobile">
          <div v-for="(item, index) in product.block.items" :key="index"
               class="column is-3-tablet is-2-desktop">
            <b-radio  :value="product.block.items[index].isActive"
                      @input="deselectOthers(index, 'block')"
                      :disabled="disabledBlock(item)"
                      native-value="true">
              {{ item.name }}
            </b-radio>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import StepHeader from './elements/StepHeader'

export default {
  name: 'ManagementAndBlockStep',
  components: { StepHeader },
  data () {
    return {
      excludeArr: []
    }
  },
  methods: {
    disabledBlock (item) {
      return this.excludeArr.some(excludeName => {
        return excludeName.localeCompare(item.name.toLowerCase().trim()) === 0
      })
    },
    deselectOthers (index, key) {
      this.product[key].items.forEach((item, itemIndex) => { item.isActive = itemIndex === index })

      const thumb = this.product[key].items[index].thumb
      if (thumb) {
        this.$emit('changeThumb', `${process.env.VUE_APP_URL}${this.product.base.nameDB}/${key}/thumb/${thumb}`)
      }
    },
    excludeBlocks () {
      // define active item
      const activeItem = this.product.management.items.find(item => item.isActive)

      // reset all blocks
      this.product.block.items.forEach(item => { item.isActive = false })

      // prepare array of excluded
      if (activeItem.hasOwnProperty('excludeWith')) {
        this.excludeArr.length = 0
        this.excludeArr = activeItem.excludeWith.split(',').map(item => item.toLowerCase().trim())
      }
    }
  },
  computed: {
    ...mapFields([
      'product'
    ])
  },
  watch: {
    'product.management': {
      handler: 'excludeBlocks',
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
