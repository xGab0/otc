import datetime
from datetime import date

from odoo import fields, models


class Appointment(models.Model):
    _name = 'tatuaggi.appointment'
    _description = 'Modello appuntamenti'

    #date_start = fields.Date(string='Data inizio', default=date.min)
    #date_end = fields.Date(string='Data fine', default=date.max)

    date_start = fields.Date(string='Data inizio')
    date_end = fields.Date(string='Data fine')

    #date = fields.Date(string='Data', datetime="time", required=True)
    #customer_id = fields.Many2one('res.partner', string='Cliente', required=True)

    estimated_duration = fields.Integer(string='Durata stimata (ore)', required=True)
    date_and_time = fields.Datetime(string='Data ed Ora', required=True)
    artist_id = fields.Many2one('tatuaggi.artist', string='Artista', required=True)
    tattoo_id = fields.Many2one('tatuaggi.tattoo', string='Tattoo', required=True)
    state = fields.Selection([
        ('scheduled', 'Prenotato'),
        ('completed', 'Completato'),
        ('canceled', 'Cancellato'),
    ], string='Stato', default='scheduled', required=True)


#class Appuntamento(models.Model):
    #_inherit = 'product.product'
    #_name = 'tatuaggi.appuntamento'
    #_description = 'Stuttura oggetto Tatuatore'

    #date = fields.Date(string="Data")
    #client = fields.Char(string="Cliente")
    #artist = fields.Char(string="Artista", compute='_compute_artists')
    #artist = fields.Many2one('tatuaggi.appuntamento', string="Tatuaggio", compute='_compute_artists')
    ##tattoo = fields.One2many('tatuaggi.tatuaggio', 'project_id', string="Tatuaggio")
    #tattoo = fields.Many2one('tatuaggi.appuntamento', string="Tatuaggio")
    #expected_time = fields.Integer(string="Tempo previsto")
    #state = fields.Char(string="Stato")

    #@depends('artists')
    #def _compute_artists(self):
    #    for record in self:
    #        artist = record.env.context.get('artists')
    #
    #        if artist:
    #            record.artist = artist
    #        else:
    #            record.product_category_field = ''
