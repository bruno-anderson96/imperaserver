const express = require('express');
var banco = require('./Banco');

const app = express();

app.use(express.json());

var options = {};
var rProd;

app.get("/", (req, res) => {  	
	
	res.send("Servidor online");

});


app.get("/produto", (req, res) => {  	
	
var rProd = banco.selectAllProd();

	const myPromise = new Promise((resolve, reject) => { 
		resolve(rProd);
	});

	myPromise.then((data) =>{
		res.send(data);
		// return data;
		console.log("Requisitado Produtos");
	})

});

// app.get("/vendas", (req, res) => { 
//     var data = new Date();
//     data.setDate(data.getDate());
//     var dia = String(data.getDate()).padStart(2, '0');
//     var mes = String(data.getMonth() + 1).padStart(2, '0');
//     var ano = data.getFullYear();
//     data = ano + '-' + mes + '-' + dia + ' 00:00:00';
//     var dataF = ano + '-' + mes + '-' + dia + ' 23:59:59';
// 	banco.query("SELECT sum(VALOR_TOTAL) as soma FROM PEDIDO where STATUS <> 'F' and DATA_PEDIDO between ? and ? ", [data, dataF],async function(err, result) {
// 		this.vendas = result;
// 		res.send(this.vendas);
// 	});
// });

// async function pesEmitente(){
// 	sEmit = await banco.qryEmitente();
// };

app.listen(8099, () =>{
	console.log("Servidor iniciado na porta 8099: http://localhost:8099");
})