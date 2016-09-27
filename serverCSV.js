/*var http = require('http');
http.createServer(function(req,res) {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); 
  res.end('Olá mundo!');
}).listen(3000);
console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');*/
var express = require('express');
var app = express();
    
function dowloadCSV(){
	var https = require('https');
	var fs = require('fs');
	const path = require('path');
	
	var file = fs.createWriteStream("teste.csv");
	var request = https.get("https://docs.google.com/spreadsheets/d/1s5dQ-TsNO2rVXLFLILhXqLywK_jbJqgT27b5U5VTuWo/pub?output=csv", function(response) {
	  response.pipe(file);
	});
	//file.close();
}
// Definir a route principal
app.get('/', function(req, res) {
	dowloadCSV();
  	res.setHeader('Access-Control-Allow-Origin','*');
  	res.send('Welcome to API');
});



// Definir um endpoint da API
app.get('/api/getcsv', function(req, res, next) {
	//dowloadCSV();
	const path = require('path');
	res.setHeader('Access-Control-Allow-Origin','*');
	//res.sendFile(path.join(__dirname + '/teste.csv'));
	res.download(path.join(__dirname + '/teste.csv'));
	//res.end("teste");
})

// Aplicação disponível em http://127.0.0.1:9000/
app.listen(9000);
console.log("Rodando... Ctrl-C para parar")