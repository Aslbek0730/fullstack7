import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LightBulbIcon,
  UserGroupIcon,
  BeakerIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const advantages = [
  {
    name: 'Innovative approach',
    description: 'Cutting-edge teaching methods that foster creativity and problem-solving skills',
    icon: LightBulbIcon,
  },
  {
    name: 'Live training with teachers',
    description: 'Interactive sessions with experienced instructors who guide you every step of the way',
    icon: UserGroupIcon,
  },
  {
    name: 'Practical tasks',
    description: 'Hands-on projects and real-world applications to reinforce learning',
    icon: BeakerIcon,
  },
  {
    name: 'Inspiration for inventors',
    description: 'Encouraging young minds to think outside the box and create innovative solutions',
    icon: SparklesIcon,
  },
];

const popularCourses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with Python',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd2578d4e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    title: 'Robotics for Beginners',
    description: 'Build your first robot and learn basic electronics',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e0e0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    title: '3D Design Fundamentals',
    description: 'Create your first 3D models and learn design principles',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244a32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
  },
];

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    course: 'Introduction to Programming',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'The course was amazing! I learned so much about programming and now I can create my own simple applications.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    course: 'Robotics for Beginners',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'Building my first robot was an incredible experience. The instructors were very supportive and knowledgeable.',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    course: '3D Design Fundamentals',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'I never thought I could create 3D models, but this course made it so easy to understand and fun to learn!',
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                We are shaping an inventive generation!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Interactive courses, with practical exercises and creative thinking methods
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/courses"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View courses
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none"
            >
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
                alt="Students working on a project"
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Platform Advantages */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Why Choose Us
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to become an inventor
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {advantages.map((advantage) => (
                <div key={advantage.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <advantage.icon
                      className="h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {advantage.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{advantage.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Popular Courses */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Courses
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Start your learning journey with our most popular courses
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {popularCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col items-start justify-between"
              >
                <div className="relative w-full">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime="2020-03-16" className="text-gray-500">
                      Mar 16, 2020
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link to={`/courses/${course.id}`}>
                        <span className="absolute inset-0" />
                        {course.title}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {course.description}
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link
                      to={`/courses/${course.id}`}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Start Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Reviews */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Hear from our students about their learning experience
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col items-start justify-between"
              >
                <div className="relative w-full">
                  <div className="flex items-center gap-x-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="h-12 w-12 rounded-full bg-gray-100"
                    />
                    <div>
                      <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        {review.name}
                      </h3>
                      <p className="text-sm text-indigo-600">{review.course}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 