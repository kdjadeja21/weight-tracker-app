"use client";
import Navbar from "./navbar";
// import { auth } from "./auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Nav() {
  //   const session = await auth();
  const session = useSession();
  useEffect(() => {}, []);

  return <Navbar user={session?.data} />;
}
