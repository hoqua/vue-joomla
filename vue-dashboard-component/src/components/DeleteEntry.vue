<template>
    <v-dialog :value="isOpen" @input="val => $emit('dialogToggle', val)" width="500">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                {{dialogHeader}}
            </v-card-title>

            <v-card-text>
                {{dialogBody}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" flat @click="$emit('dialogToggle', false)">Отмена</v-btn>
                <v-btn color="error" flat @click="$emit('deleteItem')">Удалить</v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['isOpen', 'dialogHeader', 'dialogBody'],
  name: 'DeleteEntry'
}
</script>

<style scoped>

</style>
