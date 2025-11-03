
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Business';
  status: 'Active' | 'Inactive';
  createdAt: Date;
}

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUser: (id: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  // Load users from localStorage and convert format
  const loadUsers = () => {
    const savedUsers = localStorage.getItem('ZCard_users');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      const formattedUsers = parsedUsers.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan || 'Free',
        status: user.status || 'Active',
        createdAt: new Date(user.createdAt)
      }));
      setUsers(formattedUsers);
    }
  };

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Listen for user data changes from other parts of the app
  useEffect(() => {
    const handleUserDataChange = () => {
      loadUsers();
    };

    window.addEventListener('userDataChanged', handleUserDataChange);
    return () => window.removeEventListener('userDataChanged', handleUserDataChange);
  }, []);

  // Save users to localStorage whenever users changes
  useEffect(() => {
    if (users.length >= 0) {
      const savedUsers = localStorage.getItem('ZCard_users');
      const existingUsers = savedUsers ? JSON.parse(savedUsers) : [];
      
      // Update the stored users while preserving passwords
      const updatedUsers = users.map(user => {
        const existingUser = existingUsers.find((u: any) => u.id === user.id);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: existingUser?.password || 'defaultPassword123', // Keep existing password or set default
          plan: user.plan,
          status: user.status,
          createdAt: user.createdAt.toISOString()
        };
      });
      
      localStorage.setItem('ZCard_users', JSON.stringify(updatedUsers));
    }
  }, [users]);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    // Add to localStorage directly with password
    const savedUsers = localStorage.getItem('ZCard_users');
    const existingUsers = savedUsers ? JSON.parse(savedUsers) : [];
    
    const newUserWithPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: 'admin123', // Default password for admin-created users
      plan: newUser.plan,
      status: newUser.status,
      createdAt: newUser.createdAt.toISOString()
    };
    
    existingUsers.push(newUserWithPassword);
    localStorage.setItem('ZCard_users', JSON.stringify(existingUsers));
    
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updatedData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updatedData } : user
    ));
  };

  const deleteUser = (id: string) => {
    // Remove from localStorage
    const savedUsers = localStorage.getItem('ZCard_users');
    if (savedUsers) {
      const existingUsers = JSON.parse(savedUsers);
      const filteredUsers = existingUsers.filter((u: any) => u.id !== id);
      localStorage.setItem('ZCard_users', JSON.stringify(filteredUsers));
    }
    
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const getUser = (id: string) => {
    return users.find(user => user.id === id);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
