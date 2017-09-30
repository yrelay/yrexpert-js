var ewdrest = require('ewdrest');
var fs = require('fs');

var EWD = {
  restPort: 8000,
  restServer: {
    key: fs.readFileSync("ssl/ssl.key"),
    certificate: fs.readFileSync("ssl/ssl.crt"),
  },
  service: {
    yexpert: {
      module: 'YRexpertRestServer',
      service: 'parse',
      contentType: 'application/json'
    }
  },
  server: {
    ec2: {
      host: 'localhost',
      port: 8080,
      ssl: true,
      secretKey: '$keepSecret!',
      accessId: 'YRexpertClient'
    }
  }
};

ewdrest.start(EWD);
