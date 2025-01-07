import { OdooConnection } from "wrapper";

const connection = await OdooConnection.connect('https://testsolution.esidesk.it/jsonrpc');
//const user = await connection.login('main_db', 'admin', 'admin');

console.log(connection);
