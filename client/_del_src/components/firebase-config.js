import Firebase from 'firebase'

// var config = {
//   apiKey: "AIzaSyApcI0PCcBOTb2NeQQUIEHLNNq4cteZCYw",
//   authDomain: "m6analysis-a9930.firebaseapp.com",
//   databaseURL: "https://m6analysis-a9930.firebaseio.com",
//   projectId: "m6analysis-a9930",
//   storageBucket: "m6analysis-a9930.appspot.com",
//   messagingSenderId: "860696249396"
// };

var config = {
  apiKey: "AIzaSyDKBnMKsgoM5Vpojrp-WCre8uRXSJ561Zw",
  authDomain: "tomica-968ef.firebaseapp.com",
  databaseURL: "https://tomica-968ef.firebaseio.com",
  projectId: "tomica-968ef",
  storageBucket: "tomica-968ef.appspot.com",
  messagingSenderId: "860696249396"
};

let app = Firebase.initializeApp(config)

export default app