module.exports = {
  "outputDir": "/media/Media/Documents/GitHub/Trabalho-IDW/server/public",
  "devServer": {
    "proxy": {
      "^/api": {
        "target": "http://localhost:5000/"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}