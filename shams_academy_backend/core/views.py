from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, login, logout
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from .models import (
    Course, Lesson, Test, Question, Answer,
    Book, ForumPost, ForumComment, Payment, Notification
)
from .serializers import (
    UserSerializer, UserRegistrationSerializer, CourseSerializer,
    LessonSerializer, TestSerializer, BookSerializer,
    ForumPostSerializer, ForumCommentSerializer, PaymentSerializer,
    NotificationSerializer
)
from .permissions import IsOwnerOrReadOnly, IsTeacherOrAdmin

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'create':
            return UserRegistrationSerializer
        return UserSerializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()
        
        if user and user.check_password(password):
            login(request, user)
            return Response({'message': 'Login successful'})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})

    @action(detail=False, methods=['post'])
    def reset_password(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        
        if user:
            code = get_random_string(length=6)
            user.set_password(code)
            user.save()
            
            send_mail(
                'Password Reset Code',
                f'Your password reset code is: {code}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
            return Response({'message': 'Reset code sent to email'})
        return Response({'error': 'Email not found'}, status=status.HTTP_404_NOT_FOUND)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Course.objects.all()
        age_level = self.request.query_params.get('age_level')
        price_type = self.request.query_params.get('price_type')
        
        if age_level:
            queryset = queryset.filter(age_range__contains=age_level)
        if price_type:
            if price_type == 'free':
                queryset = queryset.filter(price=0)
            elif price_type == 'paid':
                queryset = queryset.filter(price__gt=0)
        
        return queryset

    @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        course = self.get_object()
        if course.price > 0:
            return Response({'error': 'Course requires payment'}, status=status.HTTP_400_BAD_REQUEST)
        
        Payment.objects.create(
            user=request.user,
            course=course,
            amount=course.price,
            status='success'
        )
        return Response({'message': 'Enrolled successfully'})

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        course_id = self.request.query_params.get('course')
        if course_id:
            return Lesson.objects.filter(course_id=course_id)
        return Lesson.objects.none()

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        lesson = self.get_object()
        if not lesson.course.payments.filter(user=request.user, status='success').exists():
            return Response({'error': 'Not enrolled in this course'}, status=status.HTTP_403_FORBIDDEN)
        
        lesson.completions.create(user=request.user)
        return Response({'message': 'Lesson marked as completed'})

class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def submit_answers(self, request, pk=None):
        test = self.get_object()
        answers = request.data.get('answers', {})
        
        if not test.course.payments.filter(user=request.user, status='success').exists():
            return Response({'error': 'Not enrolled in this course'}, status=status.HTTP_403_FORBIDDEN)
        
        correct_count = 0
        total_questions = test.questions.count()
        
        for question_id, answer_id in answers.items():
            question = Question.objects.get(id=question_id)
            answer = Answer.objects.get(id=answer_id)
            if answer.is_correct:
                correct_count += 1
        
        score = (correct_count / total_questions) * 100
        Notification.objects.create(
            user=request.user,
            message_type='test_result',
            message=f'Your test score: {score}%'
        )
        
        return Response({
            'score': score,
            'correct_answers': correct_count,
            'total_questions': total_questions
        })

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Book.objects.all()
        price_type = self.request.query_params.get('price_type')
        
        if price_type:
            queryset = queryset.filter(price_type=price_type)
        
        return queryset

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        book = self.get_object()
        if book.price_type != 'free' and not book.payments.filter(user=request.user, status='success').exists():
            return Response({'error': 'Book requires purchase'}, status=status.HTTP_403_FORBIDDEN)
        
        return Response({'url': book.file.url})

class ForumPostViewSet(viewsets.ModelViewSet):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ForumCommentViewSet(viewsets.ModelViewSet):
    queryset = ForumComment.objects.all()
    serializer_class = ForumCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response({'message': 'Notification marked as read'})
