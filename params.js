const params = {
  server:{
     host: 'e3r8p5'
   , port: 3004
   , get url(){ return 'http://' + this.host + ':' + this.port }
  },
}

module.exports = params
