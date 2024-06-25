from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('jobposts',views.retrieveEmployerJobPosts,name="EmployerJobPostsByEmail"),
    path('jobpost/create',views.createJobPost),
    path('jobpost/update/<str:id>',views.updateJobPost,name="updateJobPost"),
    path('jobpost/delete/<str:id>',views.deleteJobPost,name="deleteJobPost"),
    path('jobpost/get/<str:id>',views.getJobPostById,name="getJobPostById"),
    path('jobseeker/info/update',views.updateJobSeekerInfo,name="updateJobSeekerInfo")
]