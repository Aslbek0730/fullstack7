import { useState } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  { id: 'qa', title: 'Questions and Answers', icon: '❓' },
  { id: 'thoughts', title: 'Thoughts', icon: '💭' },
  { id: 'projects', title: 'Inspirational Projects', icon: '✨' },
];

const samplePosts = [
  {
    id: 1,
    section: 'qa',
    author: {
      name: 'John Doe',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    title: 'How to start with Arduino programming?',
    content: 'I want to learn Arduino programming but not sure where to start. Any recommendations for beginners?',
    likes: 15,
    comments: 8,
    date: '2024-03-15',
  },
  {
    id: 2,
    section: 'thoughts',
    author: {
      name: 'Jane Smith',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    title: 'My journey in robotics',
    content: 'Sharing my experience of building my first robot and the challenges I faced along the way.',
    likes: 23,
    comments: 12,
    date: '2024-03-14',
  },
  {
    id: 3,
    section: 'projects',
    author: {
      name: 'Mike Johnson',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    title: 'Smart Home Automation System',
    content: 'Check out my latest project - a fully automated smart home system using Raspberry Pi and various sensors.',
    likes: 45,
    comments: 15,
    date: '2024-03-13',
  },
];

export default function Forum() {
  const [selectedSection, setSelectedSection] = useState('qa');
  const [posts, setPosts] = useState(samplePosts);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const filteredPosts = posts.filter(post => post.section === selectedSection);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Forum</h1>
          <Link
            to="/forum/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create New Topic
          </Link>
        </div>

        {/* Section Tabs */}
        <div className="mb-8">
          <div className="sm:hidden">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`
                      ${
                        selectedSection === section.id
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    `}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={post.author.image}
                    alt={post.author.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {post.author.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.content}</p>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center text-gray-500 hover:text-indigo-600"
                  >
                    <svg
                      className="h-5 w-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{post.likes}</span>
                  </button>

                  <button className="flex items-center text-gray-500 hover:text-indigo-600">
                    <svg
                      className="h-5 w-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>{post.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts in this section yet.</p>
            <Link
              to="/forum/new"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Be the first to post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 