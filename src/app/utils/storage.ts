// /app/utils/storage.ts

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
  }
  
  export const isValidUser = (data: any): data is User => {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof data.id === 'number' &&
      typeof data.username === 'string' &&
      typeof data.email === 'string' &&
      typeof data.password === 'string'
    );
  };
  
  export const getStoredUser = (): User | null => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return null;
      const parsedUser = JSON.parse(storedUser);
      return isValidUser(parsedUser) ? parsedUser : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      localStorage.removeItem('user');
      return null;
    }
  };
  
  export const setStoredUser = (user: User): void => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error);
    }
  };
  
  export const removeStoredUser = (): void => {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };
  
  export const getStoredUsers = (): User[] => {
    try {
      const storedUsers = localStorage.getItem('fakeUsers');
      if (!storedUsers) return [];
      const parsedUsers = JSON.parse(storedUsers);
      if (Array.isArray(parsedUsers) && parsedUsers.every(isValidUser)) {
        return parsedUsers;
      } else {
        console.error('fakeUsers n\'est pas un tableau valide');
        return [];
      }
    } catch (error) {
      console.error('Erreur lors du parsing de fakeUsers:', error);
      return [];
    }
  };
  
  export const setStoredUsers = (users: User[]): void => {
    try {
      localStorage.setItem('fakeUsers', JSON.stringify(users));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de fakeUsers:', error);
    }
  };
  