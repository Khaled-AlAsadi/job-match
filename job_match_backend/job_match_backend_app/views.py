import json
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from .serializers import *
from .models import Application, Education, JobPost, JobSeekerCv, WorkExperince
from rest_framework.decorators import api_view
from rest_framework import status
from django.utils.timezone import now
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.contrib.auth import views as auth_views
from django.views.decorators.csrf import csrf_exempt
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
import os

# Create your views here.


@api_view(['GET'])
def index(request):
    return HttpResponse("Använd rätt route för att hitta saker")


@api_view(['GET'])
def getUser(request):
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status=401)

    serializer = CustomUserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def retrieveEmployerJobPosts(request):
    if request.user.is_authenticated and request.user.is_ag:
        job_posts = JobPost.objects.filter(job_post=request.user)
        serializer = JobPostSerializer(job_posts, many=True)
        return JsonResponse(
            serializer.data,
            safe=False,
            json_dumps_params={
                'ensure_ascii': False})
    else:
        return JsonResponse(
            {"Error": "You are not logged in or not authorized"}, status=401)


@api_view(['POST'])
def createJobPost(request):
    if request.user.is_authenticated and request.user.is_ag:
        serializer = JobPostSerializer(
            data=request.data, context={
                'request': request})
        if serializer.is_valid():
            try:
                job_post = serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"Error": "You are not logged in"},
                            status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def retrieveAvailableJobPosts(request):
    if request.user.is_authenticated and not request.user.is_ag:
        location = request.GET.get('location', None)

        applied_job_posts = Application.objects.filter(
            profile_id=request.user).values_list(
            'job_post_id', flat=True)
        job_posts = JobPost.objects.filter(
            is_published=True,
            expiration_date__gte=now()).exclude(
            id__in=applied_job_posts)

        if location:
            job_posts = job_posts.filter(location__icontains=location)

        serializer = AvailableJobPostsSerializer(job_posts, many=True)
        return JsonResponse(
            serializer.data,
            safe=False,
            json_dumps_params={
                'ensure_ascii': False})
    else:
        return JsonResponse(
            {"Error": "You are not logged in or not authorized"}, status=401)


@api_view(['GET'])
def retrieveApplications(request):
    if request.user.is_authenticated and not request.user.is_ag:
        # Fetch the applications related to the authenticated user
        applications = Application.objects.filter(profile_id=request.user)
        # Serialize the application data to include job post details only
        serializer = ApplicationsSerializer(applications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(
            {"Error": "You are not logged in or not authorized"},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['PATCH'])
def updateJobPost(request, id):
    if request.user.is_authenticated and request.user.is_ag:
        job_post = get_object_or_404(JobPost, id=id)
        serializer = JobPostSerializer(
            job_post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"Error": "You are not logged in"},
                            status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
def deleteJobPost(request, id):
    if request.user.is_authenticated and request.user.is_ag:
        job_post = get_object_or_404(JobPost, id=id, job_post=request.user)
        job_post.delete()
        return Response({'detail': 'Job post deleted successfully.'},
                        status=status.HTTP_204_NO_CONTENT)
    else:
        return JsonResponse({"Error": "You are not logged in"},
                            status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
def getJobPostById(request, id):
    if request.user.is_authenticated and request.user.is_ag:
        job_post = get_object_or_404(JobPost, id=id, job_post=request.user)
        serializer = JobPostSerializer(job_post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return JsonResponse({"Error": "You are not logged in"},
                            status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
def getApplication(request, job_id, application_id):
    if request.user.is_authenticated and request.user.is_ag:
        job_post = get_object_or_404(JobPost, id=job_id, job_post=request.user)
        print(job_id)
        application = get_object_or_404(
            Application, profile_id=application_id, job_post=job_post)
        serializer = ApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return JsonResponse({"Error": "You are not logged in"},
                            status=status.HTTP_401_UNAUTHORIZED)


@api_view(["PATCH"])
def updateJobSeekerInfo(request):
    if request.user.is_authenticated and not request.user.is_ag:
        try:
            job_seeker, created = JobSeekerCv.objects.get_or_create(
                profile=request.user,
                defaults={
                    'email': request.user.email,
                    'mobile_number': request.user.mobile_number,
                }
            )
            data = request.data.copy()
            serializer = JobSeekerCVSerializer(
                job_seeker, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return JsonResponse({"Error": "You are not logged in"},
                            status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
def getJobSeekerCv(request):
    if request.user.is_authenticated and not request.user.is_ag:
        try:
            cv = JobSeekerCv.objects.get(profile=request.user)
        except JobSeekerCv.DoesNotExist:
            cv = JobSeekerCv.objects.create(
                profile=request.user,
                email=request.user.email,
                mobile_number=request.user.mobile_number
            )
        serializer = JobSeekerCVSerializer(cv)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return JsonResponse({"Error": "You are not logged in"},
                            status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
def createWorkExperince(request):
    if request.user.is_authenticated and not request.user.is_ag:
        cv = get_object_or_404(JobSeekerCv, profile=request.user)
        data = request.data.copy()
        data['job_seeker'] = cv.id

        serializer = WorkExperinceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"Error": "You are not logged in"},
                        status=status.HTTP_401_UNAUTHORIZED)


@api_view(["PUT"])
def updateWorkExperience(request, id):
    if request.user.is_authenticated and not request.user.is_ag:
        cv = get_object_or_404(JobSeekerCv, profile=request.user)
        work_experience = get_object_or_404(
            WorkExperince, id=id, job_seeker=cv)
        serializer = WorkExperinceSerializer(
            work_experience, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"Error": "You are not logged in"},
                        status=status.HTTP_401_UNAUTHORIZED)


@api_view(["DELETE"])
def deleteWorkExperience(request, id):
    if request.user.is_authenticated and not request.user.is_ag:
        cv = get_object_or_404(JobSeekerCv, profile=request.user)
        experience = get_object_or_404(WorkExperince, id=id, job_seeker=cv)

        experience.delete()
        return Response({"Success": "Work experience deleted successfully"},
                        status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"Error": "You are not logged in"},
                        status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
def createEducation(request):
    if request.user.is_authenticated and not request.user.is_ag:
        cv = get_object_or_404(JobSeekerCv, profile=request.user)
        data = request.data.copy()
        data['job_seeker'] = cv.id

        serializer = EducationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"Error": "You are not logged in"},
                        status=status.HTTP_401_UNAUTHORIZED)


@api_view(["PUT"])
def updateEducation(request, id):
    if request.user.is_authenticated and not request.user.is_ag:
        cv = get_object_or_404(JobSeekerCv, profile=request.user)
        education = get_object_or_404(Education, id=id, job_seeker=cv)
        serializer = EducationSerializer(
            education, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"Error": "You are not logged in"},
                        status=status.HTTP_401_UNAUTHORIZED)


@api_view(["DELETE"])
def deleteEducation(request, id):
    if request.user.is_authenticated and not request.user.is_ag:
        cv = get_object_or_404(JobSeekerCv, profile=request.user)
        education = get_object_or_404(Education, id=id, job_seeker=cv)

        education.delete()
        return Response({"Success": "Education deleted successfully"},
                        status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"Error": "You are not logged in"},
                        status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
def applyToJob(request, id):
    if request.user.is_authenticated and not request.user.is_ag:
        job_post = get_object_or_404(JobPost, id=id)

        # Check if the user has already applied to this job
        if Application.objects.filter(
                profile_id=request.user,
                job_post=job_post).exists():
            return Response(
                {"Error": "You have already applied for this job"},
                status=status.HTTP_204_NO_CONTENT)

        # Get or create the JobSeekerCv instance for the user
        job_seeker_cv, created = JobSeekerCv.objects.get_or_create(
            profile=request.user,
            defaults={
                'email': request.user.email,
                'mobile_number': request.user.mobile_number
            }
        )

        application = Application.objects.create(
            profile_id=request.user,
            job_post=job_post,
            job_seeker_cv=job_seeker_cv
        )

        return Response({"Message": "Application successful"},
                        status=status.HTTP_200_OK)
    else:
        return Response(
            {
                "Error": "You are not authorized to apply for this job"},
            status=status.HTTP_401_UNAUTHORIZED)


@api_view(["DELETE"])
def deleteApplicationEmployee(request, id):
    if request.user.is_authenticated:
        job_post = get_object_or_404(JobPost, id=id)

        application = Application.objects.filter(
            profile_id=request.user, job_post=job_post
        ).first()

        if not application:
            return Response({"Error": "Application does not exist"},
                            status=status.HTTP_404_NOT_FOUND)

        application.delete()

        return Response({"Message": "success"}, status=status.HTTP_200_OK)
    else:
        return Response({"Error": "You are not authorized"},
                        status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
def createUser(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def deleteUser(request):
    if request.user.is_authenticated:
        user = request.user

        user.delete()

        return Response({"message": "User deleted successfully."},
                        status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"Error": "You are not authorized"},
                        status=status.HTTP_401_UNAUTHORIZED)


@method_decorator(csrf_exempt, name='dispatch')
class PasswordResetAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            print(os.environ.get("DEFAULT_FROM_EMAIL"))
            reset_url = (
                os.environ.get('FRONTEND_BASE_URL')
                + "/reset/confirm/"
                + uid
                + "/"
                + token
            )
            send_mail(
                'Password Reset',
                f'Click the link to reset your password: {reset_url}',
                os.environ.get("DEFAULT_FROM_EMAIL"),
                [email],
                fail_silently=False,
            )

            return Response({'success': 'Password reset link sent to email'},
                            status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User with this email does not exist'},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(csrf_exempt, name='dispatch')
class PasswordResetConfirmAPIView(APIView):
    def post(self, request, uid, token):
        new_password = request.data.get('password')

        try:
            uid = urlsafe_base64_decode(uid).decode()
            user = CustomUser.objects.get(pk=uid)

            if not default_token_generator.check_token(user, token):
                return Response({'error': 'Invalid token'},
                                status=status.HTTP_400_BAD_REQUEST)

            user.password = make_password(new_password)
            user.save()

            return Response({'message': 'Password reset successful'},
                            status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)
