<template lang="pug">
    div
        h3 Unsplash Viewer
        div(v-if='display')
            dl
                div(v-if='photo.location')
                    dt  Location:
                    dd {{photo.location.title}}
                div(v-if='photo.description')
                    dt  Description:
                    dd {{photo.description}}
                dt Photographer:
                dd
                    img.profile-image(fluid, :src='photo.user.profile_image.small')
                    span {{photo.user.name}}
                dd(v-if='photo.user.portfolio_url') Portfolio URL:
                dd(v-if='photo.user.portfolio_url')
                    a(:href='photo.user.portfolio_url') {{photo.user.portfolio_url}}
                dt Views:
                dd {{photo.views}}
                dt Likes:
                dd {{photo.likes}}
        div.container(v-if='display')
            div.left-arrow.arrow(@click='prevImage')
                p <
            div.right-arrow.arrow(@click='nextImage')
                P >
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
        display: false,
        photoIndex: 0
      }
    },
    props: {
      image_id: {
        type: String,
        required: true
      },
      index: {
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
      },
      nextImage () {
        this.$router.push({name: 'ImageView', params: {image_id: this.photo.id, index: this.index}})
      },
      prevImage () {
        console.log('fsdfsdf')
      }
    }
  }
</script>
<style scoped>
    .profile-image {
        margin-right: 10px;
        vertical-align: middle;
    }

    dt {
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

    .arrow {
        -webkit-transition: opacity 0.2s ease-in-out;
        -moz-transition: opacity 0.2s ease-in-out;
        -o-transition: opacity 0.2s ease-in-out;
        -ms-transition: opacity 0.2s ease-in-out;
        transition: opacity 0.2s ease-in-out;
        position: absolute;
        top: 50%;
        font-size: 200px;
        transform: translate(-50%, -50%);
        opacity: 0;
        cursor: pointer;
    }

    .left-arrow {
        left: 19%;
    }

    .right-arrow {
        right: 0;
    }

    .container {
        position: absolute;
        margin-left: 20%;
        width: 1000px;
    }

    .container:hover .arrow {
        opacity: 1;
    }
</style>
