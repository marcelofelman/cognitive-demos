let dotenv = require('dotenv');
let http = require('http');

dotenv.config({path: '../.env'});

let url = process.argv[2];

var options = {
  host: 'eastus2.api.cognitive.microsoft.com',
  path: '/vision/v1.0/analyze?visualFeatures=Categories,Tags,Description&language=en',
  method: 'POST',
  headers: {
      'Content-Type' : 'application/json',
      'Ocp-Apim-Subscription-Key' : process.env.COMPUTER_VISION_KEY
  }
};

callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    let img = JSON.parse(str);

    console.log('Categorias');
    img.categories.forEach(function(element) {
        console.log(`Nombre: ${element.name}, Probabilidad: ${element.score}`);
    }, this);

    console.log('Etiquetas');
    img.tags.forEach(function(element) {
        console.log(`Nombre: ${element.name}, Probabilidad: ${element.confidence}`);
    }, this);

  });
}

var req = http.request(options, callback);
req.write(`{"url":"${url}"}`);
req.end();
