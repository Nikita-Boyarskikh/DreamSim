from allauth.account.adapter import DefaultAccountAdapter

from apps.authentication.models import Group


class AccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        from allauth.account.utils import user_field

        data = form.cleaned_data
        patronymic = data.get('patronymic')
        vk = data.get('vk')
        birthday = data.get('birthday')
        group_id = data.get('group')
        group = Group.objects.get(id=group_id)

        user_field(user, 'patronymic', patronymic)
        user_field(user, 'vk', vk)
        user_field(user, 'birthday', birthday)
        user_field(user, 'group', group)

        super().save_user(request, user, form, commit)
