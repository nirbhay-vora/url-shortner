import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllShortUrls } from "../api/user.api";

const UserUrl = () => {
  const {
    data: urls = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllShortUrls,
  });
  const [copied, setCopied] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (isError)
    return (
      <div className="text-center mt-8 text-red-500">Failed to load URLs.</div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-extrabold mb-8 text-purple-700 text-center tracking-tight">
        Your Shortened URLs
      </h2>
      <div className="overflow-x-auto rounded-lg border border-purple-200 shadow-inner">
        <div className="overflow-hidden rounded-lg border border-purple-300 max-w-full">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="min-w-full bg-white">
              <thead className="sticky top-0 bg-purple-200 text-purple-900 z-10">
                <tr>
                  <th className="p-3 text-left font-semibold">Full URL</th>
                  <th className="p-3 text-left font-semibold">Short URL</th>
                  <th className="p-3 font-semibold">Clicks</th>
                  <th className="p-3 font-semibold">Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-300">
                {urls.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-8">
                      No URLs created yet.
                    </td>
                  </tr>
                ) : (
                  urls
                    .slice()
                    .reverse()
                    .map((url) => (
                      <tr
                        key={url._id}
                        className="hover:bg-purple-50 transition"
                      >
                        <td className="p-3 break-all max-w-xs">
                          <a
                            href={url.fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            {url.fullUrl}
                          </a>
                        </td>
                        <td className="p-3 break-all max-w-xs">
                          <a
                            href={`http://localhost:5000/${url.shortUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 underline hover:text-purple-800"
                          >
                            {`http://localhost:5000/${url.shortUrl}`}
                          </a>
                        </td>
                        <td className="p-3 text-center font-semibold text-purple-700">
                          {url.clicks}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() =>
                              handleCopy(
                                `http://localhost:5000/${url.shortUrl}`,
                                url._id
                              )
                            }
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                              copied === url._id
                                ? "bg-green-500 text-white"
                                : "bg-purple-500 text-white hover:bg-purple-700"
                            }`}
                          >
                            {copied === url._id ? "Copied!" : "Copy"}
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUrl;
