// console.log('Add listener')
document.addEventListener('deviceready', onDeviceReady.bind(this), false);

// var helloworld = document.getElementById("helloworld")

// helloworld.style.color = "red"

function onDeviceReady() {
  // console.log('Device is Ready')

  if ( window.plugins && window.plugins.AdMob ) {
    // console.log('setOptions')
    window.plugins.AdMob.setOptions({
        publisherId: 'ca-app-pub-2277796468673919',
        interstitialAdId: 'ca-app-pub-2277796468673919/9796349452',
        bannerAtTop: false, // set to true, to put banner at top
        overlap: false, // set to true, to allow banner overlap webview
        offsetTopBar: false, // set to true to avoid ios7 status bar overlap      
        isTesting: false, 
        autoShow: true
    });

    // console.log('config banner')

    // admob.banner.config({
    window.plugins.AdMob.banner.config({
      id: 'ca-app-pub-2277796468673919/4678866091',
      // autoShow: true
    });

    // console.log('prepare banner')
    window.plugins.AdMob.banner.prepare();
    // console.log('finish prepare banner')
    // admob.interstitial.prepare();
    window.plugins.AdMob.interstitial.prepare();
  }  
}