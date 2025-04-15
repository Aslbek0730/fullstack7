import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import styles from './AIAssistant.module.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const getContext = () => {
    const pageContext = {
      '/courses': {
        student: 'Kurslar sahifasi - o'quvchi uchun',
        teacher: 'Kurslar sahifasi - o'qituvchi uchun',
        admin: 'Kurslar sahifasi - administrator uchun'
      },
      '/tests': {
        student: 'Testlar sahifasi - o'quvchi uchun',
        teacher: 'Testlar sahifasi - o'qituvchi uchun',
        admin: 'Testlar sahifasi - administrator uchun'
      },
      '/library': {
        student: 'Kutubxona sahifasi - o'quvchi uchun',
        teacher: 'Kutubxona sahifasi - o'qituvchi uchun',
        admin: 'Kutubxona sahifasi - administrator uchun'
      },
      '/forum': {
        student: 'Forum sahifasi - o'quvchi uchun',
        teacher: 'Forum sahifasi - o'qituvchi uchun',
        admin: 'Forum sahifasi - administrator uchun'
      }
    };

    return pageContext[location.pathname]?.[user.role] || 'Umumiy sahifa';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/ai/assist/', {
        user_id: user.id,
        role: user.role,
        current_page: location.pathname,
        context: getContext(),
        permissions: user.permissions,
        query: question
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setAnswer(response.data.reply);
    } catch (error) {
      console.error('Error:', error);
      setAnswer('Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className={styles.assistantButton}
        onClick={() => setIsOpen(true)}
        aria-label="AI Yordamchi"
      >
        <svg
          className={styles.assistantIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>AI Yordamchi</h2>
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Yopish"
              >
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <form onSubmit={handleSubmit}>
                <textarea
                  className={styles.questionInput}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={`Savolingizni yozing... (${getContext()})`}
                  rows="4"
                />
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading || !question.trim()}
                >
                  {isLoading ? 'Javob kutilmoqda...' : 'Yuborish'}
                </button>
              </form>
              {answer && (
                <div className={styles.answer}>
                  <h3>Javob:</h3>
                  <p>{answer}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant; 