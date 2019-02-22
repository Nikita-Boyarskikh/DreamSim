import traceback
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin


def is_registered(exception):
    try:
        return exception.is_an_error_response
    except AttributeError:
        return False


class RequestExceptionHandler(MiddlewareMixin):
    # pylint: disable=no-self-use
    def process_exception(self, request, exception):
        if is_registered(exception):
            status = exception.status_code
            exception_dict = exception.to_dict()
        else:
            status = 500
            exception_dict = {'errorMessage': 'Unexpected Error!'}

        traceback.print_exc()
        return JsonResponse(exception_dict, status=status)
