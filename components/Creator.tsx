'use client';
import { useUser } from '@/lib/hooks/useUser';

export default function Creator({ username }: { username: string }) {
  const { data: user } = useUser(username);
  return (
    <div className="flex gap-1 items-center text-sm">
      <span className="pr-1">Creator</span>
      <img
        src={user?.pfp_url || '/logos/pfp.png'}
        alt="Higher"
        className="rounded-full w-5 h-5"
      />
      <span className="flex">@{username}</span>
    </div>
  );
}
