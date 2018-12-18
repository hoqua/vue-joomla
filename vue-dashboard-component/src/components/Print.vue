<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h2 class="mb-0">Нанесение изображения</h2>
                <p>Данная секция является опциональной и не представленна у всех продуктов. Добавление новых полей сформирует секцию по желанию.</p>
                <v-checkbox label="Использовать секцию"
                            v-model="product.print.isUsed"
                            :input-value="product.print.isUsed"
                            :false-value="false"
                            :true-value="true"
                            color="success"/>
            </div>
        </v-card-title>

        <v-card-text>

            <div v-if="product.print.isUsed">

                <h2>Данный элемент состоит из набора чекбоксов и опционального описания</h2>

                <v-text-field label="Название шага *"
                              v-model="product.print.step"
                              hint="заголовок который будет отображен как номер шага"/>

                <v-text-field label="Название шага *"
                              v-model="product.print.name"
                              hint="заголовок который будет отображен как название шага"/>

                <v-text-field
                        label="Работает с цветом *"
                        v-model="product.print.items[0].workWith"
                        hint="При выборе цвета становится доступным базовый и дополнительные элементы покраски"/>

                 <h2>Базовый элемент, при выборе которого становятся доступны дополнительные опции</h2>

                <v-layout>
                    <v-flex md4>
                        <v-text-field
                                label="Название опции *"
                                v-model="product.print.items[0].name"
                                hint="название опции"/>
                    </v-flex>

                    <v-flex md4 class="mx-3">
                        <v-text-field
                                label="Цена за опцию (р)"
                                v-model="product.print.items[0].price"
                                hint="цена за опцию"/>
                    </v-flex>

                    <v-flex md4>
                        <v-text-field label="Фото"
                                      v-model="product.print.items[0].photo"
                                      :hint="product.base.nameDB ? `${product.base.nameDB}/${sectionName}/photo/имя-фото.jpg` : '!! Введите название продукта (шаг 1)'"/>
                    </v-flex>
                </v-layout>

                <h2>Дополнтельные опции покраски</h2>

                <v-layout v-for="(item, index) in product.print.items[0].items" :key="index">
                    <v-flex md4>
                        <v-text-field
                                label="Название опции *"
                                v-model="item.name"
                                hint="название опции"/>
                    </v-flex>

                    <v-flex md4 class="mx-3">
                        <v-text-field
                                label="Цена за опцию (р)"
                                v-model="item.price"
                                hint="цена за опцию"/>
                    </v-flex>

                    <v-flex md4>
                        <v-text-field label="Фото"
                                      v-model="item.photo"
                                      :hint="product.base.nameDB ? `${product.base.nameDB}/${sectionName}/photo/имя-фото.jpg` : '!! Введите название продукта (шаг 1)'"/>
                    </v-flex>

                    <v-btn color="primary" icon flat @click="openDialog(index)" :disabled="index === 0">x</v-btn>

                </v-layout>

                <v-layout>
                    <v-spacer/>
                    <v-btn color="primary" flat @click="addItem">
                        Добавить поле чекбокс
                    </v-btn>
                </v-layout>

                <delete-entry :is-open="dialog" @deleteItem="deleteItem" @dialogToggle="val => dialog = val" dialog-header="Удаление элемента" dialog-body="Вы точно хотите удалить элемент?"/>

            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import DeleteEntry from './DeleteEntry'
export default {
  name: 'print',
  components: { DeleteEntry },
  data () {
    return {
      dialog: false,
      currentIndex: null,
      sectionName: 'print',
      itemDefault: {
        isActive: false,
        name: '',
        price: '',
        photo: ''
      }
    }
  },
  methods: {
    addItem () {
      this.product.print.items[0].items.push(Object.assign({}, this.itemDefault))
    },
    deleteItem () {
      this.product.print.items[0].items.splice(this.currentIndex, 1)
      this.dialog = false
    },
    openDialog (index) {
      this.currentIndex = index
      this.dialog = true
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
