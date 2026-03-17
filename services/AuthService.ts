import { UserStub } from '@/metadata/User';
import { User } from '@/client-metadata/User';

export class AuthService {
  static async login(email: string): Promise<User> {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Authentication failed');
    }

    const stub: UserStub = await response.json();
    return new User(stub);
  }
}
