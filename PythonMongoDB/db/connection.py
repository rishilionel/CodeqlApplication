import mongoengine

from core.settings import settings
mongoengine.disconnect(alias=settings.DB_ALIAS)

def get_db():
    return mongoengine.connect(host=settings.DB_CONN, alias=settings.DB_ALIAS)
