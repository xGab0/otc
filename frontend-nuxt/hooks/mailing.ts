import type { OdooRecord } from "./odoo/wrapper";

export interface Mailing extends OdooRecord {
  id: number,

  display_name: string,
  subject: string,
  sms_subject: string,
  state: "draft" | "in_queue" | "sending" | "done",

  body_arch: string,
  body_html: string,
  body_plaintext: string,

  render_model: string,

  delivered: number,

  bounced: number,
  bounced_ratio: number,

  clicked: number,
  clicks_ratio: number,

  opened: number,
  opened_ratio: number,

  mailing_domain: string,
  mailing_filter_count: number,
  mailing_filter_domain: number,
  mailing_filter_id: [number, string],

  mailing_model_id: [number, string],
  mailing_model_name: string,
  mailing_model_real: string,

  mailing_type: "sms" | any,
  mailing_type_description: string,

  schedule_date: string,
  schedule_type: 'now' | 'schedule',

  total: number,

  user_id: [number, string],

  create_date: string,
  create_uid: [number, string]
}
