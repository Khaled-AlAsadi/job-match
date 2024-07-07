from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('jobposts',views.retrieveEmployerJobPosts,name="EmployerJobPostsByEmail"),
    path('jobpost/create',views.createJobPost),
    path('jobpost/update/<str:id>',views.updateJobPost,name="updateJobPost"),
    path('jobpost/delete/<str:id>',views.deleteJobPost,name="deleteJobPost"),
    path('jobpost/get/<str:id>',views.getJobPostById,name="getJobPostById"),
    path('jobseeker/availableJobPosts',views.retrieveAvailableJobPosts,name="availableJobPosts"),
    path('jobseeker/info/update',views.updateJobSeekerInfo,name="updateJobSeekerInfo"),
    path('jobseeker/retrive/profile',views.getJobSeekerCv,name="getJobSeekerCv"),
    path('jobseeker/workexperince/create',views.createWorkExperince,name="createWorkexperince"),
    path('jobseeker/workexperince/delete/<str:id>',views.deleteWorkExperience,name='deleteWorkexperince'),
    path('jobseeker/workexperince/update/<str:id>',views.updateWorkExperience,name='updateWorkexperince'),
    path('jobseeker/education/create',views.createEducation,name='createEducation'),
    path('jobseeker/education/delete/<str:id>',views.deleteEducation,name='deleteEducation'),
    path('jobseeker/education/update/<str:id>',views.updateEducation,name='updateEducation'),
    path('jobseeker/apply/<str:id>',views.applyToJob,name="applyToJob"),
    path('jobseeker/delete/application/<int:id>/', views.deleteApplicationEmployee, name='deleteApplicationEmployee'),
    path('user/info',views.getUser,name="getUser")
]