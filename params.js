const params = {
  server:{
     host: 'e2r5p17'
   , port: 3004
   , get url(){ return 'http://' + this.host + ':' + this.port }
  },
}

module.exports = params
