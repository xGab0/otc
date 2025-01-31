import type { OdooRecord } from "./odoo/wrapper"

export namespace Marketing {

    export interface Campaign extends OdooRecord {
        name: string,
        marketing_group_id: [number, string],
        sms_ids: any
    }

    export interface Group extends OdooRecord {
        name: string,
        marketing_plan_id: [number, string],
        member_ids: any
    }

    export interface Plan extends OdooRecord {
        name: string,
        sms_daily_count: number,
        sms_max_length: number
    }

    export interface Sms extends OdooRecord {
        body: string,
        partner_ids: any,
        contacts_domain: any,
        scheduled_date: string,
        campaign_id: [number, string]
    }

}