'use client';

import { useEffect, useState } from 'react';
import { createApiServer } from '../utils/apiServer'; // Adjust the path as needed
import { useSession } from 'next-auth/react';

type User = {
  id: number;
  username: string;
  role: string;
  partnerId: number;
  isActive: boolean;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!session?.accessToken) return;
      try {
        const client = createApiServer(session.accessToken);
        const res = await client.get('/user/list');
        setUsers(res.data.data); // pastikan sesuai struktur: { data: [...] }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Failed to fetch user list');
      }
    };

    fetchUsers();
  }, [session?.accessToken]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-2 rounded bg-gray-100">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Partner ID:</strong> {user.partnerId}</p>
              <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
