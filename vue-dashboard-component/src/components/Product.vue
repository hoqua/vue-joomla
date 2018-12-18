<template>
  <v-app>
    <v-content v-if="Object.keys(product).length">
      <v-tabs>
        <v-tab v-for="item in tabs"
               :key="item.name"
               slider-color="yellow">
          {{item.name}}
        </v-tab>

        <v-tab-item ripple>
          <read-me/>
        </v-tab-item>

        <v-tab-item ripple>
          <main-info/>
        </v-tab-item>

        <v-tab-item ripple>
          <size/>
        </v-tab-item>

        <v-tab-item ripple>
          <montaje/>
        </v-tab-item>

        <v-tab-item ripple>
          <management/>
        </v-tab-item>

        <v-tab-item ripple>
          <blocktype/>
        </v-tab-item>

        <v-tab-item ripple>
          <color/>
        </v-tab-item>

        <v-tab-item ripple>
          <profile/>
        </v-tab-item>

        <v-tab-item ripple>
          <print/>
        </v-tab-item>

        <v-tab-item ripple>
          <nettype/>
        </v-tab-item>

      </v-tabs>

      <v-layout>
        <v-spacer/>
        <v-btn color="primary" flat @click="save">
          Сохранить
        </v-btn>
      </v-layout>

    </v-content>
  </v-app>
</template>

<script>
import MainInfo from './MainInfo'
import Size from './Size'
import Montaje from './Montaj'
import Management from './Management'
import Color from './Color'
import Profile from './Profile'
import Blocktype from './BlockType'
import Print from './Print'

import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import Nettype from './Net'
import ReadMe from './ReadMe'
export default {
  name: 'App',
  props: ['id'],
  components: {
    ReadMe,
    Nettype,
    Blocktype,
    Profile,
    Color,
    Montaje,
    Size,
    MainInfo,
    Management,
    Print
  },
  data () {
    return {
      editing: false,
      tabs: [
        { name: 'Read Me' },
        { name: 'Основное' },
        { name: 'Размеры' },
        { name: 'Монтаж' },
        { name: 'Управление' },
        { name: 'Тип блокировки' },
        { name: 'Цвет' },
        { name: 'Профиль' },
        { name: 'Нанесение изображений' },
        { name: 'Сетка' }
      ]
    }
  },
  computed: {
    ...mapFields([
      'product'
    ])
  },
  methods: {
    ...mapActions(['getById', 'setProduct', 'defaultStore']),
    async save () {
      try {
        await this.setProduct(this.id)
        this.$router.push({ name: 'home' })
      } catch (e) {
        return e
      }
    }
  },
  async created () {
    if (this.id) {
      this.editing = true
      const result = await this.getById(this.id)
      console.log('IN CREATED HOOK RESULT', result)
      if (result.length === 0) return this.$router.push({ name: 'home' })
    } else {
      this.defaultStore()
    }
  }
}
</script>
