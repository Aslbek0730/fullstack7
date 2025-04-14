import { Link } from 'react-router-dom';
import { ClockIcon, UserIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function CourseCard({ course }) {
  const {
    id,
    title,
    instructor,
    level,
    duration,
    price,
    image,
    description,
  } = course;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-48">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/courses/${id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="flex flex-1 flex-col justify-end">
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <UserIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              {instructor}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <AcademicCapIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              {level}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              {duration}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              {price === 0 ? 'Free' : `$${price}`}
            </p>
            <Link
              to={`/courses/${id}`}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 