from odoo import fields, models
from odoo.cli.scaffold import env


class Tattoo(models.Model):
    _name = 'tatuaggi.tattoo'
    _description = 'Modello tatuaggi'

    #price = fields.Monetary(string="Price", currency_field="currency_id", required=True)
    #currency_id = fields.Many2one(string="Currency", required=True)

    name = fields.Char(string='Nome tatuaggio', required=True)
    duration = fields.Float(string='Durata (ore)', required=True)
    currency_id = fields.Integer(string='Moneta', required=True)
    price = fields.Monetary(string='Prezzo', currency_field="currency_id", currency_id="USD", required=True)
    image = fields.Image(string="Immagine")

    artist_id = fields.Many2one('tatuaggi.artist', string='Artista', required=True)
    artist = fields.Char(string='Nome artista', related='artist_id.name', readonly=True)
    #artist_surname = fields.Char(string='Cognome Artista', related='artist_id.surname', readonly=True)
