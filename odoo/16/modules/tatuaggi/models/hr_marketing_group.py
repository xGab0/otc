from odoo import models, fields


class MarketingGroup(models.Model):
    _name = 'marketing.group'
    _description = 'Gruppo di Marketing'

    name = fields.Char(string="Nome Gruppo", required=True)
    marketing_plan_id = fields.Many2one(
        'marketing.plan',
        string="Piano Associato",
        ondelete='set null'
    )
    member_ids = fields.One2many(
        'res.users',
        'marketing_group_id',
        string="Membri"
    )