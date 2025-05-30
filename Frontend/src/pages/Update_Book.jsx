import { useState } from "react";
import Spinner from '../components/Spinner';
import { launchFirework } from '/public/fireworks';
import AppBar from '../components/AppBar'; // Import AppBar
import Footer from '../components/Footer'; // Import Footer


function BookUpdate(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  console.log(props.id)

  const handleFirework = (e) => {
    const { clientX: x, clientY: y } = e;
    setCount(prev=>prev+1)
    if (count==9){
      launchFirework(x, y);
    }
  };

  const generateImage = async () => {
    if (!apiKey || !title) return;

    setLoading(true);
    setImageUrl("");

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: title,
          size: "1024x1024",
        }),
      });

      const data = await response.json();
      const url = data?.data?.[0]?.url;
      if (url) setImageUrl(url);
    } catch (err) {
      console.error("Image generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  const BackPage = () => {
    /* Cancel 버튼 눌렀을 때 이전 화면으로 돌아가는 코드 */
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Replace existing header with AppBar */}
        <AppBar
          // You might need to pass props to AppBar here if it needs to display
          // navigation, search, or other dynamic content relevant to this page.
          // For example, if you want the "Book Manager" title or "Home", "Books" links
          // to be managed by AppBar.
          // The firework button functionality can also be passed as a prop if AppBar should handle it.
          // For now, I'm assuming AppBar will handle its own internal navigation/branding.
        />


        <div className="flex flex-1 px-10 md:px-20 py-10 gap-10 min-h-[600px] flex-col md:flex-row">
          <div className="flex-grow min-w-[300px]">
            <div className="flex items-center mb-6 gap-2">
              <p className="text-[32px] font-bold text-[#111418]">Update Book</p>
              <div className="relative group cursor-pointer flex-shrink-0">
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white shadow-sm flex items-center justify-center text-gray-500 group-hover:text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21 16.545 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.455 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 rounded-md bg-gray-800 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                  제목, 소개 글, api키, 이미지 생성이 모두 완료되면 도서 추가 버튼이 활성화 됩니다다
                </div>
              </div>
            </div>

            <div className="pt-7 space-y-6">
              <label className="flex flex-col">
                <p className="text-base font-medium text-left pb-2">Title</p>
                <div className="relative">
                  <input
                    placeholder="Enter book title"
                    className="form-input w-full rounded-xl border border-[#dbe0e6] bg-white h-14 p-4 pr-12 text-base"
                    value={title}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input.length <= 20) setTitle(input);
                    }}
                  />
                  <span className="absolute top-1 right-3 text-xs text-gray-500">
                    {title.length}/20
                  </span>
                </div>
              </label>

              <label className="flex flex-col">
                <p className="text-base font-medium text-left pb-2">Contents</p>
                <div className="relative">
                  <textarea
                    placeholder="Enter contents"
                    className="form-input w-full rounded-xl border border-[#dbe0e6] bg-white min-h-[170px] p-4 text-base resize-none"
                    value={content}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input.length <= 500) setContent(input);
                    }}
                  />
                  <span className="absolute top-1 right-3 text-xs text-gray-500">
                    {content.length}/500
                  </span>
                </div>

              </label>

              <label className="flex flex-col">
                <p className="text-base font-medium text-left pb-2">API Key (for cover image)</p>
                <input
                  type="password"
                  placeholder="Enter API key"
                  className="form-input w-full rounded-xl border border-[#dbe0e6] bg-white h-14 p-4 text-base"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  onClick={BackPage}
                  className="h-10 px-4 font-bold rounded-xl text-sm border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // DB에 들어갈 내용용
                    console.log({ title, content, apiKey, imageUrl });
                  }}
                  disabled={!title || !content || !apiKey || !imageUrl}
                  className={`h-10 px-4 font-bold rounded-xl text-sm ${
                    !title || !content || !apiKey || !imageUrl
                      ? "bg-[#0c7ff2]/50 cursor-not-allowed text-white"
                      : "bg-[#0c7ff2] text-white"
                  }`}
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>

          <div className="flex-none w-full max-w-[400px] flex flex-col items-center justify-start mt-10 md:mt-0">
            <div className="flex items-center mb-6 gap-2">
              <p className="text-[32px] font-bold text-[#111418]">Cover Preview</p>
              <div className="relative group cursor-pointer flex-shrink-0">
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white shadow-sm flex items-center justify-center text-gray-500 group-hover:text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21 16.545 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.455 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 rounded-md bg-gray-800 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg text-center">
                  제목과 API 키 입력 후 'Generate Image' 버튼을 클릭 해 커버 이미지를 생성할 수 있습니다.
                </div>
              </div>
            </div>

            <button
              onClick={generateImage}
              disabled={loading || !apiKey || !title}
              className="mb-4 px-6 py-2 bg-[#0c7ff2] text-white rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner />
                  Generating...
                </div>
              ) : (
                "Generate Image"
              )}
            </button>

            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated cover"
                className="w-full max-w-[400px] h-[400px] rounded-xl border object-cover"
              />
            ) : (
              <div className="w-full max-w-[400px] h-[400px] rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-[#60758a] text-sm">
                No image generated
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add Footer component */}
      <Footer />
    </div>
  );
}

export default BookUpdate;