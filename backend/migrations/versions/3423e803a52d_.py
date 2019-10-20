"""empty message

Revision ID: 3423e803a52d
Revises: f6ebd7ad486c
Create Date: 2019-10-20 14:05:59.515204

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3423e803a52d'
down_revision = 'f6ebd7ad486c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('organization',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=True),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ride',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('start_organization_id', sa.Integer(), nullable=False),
    sa.Column('stop_organization_id', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.DateTime(), nullable=False),
    sa.Column('host_driver_id', sa.Integer(), nullable=False),
    sa.Column('estimated_time', sa.Time(), nullable=True),
    sa.ForeignKeyConstraint(['host_driver_id'], ['driver.id'], ),
    sa.ForeignKeyConstraint(['start_organization_id'], ['organization.id'], ),
    sa.ForeignKeyConstraint(['stop_organization_id'], ['organization.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ride')
    op.drop_table('organization')
    # ### end Alembic commands ###
