from rest_framework.pagination import PageNumberPagination


class Pagination(PageNumberPagination):
    page_size = 100
    max_page_size = 1000
