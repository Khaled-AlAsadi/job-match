import json
from django.shortcuts import get_object_or_404
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from .serializers import JobPostSerializer, JobSeekerCVSerializer
from .models import JobPost, JobSeekerCv
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
@api_view(['GET'])
def index(request):
    return HttpResponse("Använd rätt route för att hitta saker")

@api_view(['GET'])
def retrieveEmployerJobPosts(request):
    if request.user.is_authenticated:
        if request.user.is_ag:
            job_posts = JobPost.objects.filter(job_post=request.user)
            data = list(job_posts.values())
            if data:
                return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})
            else:
                return JsonResponse([], safe=False)
        else:
            return JsonResponse({"Error": "Unauthorized"}, status=401)
    else:
        return JsonResponse({"Error": "You are not logged in"}, status=401)


@api_view(['POST'])
def createJobPost(request):
    if request.user.is_authenticated and request.user.is_ag:
        serializer = JobPostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_CREATED)
            except Exception as e:
                return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"Error": "You are not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['PATCH'])
def updateJobPost(request,id):
    if request.user.is_authenticated and request.user.is_ag:
            job_post = get_object_or_404(JobPost, id=id)
            serializer = JobPostSerializer(job_post, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"Error": "You are not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['DELETE'])
def deleteJobPost(request,id):
    if request.user.is_authenticated and request.user.is_ag:
            job_post = get_object_or_404(JobPost, id=id, job_post=request.user)
            job_post.delete()
            return Response({'detail': 'Job post deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    else:
        return JsonResponse({"Error": "You are not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(["GET"])
def getJobPostById(request,id):
    if request.user.is_authenticated and request.user.is_ag:
        job_post = get_object_or_404(JobPost, id=id, job_post=request.user)
        serializer = JobPostSerializer(job_post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return JsonResponse({"Error": "You are not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(["PATCH"])
def updateJobSeekerInfo(request):
    if request.user.is_authenticated and not request.user.is_ag:
        try:
            job_seeker = JobSeekerCv.objects.get_or_create(profile=request.user, defaults={
                'email': request.user.email,
                'mobile_number': request.user.mobile_number,
            })

            serializer = JobSeekerCVSerializer(job_seeker, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return JsonResponse({"Error": "You are not logged in"}, status=status.HTTP_401_UNAUTHORIZED)