import { OdooModule } from "../module";
import { OdooConnection, OdooUser } from "wrapper";

const connection: OdooConnection = await OdooConnection.connect('http://localhost:8070/jsonrpc');
const user: OdooUser = await connection.login('odoo-otc-db', 'admin', 'admin');

const module: OdooModule = user.getModule('hr_attendance_geolocation');
const moduleModels = await module.searchReadModels();
console.log(moduleModels);
