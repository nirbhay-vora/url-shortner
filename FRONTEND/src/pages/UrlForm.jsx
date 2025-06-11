import React from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main.jsx"; // Adjust the import path as necessary
import TextInput from "../components/TextInput.jsx";
import Button from "../components/Button.jsx";

const UrlForm = () => {
  const [url, setUrl] = React.useState("");
  const [shortUrl, setShortUrl] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createShortUrl(url, slug);
    setShortUrl(data.shortUrl);
    queryClient.invalidateQueries({ queryKey: ["userUrls"] });
    setUrl("");   
    setSlug("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={`flex justify-center w-full ${isAuthenticated ?" mt-[50%]" : ""}`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6 w-full max-w-lg border border-purple-100"
      >
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-2">
          URL Shortener
        </h2>
        <label className="font-semibold text-lg">Enter URL to shorten:</label>
        <TextInput
          type="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
        />
        {isAuthenticated && (
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">
              Custom Slug (optional):
            </label>
            <TextInput
              type="text"
              name="slug"
              value={slug}
              placeholder="Enter custom slug"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        )}
        <Button type="submit">Shorten URL</Button>
        {shortUrl && (
          <div>
            <p className="font-semibold text-lg mb-2">Shortened URL:</p>
            <div className="flex items-center gap-2">
              <TextInput className="w-full" type="text" readOnly value={shortUrl} />
              <Button
                className={`${
                  !copied
                    ? "bg-purple-400 hover:bg-purple-500"
                    : "bg-green-400 hover:bg-green-500"
                } px-5 py-3 rounded-r-lg font-semibold text-white transition`}
                onClick={handleCopy}
                type="button"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UrlForm;
