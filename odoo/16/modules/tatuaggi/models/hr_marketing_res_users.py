from odoo import models, fields


class ResUsers(models.Model):
    _inherit = 'res.users'

    marketing_group_id = fields.Many2one(
        'marketing.group',
        string="Gruppo di Marketing",
        ondelete='set null'
    )