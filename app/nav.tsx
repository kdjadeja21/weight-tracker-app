"use client";
import Navbar from "./navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Nav() {
  const { data: session } = useSession();

  useEffect(() => {}, []);

  return <Navbar user={session} />;
}
