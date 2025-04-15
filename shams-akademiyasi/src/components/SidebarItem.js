import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';
import { useUser } from '../contexts/UserContext';

const SidebarItem = ({ icon: Icon, label, path, roles }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  // Check if the current user's role has access to this item
  if (!roles.includes(user.role)) {
    return null;
  }

  const isActive = location.pathname === path;

  return (
    <div
      className={`${styles.sidebarItem} ${isActive ? styles.active : ''}`}
      onClick={() => navigate(path)}
      title={label}
    >
      <Icon className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </div>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SidebarItem; 