<template>
    <div v-if="isLoaded" id="app" class="is-paddingless">

      <ProdHeader/>

      <div class="columns">
        <div class="column is-two-thirds">

          <size-step/>

          <montaj-step @changeThumb="val => thumb = val"/>

          <management-and-block-step @changeThumb="val => thumb = val"/>

          <color-and-profile @changeThumb="val => thumb = val" @changePhoto="val => photo = val" @changeBasePhoto="val => basePhoto = val"/>

          <print-step @changePhoto="val => photo = val"/>

          <net-step @changeThumb="val => thumb = val"/>

        </div>
        <div class="column is-one-third">
          <right-side v-bind="{thumb, photo, basePhoto}"/>
        </div>
      </div>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import ProdHeader from './components/Header.vue'
import SizeStep from './components/SizeStep'
import MontajStep from './components/MontajStep'
import ManagementAndBlockStep from './components/ManagementAndBlockStep'
import ColorAndProfile from './components/ColorAndProfile'
import PrintStep from './components/PrintStep'
import RightSide from './components/RightSide'
import NetStep from './components/NetsStep'

export default {
  name: 'app',
  components: {
    NetStep,
    RightSide,
    PrintStep,
    ColorAndProfile,
    ManagementAndBlockStep,
    MontajStep,
    SizeStep,
    ProdHeader
  },
  data () {
    return {
      thumb: '',
      photo: '',
      basePhoto: ''
    }
  },
  methods: {
    ...mapActions(['getProduct'])
  },
  computed: {
    ...mapFields([
      'isLoaded'
    ])
  },
  async mounted () {
    await this.getProduct()
  }
}
</script>

<style lang="scss">
  #app {
    @import '~buefy/dist/buefy.css';

    * {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    .button, .file-cta, .file-name, .input, .pagination-ellipsis, .pagination-link, .pagination-next, .pagination-previous, .select select, .taginput .taginput-container.is-focusable, .textarea {
      -moz-appearance: none !important;
      -webkit-appearance: none !important;
      -webkit-box-align: center !important;
      -ms-flex-align: center !important;
      align-items: center !important;
      border: 1px solid transparent !important;
      border-radius: 4px !important;
      -webkit-box-shadow: none !important;
      box-shadow: none !important;
      display: -webkit-inline-box !important;
      display: -ms-inline-flexbox !important;
      display: inline-flex !important;
      font-size: 1rem !important;
      height: 2.25em !important;
      -webkit-box-pack: start !important;
      -ms-flex-pack: start !important;
      justify-content: flex-start !important;
      line-height: 1.5 !important;
      padding-bottom: calc(.375em - 1px) !important;
      padding-left: calc(.625em - 1px) !important;
      padding-right: calc(.625em - 1px) !important;
      padding-top: calc(.375em - 1px) !important;
      position: relative !important;
      vertical-align: top !important;
    }

    .input, .taginput .taginput-container.is-focusable, .textarea {
      background-color: #fff !important;
      border-color: #dbdbdb !important;
      color: #363636 !important;
      -webkit-box-shadow: inset 0 1px 2px rgba(10,10,10,.1) !important;
      box-shadow: inset 0 1px 2px rgba(10,10,10,.1) !important;
      max-width: 100% !important;
      width: 100% !important;
    }

    .label, .uk-label, a.label {
      text-transform: uppercase !important;
      letter-spacing: normal !important;
      border: none !important;
    }
  }
  .check {
    min-width: 20px !important;
  }
  .classic-border {
    border: 1px solid #e5e5e7;
  }
  .p15{
    padding: 15px;
  }
</style>
