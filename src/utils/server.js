const serverPath = {
    serverPath: null,//服务器地址
    getContext(){
        let strPath = window.document.location.pathname,
        postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
      return postPath;
    },
    getBasehUrl() {
      if(this.serverPath != null){
        return this.serverPath;
      }
      this.ctx = this.getContext();
      this.serverPath =  this.getHost() + this.ctx  + "/";
      return this.serverPath;
    },
    getHost(url) {
      var host = "null";
      if (typeof url == "undefined" || null == url) {
        url = window.location.href;
      }
      var regex = /^\w+\\:\/\/([^\\/]*).*/;
      var match = url.match(regex);
      if (typeof match != "undefined" && null != match) {
        host = match[1];
      }
      var prefix = 'http',uri = document.baseURI;
      if(uri && uri.indexOf("https") != -1){
        prefix = 'https';
      }
      return prefix+"://" +host;
    },
     init() {
      this.serverPath = this.getHost();
     }
  };