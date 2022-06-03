var connection ;
async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    connection = await mysql.createConnection("mysql://root@localhost:3306/imperatriz");
    // console.log("Conectou no MySQLocal!");
    // global.connection = connection;
    return connection;    
}

connect();

async function selectAllProd() {

const [rows] = await connection.query('SELECT * FROM produto;'); 
return rows;
// const myPromise = new Promise((resolve, reject) => { 
    
  
//   if(rows.length>0) {
//       resolve(rows);
//   } else {
//       reject("nenhum dado encotrado");
//     }
// });

// myPromise.then((data) =>{
// 	console.log(data);
// 	return data;
// })

}


module.exports = { selectAllProd };

