import json
from django.shortcuts import get_object_or_404
from django.http import HttpResponse,JsonResponse
from .models import JobPost,CustomUser
from rest_framework.decorators import api_view
from django.contrib.auth.models import AnonymousUser

# Create your views here.
@api_view(['GET'])
def index(request):
    return HttpResponse("Använd rätt route för att hitta saker")

@api_view(['GET'])
def retrieveEmployerJobPosts(request, email):
    if request.user.is_authenticated:
        user = get_object_or_404(CustomUser, email=email)
        
        if user.is_ag:
            job_posts = JobPost.objects.filter(job_post=user)
            data = list(job_posts.values())
            if data:
                return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})
            else:
                return JsonResponse([], safe=False)

        else:
            return JsonResponse({"Error": "Unauthorized"}, status=401)
    else:
        return JsonResponse({"Error": "You are not logged in"}, status=401)
    

