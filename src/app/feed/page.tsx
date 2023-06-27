"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Feed from "@/components/Feed";
import Footer from "@/components/Footer";

function FeedPage() {
  return (
    <div className='bg-gray-950'>
      <Navbar />
      <Feed />
      <Footer />
    </div>
  );
}

export default FeedPage;
