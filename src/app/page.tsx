import React from "react";
import Head from "next/head";

const LandingPage = () => {
  return (
    <div>
      <Head>
        <title>ExtSocial</title>
        <link rel='stylesheet' href='/path/to/tailwind.css' />
      </Head>
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <div className='text-center'>
          <h1 className='text-5xl font-extrabold text-white mb-8'>
            ExtSocial{" "}
          </h1>
          <div className='flex flex-col items-center space-y-4'>
            <a
              href='/register'
              className='btn-primary flex items-center justify-center w-36 p-4 bg-gray-700 hover:bg-slate-500 rounded-full transition-colors duration-300'>
              <span className='mr-2 text-white'>Join Now</span>
              <span role='img' aria-label='Party Popper'>
                🎉
              </span>
            </a>
            <a
              href='/login'
              className='btn-secondary flex items-center justify-center w-32 p-4 bg-gray-700 hover:bg-slate-500 rounded-full transition-colors duration-300'>
              <span className='mr-2 text-white'>Sign In</span>
              <span role='img' aria-label='Key'>
                🔑
              </span>
            </a>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 right-0 py-4 bg-gray-700 text-center'>
          <p className='text-gray-500 text-sm'>
            &copy; {new Date().getFullYear()} ExtSocial. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
