from rest_framework.exceptions import APIException


class Redirect(APIException):
    status_code = 301
    default_code = 'redirect'
    default_detail = 'You have been redirected'
