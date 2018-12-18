import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: window.location.protocol + '//' + window.location.hostname + '/index.php?option=com_ajax&plugin=products&format=json',
    product: {},
    productDefault: {
      base: {
        nameDB: '',
        nameRu: '',
        photoBase: '',
        photo: '',
        thumb: '',
        discount: '',
        description: 'Ассортимент алюминиевых жалюзи всегда поражал разнообразием оттенков, которые могут быть подобраны под любой стиль интерьера. На ламелях имеется напыление, защищающее от выгорания поверхности и механических повреждений.'
      },
      size: {
        isUsed: true,
        step: '',
        name: 'Размер',
        width: '1000',
        height: '1000',
        min: '300',
        max: '3000',
        price: {
          name: 'size',
          baseWidth: '1000',
          baseHeight: '1000',
          basePriceWidth: '1000',
          basePriceHeight: '1000',
          stepWidth: '100',
          stepHeight: '100',
          multiplyWidth: '100',
          multiplyHeight: '100'
        },
        hint: 'Если любое из полей ввода обведено красным - размер больше максимального, в этом случае возможность изготовления изделия нужно уточнять у менеджера по телефону!',
        description: 'Внимательно указывайте ширину и высоту изделия в миллиметрах. 1 метр = 100 сантиметров = 1000 миллиметров! Точный размер является залогом качественной установки жалюзи и красивого эстетичного вида!'
      },
      montaj: {
        isUsed: false,
        step: '',
        name: 'Монтаж',
        items: [{
          isActive: true,
          name: 'Встроенный',
          price: '',
          thumb: ''
        }],
        description: 'При выборе накладного монтажа обязательно к размерам проема добавьте 110мм ширины и 250мм высоты!'
      },
      management: {
        isUsed: false,
        step: '',
        name: 'Управление',
        items: [{
          isActive: true,
          name: '',
          price: '',
          thumb: '',
          excludeWith: ''
        }]
      },
      block: {
        isUsed: false,
        step: '',
        name: 'Тип блокировки',
        items: [{
          isActive: true,
          name: '',
          price: '',
          thumb: ''
        }]
      },
      color: {
        isUsed: false,
        step: '',
        name: 'Цвет',
        isRound: false,
        overlayPhoto: '',
        filter: {
          isUsed: false
        },
        items: [{
          isActive: true,
          name: '',
          number: '',
          price: '',
          priceStepMultiply: '',
          icon: '',
          photo: '',
          group: '',
          excludeWith: ''
        }]
      },
      profile: {
        isUsed: false,
        step: '',
        name: 'Профиль',
        isRound: false,
        items: [{
          isActive: true,
          name: '',
          price: '',
          priceStepMultiply: '',
          icon: '',
          photo: '',
          thumb: '',
          maxSize: ''
        }]
      },
      print: {
        isUsed: false,
        step: '',
        name: 'Нанесение изображения',
        description: 'Фотопечать наносится только на профили: PD39(N), PD45(N), PD55(N) БЕЛОГО ЦВЕТА! Максимальная ширина изделия -1600мм. Максимальная высота изделия - 2500мм.',
        items: [{
          isActive: false,
          name: '',
          price: '',
          photo: '',
          workWith: '',
          items: [
            {
              isActive: false,
              name: '',
              price: '',
              photo: ''
            }
          ]
        }]
      },
      net: {
        isUsed: false,
        step: '',
        name: 'Сеть',
        isRound: false,
        items: [{
          isActive: true,
          name: '',
          price: '',
          priceStepMultiply: '',
          icon: '',
          thumb: ''
        }]
      }
    }
  },
  getters: {
    // Add the `getField` getter to the
    // `getters` of your Vuex store instance.
    getField
  },
  mutations: {
    SET_JSON (state, product) {
      state.product = product
    },
    DEFAULT_JSON (state) {
      state.product = JSON.parse(JSON.stringify(state.productDefault))
    },
    updateField
  },
  actions: {

    async setProduct ({ state }, id) {
      console.log(id)
      const result = await axios.post(state.url, { setProduct: state.product.base.nameDB, id, data: JSON.stringify(state.product) })
      console.log(result)
    },

    async getById ({ state, commit }, id) {
      try {
        const result = await axios.post(state.url, { getById: '', id })
        const product = JSON.parse(result.data.data[0][0].json)
        // const product = JSON.parse(JSON.stringify(state.productDefault))
        console.log(product)
        commit('SET_JSON', product)
        return product
      } catch (e) {
        return e
      }
    },

    async defaultStore ({ commit }) {
      commit('DEFAULT_JSON')
    }
  }
})
