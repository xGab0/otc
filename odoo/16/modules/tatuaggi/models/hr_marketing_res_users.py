from odoo import models, fields, api


class ResUsers(models.Model):
    _inherit = 'res.users'

    marketing_group_id = fields.Many2one(
        'marketing.group',
        string="Gruppo di Marketing",
        ondelete='set null'
    )

    @api.model
    def get_marketing_sms(self):
        """ Restituisce tutti gli SMS associati alle campagne di marketing del gruppo dell'utente """
        user = self.env.user  # prendi l'utente corrente
        if user.marketing_group_id:
            campaigns = self.env['marketing.campaign'].search([
                ('marketing_group_id', '=', user.marketing_group_id.id)
            ])
            sms_list = self.env['marketing.sms']

            for campaign in campaigns:
                sms_list |= campaign.sms_ids  # unisci gli SMS associati alla campagna
            return sms_list.read()
        else:
            return self.env['marketing.sms'].read()  # recordset vuoto

    @api.model
    def old_get_marketing_sms(self):
        """ Restituisce tutti gli SMS associati alle campagne di marketing del gruppo dell'utente """
        for user in self:
            if user.marketing_group_id:
                # Passo 1: Otteniamo tutte le campagne di marketing appartenenti al marketing_group_id dell'utente
                campaigns = self.env['marketing.campaign'].search([
                    ('marketing_group_id', '=', user.marketing_group_id.id)
                ])

                # Passo 2: Raccolgo tutti gli SMS associati alle campagne trovate
                sms_list = self.env['marketing.sms']
                for campaign in campaigns:
                    sms_list |= campaign.sms_ids  # Aggiungiamo gli SMS associati alla campagna

                return sms_list
            else:
                return self.env['marketing.sms']  # Se l'utente non ha un gruppo di marketing, ritorno una lista vuota
