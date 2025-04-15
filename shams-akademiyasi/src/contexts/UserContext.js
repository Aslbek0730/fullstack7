import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: 'student', // Default role
    isAuthenticated: false,
    name: '',
    permissions: {
      canViewCourses: true,
      canTakeTests: true,
      canAccessLibrary: true,
      canUseForum: true,
      canCreateCourses: false,
      canCreateTests: false,
      canManageUsers: false,
      canViewStatistics: false,
    }
  });

  const updatePermissions = (role) => {
    const permissions = {
      student: {
        canViewCourses: true,
        canTakeTests: true,
        canAccessLibrary: true,
        canUseForum: true,
        canCreateCourses: false,
        canCreateTests: false,
        canManageUsers: false,
        canViewStatistics: false,
      },
      teacher: {
        canViewCourses: true,
        canTakeTests: true,
        canAccessLibrary: true,
        canUseForum: true,
        canCreateCourses: true,
        canCreateTests: true,
        canManageUsers: false,
        canViewStatistics: true,
      },
      admin: {
        canViewCourses: true,
        canTakeTests: true,
        canAccessLibrary: true,
        canUseForum: true,
        canCreateCourses: true,
        canCreateTests: true,
        canManageUsers: true,
        canViewStatistics: true,
      }
    };
    return permissions[role] || permissions.student;
  };

  const login = (userData) => {
    const permissions = updatePermissions(userData.role);
    setUser({
      ...userData,
      isAuthenticated: true,
      permissions
    });
  };

  const logout = () => {
    setUser({
      role: 'student',
      isAuthenticated: false,
      name: '',
      permissions: updatePermissions('student')
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 