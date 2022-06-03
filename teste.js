const express = require('express');
// var banco = require('./Banco');

const app = express();

app.use(express.json());

// var con = banco.getConnection();
var sEmit;

var bancoDados;
var Firebird = require('node-firebird');

var options = {};

options.host = '127.0.0.1';
options.port = 3050;
options.database = 'D:\Sped\\Evilasio\\StockSYS190220.fdb';
options.user = 'SYSDBA';
options.password = 'masterkey';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;        // default when creating database
options.pageSize = 4096;        // default when creating database
options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop

const connect = Firebird.attach(options, async function(err, db) {
	if (err){
		throw err;
	}else{
		bancoDados = db;
	}
});


app.get("/emitente", (req, res) => {  	
	bancoDados.query('SELECT * FROM EMITENTE', async function(err, result) {
		this.emit = result;
		res.send(this.emit);
	});
});

app.get("/vendas", (req, res) => {  	
	bancoDados.query("SELECT sum(VALOR_TOTAL) as soma FROM PEDIDO where STATUS <> 'F' and DATA_PEDIDO between '2019-07-01' and '2019-08-02' ",async function(err, result) {
		this.vendas = result;
		res.send(this.vendas);
	});
});

// async function pesEmitente(){
// 	sEmit = await banco.qryEmitente();
// };

// app.get("/emitente", (req, res) => {  
//   // pesEmitente().then(() => {
//   // 	res.send(sEmit);
//   // }); 
// });

// app.get("/emitente", (req, res) => {  
// 	var con = Promise.resolve(banco.getConnection());
// 	console.log(con);
// 	banco.getConnection().then(() => {
// 		con.query('SELECT * FROM EMITENTE', async function(err, result) {
// 			this.emit = result;
// 			res.send(this.emit);
// 		});
// 		});



// });

// app.get("/con", (req, res) => {  
//   var con = banco.getConnection();
//   console.log(con)
// });

app.listen(8095, () =>{
	console.log("Servidor iniciado na porta 8095: http://localhost:8095");
})