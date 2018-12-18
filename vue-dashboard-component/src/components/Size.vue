<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h2 class="mb-0">Рассчет стоимости</h2>
            </div>
        </v-card-title>
        <v-card-text>

            <v-text-field
                    label="Шаг"
                    v-model="product.size.step"
                    hint="назване и номер шага"/>

            <v-text-field
                    label="Базовая ширина (мм) *"
                    v-model="product.size.width"
                    hint="ширина в миллиметрах"/>

            <v-text-field
                    label="Базовая высота (мм) *"
                    v-model="product.size.height"
                    hint="высота в миллиметрах"/>

            <v-text-field
                    label="Максимальное допустимое значение размеров (мм) *"
                    v-model="product.size.max"
                    hint="макс значение в миллиметрах"/>

            <v-text-field
                    label="Минимальное допустимое значение размеров (мм) *"
                    v-model="product.size.min"
                    hint="мин значение в миллиметрах"/>

            <h2>Цена за ширину</h2>

            <v-text-field
                    label="Базовые размеры ширины(ниже которых цена не будет изменяться) (мм) *"
                    v-model="product.size.price.baseWidth"
                    hint="базовый размер в ММ"/>

            <v-text-field
                    label="Цена за базовые размеры ширины(цена минимальная на основе которой делаются расчеты ширины) (р) *"
                    v-model="product.size.price.basePriceWidth"
                    hint="базовая цена в рублях"/>

            <v-text-field
                    label="Шаг (размер за приодолев который цена возрастает) (мм)*"
                    v-model="product.size.price.stepWidth"
                    hint="шаг в ММ"/>

            <v-text-field
                    label="Цена в рублях за каждый шаг (р) *"
                    v-model="product.size.price.multiplyWidth"
                    hint="множитель в рублях"/>

            <h2>Цена за высоту</h2>

            <v-text-field
                    label="Базовые размеры высоты(ниже которых цена не будет изменяться) (мм) *"
                    v-model="product.size.price.baseHeight"
                    hint="базовый размер в ММ"/>

            <v-text-field
                    label="Цена за базовые размеры высоты(цена минимальная на основе которой делаются расчеты высоты) (р) *"
                    v-model="product.size.price.basePriceHeight"
                    hint="базовая цена в рублях"/>

            <v-text-field
                    label="Шаг (размер за приодолев который цена возрастает) (мм)*"
                    v-model="product.size.price.stepHeight"
                    hint="шаг в ММ"/>

            <v-text-field
                    label="Цена в рублях за каждый шаг (р) *"
                    v-model="product.size.price.multiplyHeight"
                    hint="множитель в рублях"/>

            <v-textarea
                    name="input-7-1"
                    label="Описание"
                    v-model="product.size.description"
                    hint="описание секции"/>

        </v-card-text>
    </v-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {
  name: 'Size',
  methods: {
    ...mapActions(['setByName', 'getByName', 'getAll'])
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
