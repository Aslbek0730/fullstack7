import { useState } from 'react';
import { Link } from 'react-router-dom';

const priceFilters = [
  { id: 'all', name: 'All Books' },
  { id: 'free', name: 'Free' },
  { id: 'paid', name: 'Paid' },
  { id: 'discounted', name: 'Discounted' },
];

const books = [
  {
    id: 1,
    title: 'Python for Kids',
    author: 'Jason R. Briggs',
    image: 'https://images.unsplash.com/photo-1543002588-bfa740851ed7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 0,
    category: 'free',
    description: 'A playful introduction to programming for young innovators.',
  },
  {
    id: 2,
    title: 'Creative Problem Solving',
    author: 'Dr. Edward de Bono',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 15000,
    category: 'paid',
    description: 'Learn innovative thinking techniques and problem-solving strategies.',
  },
  {
    id: 3,
    title: 'Robotics for Beginners',
    author: 'Sarah Miller',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e0e0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 20000,
    originalPrice: 25000,
    category: 'discounted',
    description: 'A comprehensive guide to building your first robot.',
  },
  {
    id: 4,
    title: 'The Art of Innovation',
    author: 'Tom Kelley',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 0,
    category: 'free',
    description: 'Learn how to think differently and create innovative solutions.',
  },
  {
    id: 5,
    title: 'JavaScript for Young Programmers',
    author: 'Chris Minnick',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd2578d4e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 18000,
    category: 'paid',
    description: 'Start your web development journey with this beginner-friendly guide.',
  },
  {
    id: 6,
    title: 'Design Thinking for Kids',
    author: 'Emily Pilloton',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
    price: 15000,
    originalPrice: 20000,
    category: 'discounted',
    description: 'Learn how to solve problems creatively through design thinking.',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Library() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredBooks = selectedFilter === 'all'
    ? books
    : books.filter(book => book.category === selectedFilter);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Library</h2>

          {/* Price Filters */}
          <div className="mt-6 space-x-4">
            {priceFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={classNames(
                  selectedFilter === filter.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Book Grid */}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <div key={book.id} className="group relative">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    <Link to={`/library/${book.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {book.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{book.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {book.originalPrice ? (
                        <>
                          <span className="text-lg font-medium text-gray-900">
                            {book.price} soums
                          </span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            {book.originalPrice} soums
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-medium text-gray-900">
                          {book.price === 0 ? 'Free' : `${book.price} soums`}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/library/${book.id}`}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </Link>
                      {book.price === 0 ? (
                        <a
                          href="#"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Download
                        </a>
                      ) : (
                        <Link
                          to={`/register?book=${book.id}`}
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Buy
                        </Link>
                      )}
                    </div>
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