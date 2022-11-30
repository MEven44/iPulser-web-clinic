"""empty message

Revision ID: df2f91e01a2f
Revises: 
Create Date: 2022-11-30 09:39:42.543014

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

# revision identifiers, used by Alembic.
revision = 'df2f91e01a2f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('frequencies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('freq', sa.String(), nullable=False),
    sa.Column('time', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == 'production':
        op.execute(f'ALTER TABLE frequencies SET SCHEMA {SCHEMA};')

    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('title', sa.String(length=40), nullable=False),
    sa.Column('speciality', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    if environment == 'production':
        op.execute(f'ALTER TABLE users SET SCHEMA {SCHEMA};')
    op.create_table('trials',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('subject', sa.String(), nullable=False),
    sa.Column('trial_scope', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(length=2000), nullable=True),
    sa.Column('trial_manager', sa.Integer(), nullable=True),
    sa.Column('admin', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['trial_manager'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == 'production':
        op.execute(f'ALTER TABLE trials SET SCHEMA {SCHEMA};')
    op.create_table('treatments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('treatment_name', sa.String(length=100), nullable=False),
    sa.Column('admin', sa.Boolean(), nullable=True),
    sa.Column('comments', sa.String(length=355), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('trial_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['trial_id'], ['trials.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == 'production':
        op.execute(f'ALTER TABLE treatments SET SCHEMA {SCHEMA};')
    op.create_table('frequencies_treatments',
    sa.Column('treatments_id', sa.Integer(), nullable=True),
    sa.Column('frequencies_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['frequencies_id'], ['frequencies.id'], ),
    sa.ForeignKeyConstraint(['treatments_id'], ['treatments.id'], ),
    sa.PrimaryKeyConstraint('frequencies_id')
    )
    if environment == 'production':
        op.execute(f'ALTER TABLE frequencies_treatments SET SCHEMA {SCHEMA};')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('frequencies_treatments')
    op.drop_table('treatments')
    op.drop_table('trials')
    op.drop_table('users')
    op.drop_table('frequencies')
    # ### end Alembic commands ###