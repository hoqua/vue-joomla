<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h2 class="mb-0">Профиль</h2>
                <p>Данная секция является опциональной и не представленна у всех продуктов. Добавление новых полей сформирует секцию по желанию.</p>
                <v-checkbox label="Использовать секцию"
                            v-model="product.profile.isUsed"
                            :input-value="product.profile.isUsed"
                            :false-value="false"
                            :true-value="true"
                            profile="success"/>
            </div>
        </v-card-title>

        <v-card-text>

            <div v-if="product.profile.isUsed">

                <h2>Данный элемент состоит из набора картинок</h2>

                <v-text-field label="Название шага *"
                              v-model="product.profile.step"
                              hint="заголовок который будет отображен как номер шага"/>

                <v-text-field label="Заголвок шага *"
                              v-model="product.profile.name"
                              hint="заголовок который будет отображен как название шага"/>

                <v-checkbox label="Использовать кругрые картинки (для рольставни)"
                            v-model="product.profile.isRound"
                            :input-value="product.profile.isRound"
                            :false-value="false"
                            :true-value="true"
                            profile="success"/>

                <v-layout v-for="(field, index) in product.profile.items" :key="index">
                    <v-flex md2>
                        <v-text-field
                                label="Название профиля"
                                v-model="product.profile.items[index].name"
                                hint="название будет отображено под иконкой"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field
                                label="Влияние на ценy"
                                v-model="product.profile.items[index].price"
                                hint="цена за цвет"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field
                                label="Цена за размерный шаг"
                                v-model="product.profile.items[index].priceStepMultiply"
                                hint="изменяет цену за шаг при выборе опции"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field
                                label="Иконка фото"
                                v-model="product.profile.items[index].icon"
                                :hint="product.base.nameDB ? `${product.base.nameDB}/${sectionName}/icon/имя-иконки.jpg` : '!!Введите название продукта (Основное)'"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field label="Основное фото"
                                      v-model="product.profile.items[index].photo"
                                      :hint="product.base.nameDB ? `${product.base.nameDB}/${sectionName}/photo/имя-фото.jpg` : '!!Введите название продукта (Основное)'"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field label="Фото тамб(маленькое)"
                                      v-model="product.profile.items[index].thumb"
                                      :hint="product.base.nameDB ? `${product.base.nameDB}/${sectionName}/thumb/имя-фото.jpg` : '!!Введите название продукта (Основное)'"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field
                                label="Максимальный рзмер"
                                v-model="product.profile.items[index].maxSize"
                                hint="размер в мм"/>
                    </v-flex>

                    <v-btn color="primary" icon flat @click="openDialog(index)" :disabled="index === 0">x</v-btn>

                </v-layout>

                <v-layout>
                    <v-spacer/>
                    <v-btn color="primary" flat @click="addItem">
                        Добавить профиль
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
  name: 'profile',
  components: { DeleteEntry },
  data () {
    return {
      dialog: false,
      currentIndex: null,
      sectionName: 'profile',
      itemDefault: {
        isActive: true,
        name: '',
        price: '',
        icon: '',
        photo: '',
        thumb: '',
        maxSize: ''
      }
    }
  },
  methods: {
    addItem () {
      this.product.profile.items.push(Object.assign({}, this.itemDefault))
    },
    deleteItem () {
      this.product.profile.items.splice(this.currentIndex, 1)
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
