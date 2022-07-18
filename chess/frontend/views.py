import uuid
from django.shortcuts import render

def index(request, *args, **kwargs):
    if not 'userid' in request.session:
        request.session['userid'] = str(uuid.uuid4())     
    return render(request, 'index.html')