import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserCircleIcon,
  AcademicCapIcon,
  TrophyIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

const enrolledCourses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    progress: 75,
    lastAccessed: '2 days ago',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd2578d4e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    title: 'Web Development Basics',
    progress: 30,
    lastAccessed: '1 week ago',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
  },
];

const completedCourses = [
  {
    id: 3,
    title: 'Digital Art and Design',
    completedDate: '2023-12-15',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244a32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
  },
];

const badges = [
  {
    id: 1,
    name: 'Fast Learner',
    description: 'Completed a course in record time',
    icon: '🏃',
  },
  {
    id: 2,
    name: 'Perfect Score',
    description: 'Achieved 100% in all quizzes',
    icon: '💯',
  },
  {
    id: 3,
    name: 'Early Bird',
    description: 'Enrolled in the first week of launch',
    icon: '🌅',
  },
];

const tabs = [
  { id: 'courses', name: 'Courses', icon: '📚' },
  { id: 'certificates', name: 'Certificates', icon: '🏆' },
  { id: 'tests', name: 'Test Results', icon: '📝' },
  { id: 'payments', name: 'Payment History', icon: '💳' },
];

const sampleCourses = [
  {
    id: 1,
    title: 'Arduino Programming Basics',
    progress: 75,
    lastAccessed: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    title: 'Creative Thinking Workshop',
    progress: 100,
    lastAccessed: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const sampleCertificates = [
  {
    id: 1,
    title: 'Arduino Programming Certificate',
    date: '2024-03-15',
    course: 'Arduino Programming Basics',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    title: 'Creative Thinking Certificate',
    date: '2024-03-10',
    course: 'Creative Thinking Workshop',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const sampleTestResults = [
  {
    id: 1,
    testName: 'Arduino Basics Final Test',
    score: 85,
    date: '2024-03-15',
    totalQuestions: 20,
    correctAnswers: 17,
  },
  {
    id: 2,
    testName: 'Creative Thinking Assessment',
    score: 92,
    date: '2024-03-10',
    totalQuestions: 15,
    correctAnswers: 14,
  },
];

const samplePayments = [
  {
    id: 1,
    course: 'Arduino Programming Basics',
    amount: 49.99,
    date: '2024-03-01',
    status: 'Completed',
    method: 'Payme',
  },
  {
    id: 2,
    course: 'Creative Thinking Workshop',
    amount: 29.99,
    date: '2024-02-15',
    status: 'Completed',
    method: 'Click',
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('courses');
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '2023-01-01',
    level: 'Intermediate',
    points: 1250,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div className="grid gap-6 sm:grid-cols-2">
            {sampleCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Learning →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        );

      case 'certificates':
        return (
          <div className="grid gap-6 sm:grid-cols-2">
            {sampleCertificates.map((certificate) => (
              <div
                key={certificate.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {certificate.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Course: {certificate.course}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Date: {new Date(certificate.date).toLocaleDateString()}
                  </p>
                  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Download Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'tests':
        return (
          <div className="space-y-6">
            {sampleTestResults.map((test) => (
              <div
                key={test.id}
                className="bg-white shadow rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {test.testName}
                  </h3>
                  <span className="text-2xl font-bold text-indigo-600">
                    {test.score}%
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <p>Date: {new Date(test.date).toLocaleDateString()}</p>
                    <p>Total Questions: {test.totalQuestions}</p>
                  </div>
                  <div>
                    <p>Correct Answers: {test.correctAnswers}</p>
                    <p>Incorrect Answers: {test.totalQuestions - test.correctAnswers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'payments':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {samplePayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.method}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <img
              className="h-24 w-24 rounded-full"
              src={user.image}
              alt={user.name}
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-8">{renderContent()}</div>
      </div>
    </div>
  );
} 