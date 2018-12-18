<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style rel="stylesheet/scss" lang="scss">
    #app {
        *:focus {
            outline:0 !important;
            border: none !important;
        }
        textarea:focus, input:focus{
            outline: none !important;
            border: none !important;
        }
        textarea, input{
            outline: none !important;
            border: none !important;
        }
    }
</style>
