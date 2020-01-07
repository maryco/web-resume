module.exports = {
    publicPath: "/resume/",
    devServer: {
        port: 8080,
        overlay: {
            warnings: false,
        }
    },
    /**
     *  For prevent a Mr IE11 says 'Security Error.' (around WebSocketBrowserDriver)
     *  @see https://stackoverflow.com/questions/55237168/vue-app-blank-page-in-ie-11-or-lower-even-with-polyfills
     */
    transpileDependencies: ['vuex-persist']
}
