from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path("create/user", views.createUser, name="createUser"),
    path('user/info', views.getUser, name="getUser"),
    path('employer/jobposts', views.retrieveEmployerJobPosts, name="jobposts"),
    path('employer/jobpost/create', views.createJobPost),
    path('employer/jobpost/update/<str:id>', views.updateJobPost, name="updateJobPost"),
    path('employer/jobpost/delete/<str:id>', views.deleteJobPost, name="deleteJobPost"),
    path('employer/jobpost/get/<str:id>', views.getJobPostById, name="getJobPostById"),
    path('employer/jobpost/<str:job_id>/application/<str:application_id>', views.getApplication, name="getApplication"),
    path('jobseeker/availableJobPosts', views.retrieveAvailableJobPosts, name="availableJobPosts"),
    path('jobseeker/applications', views.retrieveApplications, name="applications"),
    path('jobseeker/info/update', views.updateJobSeekerInfo, name="updateJobSeekerInfo"),
    path('jobseeker/retrive/profile', views.getJobSeekerCv, name="getJobSeekerCv"),
    path('jobseeker/workexperince/create', views.createWorkExperince, name="createWorkexperince"),
    path('jobseeker/workexperince/delete/<str:id>', views.deleteWorkExperience, name='deleteWorkexperince'),
    path('jobseeker/workexperince/update/<str:id>', views.updateWorkExperience, name='updateWorkexperince'),
    path('jobseeker/education/create', views.createEducation, name='createEducation'),
    path('jobseeker/education/delete/<str:id>', views.deleteEducation, name='deleteEducation'),
    path('jobseeker/education/update/<str:id>', views.updateEducation, name='updateEducation'),
    path('jobseeker/apply/<str:id>', views.applyToJob, name="applyToJob"),
    path('jobseeker/delete/application/<int:id>/', views.deleteApplicationEmployee, name='deleteApplicationEmployee'),
]
