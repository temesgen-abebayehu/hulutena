import React from "react";

function CreateResource({
  newResource,
  handleInputChange,
  handleCreateResource,
}) {
  return (
    <div className="mb-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-800 mb-6">
        Create New Resource
      </h2>
      <form onSubmit={handleCreateResource}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={newResource.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={newResource.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Type</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="written">Written</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Source URL</label>
            <input
              type="text"
              name="src"
              value={newResource.src}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={newResource.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6"
        >
          Create Resource
        </button>
      </form>
    </div>
  );
}

export default CreateResource;
