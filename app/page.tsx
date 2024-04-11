"use client";
import WeightChart from "./WeightChart/WeightChart";
import Nav from "./nav";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  return (
    <>
      <Provider store={store}>
        <Toaster />
        {session.status === "authenticated" && (
          <Suspense>
            <Nav />
          </Suspense>
        )}
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
          <WeightChart />
        </main>
        {children}
      </Provider>
    </>
  );
}
