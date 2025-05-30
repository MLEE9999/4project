import { useNavigate, useParams } from 'react-router-dom'
import React from 'react';
import AppBar from '../components/AppBar'; // Import AppBar
import Footer from '../components/Footer'; // Import Footer

function BookDetail() {
  const navigate = useNavigate()

  const handleDeleteClick = () => {
    navigate(`/books/delete`)
  }

  return (
    <>
      {/* These link tags are generally better placed in the public/index.html or equivalent */}
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
      <link
        rel="stylesheet"
        as="style"
        onLoad="this.rel='stylesheet'"
        href="https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans%3Awght%40400%3B500%3B700%3B900&family=Plus+Jakarta+Sans%3Awght%40400%3B500%3B700%3B800"
      />
      <title>Stitch Design</title>
      <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />

      <div
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          {/* Replace existing header with AppBar */}
          <AppBar
            // You might want to pass props to your AppBar component
            // For example, if AppBar needs to know the current active navigation link,
            // or if it has a bell icon that needs a specific handler.
          />

          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-wrap gap-2 p-4">
                <a
                  className="text-[#60758a] text-base font-medium leading-normal"
                  href="#"
                >
                  Books
                </a>
                <span className="text-[#60758a] text-base font-medium leading-normal">
                  /
                </span>
                <span className="text-[#111418] text-base font-medium leading-normal">
                  The Silent Observer
                </span>
              </div>
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">
                    The Silent Observer
                  </p>
                  <p className="text-[#60758a] text-sm font-normal leading-normal">
                    By Amelia Stone
                  </p>
                </div>
              </div>
              <div className="p-4 @container">
                <div className="flex flex-col items-stretch justify-start rounded-xl @xl:flex-row @xl:items-start">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrE8vdBhVdMTLOxyzJTbgISuSuY7oU7sGKyrXjyoBPlV9vDZzGvLYTQ_kZ1H3xytp5Gj_Z0gfhgShhsGyR40v_7MpQEkUt9pAfc28BPTA7UTSldohJtFfQg8dCANP6SSzgsTZh_GSD42toZf5KqwF7jP9PahBhD_gEf8HBolrcFaWs4urzOTi5Y2NdZktdtOlYRtVzUfe4tOHjs4hSYBqhP_InpGreGL-QjCoQqghhKIDnjsJMb4AQG_u4Q3spgtpoWNBmJfvpeHBx")'
                    }}
                  />
                  <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
                    <p className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
                      The Silent Observer
                    </p>
                    <div className="flex items-end gap-3 justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-[#60758a] text-base font-normal leading-normal">
                          A gripping tale of suspense and intrigue, where a
                          reclusive observer becomes entangled in a web of secrets
                          and danger.
                        </p>
                        <p className="text-[#60758a] text-base font-normal leading-normal">
                          Mystery
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-stretch">
                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Edit</span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Create Cover</span>
                  </button>
                  <button onClick={handleDeleteClick}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add Footer component */}
        <Footer />
      </div>
    </>
  )
}

export default BookDetail