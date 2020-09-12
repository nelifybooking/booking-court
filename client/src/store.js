import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'
import db from './components/firebase-db'
// import storage from './components/firebase-storage'
// import _ from 'lodash'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0,
  cars: [],
  fcars: [],
  user: null,
  newCar: {},
  msg: null,
  err: null, //{code: '', msg: ''}
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  /*increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  },*/
  // setCars(state, payload) {
  //   state.cars = payload    
  // },
  // setFilteredCars(state, payload) {
  //   state.fcars = payload
  // },
  setUser(state, payload) {
    state.user = payload
  },
  setErr(state, payload) {
    state.err = payload
  },
  setMsg(state, payload) {
    state.msg = payload
  },
  setNewCar(state, payload) {
    state.newCar = payload
  },

  // setOwnedBookmarked(state, payload) {
  //   for(var i in payload) {
  //     //// console.log(payload[i].id)
  //     var index = _.findIndex(state.cars, {id: payload[i].id})

  //     if (index !== -1) {
  //       state.cars[index].owned = payload[i].owned
  //       state.cars[index].bookmarked = payload[i].bookmarked
  //     }
  //   }
  // },

  // changeOwnedBookmarked(state, payload) {
  //   var index = _.findIndex(state.cars, {id: payload.id})

  //   //// console.log('changeYesNo', index)

  //   if (index !== -1) {
  //     if (typeof payload.owned !== 'undefined')
  //       state.cars[index].owned = payload.owned
  //     if(typeof payload.bookmarked !== 'undefined')
  //       state.cars[index].bookmarked = payload.bookmarked
  //   }

  //   var updates = {}
  //   updates['/users/'+payload.userid+'/cars/' + payload.id + '/' + payload.attrName] = payload[payload.attrName]

  //   db.ref().update(updates);
  // }
  //setSnackbar(state, payload) {
    //state.snackbar = payload
  //  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  /*increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  },*/

  // createCar ({ commit, dispatch }, payload) {
  //   let id
  //   let imgUrl

  //   db.ref("newcars").push(payload.car)
  //     .then((data) => {
  //       id = data.key
  //       return id
  //     })
  //     .then((id) => {      
  //       console.log(id)              
  //       return dispatch('uploadImage', payload.upload)
  //     })
  //     .then((imgData) => {
  //       imgUrl = imgData.metadata.downloadURLs[0]
  //       return db.ref("newcars").child(id).update({imgUrl: imgUrl})
  //     })
  //     .then(() => {
  //       dispatch('setNewCar', {
  //         ...payload.car,
  //         img: imgUrl,
  //         id: id    
  //       })
  //     })
  //     .catch((error) => {
  //       commit('setErr', { code: error.code, msg: error.message })
  //     })
  // },

  // retrieveCars ({ commit }) {
  //   db.ref('cars').limitToFirst(50).once('value')
  //     .then((data) => {
  //       const cars = []
  //       const obj = data.val()
  //       var userCar = {}

  //       for(let key in obj) {
  //         userCar = {}

  //         if (state.user != null) {
  //           //// console.log('state.user.cars',state.user.cars)
  //           for (let index in state.user.cars) {
  //             if (key == state.user.cars[index].id) {
  //               userCar = state.user.cars[index]
  //             }
  //           }
  //         }

  //         cars.push({
  //           id: key,
  //           img: obj[key].img,
  //           pdt: obj[key].pdt,
  //           ploc: obj[key].ploc,
  //           pname: obj[key].pname,
  //           pnum: obj[key].pnum,
  //           pscale: obj[key].pscale,
  //           pweight: obj[key].pweight,
  //           owned: userCar.owned,
  //           bookmarked: userCar.bookmarked
  //         })
  //       }

  //       //// console.log('commitSetCars')
  //       commit('setCars', cars)
  //       commit('setFilteredCars', cars)

  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },

  // setFilteredCars ({ commit }, payload) {
  //   commit('setFilteredCars', payload)
  // },

  getUserProfile ({ commit }, payload) {

    var uid = payload.uid

    // console.log(payload.uid)

    commit('setUser', {id: uid}) 

    console.log('users', uid)

    db.ref('users').child(uid).once('value')
      .then((data) => {
        var user = {}
        // const cars = []
        const obj = data.val()
        //// console.log('user data', obj.cars)

        user = {
          id: uid,
          email: obj.email,
          surname: obj.surname,
          fstname: obj.fstname,
          //cars: cars
        }

        console.log('login successfully', user)

        commit('setUser', user)

        // for(let key in obj.cars) {
        //   cars.push({
        //     id: key,
        //     owned: obj.cars[key].owned,
        //     bookmarked: obj.cars[key].bookmarked
        //   })

        //   commit('setOwnedBookmarked', cars)

        //   //for (let car in cars) 
        //     //// console.log('car', car)

        //   /*for (let index in state.cars) {
        //     if (key == state.cars[index].id) {              
        //       state.cars[index].owned = obj.cars[key].owned
        //       state.cars[index].bookmarked = obj.cars[key].bookmarked
        //     }
        //   }*/
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  setUser({ commit }, payload) {
    commit('setUser', payload)
  },

  setErr({ commit }, payload) {
    commit('setErr', payload)
  },

  setMsg({ commit }, payload) {
    commit('setMsg', payload)
  },

  // setNewCar({ commit }, payload) {
  //   commit('setNewCar', payload)
  // },

  // changeOwnedBookmarked({ commit }, payload) {
  //   commit('changeOwnedBookmarked', payload)
  // },

  userSignup ({ commit }, payload) {
    // var vm = this
    var email = payload.email
    var pwd = payload.pwd
    var fstname = payload.fstname
    var surname = payload.surname

    Firebase.auth().createUserWithEmailAndPassword(email, pwd).then(function(data) {
      // var user2 = Firebase.auth().currentUser
      // console.log('signupUser', data.user.uid, user2.uid)

      var uid = data.user.uid
      var updates={}

      updates['/users/' + uid] = {
        // uid: uid,
        email: email,
        fstname: fstname,
        surname: surname
      }

      db.ref().update(updates)

      //vm.app.showSnackbar('New user is created.')

      //vm.app.closeDialog()
      //vm.user.email = ''
      //vm.user.pwd = ''
      //vm.user.fstname = ''
      //vm.user.surname = ''
    }, function(error) {
      commit('setErr', { code: error.code, msg: error.message })
    })
  },

  userLogin ({ commit }, payload) {
    console.log('store userLogin')
    //var vm = this
    var email = payload.email
    var password = payload.pwd
    // var me = this

    Firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      console.log(user)
      // dispatch('getUserProfile', user)
    },function(error) {
      commit('setErr', { code: error.code, msg: error.message })
    })
  },

  userLogout ({ commit }, payload) {
    console.log(payload)
    Firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      commit('setErr', { code: error.code, msg: error.message })
    })
  },
  
  // uploadImage({ commit }, payload) {
  //   if (payload.imgDataUrl !== null && payload.imgName !== null) {
  //     var filename = payload.imgName.split(".")

  //     // Data URL string
  //     return storage.ref("images/" + filename[0] + '.' + filename[1]).putString(payload.imgDataUrl, 'data_url')
  //       //.then(function(snapshot) {
  //       //  // console.log("file uploaded")
  //       //})
  //       //.catch(function(err) {
  //         //// console.log('Upload Err:' + err)
  //         //this.$store.dispatch('setErr', err)
  //       //})          
  //   }
  // }

}

// getters are functions
const getters = {
  //evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
  fetchCars(state) {
    return state.cars
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
