import traceback
from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from core.logger import logger


class ExceptionMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request, call_next):
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            logger.error(traceback.format_exc())
            return Response(str(e), 500)