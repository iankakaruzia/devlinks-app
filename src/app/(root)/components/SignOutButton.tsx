"use client";

import { useAuth } from "@clerk/nextjs";

export function SignOutButton() {
  const { signOut } = useAuth();

  function handleSignOut() {
    void signOut();
  }

  return (
    <button onClick={handleSignOut} aria-label="Logout" className="group p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          className="fill-purple-600 transition-colors group-hover:fill-purple-600/70"
          fillRule="evenodd"
          d="M571.4 125.35l5.258-4.602a1 1 0 000-1.505l-5.29-4.629a1 1 0 00-1.369.048l-.005.005a.9.9 0 00.038 1.304l3.372 3.025h-13.402a1 1 0 100 2h13.402l-3.327 2.882a.969.969 0 00-.083 1.384l.007.007a1 1 0 001.399.08zM568.006 113a1 1 0 01-1-1v-2H556a1 1 0 00-1 1v18a1 1 0 001 1h11.005v-2a1 1 0 112 0v2c-.006 1-1.006 2-2 2H555c-1 0-2.001-1-2.001-2v-20c0-1 1-2 2-2h12c1 0 2 1.02 2 2l.004 2a.998.998 0 01-.996 1h-.002z"
          transform="translate(-553 -108)"
        ></path>
      </svg>
    </button>
  );
}
