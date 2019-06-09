from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.contrib.auth import get_user_model
from apps.authentication.models.institute import Institute

admin.site.register(Institute)


class UserAdmin(ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('username', 'password', 'email', 'vk')
        }),
        ('Персональные данные', {
            'fields': ('first_name', 'last_name', 'patronymic', 'birthday')
        }),
        ('Активность', {
            'fields': ('is_active', 'date_joined', 'last_login')
        }),
        ('Группы и доступы', {
            'fields': ('is_superuser', 'is_staff', 'groups', 'user_permissions')
        }),
    )


admin.site.register(get_user_model(), UserAdmin)
