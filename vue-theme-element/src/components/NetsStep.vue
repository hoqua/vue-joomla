<template>
  <div v-if="product.net.isUsed">
    <step-header :stepNum="product.net.step" :stepTitle="product.net.name"/>
    <div class="p15 columns is-grouped-multiline is-multiline is-mobile">
      <div v-for="(item, index) in product.net.items" :key="index"
           class="column  is-half-mobile is-3-tablet is-2-desktop">
        <a @click.prevent="deselectOthers(index, 'net')"
           class="is-block has-text-centered">

          <img :src="baseUrl + product.base.nameDB + '/net/icon/' + item.icon"
               class="net-image"
               :class="{active: item.isActive, 'net-image-round': product.net.isRound }"
               alt="">

          <span class="is-block">{{ item.name }}</span>
        </a>
      </div>
    </div>

    <div class="column is-hidden-mobile is-flex is-vcentered is-size-7">
      {{product.net.description}}
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import StepHeader from './elements/StepHeader'

export default {
  name: 'NetStep',
  components: { StepHeader },
  methods: {
    deselectOthers (index, key) {
      this.product[key].items.forEach((item, itemIndex) => { item.isActive = itemIndex === index })

      const thumb = this.product[key].items[index].thumb
      if (thumb) {
        this.$emit('changeThumb', `${process.env.VUE_APP_URL}${this.product.base.nameDB}/net/thumb/${thumb}`)
      }
    }
  },
  computed: {
    ...mapFields([
      'product'
    ]),
    baseUrl () {
      // return `${process.env.VUE_APP_URL}${this.product.name.db}`
      return `${process.env.VUE_APP_URL}`
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .active {
    border: 3px solid #23d160 ;
  }
  .disabled {
    filter: grayscale(100%);
    transition: all 0.5s ease;
  }
  .net-image {
    height: 100px;
    width: 100px;
    transition: all 0.5s ease;
  &:hover {
     transform: scale(1.03);
   }
  }
  .net-image-round{
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

</style>
