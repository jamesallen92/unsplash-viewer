<template lang="pug">
  div
    h3 Unsplash Viewer
    dl
      dt(v-if='photo.location')  Location:
      dd(v-if='photo.location') {{photo.location.title}}
      dt Photographer:
      dd
        a(:href="photo.user.portfolio_url")
          img.profile-image(fluid, :src='photo.user.profile_image.small', v-if='display')
          span {{photo.user.name}}
      dt Views:
      dd {{photo.views}}
      dt Likes:
      dd {{photo.likes}}
    div.container
      div.left-arrow
      div.right-arrow
      img(fluid, :src='photo.urls.regular', v-if='display')

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
        photo: {},
        display: false
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
            this.display = true
        })
      }
    }
  }
</script>
<style scoped>
  .profile-image {
    margin-right: 10px;
    vertical-align: middle;
  }

  dt{
    float: left;
    font-weight: bold;
  }
  dd {
    margin-left: 0px;
  }
  dl {
    margin-left: 40%;
    width: 300px;
  }
  .left-arrow {

  }
  .right-arrow {

  }

  .container {
    margin-left: 8%;
    width: 1000px;
  }
</style>
