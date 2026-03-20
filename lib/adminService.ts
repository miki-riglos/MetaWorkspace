import { User } from '@/infrastructure/User';
import { UserStored } from '@/infrastructure/stored/UserStored';
import fs from 'fs';
import path from 'path';

class AdminService {
  private getUsers(): UserStored[] {
    const filePath = path.join(process.cwd(), '../MetaWorkspaceStore/db-admin/users.json');
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent) as UserStored[];
      } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
      }
    }
    return [];
  }

  getUser(email: string): User | null {
    const users = this.getUsers();
    const userStored = users.find(u => u.email === email);
    if (!userStored) {
      return null;
    }
    return new User(userStored);
  }
}

export const adminService = new AdminService();
