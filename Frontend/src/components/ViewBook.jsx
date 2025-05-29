import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ViewBook = () => {
  const { id } = useParams();
  // Sample data - replace with actual data fetching later
  const books = [
    { id: 1, title: 'The Secret Garden', author: 'Frances Hodgson Burnett', genre: "Children's Literature", publishedDate: '1911-06-15', description: "A classic children's novel about a young girl who discovers a hidden garden.", imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAyhIpNiknH759B7YAZ5OMWRw4bXXY8gpgcNvDnjj6ZhqqJvUoP8rhVJDK5nEOXUmBfyCYb0j3hAFQtD6uYyGmIQMv7IbDdruA4uWTRwDzCo2mJLmkJXDBdRiokWidCjbO-CBHFZV_rQ0UzTev3EMYlUm7HXWhGEkRwE9NtjNeUuCQFmiq6Jkxv2b3yYGBmJ3z3PwdjdnCVf0koMuHxsEKzbKM3i8drwtRqKxPN40h4sFu3nMxJeKNvOckEFKoZQ4tPq_72OGjz-eE" },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', publishedDate: '1813-01-28', description: "A beloved classic about love, marriage, and social class in 19th-century England.", imageUrl: 'https://example.com/pride_and_prejudice.jpg' }, // Replace with actual image URL
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Southern Gothic', publishedDate: '1960-07-11', description: "A powerful story about racial injustice and loss of innocence in the American South.", imageUrl: 'https://example.com/to_kill_a_mockingbird.jpg' }, // Replace with actual image URL
    { id: 4, title: '1984', author: 'George Orwell', genre: 'Dystopian', publishedDate: '1949-06-08', description: "A chilling vision of a totalitarian future where independent thought is suppressed.", imageUrl: 'https://example.com/1984.jpg' }, // Replace with actual image URL
    { id: 5, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Tragedy', publishedDate: '1925-04-10', description: "A tragic tale of wealth, love, and the American Dream in the Roaring Twenties.", imageUrl: 'https://example.com/the_great_gatsby.jpg' }, // Replace with actual image URL
    { id: 6, title: 'The Silent Observer', author: 'Amelia Stone', description: 'A gripping tale of suspense and intrigue, where a reclusive observer becomes entangled in a web of secrets and danger.', genre: 'Mystery', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrE8vdBhVdMTLOxyzJTbgISuSuY7oU7sGKyrXjyoBPlV9vDZzGvLYTQ_kZ1H3xytp5Gj_Z0gfhgShhsGyR40v_7MpQEkUt9pAfc28BPTA7UTSldohJtFfQg8dCANP6SSzgsTZh_GSD42toZf5KqwF7jP9PahBhD_gEf8HBolrcFaWs4urzOTi5Y2NdZktdtOlYRtVzUfe4tOHjs4hSYBqhP_InpGreGL-QjCoQqghhKIDnjsJMb4AQG_u4Q3spgtpoWNBmJfvpeHBx' }
  ];

  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
                {/* Updated SVG Icon from Yiew_boook.html */}
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
              <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Book Manager</h2> {/* Kept as Book Manager for consistency */}
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link className="text-[#111418] text-sm font-medium leading-normal" to="/">Home</Link>
              <Link className="text-[#111418] text-sm font-medium leading-normal" to="/books">Books</Link>
              {/* Add links for Authors and Genres if these pages are created later */}
            </div>
            {/* Notification and User Profile icons can be added later */}
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4">
              <Link className="text-[#60758a] text-base font-medium leading-normal" to="/books">Books</Link>
              <span className="text-[#60758a] text-base font-medium leading-normal">/</span>
              <span className="text-[#111418] text-base font-medium leading-normal">{book.title}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">{book.title}</p>
                <p className="text-[#60758a] text-sm font-normal leading-normal">By {book.author}</p>
              </div>
            </div>
            <div className="p-4 @container">
              <div className="flex flex-col items-stretch justify-start rounded-xl @xl:flex-row @xl:items-start">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{ backgroundImage: `url("${book.imageUrl}")` }}
                ></div>
                <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
                  <p className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">{book.title}</p>
                  <div className="flex items-end gap-3 justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-[#60758a] text-base font-normal leading-normal">
                        {book.description}
                      </p>
                      <p className="text-[#60758a] text-base font-normal leading-normal">{book.genre}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                <Link to={`/edit-book/${book.id}`}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Edit</span>
                </Link>
                <Link to={`/delete-book/${book.id}`}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Delete</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
