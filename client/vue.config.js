const manifestJSON = require("./public/manifest.json");

const pwaArgs = {
  themeColor: manifestJSON.theme_color,
  name: manifestJSON.short_name,
  msTileColor: manifestJSON.background_color
};


module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  assetsDir: './',  
  chainWebpack: config => {
    config.plugin("pwa").tap(args => {
      return [pwaArgs];
    });
  },
  // devServer: {
  //   // https: true,
  //   // host: 'localhost'
  // }  
}