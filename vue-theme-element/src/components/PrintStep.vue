<template>
  <div v-if="product.print.isUsed">
    <step-header :stepNum="product.print.step" :stepTitle="product.print.name"/>
    <div class="p15 columns is-grouped-multiline is-multiline is-mobile">
      <div class="column">
        <div v-for="(item, index) in product.print.items" :key="index">

          <b-field>
            <b-checkbox v-model="item.isActive"
                        @click.native="changePhoto(item)"
                        :disabled="compareColorNames(item)">
              {{ item.name }}
            </b-checkbox>
          </b-field>

          <b-field v-for="(printItem, printIndex) in item.items" :key="printIndex">
            <b-checkbox v-model="printItem.isActive"
                        @click.native="changePhoto(printItem, printIndex)"
                        :disabled="compareColorNames(item) || !item.isActive">
              {{ printItem.name }}
            </b-checkbox>
          </b-field>

        </div>

      </div>

      <div class="column is-hidden-mobile is-flex is-vcentered is-size-7">
        {{product.print.description}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import StepHeader from './elements/StepHeader'

export default {
  name: 'PrintStep',
  components: { StepHeader },
  data () {
    return {
      currentColorName: '',
      currentProfileName: ''
    }
  },
  methods: {
    changePhoto (item) {
      const photo = item.photo

      if (photo) {
        this.$emit('changePhoto', `${process.env.VUE_APP_URL}${this.product.base.nameDB}/print/photo/${photo}`)
      }

      if (item.isActive) {
        this.$emit('changePhoto', `${process.env.VUE_APP_URL}${this.product.base.nameDB}/print/photo/${this.product.base.photoBase}`)
      }
    },
    printHandler () {
      this.resetPrints()
    },
    colorHandler () {
      // define active item
      const activeItem = this.product.color.items.find(item => item.isActive)

      // deep reset all prints
      this.resetPrints(true)
      // Get current color name for compare
      if (activeItem) {
        this.currentColorName = activeItem.name
      } else {
        this.currentColorName = ''
      }
      console.log(this.currentColorName)
    },
    profileHandler () {
      // define active item
      const activeItem = this.product.profile.items.find(item => item.isActive)

      // deep reset all prints
      this.resetPrints(true)
      if (activeItem) {
        this.currentProfileName = activeItem.name
      } else {
        this.currentProfileName = ''
      }
      console.log(this.currentProfileName)
    },
    resetPrints (completeReset = false) {
      this.product.print.items.forEach(item => {
        if (completeReset) item.isActive = false
        if (completeReset || !item.isActive) {
          item.items.forEach(item => { item.isActive = false })
        }
      })
    },
    compareColorNames (item) {
      const workWithArr = item.workWith.split(',').map(item => item.toLowerCase().trim().replace(/\//g, ''))
      const colorFound = !workWithArr.some(workWithName => {
        return workWithName.localeCompare(this.currentColorName.toLowerCase().trim().replace(/\//g, '')) === 0
      })
      const profileFound = !workWithArr.some(workWithName => {
        return workWithName.localeCompare(this.currentProfileName.toLowerCase().trim().replace(/\//g, '')) === 0
      })
      return colorFound || profileFound
    }
  },
  computed: {
    ...mapFields([
      'product'
    ])
  },
  watch: {
    'product.color': {
      immediate: true,
      deep: true,
      handler: 'colorHandler'
    },
    'product.profile': {
      immediate: true,
      deep: true,
      handler: 'profileHandler'
    },
    'product.print': {
      immediate: true,
      deep: true,
      handler: 'printHandler'
    }
  }
}
</script>

<style scoped>

</style>
