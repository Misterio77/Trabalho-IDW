module.exports = {
  "outputDir": "../server/public",
  "devServer": {
    "proxy": {
      "^/api": {
        "target": "http://localhost:5000/"
      }
    },
    disableHostCheck: true, 
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
