import traceback
import json
from typing import List
from pydantic import BaseModel


def convert_model_to_dict(model):
    model_dict = json.loads(model.to_json())
    if '_id' in model_dict:
        model_dict['_id'] = model_dict['_id']['$oid']
    return model_dict
