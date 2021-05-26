import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const Navbar = () => {
  const { user, isLoading } = useUser();

  return (
    <nav className="flex justify-between items-center">
      <p className="text-2xl font-bold text-gray-800">My Todos</p>
      <div className="flex">
        {!isLoading && !user && (
          <Link href="/api/auth/login">
            <a className="rounded bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
              Login
            </a>
          </Link>
        )}
        {user && (
          <div className="flex items-center space-x-2">
            <img src={user.picture} className="h-8 w-8 rounded-full" />
            <p>{user.name}</p>
            <Link href="/api/auth/logout">
              <a className="rounded bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                Logout
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
