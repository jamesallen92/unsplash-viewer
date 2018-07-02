<template lang="pug">
  div
    img(v-for='photo in photoList', fluid, :src='photo.urls.thumb')
</template>

<script>
  import Unsplash, {toJson} from 'unsplash-js'
  export default {
    name: 'TiledPictures',
    beforeRouteEnter (to, from, next) {
      next(vm => {
        let unsplash = new Unsplash({
          applicationId: 'b54dd32e7bae520e8a4b5babde12de771627220dd99fff243708b2b8bd878bf6',
          secret: '0645298443e3ef8b0b3780b7248697bef027ff1407b57b97499464ae56f72497',
          callbackUrl: '{CALLBACK_URL}'
        })

        unsplash.photos.listPhotos(2, 30, 'latest')
        .then(toJson)
        .then(json => {
          vm.photoList = json
        })
      })
    },
    data: function () {
      return {
        photoList: []
      }
    }
  }
</script>
<style scoped>
</style>
