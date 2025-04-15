import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import styles from './Sidebar.module.css';

// Import icons
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as CoursesIcon } from '../assets/icons/courses.svg';
import { ReactComponent as TestsIcon } from '../assets/icons/tests.svg';
import { ReactComponent as LibraryIcon } from '../assets/icons/library.svg';
import { ReactComponent as ForumIcon } from '../assets/icons/forum.svg';
import { ReactComponent as AssistantIcon } from '../assets/icons/assistant.svg';
import { ReactComponent as ProfileIcon } from '../assets/icons/profile.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ReactComponent as CreateCourseIcon } from '../assets/icons/create-course.svg';
import { ReactComponent as CreateTestIcon } from '../assets/icons/create-test.svg';
import { ReactComponent as StatisticsIcon } from '../assets/icons/statistics.svg';
import { ReactComponent as UsersIcon } from '../assets/icons/users.svg';

const Sidebar = ({ menuItems, onItemClick }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(!isMobile);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item.label);
    }
    navigate(item.path);
  };

  const getMenuItems = () => {
    const items = [
      {
        icon: HomeIcon,
        label: 'Bosh sahifa',
        path: '/',
        permission: 'canViewCourses'
      },
      {
        icon: CoursesIcon,
        label: 'Kurslar',
        path: '/courses',
        permission: 'canViewCourses'
      },
      {
        icon: TestsIcon,
        label: 'Testlar',
        path: '/tests',
        permission: 'canTakeTests'
      },
      {
        icon: LibraryIcon,
        label: 'Kutubxona',
        path: '/library',
        permission: 'canAccessLibrary'
      },
      {
        icon: ForumIcon,
        label: 'Forum',
        path: '/forum',
        permission: 'canUseForum'
      },
      {
        icon: AssistantIcon,
        label: 'AI Yordamchi',
        path: '/assistant',
        permission: 'canViewCourses'
      }
    ];

    // Add teacher-specific items
    if (user.permissions.canCreateCourses) {
      items.push({
        icon: CreateCourseIcon,
        label: 'Kurs Yaratish',
        path: '/create-course',
        permission: 'canCreateCourses'
      });
    }

    if (user.permissions.canCreateTests) {
      items.push({
        icon: CreateTestIcon,
        label: 'Test Yaratish',
        path: '/create-test',
        permission: 'canCreateTests'
      });
    }

    // Add admin-specific items
    if (user.permissions.canViewStatistics) {
      items.push({
        icon: StatisticsIcon,
        label: 'Statistika',
        path: '/statistics',
        permission: 'canViewStatistics'
      });
    }

    if (user.permissions.canManageUsers) {
      items.push({
        icon: UsersIcon,
        label: 'Foydalanuvchilar',
        path: '/users',
        permission: 'canManageUsers'
      });
    }

    // Add common items
    items.push(
      {
        icon: ProfileIcon,
        label: 'Profilim',
        path: '/profile',
        permission: 'canViewCourses'
      },
      {
        icon: LogoutIcon,
        label: 'Chiqish',
        path: '/logout',
        permission: 'canViewCourses'
      }
    );

    return items.filter(item => user.permissions[item.permission]);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          {getMenuItems().map((item) => (
            <div
              key={item.path}
              className={`${styles.sidebarItem} ${
                location.pathname === item.path ? styles.active : ''
              }`}
              onClick={() => handleItemClick(item)}
              title={item.label}
            >
              <item.icon className={styles.icon} />
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      {isMobile && (
        <button 
          className={styles.hamburger} 
          onClick={toggleSidebar}
          aria-label="Menyuni ochish/yopish"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}
    </>
  );
};

export default Sidebar; 