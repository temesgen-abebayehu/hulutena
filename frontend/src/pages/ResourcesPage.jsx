import React, { useState, useEffect, useMemo } from "react";
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
    const [activeFilter, setActiveFilter] = useState("all");
    const [sortMode, setSortMode] = useState("newest");
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

    // Derived filtered & sorted resources
    const filteredResources = useMemo(() => {
        let list = [...resources];
        if (activeFilter !== "all") {
            list = list.filter(r => r?.type === activeFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(r => r?.title?.toLowerCase().includes(q) || r?.type?.toLowerCase().includes(q));
        }
        switch (sortMode) {
            case "likes":
                list.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
                break;
            case "az":
                list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
                break;
            case "newest":
            default:
                list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return list;
    }, [resources, activeFilter, searchQuery, sortMode]);

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
        <div className="bg-gray-50 min-h-screen">
            {/* Hero */}
            <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20 px-6 text-center shadow-lg">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                        {t.resourcesHeroTitle || t.resourcesTitle}
                    </h1>
                    <p className="text-xl opacity-90">
                        {t.resourcesHeroSubtitle || t.resourcesIntro}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                    <div className="flex-1 flex items-center gap-3">
                        <div className="relative w-full">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t.searchResourcesPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-300 focus:outline-none text-gray-700"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={sortMode}
                            onChange={(e) => setSortMode(e.target.value)}
                            className="px-4 py-3 rounded-full bg-white border border-gray-300 shadow-sm focus:ring-4 focus:ring-teal-300 focus:outline-none text-gray-700"
                            aria-label={t.sortBy}
                        >
                            <option value="newest">{t.sortNewest}</option>
                            <option value="likes">{t.sortMostLiked}</option>
                            <option value="az">{t.sortAtoZ}</option>
                        </select>
                        {isAdmin && (
                            <button
                                onClick={() => setShowCreateForm(!showCreateForm)}
                                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full shadow-md transition-all"
                                aria-label={showCreateForm ? t.closeCreateFormAria : t.createResourceAria}
                            >
                                <FaPlus /> {t.createResource}
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {[
                        { key: "all", label: t.filterAll },
                        { key: "audio", label: t.filterAudio },
                        { key: "video", label: t.filterVideo },
                        { key: "written", label: t.filterWritten },
                    ].map(f => (
                        <button
                            key={f.key}
                            onClick={() => setActiveFilter(f.key)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm border ${activeFilter === f.key ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
                            aria-pressed={activeFilter === f.key}
                        >
                            {f.label}
                        </button>
                    ))}
                    {(activeFilter !== "all" || searchQuery) && (
                        <button
                            onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
                            className="px-5 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
                        >
                            {t.clearFilters}
                        </button>
                    )}
                </div>

                {showCreateForm && (
                    <div className="mb-10">
                        <CreateResource
                            newResource={newResource}
                            handleInputChange={handleInputChange}
                            handleCreateResource={handleCreateResource}
                        />
                    </div>
                )}

                {/* Content */}
                {filteredResources.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <p className="text-xl text-gray-500 mb-4">{t.noMatchingResources || t.noResourcesFound}</p>
                        <button
                            onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
                            className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow hover:bg-blue-700 transition"
                        >
                            {t.clearFilters}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-20">
                        {/* Audio */}
                        {filteredAudio.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{t.audioResources}</h2>
                                    {filteredAudio.length > 8 && (
                                        <button onClick={() => setSearchQuery("audio")} className="text-blue-600 hover:underline font-medium">
                                            {t.seeMoreAudio}
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                            </section>
                        )}

                        {/* Video */}
                        {filteredVideo.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{t.videoResources}</h2>
                                    {filteredVideo.length > 8 && (
                                        <button onClick={() => setSearchQuery("video")} className="text-blue-600 hover:underline font-medium">
                                            {t.seeMoreVideo}
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            </section>
                        )}

                        {/* Written */}
                        {filteredWritten.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{t.writtenResources}</h2>
                                    {filteredWritten.length > 8 && (
                                        <button onClick={() => setSearchQuery("written")} className="text-blue-600 hover:underline font-medium">
                                            {t.seeMoreWritten}
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResourcesPage;