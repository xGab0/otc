# -*- coding: utf-8 -*-

{
    'name': 'ETA Marketing',
    'version': '16.0.1.0.0',
    'category': 'Marketing',
    'summary': 'Gestione avanzata piani e campagne marketing',
    'depends': ['base'],
    'data': [
        'security/marketing_security.xml',
        'views/marketing_plan_views.xml',
        'views/marketing_group_views.xml',
        'views/marketing_campaign_views.xml',
        'views/marketing_sms_views.xml',
        'views/marketing_menu.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
