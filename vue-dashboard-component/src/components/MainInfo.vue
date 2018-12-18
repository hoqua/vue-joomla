<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h2 class="mb-0">Обязательно заполните основную информацию</h2>
            </div>
        </v-card-title>
        <v-card-text>

            <v-text-field
                    label="Название продукта для префиксов и базы (eng)"
                    v-model="product.base.nameDB"
                    :rules="[(v) => /^[a-z0-9\-]+$/.test(v) || 'Только латинские и с маленькой буквы']"
                    hint="Название продукта должно состоять из латинских символов, с маленькой буквы, слитно (на английском языке)"/>

            <v-text-field
                    label="Название продукта (ru)"
                    v-model="product.base.nameRu"
                    hint="Название продукта на русском для отображения пользователю"/>

            <v-text-field
                    label="Значение 'скидки'"
                    v-model="product.base.discount"
                    hint="это значение будет увеличивать скидочную цену, на основании рассчитаной цены"/>

            <v-textarea
                    name="input-7-1"
                    label="Описание продукта"
                    v-model="product.base.description"
                    hint="Описание продукта"/>

            <v-text-field label="Основное фото"
                              v-model="product.base.photoBase"
                              :hint="product.base.nameDB ? `${product.base.nameDB}/имя-фото.jpg` : '!!Введите название продукта (Основное)'"/>
            <v-text-field label="Основной тамб"
                          v-model="product.base.thumb"
                          :hint="product.base.nameDB ? `${product.base.nameDB}/имя-фото.jpg` : '!!Введите название продукта (Основное)'"/>

        </v-card-text>
    </v-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {
  name: 'MainInfo',
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
