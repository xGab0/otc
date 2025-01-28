from odoo import models, fields


class MarketingPlan(models.Model):
    _name = 'marketing.plan'
    _description = 'Piano di Marketing'

    name = fields.Char(string="Nome Piano", required=True)
    sms_daily_count = fields.Integer(string="SMS Giornalieri")
    sms_max_length = fields.Integer(string="Lunghezza Max SMS")