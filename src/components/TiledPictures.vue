<template lang="pug">
  div
    h3 Unsplash Viewer
    div.flex-containter.brightness
      img.item(v-for='photo in photoList', fluid, :src='photo.urls.thumb')
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
  .flex-container {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    margin: 10px;
  }

  .brightness {
    background-color: white;
    display: inline-block;

  }
  .brightness img:hover {
    -webkit-transition: opacity 0.2s ease-in-out;
    -moz-transition: opacity 0.2s ease-in-out;
    -o-transition: opacity 0.2s ease-in-out;
    -ms-transition: opacity 0.2s ease-in-out;
    transition: opacity 0.2s ease-in-out;
    opacity: .5;
  }
</style>
