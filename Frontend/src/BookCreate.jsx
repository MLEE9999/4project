import { useState } from "react";

function BookCreate() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2183 14.2173 24 4Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Book Manager</h2>
          </div>
        </header>

        {/* Main */}
        <div className="flex flex-1 px-20 py-10 gap-10">
          {/* Left: Book Input Form */}
          <div className="w-1/2">
            <p className="text-[32px] font-bold mb-6 text-[#111418]">Add New Book</p>
            <div className="space-y-6">
              {/* Title */}
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Title</p>
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
                  <span className="absolute top-1 right-3 text-xs text-gray-500">{title.length}/20</span>
                </div>
              </label>

              {/* Author */}
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Author</p>
                <input
                  placeholder="Enter author's name"
                  className="form-input w-full rounded-xl border border-[#dbe0e6] bg-white h-14 p-4 text-base"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </label>

              {/* API Key */}
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">API Key (for cover image)</p>
                <input
                  type="password"
                  placeholder="Enter API key"
                  className="form-input w-full rounded-xl border border-[#dbe0e6] bg-white h-14 p-4 text-base"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </label>

              {/* Add Book Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    // 여기서 title, author, apiKey 전달 가능
                    console.log(title, author, apiKey);
                  }}
                  className="h-10 px-4 bg-[#0c7ff2] text-white font-bold rounded-xl text-sm"
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>

          {/* Right: Image Generation */}
          <div className="w-1/2 flex flex-col items-center justify-start">
            <p className="text-[32px] font-bold mb-6 text-[#111418]">Cover Preview</p>
            <button
              onClick={generateImage}
              disabled={loading || !apiKey}
              className="mb-4 px-6 py-2 bg-[#0c7ff2] text-white rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>
            {imageUrl ? (
              <img src={imageUrl} alt="Generated cover" className="w-full max-w-[400px] rounded-xl border" />
            ) : (
              <p className="text-[#60758a] text-sm">No image generated</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCreate;
