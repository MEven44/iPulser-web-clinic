from flask.cli import AppGroup
from .users import seed_users, undo_users

from .trials import seed_trials,undo_trials
from .treatments import seed_treatments,undo_treatments
from .freq import seed_freq, undo_freq
from .f_t import seed_frequencies_treatments,undo_frequencies_treatments


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_frequencies_treatments()
        undo_freq()
        undo_treatments()
        undo_trials()
        undo_users()
        
    
    seed_users()
    seed_trials()
    seed_treatments()
    seed_freq()
    seed_frequencies_treatments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_frequencies_treatments()
    undo_freq()
    undo_treatments()
    undo_trials()
    undo_users()
    
    
    # Add other undo functions here