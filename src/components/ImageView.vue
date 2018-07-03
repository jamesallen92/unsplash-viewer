<template lang="pug">
  div
    h3 Unsplash Viewer
    div(v-if='display')
        dl
          div(v-if='photo.location')
              dt  Location:
              dd {{photo.location.title}}
          dt Photographer:
          dd
              img.profile-image(fluid, :src='photo.user.profile_image.small')
              span {{photo.user.name}}
          dd(v-if='photo.user.portfolio_url') Portfolio URL:
          dd(v-if='photo.user.portfolio_url')
            a(:href="photo.user.portfolio_url") {{photo.user.portfolio_url}}
          dt Views:
          dd {{photo.views}}
          dt Likes:
          dd {{photo.likes}}
    div.container(v-if='display')
      div.left-arrow
      div.right-arrow
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
