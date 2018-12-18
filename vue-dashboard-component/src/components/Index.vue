<template>
    <v-app>
        <v-data-table
                :headers="headers"
                :items="products"
                class="elevation-1"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                sort-icon="mdi-menu-down"
                :pagination.sync="pagination"
                :rows-per-page-items="[ 25, { 'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1 } ]"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.name }}</td>
                <td class="justify-center layout px-0">
                    <v-icon class="mr-2"
                            @click="editItem(props.item.id)">edit</v-icon>
                    <v-icon class="mr-2"
                            @click="openDialog(props.item.id)">delete</v-icon>
                </td>
            </template>
        </v-data-table>
        <v-layout>
            <v-spacer/>
            <v-btn color="primary" flat @click="addItem">
                Добавить продукт
            </v-btn>
        </v-layout>

        <delete-entry :is-open="dialog" @deleteItem="deleteItem" @dialogToggle="val => dialog = val" dialog-header="Удаление элемента" dialog-body="Вы точно хотите удалить элемент?"/>

    </v-app>
</template>

<script>
import axios from 'axios'
import DeleteEntry from './DeleteEntry'
export default {
  name: 'Index',
  components: { DeleteEntry },
  data () {
    return {
      url: window.location.protocol + '//' + window.location.hostname + '/index.php?option=com_ajax&plugin=products&format=json',
      pagination: {
        sortBy: 'id'
      },
      dialog: false,
      currentId: null,
      products: [],
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Название', sortable: false },
        { text: 'Экшены', sortable: false }
      ]
    }
  },
  methods: {
    addItem () {
      this.$router.push({ name: 'product' })
    },
    editItem (id) {
      this.$router.push({ name: 'product', params: { id } })
    },
    async getProducts () {
      try {
        const result = await axios.post(this.url, { getAll: '' })
        this.products = result.data.data[0]
        return true
      } catch (e) {
        return e
      }
    },
    openDialog (id) {
      this.currentId = id
      this.dialog = true
    },
    async deleteItem () {
      const result = await axios.post(this.url, { delete: '', id: this.currentId })
      result.data.data[0] ? this.getProducts() : console.log('error while deleting')
      this.dialog = false
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
