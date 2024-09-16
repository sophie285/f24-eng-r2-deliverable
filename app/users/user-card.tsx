"use client";

import type { Database } from "@/lib/schema";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function UserCard({ profiles }: { profiles: Profiles }) {
  return (
    <div className="m-4 w-72 min-w-72 flex-none overflow-hidden rounded-lg border p-4 shadow-lg">
      <h3 className="mb-1 mt-2 truncate text-xl font-semibold">{profiles.display_name}</h3>
      <h4 className="text-md truncate font-medium">{profiles.email}</h4>
      <p className="mt-2 overflow-hidden text-ellipsis whitespace-normal break-words text-sm font-light">
        {profiles.biography}
      </p>
    </div>
  );
}
