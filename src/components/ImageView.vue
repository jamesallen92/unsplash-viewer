<template lang="pug">
  div
    h3 Unsplash Viewer
    img(fluid, :src='photo.urls.regular')
    
</template>

<script>
  import Unsplash, {toJson} from 'unsplash-js'
  export default {
    name: 'ImageView',
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getData()
      })
    },
    data: function () {
      return {
        photo: {}
      }
    },
    props: {
      image_id: {
        type: String,
        required: true
      }
    },
    methods: {
      getData () {
        let unsplash = new Unsplash({
          applicationId: 'b54dd32e7bae520e8a4b5babde12de771627220dd99fff243708b2b8bd878bf6',
          secret: '0645298443e3ef8b0b3780b7248697bef027ff1407b57b97499464ae56f72497',
          callbackUrl: ''
        })

        unsplash.photos.getPhoto(this.image_id, 1000)
          .then(toJson)
          .then(json => {
            this.photo = json
        })
      }
    }
  }
</script>
<style scoped>
</style>
