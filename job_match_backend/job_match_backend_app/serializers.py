from rest_framework import serializers
from .models import JobPost

class JobPostSerializer(serializers.ModelSerializer):
    expiration_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"])

    class Meta:
        model = JobPost
        fields=['job_post_title','company_name','location','employment_type','job_description','phone_number','expiration_date']
    
    def create(self, validated_data):
        validated_data['job_post'] = self.context['request'].user
        return super().create(validated_data)