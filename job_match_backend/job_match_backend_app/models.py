from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager

from job_match_backend_project import settings
from .choices import *



class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The Password field must be set')
        email = self.normalize_email(email)
        extra_fields.setdefault('is_ag', bool(extra_fields.get('org_number')))
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=20)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    org_number = models.CharField(max_length=20, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_ag = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'mobile_number']

    def __str__(self):
        return self.email


class JobPost(models.Model):
    job_post = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='job_posts')
    job_post_title = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    employment_type = models.CharField(choices=EMPLOYMENT_TYPES, max_length=22)
    job_description = models.CharField(max_length=500)
    phone_number = models.CharField(max_length=20)
    expiration_date = models.DateField()
    is_published = models.BooleanField(default=False)
    applications = models.ManyToManyField(settings.AUTH_USER_MODEL, through='Application', related_name='job_applications')

class Application(models.Model):
    profile_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    job_post = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name='job_applications')
    job_seeker_cv = models.ForeignKey('JobSeekerCv', on_delete=models.CASCADE, related_name='applications')
    application_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.profile_id.email} applied to {self.job_post.job_post_title}"

class JobSeekerCv(models.Model):
    profile = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='job_seeker_profile')
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=30)
    applied_profiles = models.ManyToManyField(JobPost, related_name='applicants')

class WorkExperince(models.Model):
    job_seeker = models.ForeignKey(JobSeekerCv,on_delete=models.CASCADE, related_name='work_experiences')
    occupation_title = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50)
    years = models.CharField(max_length=50)
    description = models.CharField(max_length=500)    

class Education(models.Model):
    job_seeker = models.ForeignKey(JobSeekerCv,on_delete=models.CASCADE, related_name='educations')
    school_name = models.CharField(max_length=50)
    level = models.CharField(max_length=50)
    orientation = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    years = models.CharField(max_length=2,null=True)