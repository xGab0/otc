import type { OdooRecord } from "./odoo/wrapper"

export namespace Marketing {

    export interface Campaign extends OdooRecord {
        readonly name: string,
        readonly description: string,
        readonly marketing_group_id: [number, string],
        readonly sms_ids: any
    }

    export interface Group extends OdooRecord {
        readonly name: string,
        readonly description: string,
        readonly marketing_plan_id: [number, string],
        readonly member_ids: any
    }

    export interface Plan extends OdooRecord {
        readonly name: string,
        readonly description: string,
        readonly sms_max_length: number
        readonly sms_max_daily_count: number,
        readonly sms_max_count: number,
    }

    export interface Sms extends OdooRecord {
        readonly name: string,
        readonly description: string,
        readonly body: string,
        readonly partner_ids: any,
        readonly contacts_domain: any,
        readonly scheduled_date: string,
        readonly marketing_campaign_id: [number, string],
        readonly status: 'draft' | 'scheduled' | 'sent'
    }

}