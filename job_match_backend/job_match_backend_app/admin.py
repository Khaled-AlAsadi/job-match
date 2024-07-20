from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = (
        'email',
        'first_name',
        'last_name',
        'is_staff',
        "org_number",
        "is_ag")
    ordering = ('email',)
    fieldsets = (
        (None, {
            'fields': (
                'email', 'password')}), ('Personal info', {
                    'fields': (
                        'first_name', 'last_name', "org_number", "is_ag")}), ('Permissions', {
                            'fields': (
                                'is_staff', 'is_active')}), )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )


admin.site.register(CustomUser, CustomUserAdmin)
