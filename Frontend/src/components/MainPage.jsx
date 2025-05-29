import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#121416]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em]">Book Manager</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link className="text-[#121416] text-sm font-medium leading-normal" to="/books">View Books</Link>
              <Link className="text-[#121416] text-sm font-medium leading-normal" to="/add-book">Add Book</Link>
            </div>
            <Link to="/books"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#dce8f3] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Manage Books</span>
            </Link>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#121416] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Welcome to Your Book Management System</h2>
            <p className="text-[#121416] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Easily view, add, and manage your book collection. Use the navigation above to get started.
            </p>
            {/* Featured Book section can be added later if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
