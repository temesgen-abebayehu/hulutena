// EditForm.jsx
import { FaInfoCircle } from "react-icons/fa";

const EditForm = ({
  user,
  handleChange,
  confirmPassword,
  setConfirmPassword,
  languageInput,
  setLanguageInput,
  handleLanguageInput,
  removeLanguage,
  specializationInput,
  setSpecializationInput,
  handleSpecializationInput,
  removeSpecialization,
}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Edit Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-500 font-bold">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={user.fullName || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-500 font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm text-gray-500 font-bold">
              Phone Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={user.contactNumber || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm text-gray-500 font-bold">
              Languages You Speak
            </label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
              {user.language.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyDown={handleLanguageInput}
                className="flex-1 p-1 border-none focus:ring-0"
                placeholder="Add a language and press Enter"
              />
            </div>
          </div>

          {/* DateOfBirth */}
          <div>
            <label className="block text-sm text-gray-500 font-bold">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          {/* Address */}
          <div>
            <label className="block text-sm text-gray-500 font-bold">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={user.address || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Bole, Addis ababa, Ethiopia"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-sm text-gray-500 font-bold">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Leave blank to keep current password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-500 font-bold">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Confirm your new password"
            />
          </div>

          {/* Doctor-Specific Fields */}
          {user.role === "doctor" && (
            <>
              {/* Specialty */}
              <div>
                <label className="block text-sm text-gray-500 font-bold">
                  Specializations
                </label>
                <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                  {user.specialization.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm"
                    >
                      {spec}
                      <button
                        type="button"
                        onClick={() => removeSpecialization(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={specializationInput}
                    onChange={(e) => setSpecializationInput(e.target.value)}
                    onKeyDown={handleSpecializationInput}
                    className="flex-1 p-1 border-none focus:ring-0"
                    placeholder="Add a specialization and press Enter"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm text-gray-500 font-bold">
                    {" "}
                    Availability{" "}
                  </label>
                  <select
                    name="availability"
                    value={user.availability || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  >
                    <option value="online"> Online </option>
                    <option value="in-person"> In-Person </option>
                    <option value="both"> In-Person and Online </option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm text-gray-500 font-bold">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={user.experience || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Years of experience"
                />
              </div>

              {/* Active Account */}
              {user.isVerified && (
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">
                    Account Status
                  </label>
                  <div className="flex items-start p-3 bg-blue-100 rounded-md">
                    <FaInfoCircle
                      className="text-blue-600 mt-1 mr-2"
                      size={18}
                    />
                    <p className="text-sm text-blue-800">
                      If you're unavailable for appointments, you can
                      temporarily deactivate your account. Reactivate anytime
                      when you're ready.
                    </p>
                  </div>
                  <select
                    name="onlineStatus"
                    value={user.onlineStatus ? "active" : "inactive"}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        onlineStatus: e.target.value === "active",
                      }))
                    }
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                    required
                  >
                    <option value="active">
                      Active (Ready for appointments)
                    </option>
                    <option value="inactive">
                      Temporarily Unavailable (Not ready for appointments)
                    </option>
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
