from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import ast


class MarketingSms(models.Model):
    _name = 'marketing.sms'
    _description = 'SMS di Marketing'

    name = fields.Char(string="Nome Sms", required=True)
    description = fields.Char(string="Descrizione Sms")
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
    scheduled_date = fields.Date(string="Data Programmata")
    marketing_campaign_id = fields.Many2one(
        'marketing.campaign',
        string="Campagna",
        ondelete='cascade'
    )
    status = fields.Selection([
        ('draft', 'Bozza'),
        ('scheduled', 'Programmato'),
        ('sent', 'Inviato')
    ], string="Stato", default='draft', required=True)

    def action_load_contacts(self):
        """Carica contatti in base al dominio specificato"""
        self.ensure_one()
        try:
            domain = ast.literal_eval(self.contacts_domain) if self.contacts_domain else []
            partners = self.env['res.partner'].search(domain)
            self.partner_ids = partners
        except Exception as e:
            raise ValidationError(_("Errore nel dominio contatti: %s", str(e)))

    @api.constrains('marketing_campaign_id', 'scheduled_date')
    def _check_sms_limits(self):
        """Verifica il limite giornaliero del piano"""
        for sms in self:
            group = sms.marketing_campaign_id.marketing_group_id
            plan = group.marketing_plan_id

            if plan and plan.sms_max_daily_count > 0:
                existing_count = self.env['marketing.sms'].search_count([
                    ('marketing_campaign_id.marketing_group_id', '=', group.id),
                    ('scheduled_date', '=', sms.scheduled_date),
                    ('id', '!=', sms.id)
                ])

                if (existing_count + 1) > plan.sms_max_daily_count:
                    raise ValidationError(
                        _("Superato limite giornaliero SMS (%s) per il gruppo %s!")
                        % (plan.sms_max_daily_count, group.name)
                    )

    @api.constrains('status', 'scheduled_date')
    def _check_scheduled_date(self):
        for record in self:
            # Se lo stato è 'scheduled' o 'sent', la scheduled_date deve essere impostata
            if record.status in ['scheduled', 'sent'] and not record.scheduled_date:
                raise ValidationError("La data programmata ('scheduled_date') deve essere specificata quando lo stato è 'Programmato' o 'Inviato'.")
