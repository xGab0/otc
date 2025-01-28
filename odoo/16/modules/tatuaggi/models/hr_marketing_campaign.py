from odoo import models, fields


class MarketingCampaign(models.Model):
    _name = 'marketing.campaign'
    _description = 'Campagna di Marketing'

    name = fields.Char(string="Nome Campagna", required=True)
    marketing_group_id = fields.Many2one(
        'marketing.group',
        string="Gruppo di Marketing",
        required=True
    )
    sms_ids = fields.One2many(
        'marketing.sms',
        'campaign_id',
        string="SMS Programmati"
    )