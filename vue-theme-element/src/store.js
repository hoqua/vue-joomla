import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoaded: false,
    product: {},
    productDefault: {
      base: {
        nameDB: 'test',
        nameRu: 'ГОРИЗОНТАЛЬНЫЕ АЛЮМИНИЕВЫЕ',
        photoBase: '1.jpg',
        photo: '1.jpg',
        thumb: '1.jpg',
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
        isUsed: true,
        step: '',
        name: 'Монтаж',
        items: [{
          isActive: true,
          name: 'Встроенный',
          price: '100',
          thumb: '1.jpg'
        },
        {
          isActive: false,
          name: 'Накладной',
          price: '100',
          thumb: '2.jpg'
        }],
        description: 'При выборе накладного монтажа обязательно к размерам проема добавьте 110мм ширины и 250мм высоты!'
      },
      management: {
        isUsed: true,
        step: '',
        name: 'Управление',
        items: [{
          isActive: true,
          name: 'Пружинный',
          price: '100',
          thumb: '1.jpg',
          excludeWith: 'Блок 1'
        },
        {
          isActive: false,
          name: 'Ленточный',
          price: '100',
          thumb: '2.jpg',
          excludeWith: 'Блок 1, Блок 2'
        },
        {
          isActive: false,
          name: 'Карданный',
          price: '100',
          thumb: '3.jpg',
          excludeWith: 'Блок 1, Блок 2, Блок 3'
        }]
      },
      block: {
        isUsed: true,
        step: '',
        name: 'Тип блокировки',
        items: [{
          isActive: true,
          name: 'Блок 1',
          price: '100',
          thumb: '1.jpg'
        },
        {
          isActive: false,
          name: 'Блок 2',
          price: '100',
          thumb: '2.jpg'
        },
        {
          isActive: false,
          name: 'Блок 3',
          price: '100',
          thumb: '3.jpg'
        }]
      },
      color: {
        isUsed: true,
        step: '',
        name: 'Цвет',
        isRound: false,
        filter: {
          isUsed: false
        },
        items: [{
          isActive: true,
          name: 'Белый',
          number: '1',
          price: '100',
          icon: '1.jpg',
          photo: '1.jpg',
          group: '1',
          excludeWith: ''
        },
        {
          isActive: false,
          name: 'Цвет 2',
          number: '2',
          price: '100',
          icon: '2.jpg',
          photo: '2.jpg',
          group: '2',
          excludeWith: 'Профиль 2'
        },
        {
          isActive: false,
          name: 'Цвет 3',
          number: '3',
          price: '100',
          icon: '3.jpg',
          photo: '3.jpg',
          group: '3',
          excludeWith: 'Профиль 1, Профиль 2, Профиль 3'
        },
        {
          isActive: false,
          name: 'Цвет 4',
          number: '3',
          price: '100',
          icon: '',
          photo: '',
          group: '3',
          excludeWith: 'Профиль 1, Профиль 2, Профиль 3'
        },
        {
          isActive: false,
          name: 'Цвет 5',
          number: '3',
          price: '100',
          icon: '',
          photo: '',
          group: '3',
          excludeWith: 'Профиль 1, Профиль 2, Профиль 3'
        },
        {
          isActive: false,
          name: 'Цвет 5',
          number: '3',
          price: '100',
          icon: '',
          photo: '',
          group: '3',
          excludeWith: 'Профиль 1, Профиль 2, Профиль 3'
        },
        {
          isActive: false,
          name: 'Цвет 5',
          number: '3',
          price: '100',
          icon: '',
          photo: '',
          group: '3',
          excludeWith: 'Профиль 1, Профиль 2, Профиль 3'
        },
        {
          isActive: false,
          name: 'Цвет 5',
          number: '3',
          price: '100',
          icon: '',
          photo: '',
          group: '3',
          excludeWith: 'Профиль 1, Профиль 2, Профиль 3'
        }]
      },
      profile: {
        isUsed: true,
        step: '',
        name: 'Профиль',
        isRound: true,
        items: [{
          isActive: true,
          name: 'Профиль 1',
          price: '100',
          icon: '1.jpg',
          photo: '',
          thumb: '1.jpg',
          maxSize: '2500'
        },
        {
          isActive: true,
          name: 'Профиль 2',
          price: '100',
          icon: '2.jpg',
          photo: '',
          thumb: '2.jpg'
        },
        {
          isActive: true,
          name: 'Профиль 3',
          price: '100',
          icon: '3.jpg',
          photo: '',
          thumb: '3.jpg'
        }]
      },
      print: {
        isUsed: true,
        step: '',
        name: 'Нанесение изображения',
        description: 'Фотопечать наносится только на профили: PD39(N), PD45(N), PD55(N) БЕЛОГО ЦВЕТА! Максимальная ширина изделия -1600мм. Максимальная высота изделия - 2500мм.',
        items: [{
          isActive: false,
          name: 'Полотно',
          price: '100',
          photo: '1.gif',
          workWith: 'Белый',
          items: [
            {
              isActive: false,
              name: 'Направляющие',
              price: '100',
              photo: '2.gif'
            },
            {
              isActive: false,
              name: 'Короб',
              price: '100',
              photo: '3.gif'
            },
            {
              isActive: false,
              name: 'Покрытие лаком',
              price: '100',
              photo: '1.gif'
            }
          ]
        }]
      },
      net: {
        isUsed: true,
        step: '',
        name: 'Сеть',
        isRound: false,
        items: [{
          isActive: true,
          name: 'Сетка 1',
          price: '100',
          icon: '1.jpg',
          thumb: '1.jpg'
        },
        {
          isActive: false,
          name: 'Сетка 2',
          price: '100',
          icon: '2.jpg',
          thumb: '2.jpg'
        },
        {
          isActive: false,
          name: 'Сетка 3',
          price: '100',
          icon: '3.jpg',
          thumb: '3.jpg'
        }]
      }
    }
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    SET_PRODUCT (state, product) {
      console.log(product)
      state.product = product
      state.isLoaded = true
    }
  },
  actions: {
    async getProduct ({ commit }) {
      const root = document.getElementById('root-app')
      const nameDB = root.className
      const result = await axios.post(window.location.protocol + '//' + window.location.hostname + '/index.php?option=com_ajax&plugin=products&format=json', { getByName: nameDB, name: nameDB })
      const product = JSON.parse(result.data.data[0][0].json)
      // const product = JSON.parse('{"base":{"nameDB":"rostavn","nameRu":"Рольставни","photoBase":"default_rol_1.jpg","photo":"","thumb":"238.jpg","discount":"18","description":"Рольставни на окна получили широкое распространение, ведь главное целевое предназначение – защита проема от взлома, взора посторонних глаз и воздействия различных неблагоприятных условий. Скидка 12% на рольставни из всех видов профилей. Выгода 22% на рольставни из PD39 и PD45, скидка 28% на рольставни из профилей AER44, PD55, AER55 и 32% на PD77!"},"size":{"isUsed":true,"step":"Шаг 1","name":"Размер","width":"1000","height":"1000","min":"300","max":"3000","price":{"name":"size","baseWidth":"1000","baseHeight":"1000","basePriceWidth":"1425","basePriceHeight":"1425","stepWidth":"100","stepHeight":"100","multiplyWidth":"200","multiplyHeight":"200"},"hint":"Если любое из полей ввода обведено красным - размер больше максимального, в этом случае возможность изготовления изделия нужно уточнять у менеджера по телефону!","description":"Внимательно указывайте ширину и высоту изделия в миллиметрах. 1 метр = 100 сантиметров = 1000 миллиметров! Точный размер является залогом качественной установки жалюзи и красивого эстетичного вида!"},"montaj":{"isUsed":true,"step":"ШАГ 2","name":"Монтаж","items":[{"isActive":true,"name":"Встроенный","price":"0","thumb":"vnutr.jpg"},{"isActive":false,"name":"Накладной","price":"0","thumb":"nakl.jpg"}],"description":"При выборе накладного монтажа обязательно к размерам проема добавьте 110мм ширины и 250мм высоты!"},"management":{"isUsed":true,"step":"Шаг 3","name":"Управление","items":[{"isActive":true,"name":"Пружинный","price":"0","thumb":"pruzh.jpg","excludeWith":"ВБР"},{"isActive":false,"name":"Ленточный","price":"-600","thumb":"lent.jpg","excludeWith":"ВБР"},{"isActive":false,"name":"Карданный","price":"1500","thumb":"kardan.jpg","excludeWith":"не исключать"},{"isActive":false,"name":"Электропривод + выкл.","price":"2500","thumb":"pult.jpg","excludeWith":"Задвижка боковая,Замок в планку"}]},"block":{"isUsed":true,"step":"Шаг 4","name":"Тип блокировки","items":[{"isActive":true,"name":"Замок в планку","price":"1000","thumb":"zam.jpg"},{"isActive":false,"name":"Задвижка боковая","price":"300","thumb":"zad.jpg"},{"isActive":false,"name":"ВБР","price":"1100","thumb":"vbr.jpg"},{"isActive":false,"name":"Без блокировки","price":"0","thumb":""}]},"color":{"isUsed":true,"step":"Шаг 5","name":"Цвет изделия","isRound":false,"overlayPhoto":"","filter":{"isUsed":false},"items":[{"isActive":true,"name":"Белый 01 (RAL 9016)","number":"","price":"800","icon":"","photo":"default_rol_1.jpg","group":"","excludeWith":"","priceStepMultiply":"0"},{"isActive":false,"name":"Серый 03 (RAL 7038)","price":"800","icon":"","photo":"default_rol_2.jpg","group":"","priceStepMultiply":"0"},{"isActive":false,"name":"Покраска RAL (Свой цвет)","price":"4500","icon":"","photo":"default_rol_5 (1).jpg","group":"","excludeWith":"PD/39(N),PD/45(N),PD/55(N),PD/77","priceStepMultiply":"390"},{"isActive":false,"name":"Коричневый 02 (RAL 8014)","price":"800","icon":"","photo":"default_rol_3.jpg","group":"","priceStepMultiply":"0"},{"isActive":false,"name":"Бежевый 04 (RAL 1019)","price":"800","icon":"","photo":"default_rol_4.jpg","group":"","priceStepMultiply":"0"}]},"profile":{"isUsed":true,"step":"Шаг 6","name":"Профиль","isRound":true,"items":[{"isActive":true,"name":"PD/39(N)","price":"0","icon":"21.jpg","photo":"","thumb":"21.jpg","maxSize":"","priceStepMultiply":"0"},{"isActive":true,"name":"PD/45(N)","price":"300","icon":"22.jpg","photo":"","thumb":"22.jpg","maxSize":"","priceStepMultiply":"0"},{"isActive":true,"name":"PD/55(N)","price":"450","icon":"23.jpg","photo":"","thumb":"23.jpg","maxSize":"","priceStepMultiply":"50"},{"isActive":true,"name":"PD/77","price":"1700","icon":"24.jpg","photo":"","thumb":"24.jpg","maxSize":"","priceStepMultiply":"50"},{"isActive":true,"name":"AER42","price":"1750","icon":"25.jpg","photo":"","thumb":"25.jpg","maxSize":"","priceStepMultiply":"50"},{"isActive":true,"name":"AER44/S","price":"1250","icon":"26.jpg","photo":"","thumb":"26.jpg","maxSize":"","priceStepMultiply":"50"},{"isActive":true,"name":"AER55","price":"1600","icon":"27.jpg","photo":"","thumb":"27.jpg","maxSize":"","priceStepMultiply":"70"},{"isActive":true,"name":"AEG56","price":"4000","icon":"28.jpg","photo":"","thumb":"28.jpg","maxSize":"","priceStepMultiply":"150"},{"isActive":true,"name":"AEG56/P","price":"7600","icon":"29.jpg","photo":"","thumb":"29.jpg","maxSize":"","priceStepMultiply":"220"},{"isActive":true,"name":"AEG84","price":"13600","icon":"30.jpg","photo":"","thumb":"30.jpg","maxSize":"","priceStepMultiply":"310"}]},"print":{"isUsed":true,"step":"Шаг 7","name":"Нанесение изображения","description":"Фотопечать наносится только на профили: PD39(N), PD45(N), PD55(N) БЕЛОГО ЦВЕТА! Максимальная ширина изделия -1600мм. Максимальная высота изделия - 2500мм.","items":[{"isActive":false,"name":"Полотно","price":"3000","photo":"default_rol_f1 (1).gif","workWith":"Белый 01 (RAL 9016),PD39(N), PD45(N), PD55(N)","items":[{"isActive":false,"name":"Направляющие","price":"1000","photo":"default_rol_f2 (1).gif"},{"isActive":false,"name":"Короб","price":"1500","photo":"default_rol_f3 (1).gif"},{"isActive":false,"name":"Покрытие лаком","price":"2000","photo":"default_rol_f3 (1).gif"}]}]},"net":{"isUsed":false,"step":"","name":"Сеть","isRound":false,"items":[{"isActive":true,"name":"","price":"0","icon":"","thumb":""}]}}')
      commit('SET_PRODUCT', product)
    }
  }
})
