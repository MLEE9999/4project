import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const DeleteBookComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    // Add logic to handle book deletion (e.g., API call)
    console.log(`Delete book with id: ${id}`);
    // For now, just navigate to the books page
    navigate('/books');
  };

  const handleCancel = () => {
    navigate(`/books/${id}`); // Or navigate back, or to /books
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Book Manager</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link className="text-[#111418] text-sm font-medium leading-normal" to="/">Dashboard</Link>
              <Link className="text-[#111418] text-sm font-medium leading-normal" to="/books">Books</Link>
              {/* <Link className="text-[#111418] text-sm font-medium leading-normal" to="/authors">Authors</Link> */}
            </div>
            {/* Notification and User Profile icons can be added later */}
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Are you sure you want to delete this book?</h2>
            <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              This action cannot be undone. Deleting this book will permanently remove it from your library.
            </p>
            <div className="flex justify-center">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                <button
                  onClick={handleCancel}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] grow"
                >
                  <span className="truncate">Cancel</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#dc2626] text-white text-sm font-bold leading-normal tracking-[0.015em] grow"
                >
                  <span className="truncate">Confirm Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookComponent;
