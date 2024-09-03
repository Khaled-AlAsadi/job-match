from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password


class WorkExperinceSerializer(serializers.ModelSerializer):
    job_seeker = serializers.PrimaryKeyRelatedField(
        queryset=JobSeekerCv.objects.all(), write_only=True)

    class Meta:
        model = WorkExperince
        fields = [
            'id',
            'occupation_title',
            'company_name',
            'years',
            'description',
            'job_seeker']


class EducationSerializer(serializers.ModelSerializer):
    job_seeker = serializers.PrimaryKeyRelatedField(
        queryset=JobSeekerCv.objects.all(), write_only=True)

    class Meta:
        model = Education
        fields = [
            'id',
            'school_name',
            'level',
            'orientation',
            'description',
            'years',
            'job_seeker']


class JobSeekerCVSerializer(serializers.ModelSerializer):
    work_experiences = WorkExperinceSerializer(many=True, read_only=True)
    educations = EducationSerializer(many=True, read_only=True)

    class Meta:
        model = JobSeekerCv
        fields = [
            "profile_id",
            'email',
            'mobile_number',
            'work_experiences',
            'educations']
        read_only_fields = ['profile', 'work_experiences', 'educations']

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.mobile_number = validated_data.get(
            'mobile_number', instance.mobile_number)
        instance.save()
        return instance


class ApplicationSerializer(serializers.ModelSerializer):
    job_seeker_cv = JobSeekerCVSerializer(read_only=True)

    class Meta:
        model = Application
        fields = ['profile_id',
                  'job_seeker_cv']


class JobPostSerializer(serializers.ModelSerializer):
    expiration_date = serializers.DateField(
        format="%Y-%m-%d", input_formats=["%Y-%m-%d"])
    applications = ApplicationSerializer(
        many=True, read_only=True, source='job_applications')

    class Meta:
        model = JobPost
        fields = [
            'id',
            'job_post_title',
            'company_name',
            'location',
            'employment_type',
            'job_description',
            'phone_number',
            'expiration_date',
            'is_published',
            'applications']
        read_only_fields = ['applications', 'id']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['job_post'] = user
        return super().create(validated_data)


class AvailableJobPostsSerializer(serializers.ModelSerializer):
    expiration_date = serializers.DateField(
        format="%Y-%m-%d", input_formats=["%Y-%m-%d"])

    class Meta:
        model = JobPost
        fields = [
            'id',
            'job_post_title',
            'company_name',
            'location',
            'employment_type',
            'job_description',
            'phone_number',
            'expiration_date',
            'is_published']

    def create(self, validated_data):
        validated_data['job_post'] = self.context['request'].user
        return super().create(validated_data)


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'email',
            'first_name',
            'last_name',
            'mobile_number',
            'org_number',
            'is_ag',
            'is_active',
            'is_staff',
            'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': True},
        }

    def create(self, validated_data):
        if 'org_number' in validated_data and validated_data['org_number']:
            validated_data['is_ag'] = True

        validated_data['password'] = make_password(validated_data['password'])

        validated_data['is_staff'] = False
        validated_data['is_superuser'] = False

        return super().create(validated_data)


class SimplifiedJobPostSerializer(serializers.ModelSerializer):
    expiration_date = serializers.DateField(
        format="%Y-%m-%d", input_formats=["%Y-%m-%d"])

    class Meta:
        model = JobPost
        fields = [
            'id',
            'job_post_title',
            'company_name',
            'location',
            'employment_type',
            'job_description',
            'phone_number',
            'expiration_date',
            'is_published'
        ]


class ApplicationsSerializer(serializers.ModelSerializer):
    job_post = SimplifiedJobPostSerializer(read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'job_post']
