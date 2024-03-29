"""empty message

Revision ID: bcd26e5e230b
Revises: c2c9fbfec27b
Create Date: 2024-01-20 13:08:32.068737

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bcd26e5e230b'
down_revision = 'c2c9fbfec27b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('destination', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'country', ['country_id'], ['id'])

    with op.batch_alter_table('itinerary', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'country', ['country_id'], ['id'])

    with op.batch_alter_table('itinerary_destination', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'itinerary', ['itinerary_id'], ['id'])
        batch_op.create_foreign_key(None, 'destination', ['destination_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('itinerary_destination', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('itinerary', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('destination', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')

    # ### end Alembic commands ###
