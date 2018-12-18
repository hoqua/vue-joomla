<template>
  <div>
    <div v-if="product.color.isUsed">
      <step-header :stepNum="product.color.step" :stepTitle="product.color.name"/>

      <div class="p15 columns is-grouped-multiline is-multiline is-mobile profile-scroll">
        <div v-for="(item, index) in product.color.items" :key="index"
             class="column is-3-tablet is-3-desktop" :class=" !product.color.isRound ? 'is-full-mobile' : 'is-4-mobile'">

          <b-radio  v-if="!product.color.isRound" :value="product.color.items[index].isActive"
                    @input="deselectOthers(index, 'color')"
                    native-value="true">
            <span>
              {{ item.name }}
            </span>
          </b-radio>

          <a v-else @click.prevent="deselectOthers(index, 'color')"
             class="is-block has-text-centered">

            <img :src="baseUrl + product.base.nameDB + '/color/icon/' + item.icon"
                 class="profile-image profile-image-round"
                 :class="{active: item.isActive }"
                 alt="">

            <span class="is-block">{{ item.name }}</span>
          </a>

        </div>
      </div>
    </div>

    <div v-if="product.profile.isUsed">
      <step-header :stepNum="product.profile.step" :stepTitle="product.profile.name"/>
        <div class="p15 columns is-grouped-multiline is-multiline is-mobile profile-scroll">
          <div v-for="(item, index) in product.profile.items" :key="index"
               class="column is-4-mobile is-3-tablet is-2-desktop"
               :class="{'is-hidden': disabledProfile(item) || biggerThatPossible(item)}">
            <a @click.prevent="disabledProfile(item) || deselectOthers(index, 'profile')"
                 class="is-block has-text-centered">

              <img :src="baseUrl + product.base.nameDB +'/profile/icon/' + item.icon"
                   class="profile-image"
                   :class="{active: item.isActive, 'profile-image-round': product.profile.isRound }"
                   alt="">

              <span class="is-block">{{ item.name }}</span>
            </a>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import StepHeader from './elements/StepHeader'

export default {
  name: 'ColorAndProfile',
  components: { StepHeader },
  data () {
    return {
      excludeArr: []
    }
  },
  methods: {
    biggerThatPossible (item) {
      if (item.maxSize) {
        return this.product.size.width > item.maxSize || this.product.size.height > item.maxSize
      }
      return false
    },
    disabledProfile (item) {
      return this.excludeArr.some(excludeName => {
        return excludeName.localeCompare(item.name.toLowerCase().trim()) === 0
      })
    },
    deselectOthers (index, key) {
      this.product[key].items.forEach((item, itemIndex) => { item.isActive = itemIndex === index })

      const thumb = this.product[key].items[index].thumb
      if (thumb) {
        console.log(`${process.env.VUE_APP_URL}${this.product.base.nameDB}/${key}/thumb/${thumb}`)
        this.$emit('changeThumb', `${process.env.VUE_APP_URL}${this.product.base.nameDB}/${key}/thumb/${thumb}`)
      }

      const photo = this.product[key].items[index].photo
      if (photo) {
        if (this.product[key].overlayPhoto && this.product[key].overlayPhoto.trim()) {
          this.$emit('changeBasePhoto', `${process.env.VUE_APP_URL}${this.product.base.nameDB}/${key}/photo/${photo}`)
        } else {
          this.$emit('changePhoto', `${process.env.VUE_APP_URL}${this.product.base.nameDB}/${key}/photo/${photo}`)
        }
      }
    },
    excludeProfiles () {
      // define active item
      const activeItem = this.product.color.items.find(item => item.isActive)

      // reset all profiles
      this.product.profile.items.forEach(item => { item.isActive = false })

      // prepare array of excluded
      this.excludeArr.length = 0
      if (activeItem.hasOwnProperty('excludeWith')) {
        this.excludeArr = activeItem.excludeWith.split(',').map(item => item.toLowerCase().trim())
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
  },
  watch: {
    'product.color': {
      handler: 'excludeProfiles',
      immediate: true,
      deep: true
    },
    'product.size': {
      handler: 'excludeProfiles',
      immediate: true,
      deep: true
    }
  },
  created () {
    // If overlay color prodived set it on create hook
    if (this.product['color'].overlayPhoto && this.product['color'].overlayPhoto.trim()) {
      this.$emit('changePhoto', `${process.env.VUE_APP_URL}${this.product.base.nameDB}/${'color'}/overlay/${this.product['color'].overlayPhoto}`)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .profile-scroll{
    max-height: 395px;
    overflow-x: auto;
  }
  .active {
    border: 3px solid #23d160 ;
  }
  .disabled {
    filter: grayscale(100%);
    transition: all 0.5s ease;
  }
  .profile-image {
    height: 150px;
    width: 100px;
    transition: all 0.5s ease;
    &:hover {
      transform: scale(1.03);
     }
  }
  .profile-image-round{
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
</style>
