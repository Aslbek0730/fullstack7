import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

// Sample course data - in a real app, this would come from an API
const courseData = {
  id: 1,
  name: 'Introduction to Robotics',
  category: 'Beginners',
  image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e0e0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  price: 10000,
  description: 'Learn the basics of robotics and build your first robot from scratch. This course covers fundamental concepts, programming basics, and hands-on projects.',
  instructor: {
    name: 'Abdulla',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    experience: '5 years of teaching robotics and programming',
    bio: 'Experienced robotics instructor with a passion for teaching young innovators. Specializes in making complex concepts accessible to beginners.',
  },
  content: [
    {
      id: 1,
      title: 'Introduction to Robotics',
      lessons: [
        {
          id: 1,
          title: 'What is Robotics?',
          type: 'video',
          duration: '15 min',
          content: 'https://example.com/video1',
        },
        {
          id: 2,
          title: 'Basic Components',
          type: 'text',
          duration: '20 min',
          content: 'Learn about the essential components of a robot...',
        },
      ],
    },
    {
      id: 2,
      title: 'Programming Basics',
      lessons: [
        {
          id: 3,
          title: 'Introduction to Programming',
          type: 'video',
          duration: '20 min',
          content: 'https://example.com/video2',
        },
        {
          id: 4,
          title: 'First Program',
          type: 'assignment',
          duration: '30 min',
          content: 'Create your first program to control a robot...',
        },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      user: 'Student 1',
      rating: 5,
      comment: 'Great course! Very well explained and easy to follow.',
      date: '2024-01-15',
    },
    {
      id: 2,
      user: 'Student 2',
      rating: 4,
      comment: 'Good content, but some parts could be explained better.',
      date: '2024-01-10',
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CourseDetail() {
  const [expandedSection, setExpandedSection] = useState(null);
  const { id } = useParams();

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900">{courseData.name}</h1>
              <p className="mt-2 text-lg text-gray-600">{courseData.description}</p>
              <div className="mt-4 flex items-center">
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                  {courseData.category}
                </span>
                <span className="ml-4 text-2xl font-bold text-gray-900">
                  {courseData.price === 0 ? 'Free' : `${courseData.price} soums`}
                </span>
              </div>
            </div>
            <div className="md:w-1/3">
              <img
                src={courseData.image}
                alt={courseData.name}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        <div className="py-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">About the Instructor</h2>
          <div className="mt-6 flex items-start">
            <img
              src={courseData.instructor.image}
              alt={courseData.instructor.name}
              className="h-20 w-20 rounded-full"
            />
            <div className="ml-6">
              <h3 className="text-lg font-medium text-gray-900">{courseData.instructor.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{courseData.instructor.experience}</p>
              <p className="mt-2 text-gray-600">{courseData.instructor.bio}</p>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="py-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
          <div className="mt-6 space-y-4">
            {courseData.content.map((section) => (
              <div key={section.id} className="border rounded-lg">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{section.title}</span>
                  {expandedSection === section.id ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedSection === section.id && (
                  <div className="px-4 py-3 border-t">
                    {section.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500">{lesson.type}</span>
                          <span className="ml-4 text-sm font-medium text-gray-900">
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="py-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <div className="mt-6 space-y-6">
            {courseData.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">{review.user}</p>
                  <p className="ml-auto text-sm text-gray-500">{review.date}</p>
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/courses/${id}/start`}
              className="flex-1 rounded-md bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Course
            </Link>
            <Link
              to={`/register?course=${id}`}
              className="flex-1 rounded-md bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 