from odoo import models, fields, api
from odoo.exceptions import ValidationError


class MarketingPlan(models.Model):
    _name = 'marketing.plan'
    _description = 'Piano di Marketing'

    name = fields.Char(string="Nome Piano", required=True)
    description = fields.Char(string="Descrizione Piano")
    sms_max_length = fields.Integer(string="Lunghezza Max SMS")
    sms_max_daily_count = fields.Integer(string="SMS Giornalieri")
    sms_max_count = fields.Integer(string="Massimo messaggi")

    @api.constrains('name')
    def _check_unique_name(self):
        for record in self:
            # Confrontiamo il nome in minuscolo per evitare differenze case-sensitive
            existing_plan = self.search([
                ('name', '=', record.name.lower())
            ])
            if existing_plan and existing_plan != record:
                raise ValidationError("Esiste già un piano con lo stesso nome (case insensitive).")
