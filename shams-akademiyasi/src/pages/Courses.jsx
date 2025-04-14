import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'beginners', name: 'Beginners' },
  { id: 'practical', name: 'Practical Inventions' },
  { id: 'coding', name: 'Coding Basics' },
  { id: 'thinking', name: 'Thinking' },
];

const courses = [
  {
    id: 1,
    name: 'Introduction to Robotics',
    category: 'beginners',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e0e0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 10000,
    instructor: 'Abdulla',
    description: 'Robotni asosiy qismlarini organish va birinchi robotni qollab-quvvatlanuvchi dasturlarni yozish.',
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 2,
    name: 'Creative Problem Solving',
    category: 'thinking',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
    price: 0,
    instructor: 'Saddulla',
    description: 'Creative thinking skills va innovativ masalalarni yechish texnikalarini olish.',
    rating: 4.9,
    reviews: 95,
  },
  {
    id: 3,
    name: 'Python Programming for Kids',
    category: 'coding',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd2578d4e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 10000,
    instructor: 'Gaybulla',
    description: 'Python dasturlash tilini olish va uning asosiy tushunchalarini olish.',
    rating: 4.7,
    reviews: 150,
  },
  {
    id: 4,
    name: 'DIY Electronics Projects',
    category: 'practical',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244a32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
    price: 10000,
    instructor: 'Zokir',
    description: 'Elektronika asoslarini olish va ozini yaratish.',
    rating: 4.6,
    reviews: 85,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Bizning kurslarimiz</h2>

          {/* Category Filters */}
          <div className="mt-6 space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={classNames(
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="group relative">
                <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link to={`/courses/${course.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {course.name}
                      </Link>
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {course.price === 0 ? 'Free' : `${course.price} soums`}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{course.instructor}</p>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            course.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-2 text-sm text-gray-500">
                      {course.rating} ({course.reviews} reviews)
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      View Course
                    </Link>
                    <Link
                      to={`/register?course=${course.id}`}
                      className="flex-1 rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 