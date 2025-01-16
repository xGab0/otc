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
