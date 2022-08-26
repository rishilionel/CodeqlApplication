from core.settings import settings
from api.routes import app
import uvicorn


if __name__ == "__main__":
    uvicorn.run(app, port=settings.PORT)
