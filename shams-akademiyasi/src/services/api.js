import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                localStorage.setItem('access_token', access);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh token fails, logout the user
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const apiService = {
    // Auth methods
    login: async (credentials) => {
        const response = await api.post('/auth/token/', credentials);
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    getUserProfile: async () => {
        const response = await api.get('/auth/profile/');
        return response.data;
    },

    // Course methods
    getCourses: async () => {
        const response = await api.get('/courses/');
        return response.data;
    },

    getCourse: async (courseId) => {
        const response = await api.get(`/courses/${courseId}/`);
        return response.data;
    },

    enrollInCourse: async (courseId) => {
        const response = await api.post('/enroll/', { course_id: courseId });
        return response.data;
    },

    getCourseLessons: async (courseId) => {
        const response = await api.get(`/courses/${courseId}/lessons/`);
        return response.data;
    },

    getCourseTests: async (courseId) => {
        const response = await api.get(`/courses/${courseId}/tests/`);
        return response.data;
    },

    updateLessonProgress: async (lessonId, progress) => {
        const response = await api.post(`/lessons/${lessonId}/progress/`, { progress });
        return response.data;
    },

    // Library methods
    getBooks: async () => {
        const response = await api.get('/books/');
        return response.data;
    },

    // Payment methods
    createPayment: async (data) => {
        const response = await api.post('/payment/', data);
        return response.data;
    },

    getPaymentMethods: async () => {
        const response = await api.get('/payment/methods/');
        return response.data;
    },

    // Notification methods
    getNotifications: async () => {
        const response = await api.get('/notifications/');
        return response.data;
    },

    markNotificationAsRead: async (notificationId) => {
        const response = await api.patch(`/notifications/${notificationId}/mark-read/`);
        return response.data;
    },

    // AI Assistant methods
    askAI: async (question) => {
        const response = await api.post('/ai-assistant/', { question });
        return response.data;
    },

    // Test methods
    getTest: async (testId) => {
        const response = await api.get(`/tests/${testId}/`);
        return response.data;
    },

    submitTest: async (testId, answers) => {
        const response = await api.post(`/tests/${testId}/submit/`, { answers });
        return response.data;
    },
}; 