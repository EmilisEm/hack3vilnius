'use client'

import { Header } from "../components/header";
import HomePage from "../components/home-page";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden">
        <HomePage />
      </div>
    </div>
  );
}
