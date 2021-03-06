module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/spades/'
    : '/',
  pwa: {
    name: 'Spades',
    themeColor: '#BAA866',
    msTileColor: '#10222C',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  // Allow access from phone over WAN
  devServer: {
    disableHostCheck: true
  }
}