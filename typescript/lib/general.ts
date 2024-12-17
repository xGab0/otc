import { connect } from "bun";
import { OdooConnection } from "wrapper";

const connection = await OdooConnection.connect('http://localhost:8070/jsonrpc');
const user = await connection.login('odoo-otc-db', 'admin', 'admin');

//const models = await user.getModels([], [], undefined, 100);
//const modelFields = await user.getModelFields('hr.attendance');
const modelFieldsType = await user.getModelFieldTypes('hr.attendance');
const modelFields = await user.searchReadRecord('ir.model.fields', [["model", "=", 'hr.attendance']], [], undefined, 9999999);

//console.log(modelFields);
