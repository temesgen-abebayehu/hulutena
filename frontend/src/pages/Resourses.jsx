import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Resources() {
  const [searchQuery, setSearchQuery] = useState("");

  const resources = [
    {
      id: 1,
      title: "Morning Relaxation Audio",
      description: "Enjoy a soothing start to your day with this guided morning relaxation.",
      src: "/audio/Morning.mp3",
      img: "/audioicon.jpg",
      type: "audio",
    },
    {
      id: 2,
      title: "Enjoying Your Day Audio",
      description: "Enjoy this track for a positive and energetic day.",
      src: "/audio/That Zen Moment.mp3",
      img: "/audioicon.jpg",
      type: "audio",
    },
    {
      id: 3,
      title: "Good Night Audio",
      description: "Relax and drift off to sleep with this guided night audio.",
      src: "/audio/Waltz Primordial.mp3",
      img: "/audioicon.jpg",
      type: "audio",
    },
    {
      id: 4,
      title: "Healthcare Tips 1",
      src: "https://www.youtube.com/embed/BZWFC5AbdCw?si=bdi1YfOUnrZ0ZJNo",
      type: "video",
    },
    {
      id: 5,
      title: "Healthcare Tips 2",
      src: "https://www.youtube.com/embed/3_LkeeDj3rg?si=CQBtKu13BFf9ZrKN",
      type: "video",
    },
    {
      id: 6,
      title: "Healthy Living",
      src: "https://www.youtube.com/embed/nxb8oKRyfoA?si=zCzVQm-Fu2hk9LEN",
      type: "video",
    },
    {
      id: 7,
      title: "Wellness Guide",
      src: "https://www.youtube.com/embed/qKnMSdAnLo8?si=0hIdO6VXiLH_vCcR",
      type: "video",
    },
    {
      id: 8,
      title: "Post Title 1",
      description: "Overview of the first post.",
      type: "written",
    },
    {
      id: 9,
      title: "Post Title 2",
      description: "Overview of the second post.",
      type: "written",
    },
    {
      id: 10,
      title: "Post Title 3",
      description: "Overview of the third post.",
      type: "written",
    },
  ];

  // Filters based on searchQuery
  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered resources by type
  const filteredAudio = filteredResources.filter((resource) => resource.type === "audio");
  const filteredVideo = filteredResources.filter((resource) => resource.type === "video");
  const filteredWritten = filteredResources.filter((resource) => resource.type === "written");

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800">HuluTena Healthcare Services</h1>
        <p className="text-lg text-gray-600 mt-4">
          Access a variety of healthcare resources, including audio, video, and written materials.
        </p>
      </div>

      {/* Search Box */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xl p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
        <button
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md ml-2"
          onClick={() => setSearchQuery(searchQuery)}
        >
          <FaSearch className="text-white" />
        </button>
      </div>

      {/* Filtered Results */}
      {searchQuery ? (
        <div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
                {resource.type === "audio" && (
                  <>
                    <div className="w-24 h-24 mb-4">
                      <img className="w-full h-full object-contain" src={resource.img} alt="Audio Icon" />
                    </div>
                    <audio controls className="w-full">
                      <source src={resource.src} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </>
                )}
                {resource.type === "video" && (
                  <iframe
                    width="100%"
                    height="200"
                    src={resource.src}
                    title={resource.title}
                    className="rounded-lg shadow-lg"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                {resource.type === "written" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <a href="#" className="text-blue-600 hover:underline hover:text-blue-800">
                      Read more...
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Audio Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-800">Audio Resources</h2>
              <button className="text-blue-600 hover:underline hover:text-blue-800" onClick={() => setSearchQuery("audio")}>
                See more audio...
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAudio.slice(0, 8).map((audio) => (
                <div key={audio.id} className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
                  <div className="w-24 h-24 mb-4">
                    <img className="w-full h-full object-contain" src={audio.img} alt="Audio Icon" />
                  </div>
                  <audio controls className="w-full">
                    <source src={audio.src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-800">Video Resources</h2>
              <button className="text-blue-600 hover:underline hover:text-blue-800" onClick={() => setSearchQuery("video")}>
                See more video...
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVideo.slice(0, 8).map((video) => (
                <iframe
                  key={video.id}
                  width="100%"
                  height="200"
                  src={video.src}
                  title={video.title}
                  className="rounded-lg shadow-lg"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          </div>

          {/* Written Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-800">Written Resources</h2>
              <button className="text-blue-600 hover:underline hover:text-blue-800" onClick={() => setSearchQuery("written")}>
                See more written...
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWritten.slice(0, 8).map((written) => (
                <div key={written.id} className="flex flex-col items-start p-6 bg-white shadow-lg rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{written.title}</h3>
                  <p className="text-gray-600 mb-4">{written.description}</p>
                  <a href="#" className="text-blue-600 hover:underline hover:text-blue-800">
                    Read more...
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resources;
