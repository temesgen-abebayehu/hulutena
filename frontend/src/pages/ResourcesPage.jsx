import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import AudioResource from "../components/resources/AudioResource";
import VideoResource from "../components/resources/VideoResource";
import WrittenResource from "../components/resources/WrittenResource";
import CreateResource from "../components/resources/CreateResource";
import { useLanguage } from "../context/LanguageContext";

function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [resources, setResources] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newResource, setNewResource] = useState({
        title: "",
        type: "",
        description: "",
        src: "",
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useLanguage();

    // Fetch resources from the backend
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await fetch("/api/resources");
                if (!response.ok) throw new Error(t.failedToFetchResources);
                const data = await response.json();
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setResources(sortedData);
            } catch (error) {
                console.error("Error fetching resources:", error);
                setError(t.failedToLoadResources);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    // Check if the logged-in user is an admin
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))?.currentUser;
        if (user && user.role === "admin") {
            setIsAdmin(true);
        }
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    // Handle search
    const filteredResources = resources.filter(
        (resource) =>
            resource?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource?.type?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group filtered resources by type
    const filteredAudio = filteredResources.filter((resource) => resource?.type === "audio");
    const filteredVideo = filteredResources.filter((resource) => resource?.type === "video");
    const filteredWritten = filteredResources.filter((resource) => resource?.type === "written");

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResource((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleCreateResource = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/resources", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newResource),
            });

            if (!response.ok) throw new Error(t.failedToCreateResource);
            const data = await response.json();
            setResources((prev) => [...prev, data]);
            setShowCreateForm(false);
            setNewResource({ title: "", type: "", description: "", src: "" });
        } catch (error) {
            console.error("Error creating resource:", error);
            setError(t.failedToCreateResource);
        }
    };

    // Handle like
    const handleLike = async (resourceId) => {
        try {
            const response = await fetch(`/api/resources/${resourceId}/like`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) throw new Error(t.failedToLikeResource);
            const data = await response.json();
            setResources((prev) =>
                prev.map((resource) => (resource._id === resourceId ? data : resource))
            );
        } catch (error) {
            console.error("Error liking resource:", error);
            setError(t.failedToLikeResource);
        }
    };

    // Handle dislike
    const handleDislike = async (resourceId) => {
        try {
            const response = await fetch(`/api/resources/${resourceId}/dislike`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) throw new Error(t.failedToDislikeResource);
            const data = await response.json();
            setResources((prev) =>
                prev.map((resource) => (resource._id === resourceId ? data : resource))
            );
        } catch (error) {
            console.error("Error disliking resource:", error);
            setError(t.failedToDislikeResource);
        }
    };

    // Handle delete resource
    const handleDeleteResource = async (resourceId) => {
        try {
            const response = await fetch(`/api/resources/${resourceId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) throw new Error(t.failedToDeleteResource);
            setResources((prev) => prev.filter((resource) => resource._id !== resourceId));
        } catch (error) {
            console.error("Error deleting resource:", error);
            setError(t.failedToDeleteResource);
        }
    };

    // Handle edit resource
    const handleEditResource = async (resourceId, updatedResource) => {
        try {
            const response = await fetch(`/api/resources/${resourceId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(updatedResource),
            });
            if (!response.ok) throw new Error(t.failedToEditResource);
            const data = await response.json();
            setResources((prev) =>
                prev.map((resource) => (resource._id === resourceId ? data : resource))
            );
        } catch (error) {
            console.error("Error editing resource:", error);
            setError(t.failedToEditResource);
        }
    };

    if (loading) {
        return <div className="text-center mt-8">{t.loadingResources}</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-800">{t.resourcesTitle}</h1>
                <p className="text-lg text-gray-600 mt-4">
                    {t.resourcesIntro}
                </p>
            </div>

            {/* Search Box */}
            <div className="mb-10 flex justify-center">
                <input
                    type="text"
                    placeholder={t.searchResourcesPlaceholder}
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

            {/* Admin: Create Resource Button */}
            {isAdmin && (
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FaPlus /> {t.createResource}
                    </button>
                </div>
            )}

            {/* Admin: Create Resource Form */}
            {showCreateForm && (
                <CreateResource
                    newResource={newResource}
                    handleInputChange={handleInputChange}
                    handleCreateResource={handleCreateResource}
                />
            )}

            {/* Filtered Results */}
            {searchQuery ? (
                <div>
                    <h2 className="text-2xl font-semibold text-blue-800 mb-6">{t.searchResults}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredResources.map((resource) => {
                            if (resource.type === "audio") {
                                return (
                                    <AudioResource
                                        key={resource._id}
                                        resource={resource}
                                        handleLike={handleLike}
                                        handleDislike={handleDislike}
                                        handleDeleteResource={handleDeleteResource}
                                        handleEditResource={handleEditResource}
                                        isAdmin={isAdmin}
                                        isLoggedIn={isLoggedIn}
                                    />
                                );
                            } else if (resource.type === "video") {
                                return (
                                    <VideoResource
                                        key={resource._id}
                                        resource={resource}
                                        handleLike={handleLike}
                                        handleDislike={handleDislike}
                                        handleDeleteResource={handleDeleteResource}
                                        handleEditResource={handleEditResource}
                                        isAdmin={isAdmin}
                                        isLoggedIn={isLoggedIn}
                                    />
                                );
                            } else if (resource.type === "written") {
                                return (
                                    <WrittenResource
                                        key={resource._id}
                                        resource={resource}
                                        handleLike={handleLike}
                                        handleDislike={handleDislike}
                                        handleDeleteResource={handleDeleteResource}
                                        handleEditResource={handleEditResource}
                                        isAdmin={isAdmin}
                                        isLoggedIn={isLoggedIn}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            ) : (
                <div>
                    {/* Audio Section */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800">{t.audioResources}</h2>
                            {filteredResources.length > 8 && (
                                <button className="text-blue-600 hover:underline hover:text-blue-800" onClick={() => setSearchQuery("audio")}>
                                    {t.seeMoreAudio}
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredAudio.slice(0, 8).map((audio) => (
                                <AudioResource
                                    key={audio._id}
                                    resource={audio}
                                    handleLike={handleLike}
                                    handleDislike={handleDislike}
                                    handleDeleteResource={handleDeleteResource}
                                    handleEditResource={handleEditResource}
                                    isAdmin={isAdmin}
                                    isLoggedIn={isLoggedIn}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800">{t.videoResources}</h2>
                            {filteredResources.length > 8 && (
                                <button className="text-blue-600 hover:underline hover:text-blue-800" onClick={() => setSearchQuery("video")}>
                                    {t.seeMoreVideo}
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideo.slice(0, 8).map((video) => (
                                <VideoResource
                                    key={video._id}
                                    resource={video}
                                    handleLike={handleLike}
                                    handleDislike={handleDislike}
                                    handleDeleteResource={handleDeleteResource}
                                    handleEditResource={handleEditResource}
                                    isAdmin={isAdmin}
                                    isLoggedIn={isLoggedIn}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Written Section */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800">{t.writtenResources}</h2>
                            {filteredResources.length > 8 && (
                                <button className="text-blue-600 hover:underline hover:text-blue-800" onClick={() => setSearchQuery("written")}>
                                    {t.seeMoreWritten}
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredWritten.slice(0, 8).map((written) => (
                                <WrittenResource
                                    key={written._id}
                                    resource={written}
                                    handleLike={handleLike}
                                    handleDislike={handleDislike}
                                    handleDeleteResource={handleDeleteResource}
                                    handleEditResource={handleEditResource}
                                    isAdmin={isAdmin}
                                    isLoggedIn={isLoggedIn}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResourcesPage;