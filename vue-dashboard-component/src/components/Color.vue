<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h2 class="mb-0">Цвет</h2>
                <p>Данная секция является опциональной и не представленна у всех продуктов. Добавление новых полей сформирует секцию по желанию.</p>
                <v-checkbox label="Использовать секцию"
                            v-model="product.color.isUsed"
                            :input-value="product.color.isUsed"
                            :false-value="false"
                            :true-value="true"
                            color="success"/>
            </div>
        </v-card-title>

        <v-card-text>

            <div v-if="product.color.isUsed">

                <h2>Данный элемент состоит из набора картинок</h2>

                <v-text-field label="Название шага *"
                              v-model="product.color.step"
                              hint="заголовок который будет отображен как номер шага"/>

                <v-text-field label="Заголовок шага *"
                              v-model="product.color.name"
                              hint="заголовок который будет отображен как название шага"/>

                <v-checkbox label="Использовать кругрые картинки (для жалюзи)"
                            v-model="product.color.isRound"
                            :input-value="product.color.isRound"
                            :false-value="false"
                            :true-value="true"
                            color="success"/>

                <!--<v-checkbox label="Добавить фильтр по группам"-->
                            <!--v-model="product.color.filter.isUsed"-->
                            <!--:input-value="product.color.filter.isUsed"-->
                            <!--:false-value="false"-->
                            <!--:true-value="true"-->
                            <!--color="success"/>-->

                <v-text-field label="Картинка оверлэй*"
                              v-model="product.color.overlayPhoto"
                              :hint="`используется в некоторых типах жалюзи и рендерится поверх цвета // ${product.base.nameDB}/${sectionName}/overlay/имя-фото.jpg`"/>

                <v-layout v-for="(field, index) in product.color.items" :key="index">
                    <v-flex md2>
                        <v-text-field
                                label="Название цвета (опционально)"
                                v-model="product.color.items[index].name"
                                hint="название будет отображено под иконкой"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field
                                label="Влияние на ценy"
                                v-model="product.color.items[index].price"
                                hint="цена за цвет"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field
                                label="Цена за размерный шаг"
                                v-model="product.color.items[index].priceStepMultiply"
                                hint="изменяет цену за шаг при выборе опции"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field
                                label="Иконка фото"
                                v-model="product.color.items[index].icon"
                                :hint="product.base.nameDB ? `${product.base.nameDB}/${sectionName}/icon/имя-иконки.jpg` : '!!Введите название продукта (Основное)'"/>
                    </v-flex>

                    <v-flex md2 class="mx-1">
                        <v-text-field label="Основное фото"
                                      v-model="product.color.items[index].photo"
                                      :hint="product.base.nameDB ? `${product.base.nameDB}/${sectionName}/photo/имя-фото.jpg` : '!!Введите название продукта (Основное)'"/>
                    </v-flex>

                    <!--<v-flex md2 class="mx-1">-->
                        <!--<v-text-field-->
                                <!--label="Группа (опционально)"-->
                                <!--v-model="product.color.items[index].group"-->
                                <!--hint="группа указываеся для фильтрации если фильтр по группам добавлен"/>-->
                    <!--</v-flex>-->

                    <v-flex md2>
                        <v-text-field
                                label="Исключить профиль"
                                v-model="product.color.items[index].excludeWith"
                                hint="Указанные имена профилей через запятую будут исключены"/>
                    </v-flex>

                    <v-btn color="primary" icon flat @click="openDialog(index)" :disabled="index === 0">x</v-btn>

                </v-layout>

                <v-layout>
                    <v-spacer/>
                    <v-btn color="primary" flat @click="addItem">
                        Добавить цвет
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
  name: 'color',
  components: { DeleteEntry },
  data () {
    return {
      dialog: false,
      currentIndex: null,
      sectionName: 'color',
      itemDefault: {
        isActive: false,
        name: '',
        price: '',
        icon: '',
        photo: '',
        group: ''
      }
    }
  },
  methods: {
    addItem () {
      this.product.color.items.push(Object.assign({}, this.itemDefault))
    },
    deleteItem () {
      this.product.color.items.splice(this.currentIndex, 1)
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
