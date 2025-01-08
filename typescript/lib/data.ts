import { OdooRecordSyntax } from "wrapper";

export interface OdooModelData extends OdooRecordSyntax {
  id: number,
  model: string,
  modules: string[],
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
