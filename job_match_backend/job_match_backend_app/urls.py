from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('EmployerJobPostsByEmail/<str:email>',views.retrieveEmployerJobPosts,name="EmployerJobPostsByEmail"),
    path('jobpost/create',views.createJobPost),
    path('jobpost/update/<str:id>',views.updateJobPost,name="updateJobPost"),
    path('jobpost/delete/<str:id>',views.deleteJobPost,name="deleteJobPost")
]