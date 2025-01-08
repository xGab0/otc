import { OdooConnection, OdooUser } from "wrapper";

const connection: OdooConnection = await OdooConnection.connect('http://localhost:8070/jsonrpc');
const user: OdooUser = await connection.login('odoo-otc-db', 'admin', 'admin');

const modules = await user.getAllModules();
console.log(modules);
