import Unsplash, {toJson} from 'unsplash-js'

let unsplash = new Unsplash({
  applicationId: 'b54dd32e7bae520e8a4b5babde12de771627220dd99fff243708b2b8bd878bf6',
  secret: '0645298443e3ef8b0b3780b7248697bef027ff1407b57b97499464ae56f72497',
  callbackUrl: ''
})
export default {
  state: {
    photos: [],
    paginator: 1
  },
  mutations: {
    setPhotos (state, data) {
      state.photos.push(...data)
    }
  },
  getters: {
    getPhotos: (state) => state.photos
  },
  actions: {
    LOAD_PHOTOS: ({commit, state}) => {
      state.paginator++
      return unsplash.photos.listPhotos(state.paginator, 50, 'latest')
        .then(toJson)
        .then((res) => commit('setPhotos', res))
    }
  }
}
