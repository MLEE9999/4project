import React from 'react';
import { Link } from 'react-router-dom';

const AllBooks = () => {
  // Sample data - replace with actual data fetching later
  const books = [
    { id: 1, title: 'The Secret Garden', author: 'Frances Hodgson Burnett', genre: "Children's Literature", publishedDate: '1911-06-15' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', publishedDate: '1813-01-28' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Southern Gothic', publishedDate: '1960-07-11' },
    { id: 4, title: '1984', author: 'George Orwell', genre: 'Dystopian', publishedDate: '1949-06-08' },
    { id: 5, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Tragedy', publishedDate: '1925-04-10' },
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-8">
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
            <div className="flex items-center gap-9">
              <Link className="text-[#111418] text-sm font-medium leading-normal" to="/">Home</Link>
              {/* Add links for Authors and Genres if these pages are created later */}
              {/* <Link className="text-[#111418] text-sm font-medium leading-normal" to="/authors">Authors</Link> */}
              {/* <Link className="text-[#111418] text-sm font-medium leading-normal" to="/genres">Genres</Link> */}
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <input
                  placeholder="Search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                />
              </div>
            </label>
            <Link to="/add-book"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Add Book</span>
            </Link>
            {/* User profile icon can be added later */}
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">All Books</p>
                <p className="text-[#60758a] text-sm font-normal leading-normal">Manage your collection of books.</p>
              </div>
            </div>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe0e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Title</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Author</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Genre</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Published Date
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-60 text-[#60758a] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id} className="border-t border-t-[#dbe0e6]">
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                          {book.title}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                          {book.author}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                          {book.genre}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                          {book.publishedDate}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-60 text-[#60758a] text-sm font-bold leading-normal tracking-[0.015em]">
                          <Link to={`/books/${book.id}`} className="mr-2">View</Link>
                          <Link to={`/edit-book/${book.id}`} className="mr-2">Edit</Link>
                          <Link to={`/delete-book/${book.id}`}>Delete</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
