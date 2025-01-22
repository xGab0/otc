import type { OdooRecord, OdooRecordSyntax } from "./wrapper";

export interface OdooUserData extends OdooRecordSyntax, OdooRecord {
  id: number,
  name: string,
  display_name: string,
  im_status: string,
  lang: string,

  avatar_128: string,
  avatar_256: string,
  avatar_512: string,
  avatar_1024: string,
  avatar_1920: string,

  company_id: [number, string],
  company_ids: number[],
  company_name: string,
  company_address: string,
  company_code: string,

  employee_id: [number, string],
  employee_ids: number[],
  employee_type: string,
  employee_phone: string,
}

export interface OdooModelData extends OdooRecordSyntax {
  id: number,
  model: string,
  modules: string,
  name: string,
  display_name: string,
  info: string,
  state: string,
  // records count
  count: number,
  rules_ids: number[],
  access_ids: number[],
  view_ids: number[],
  inherited_model_ids: number[],
}
