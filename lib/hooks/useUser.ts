import { useState, useEffect } from 'react';

interface UserResponse {
  username: string;
  display_name: string;
  pfp_url: string;
}

export function useUser(username: string) {
  const [data, setData] = useState<UserResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        if (!username) return;
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setData(userData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { data, error, isLoading };
}
