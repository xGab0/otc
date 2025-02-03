from odoo import models, fields, api
from odoo.exceptions import ValidationError


class MarketingGroup(models.Model):
    _name = 'marketing.group'
    _description = 'Gruppo di Marketing'

    name = fields.Char(string="Nome Gruppo", required=True)
    description = fields.Char(string="Descrizione Gruppo")
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

    @api.constrains('name')
    def _check_unique_name(self):
        for record in self:
            # Confrontiamo il nome in minuscolo per evitare differenze case-sensitive
            existing_group = self.search([
                ('name', '=', record.name.lower())
            ])
            if existing_group and existing_group != record:
                raise ValidationError("Esiste già un gruppo con lo stesso nome (case insensitive).")
