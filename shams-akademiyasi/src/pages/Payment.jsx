import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const paymentMethods = [
  { id: 'payme', name: 'Payme', icon: 'https://payme.uz/assets/logo.svg' },
  { id: 'click', name: 'Click', icon: 'https://click.uz/assets/logo.svg' },
  { id: 'uzum', name: 'Uzum', icon: 'https://uzum.uz/assets/logo.svg' },
];

// Sample product data - in a real app, this would come from an API
const products = {
  course: {
    id: 1,
    type: 'course',
    name: 'Introduction to Robotics',
    price: 10000,
  },
  book: {
    id: 2,
    type: 'book',
    name: 'Python for Kids',
    price: 15000,
  },
};

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get product details from URL parameters
  const productId = new URLSearchParams(location.search).get('id');
  const productType = new URLSearchParams(location.search).get('type');
  const product = products[productType];

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(\d{2})/, '$1/$2');
    setExpiryDate(formattedValue);
  };

  if (isSuccess) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Payment Successful!
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              You have successfully registered for {product.name}
            </p>
            <div className="mt-8">
              <button
                onClick={() => navigate('/')}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
          </div>

          {/* Product Details */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {product.price} soums
            </p>
          </div>

          {/* Payment Methods */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Payment Method
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 rounded-lg border ${
                    selectedMethod === method.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={method.icon}
                    alt={method.name}
                    className="h-8 mx-auto"
                  />
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    {method.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Card Form */}
          {selectedMethod && (
            <form onSubmit={handlePayment} className="bg-white shadow rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry-date"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      maxLength={5}
                      placeholder="MM/YY"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      maxLength={3}
                      placeholder="123"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isProcessing || !cardNumber || !expiryDate || !cvv}
                  className={`w-full rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm ${
                    isProcessing || !cardNumber || !expiryDate || !cvv
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 