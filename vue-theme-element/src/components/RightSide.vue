<template>
  <div class="has-text-centered">
    <div class="image-wrapper is-inline-block">
      <img :src="currentBasePhoto" alt="" class="image-bg">
      <img :src="currentPhoto" alt="" ref="currentPhoto" class="image-overlay">
      <img v-if="currentThumb" :src="currentThumb" alt="" class="image-thumb">
    </div>
    <div class="stats-wrapper price-wrapper">
      <div class="price-block">Комплектация</div>
      <p>Размеры: {{ product.size.height }} x {{ product.size.width }} мм</p>
      <p v-if="product.profile.isUsed">Профиль: {{ currentProfile }}</p>
      <p v-if="product.montaj.isUsed">Монтаж: {{ currentMontaj }}</p>
      <p v-if="product.management.isUsed">Тип управения: {{ currentManagenent }}</p>
      <p v-if="product.color.isUsed">Цвет: {{ currentColor }}</p>
      <p v-if="product.block.isUsed">Тип блокировки: {{ currentBlock }}</p>
      <p v-if="product.print.isUsed">Фотопечать: {{ currentPrint }}</p>
      <p v-if="product.net.isUsed">Сетка: {{ currentNet }}</p>
    </div>
    <div class="price-wrapper">
      <div class="price-block">ЦЕНА</div>
      <div v-if="product.base.discount" class="price-discount-block"> - {{product.base.discount}}%</div>

      <animated-number
        v-if="newPriceDiscount"
        :value="newPriceDiscountMuti"
        :formatValue="value => `${value.toFixed(2)} р`"
        :duration="1000"
        class="discount-price"
      />

      <animated-number
        :value="newPriceMulti"
        :formatValue="value => `${value.toFixed(2)} р`"
        :duration="1000"
        class="main-price"
      />

      <div class="multiplier-wrapper">
        <div class="product-counter">
          <input id="minus" type="button" value="-" @click="multiplier > 1 ?  multiplier -= 1 : null">
          <input id="quantity" type="text" v-model="multiplier" name="quantity">
          <input id="plus" type="button" value="+" @click.prevent="multiplier += 1">
        </div>
      </div>
    </div>
    <div class="buy-button-wrapper">
      <button class="buyButton popup-btn is-primary">Оформить заказ</button>
    </div>

  </div>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'
import { mapFields } from 'vuex-map-fields'
export default {
  components: { AnimatedNumber },
  name: 'SizeStep',
  props: ['photo', 'thumb', 'basePhoto'],
  data () {
    return {
      isMounted: false,
      newPrice: null,
      thumbImg: '',
      multiplier: 1,
      stepMultiply: 0
    }
  },
  methods: {
    countMoneyOnChange () {
      const productFieldsMakesStepChange = ['profile', 'color', 'net']
      this.stepMultiply = productFieldsMakesStepChange.reduce((acc, field) => {
        if (this.product[field] && this.product[field].isUsed) {
          const activeItem = this.product[field].items.find(item => item.isActive)
          acc += parseInt(activeItem && activeItem.priceStepMultiply ? activeItem.priceStepMultiply : 0)
          return acc
        }
        return acc
      }, 0)

      this.newPrice = Object.entries(this.product).reduce((accumulator, currentItem) => {
        const item = currentItem[1]
        if (!item.isUsed) return accumulator
        if (!item.price && !item.items) return accumulator

        if (currentItem[0] === 'size') {
          return accumulator + parseInt(this.sizePriceCalc(item))
        }

        if (currentItem[0] === 'print') {
          return accumulator + parseInt(this.printPriceCalc(item))
        }
        const activeItem = item.items.find(item => item.isActive)
        if (activeItem) return accumulator + parseInt(activeItem.price)
        return accumulator
      }, 0)
    },
    printPriceCalc (print) {
      return print.items.reduce((accOutside, item) => {
        if (item.isActive && item.price) {
          return accOutside + parseInt(item.price) + item.items.reduce((accInside, item) => {
            if (item.isActive && item.price) {
              return accInside + parseInt(item.price)
            }
            return accInside
          }, 0)
        }
        return accOutside
      }, 0)
    },
    sizePriceCalc (size) {
      const price = size.price
      console.log(this.stepMultiply)
      const widthDiff = parseInt(size.width) - parseInt(price.baseWidth)
      const timesOverBaseWidth = parseInt(widthDiff) / parseInt(price.stepWidth)
      const priceOverBaseWidth = parseInt(timesOverBaseWidth) * parseInt(this.stepMultiply || price.multiplyWidth)
      const priceWidth = widthDiff > 0 ? parseInt(price.basePriceWidth) + parseInt(priceOverBaseWidth) : parseInt(price.basePriceWidth)

      const heightDiff = parseInt(size.height) - parseInt(price.baseHeight)
      const timesOverBaseHeight = parseInt(heightDiff) / parseInt(price.stepHeight)
      const priceOverBaseHeight = parseInt(timesOverBaseHeight) * parseInt(this.stepMultiply || price.multiplyHeight)
      const priceHeight = heightDiff > 0 ? parseInt(price.basePriceHeight) + parseInt(priceOverBaseHeight) : parseInt(price.basePriceHeight)

      return priceHeight + priceWidth
    }
  },
  computed: {
    ...mapFields([
      'product'
    ]),
    currentBasePhoto () {
      return this.basePhoto ? this.basePhoto : `${this.baseUrl}${this.product.base.nameDB}/${this.product.base.photoBase}`
    },
    currentPhoto () {
      return this.photo ? this.photo : `${this.baseUrl}${this.product.base.nameDB}/${this.product.base.photo}`
    },
    currentThumb () {
      if (this.thumb) {
        return this.thumb
      } else {
        return this.product.base.thumb ? `${this.baseUrl}${this.product.base.nameDB}/${this.product.base.thumb}` : false
      }
    },
    currentNet () {
      const currentNet = this.product.net.items.find(item => item.isActive)
      return currentNet ? currentNet.name : 'выберите сеть'
    },
    currentProfile () {
      const currentProfile = this.product.profile.items.find(item => item.isActive)
      return currentProfile ? currentProfile.name : 'выберите профиль'
    },
    currentMontaj () {
      const currentMontaj = this.product.montaj.items.find(item => item.isActive)
      return currentMontaj ? currentMontaj.name : 'выберите монтаж'
    },
    currentManagenent () {
      const currentManagenent = this.product.management.items.find(item => item.isActive)
      return currentManagenent ? currentManagenent.name : 'выберите управление'
    },
    currentColor () {
      const currentColor = this.product.color.items.find(item => item.isActive)
      return currentColor ? currentColor.name : 'выберите цвет'
    },
    currentBlock () {
      const currentBlock = this.product.block.items.find(item => item.isActive)
      return currentBlock ? currentBlock.name : 'выберите тип блокировки'
    },
    currentPrint () {
      const currentPrint = this.product.print.items.find(item => item.isActive)
      return currentPrint ? 'да' : 'нет'
    },
    baseUrl () {
      // return `${process.env.VUE_APP_URL}${this.product.name.db}`
      return `${process.env.VUE_APP_URL}`
    },
    newPriceDiscount () {
      if (this.product.base.discount) {
        return parseInt(this.newPrice) + Math.floor((this.newPrice / 100) * this.product.base.discount)
      }
    },
    newPriceDiscountMuti () {
      return this.newPriceDiscount * this.multiplier
    },
    newPriceMulti () {
      return this.newPrice * this.multiplier
    }
  },
  mounted () {
    this.isMounted = true
  },
  watch: {
    product: {
      immediate: true,
      deep: true,
      handler: 'countMoneyOnChange'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  $color-main: #fdc9a2;
  $main-off: transparent;
  $color-font: #7957d5;
  $font-content: inherit;
  $font-main: inherit;
  $color-border: #f4f;
  $color-null: #d0fcfb;
  $color-text: #7957d5;
  $transit: 0.3s;

  .image-wrapper{
    max-width: 400px;
    max-height: 400px;
    position: relative;
    .image-bg {
      height: 400px;
      width: 400px;
    }
    .image-overlay {
      position: absolute;
      height: 400px;
      width: 400px;
      top: 0;
      left: 0;
    }
    .image-thumb {
      position: absolute;
      right: -20px;
      bottom: -20px;
      height: 170px;
      width: 170px;
      box-shadow: -4px -2px 18px -1px rgba(0,0,0,0.75);
      border-radius: 4px;
    }
  }

  .buy-button-wrapper{
    padding: 22px;
  }
  .popup-btn{
    margin-top: 15px;
    max-width: 300px;
    width: 100%;
    height: 50px !important;
    border-radius: 10px !important;
    background-color: $color-text;
    border: none !important;
    font-weight: bold;
    color: white;
  }

  .multiplier-wrapper{
    display: flex;
    justify-content: center;
  }

  .product-counter{
    width:300px;
    margin-top: 20px;
    display:flex;
  }
  input[type='text']{
    font-family: inherit;
    font-weight:bold;
    outline-style:none;
    text-align:center;
    width: 100%;
    height: 50px;
    margin-left: -4px;
    top: -8px;
    padding: 0 10px;
    background: $color-font;
    border: none;
    color: $color-null;
  }
  input[type='button']{
    background-color: $color-font;
    cursor:pointer;
    outline-style: none;
    width: 50px;
    height: 50px;
    border: 0;
    color: $color-null;
    text-align: center;
    line-height: 26px;
    font-size: 36px;
    font-family: $font-content;
  }
  input[type='button']#minus{
    border-radius: 10px 0 0 10px;
  }
  input[type='button']#plus{
    border-radius: 0 10px 10px 0;
    margin-left: -4px;
  }

  .price-wrapper {
    position: relative;
    margin-top: 40px;
    padding: 20px;
    border: 2px dashed $color-font;
    text-align: center;
    .price-block {
      padding: 5px;
      position: absolute;
      top: -30px;
      left: 20px;
      background-color: white;
      font-weight: bold;
      font-size: 30px;
      color: $color-font;
    }
    .price-discount-block {
      padding: 5px;
      position: absolute;
      top: -30px;
      right: 20px;
      background-color: white;
      font-weight: bold;
      font-size: 30px;
      color: #ff3860;
    }
    .main-price {
      color: #ff3860;
      font-size: 30px;
    }
    .discount-price {
      color: gainsboro;
      text-decoration: line-through;
      font-size: 20px;
      margin-right: 10px;
    }

  }
  .stats-wrapper{
    margin-top: 60px;
    text-align: left;
  }
</style>
