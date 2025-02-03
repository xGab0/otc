from odoo import models, fields, api
from odoo.exceptions import ValidationError


class MarketingCampaign(models.Model):
    _name = 'marketing.campaign'
    _description = 'Campagna di Marketing'

    name = fields.Char(string="Nome Campagna", required=True)
    description = fields.Char(string="Descrizione Campagna")
    marketing_group_id = fields.Many2one(
        'marketing.group',
        string="Gruppo di Marketing",
        required=True
    )
    sms_ids = fields.One2many(
        'marketing.sms',
        'marketing_campaign_id',
        string="SMS Programmati"
    )

    @api.constrains('name')
    def _check_unique_name(self):
        for record in self:
            # Confrontiamo il nome in minuscolo per evitare differenze case-sensitive
            existing_campaign = self.search([
                ('name', '=', record.name.lower())
            ])
            if existing_campaign and existing_campaign != record:
                raise ValidationError("Esiste già una campagna con lo stesso nome (case insensitive).")

    @api.constrains('sms_ids')
    def _check_sms_limit(self):
        for record in self:
            marketing_group = record.marketing_group_id
            if marketing_group:
                marketing_plan = marketing_group.marketing_plan_id
                if marketing_plan:
                    # 1. Controllo del numero massimo di SMS totale
                    sms_max_count = marketing_plan.sms_max_count
                    existing_sms_count = self.env['marketing.sms'].search_count([
                        ('marketing_group_id', '=', record.marketing_group_id.id)
                    ])

                    if existing_sms_count >= sms_max_count:
                        raise ValidationError(f"Il numero massimo di SMS per il gruppo di marketing '{marketing_group.name}' è {sms_max_count}. Impossibile aggiungere più SMS.")

                    # 2. Controllo del limite massimo di SMS giornalieri per scheduled_date
                    sms_max_daily_count = marketing_plan.sms_max_daily_count

                    for sms in record.sms_ids:
                        scheduled_date = sms.scheduled_date
                        if scheduled_date:
                            # Conta quanti SMS sono già programmati per quella data
                            existing_sms_daily_count = self.env['marketing.sms'].search_count([
                                ('marketing_group_id', '=', record.marketing_group_id.id),
                                ('scheduled_date', '=', scheduled_date)
                            ])

                            # Verifica se il limite giornaliero è stato raggiunto
                            if existing_sms_daily_count >= sms_max_daily_count:
                                raise ValidationError(f"Il numero massimo di SMS per la data {scheduled_date} è {sms_max_daily_count}. Impossibile programmare un altro SMS per questa data.")
