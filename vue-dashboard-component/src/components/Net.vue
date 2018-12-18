<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h2 class="mb-0">Сетка</h2>
                <p>Данная секция является опциональной и не представленна у всех продуктов. Добавление новых полей сформирует секцию по желанию.</p>

                <v-checkbox label="Использовать секцию"
                            v-model="product.net.isUsed"
                            :input-value="product.net.isUsed"
                            :false-value="false"
                            :true-value="true"
                            color="success"/>
            </div>
        </v-card-title>

        <v-card-text>

            <div v-if="product.net.isUsed">

                <h2>Данный элемент состоит из набора чекбоксов и опционального описания</h2>

                <v-text-field label="Название шага *"
                              v-model="product.net.step"
                              hint="заголовок который будет отображен как номер шага"/>

                <v-text-field label="Заголовок шага *"
                              v-model="product.net.name"
                              hint="заголовок который будет отображен как название шага"/>

                <v-layout v-for="(item, index) in product.net.items" :key="index">
                    <v-flex md4>
                        <v-text-field
                                label="Название опции *"
                                v-model="product.net.items[index].name"
                                hint="название опции"/>
                    </v-flex>

                    <v-flex md4 class="mx-3">
                        <v-text-field
                                label="Цена за опцию (р)"
                                v-model="product.net.items[index].price"
                                hint="цена за опцию"/>
                    </v-flex>

                    <v-flex md4 class="mx-3">
                        <v-text-field
                                label="Цена за размерный шаг"
                                v-model="product.net.items[index].priceStepMultiply"
                                hint="изменяет цену за шаг при выборе опции"/>
                    </v-flex>

                    <v-flex md4 class="mx-3">
                        <v-text-field label="Икона фото"
                                      v-model="product.net.items[index].icon"
                                      :hint="product.base.nameDB ? `${product.base.nameDB}/${sectionName}/icon/имя-фото.jpg` : '!!Введите название продукта (шаг 1)'"/>
                    </v-flex>

                    <v-flex md4 class="mx-3">
                        <v-text-field label="Фото тамб"
                                      v-model="product.net.items[index].thumb"
                                      :hint="product.base.nameDB ? `${product.base.nameDB}/${sectionName}/thumb/имя-фото.jpg` : '!!Введите название продукта (шаг 1)'"/>
                    </v-flex>

                    <v-btn color="primary" icon flat @click="openDialog(index)" :disabled="index === 0">x</v-btn>

                </v-layout>

                <v-layout>
                    <v-spacer/>
                    <v-btn color="primary" flat @click="addItem">
                        Добавить сетку
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
  name: 'nettype',
  components: { DeleteEntry },
  data () {
    return {
      dialog: false,
      currentIndex: null,
      sectionName: 'net',
      itemDefault: {
        isActive: false,
        name: '',
        price: '',
        icon: '',
        thumb: ''
      }
    }
  },
  methods: {
    addItem () {
      this.product.net.items.push(Object.assign({}, this.itemDefault))
    },
    deleteItem () {
      this.product.net.items.splice(this.currentIndex, 1)
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
