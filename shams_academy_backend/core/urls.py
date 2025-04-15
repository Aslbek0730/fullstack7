from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, CourseViewSet, LessonViewSet, TestViewSet,
    BookViewSet, ForumPostViewSet, ForumCommentViewSet,
    PaymentViewSet, NotificationViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'tests', TestViewSet)
router.register(r'books', BookViewSet)
router.register(r'forum-posts', ForumPostViewSet)
router.register(r'forum-comments', ForumCommentViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 