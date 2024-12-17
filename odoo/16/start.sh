#!/bin/bash

# Absolute path of the Virtual Environment
venv_path="../../python/venv/bin"

# Check if this command is running in Fish shell
if [[ -n "$FISH_VERSION" ]]; then
    activate_script="$venv_path/activate.fish"
else
    activate_script="$venv_path/activate"
fi

# Activate the Virtual Environment
source "$activate_script"

# Absolute path of the Odoo bin
odoo_bin="./src/odoo-bin"

# Odoo start command
odoo_command="$odoo_bin -c odoo.conf --xmlrpc-port=8070 -u hr-attendance"

# Esegui il comando
$odoo_command
