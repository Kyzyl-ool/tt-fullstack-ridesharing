"""empty message

Revision ID: 66976019b388
Revises: fa263fe36903
Create Date: 2019-11-23 15:21:07.135844

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66976019b388'
down_revision = 'fa263fe36903'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('photo_url', sa.String(length=2000), nullable=True))
    op.drop_column('users', 'photo')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('photo', sa.VARCHAR(length=2000), autoincrement=False, nullable=True))
    op.drop_column('users', 'photo_url')
    # ### end Alembic commands ###