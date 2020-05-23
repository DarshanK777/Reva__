from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

class UsersLimitOffsetPagination(LimitOffsetPagination):
    max_limit = 12
    default_limit = 9


class UsersPageNumberPagination(PageNumberPagination):
    page_size = 9