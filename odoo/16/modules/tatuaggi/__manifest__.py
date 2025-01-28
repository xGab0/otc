# -*- coding: utf-8 -*-
{
    'name': "Tatuaggi",
    'version': "1.0",
    'author': "Gabriele",
    'summary': 'Manages tattoos, artists, and appointments.',
    'description': 'This module provides functionality to manage tattoos, artists, and appointments for a tattoo shop.',
    'category': 'Services',
    "depends": [
        'base'
    ],
    "data": [
        'security/ir.model.access.csv',
        #'security/security.xml',

        #'views/tatuaggi_view.xml',
        'views/appointments_view.xml',
        'views/artists_view.xml',
        'views/tattoos_view.xml',
        'views/menu_items.xml',

        # marketing
        #'views/marketing_views.xml',
        #'views/marketing_menu.xml'
    ],
    "demo": [],
    "installable": True,
    "application": True
}