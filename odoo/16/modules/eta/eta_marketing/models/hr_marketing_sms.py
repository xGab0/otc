from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import ast


class MarketingSms(models.Model):
    _name = 'marketing.sms'
    _description = 'SMS di Marketing'

    body = fields.Text(string="Testo SMS", required=True)
    partner_ids = fields.Many2many(
        'res.partner',
        string="Contatti",
        help="Contatti selezionati per l'invio"
    )
    contacts_domain = fields.Char(
        string="Filtro Contatti",
        default='[("country_id.name", "!=", "Italy")]',
        help="Dominio per filtrare i contatti (formato Odoo)"
    )
    scheduled_date = fields.Date(string="Data Programmata", required=True)
    campaign_id = fields.Many2one(
        'marketing.campaign',
        string="Campagna",
        ondelete='cascade'
    )

    def action_load_contacts(self):
        """Carica contatti in base al dominio specificato"""
        self.ensure_one()
        try:
            domain = ast.literal_eval(self.contacts_domain) if self.contacts_domain else []
            partners = self.env['res.partner'].search(domain)
            self.partner_ids = partners
        except Exception as e:
            raise ValidationError(_("Errore nel dominio contatti: %s", str(e)))

    @api.constrains('campaign_id', 'scheduled_date')
    def _check_sms_limits(self):
        """Verifica il limite giornaliero del piano"""
        for sms in self:
            group = sms.campaign_id.marketing_group_id
            plan = group.marketing_plan_id

            if plan and plan.sms_daily_count > 0:
                existing_count = self.env['marketing.sms'].search_count([
                    ('campaign_id.marketing_group_id', '=', group.id),
                    ('scheduled_date', '=', sms.scheduled_date),
                    ('id', '!=', sms.id)
                ])

                if (existing_count + 1) > plan.sms_daily_count:
                    raise ValidationError(
                        _("Superato limite giornaliero SMS (%s) per il gruppo %s!")
                        % (plan.sms_daily_count, group.name)
                    )