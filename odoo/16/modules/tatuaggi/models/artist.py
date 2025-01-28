from odoo import fields, models


class Artist(models.Model):
    _name = 'tatuaggi.artist'
    _description = 'Modello tatuatore'

    name = fields.Char(string='Nome', required=True)
    surname = fields.Char(string='Cognome', required=True)
    available_tattoos = fields.Many2many('tatuaggi.tattoo', string='Tatuaggi disponibili')


#class Tatuatore(models.Model):
    #_inherit = 'product.product'
#    _name = 'tatuaggi.tatuatore'
#    _description = 'Stuttura oggetto Tatuatore'

#    name = fields.Char(string="Nome")
#    tattoos = fields.Many2many('product.product', string="Tatuaggi")


