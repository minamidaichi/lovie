from django.shortcuts import render
from fms.common import functions
from django.http.response import JsonResponse
import json

def index(request):
    return render(request, 'fms/index.html')


def list(request):
    path = "root"
    lower_dir = functions.get_lower_dir(path)
    return JsonResponse({"data": lower_dir})


def upload(request):
    if request.method == 'POST':
        file_names = json.loads(request.body.decode("utf-8"))
        suggest_paths = functions.dir_suggest(file_names)

        return JsonResponse(suggest_paths)
    else:
        return render(request, 'fms/index.html')