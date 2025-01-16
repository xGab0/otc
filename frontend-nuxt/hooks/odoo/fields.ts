/**

department_id: {
  change_default: false,
  company_dependent: false,
  context: {},
  default_export_compatible: false,
  depends: [ "employee_id.department_id" ],
  domain: "['|', ('company_id', '=', False), ('company_id', '=', company_id)]",
  exportable: true,
  manual: false,
  name: "department_id",
  readonly: true,
  related: "employee_id.department_id",
  relation: "hr.department",
  required: false,
  searchable: true,
  sortable: false,
  store: false,
  string: "Department",
  type: "many2one",
}

*/

export type OdooField = [string, OdooFieldData];

export interface OdooFieldData {
  type: string,
  name: string,
  string: string,
  depends: string[],
  domain: string,

  required: boolean,
  readonly: boolean,
  searchable: boolean,
  sortable: boolean
}

export interface CharField extends OdooFieldData {
  type: 'char'
}

export interface IntegerField extends OdooFieldData {
  type: 'integer'
}

export interface FloatField extends OdooFieldData {
  type: 'float'
}

export interface DateTimeField extends OdooFieldData {
  type: 'datetime'
}

export interface Many2OneField extends OdooFieldData {
  type: 'many2one',
  relation: string, // res.users
  domain: string,
}

export interface One2ManyField extends OdooFieldData {
  type: 'one2many',
  domain: string,
}
