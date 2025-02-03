import type { OdooRecord } from "./odoo/wrapper"

export namespace Marketing {

    export interface Campaign extends OdooRecord {
        name: string,
        description: string,
        marketing_group_id: [number, string],
        sms_ids: any
    }

    export interface Group extends OdooRecord {
        name: string,
        description: string,
        marketing_plan_id: [number, string],
        member_ids: any
    }

    export interface Plan extends OdooRecord {
        name: string,
        description: string,
        sms_max_length: number
        sms_max_daily_count: number,
        sms_max_count: number,
    }

    export interface Sms extends OdooRecord {
        name: string,
        description: string,
        body: string,
        partner_ids: any,
        contacts_domain: any,
        scheduled_date: string,
        marketing_campaign_id: [number, string],
        status: 'draft' | 'scheduled' | 'sent'
    }

}