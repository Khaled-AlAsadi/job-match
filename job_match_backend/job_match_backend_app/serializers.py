from rest_framework import serializers
from .models import JobPost, JobSeekerCv, WorkExperince

class JobPostSerializer(serializers.ModelSerializer):
    expiration_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"])

    class Meta:
        model = JobPost
        fields=['job_post_title','company_name','location','employment_type','job_description','phone_number','expiration_date','is_published']
    
    def create(self, validated_data):
        validated_data['job_post'] = self.context['request'].user
        return super().create(validated_data)

    
class WorkExperinceSerializer(serializers.ModelSerializer):
    job_seeker = serializers.PrimaryKeyRelatedField(queryset=JobSeekerCv.objects.all(), write_only=True)

    class Meta:
        model = WorkExperince
        fields = ['id','occupation_title', 'company_name', 'years', 'description','job_seeker']

class JobSeekerCVSerializer(serializers.ModelSerializer):
    work_experiences = WorkExperinceSerializer(many=True, read_only=True)
    class Meta:
        model = JobSeekerCv
        fields = ['email', 'mobile_number','work_experiences']
        read_only_fields = ['profile','work_experiences']
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.mobile_number = validated_data.get('mobile_number', instance.mobile_number)
        instance.save()
        return instance
