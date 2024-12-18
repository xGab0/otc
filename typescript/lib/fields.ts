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

export interface OdooField {
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

export interface CharField extends OdooField {
  type: 'char'
}

export interface IntegerField extends OdooField {
  type: 'integer'
}

export interface FloatField extends OdooField {
  type: 'float'
}

export interface DateTimeField extends OdooField {
  type: 'datetime'
}

export interface Many2OneField extends OdooField {
  type: 'many2one',
  relation: string, // res.users
  domain: string,
}

export interface One2ManyField extends OdooField {
  type: 'one2many',
  domain: string,
}
