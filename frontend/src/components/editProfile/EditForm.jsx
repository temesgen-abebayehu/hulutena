// EditForm.jsx
import { FaInfoCircle } from "react-icons/fa";

const EditForm = ({
  user,
  handleChange,
  handleLanguageAdd,
  handleLanguageRemove,
  languageInput,
  setLanguageInput,
  handleSpecializationAdd,
  handleSpecializationRemove,
  specializationInput,
  setSpecializationInput,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
  handleCancel,
  t,
  saving,
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full md:w-2/3">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.fullName}
        </label>
        <input
          type="text"
          name="fullName"
          value={user.fullName || ""}
          onChange={handleChange}
          placeholder="John Doe"
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.contactAddressLabel}
        </label>
        <input
          type="text"
          name="address"
          value={user.address || ""}
          onChange={handleChange}
          placeholder="Enter your address"
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.dateOfBirth}
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={user.dateOfBirth ? String(user.dateOfBirth).slice(0, 10) : ""}
          onChange={handleChange}
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.emailAddress}
        </label>
        <input
          type="email"
          name="email"
          value={user.email || ""}
          onChange={handleChange}
          placeholder="name@example.com"
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.contactNumber}
        </label>
        <input
          type="text"
          name="contactNumber"
          value={user.contactNumber || ""}
          onChange={handleChange}
          placeholder="+251 900 000 000"
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.gender}
        </label>
        <select
          name="gender"
          value={user.gender || ""}
          onChange={handleChange}
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">{t.selectGender}</option>
          <option value="male">{t.male}</option>
          <option value="female">{t.female}</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.availability}
        </label>
        <select
          name="availability"
          value={user.availability || ""}
          onChange={handleChange}
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">{t.selectAvailability || "Select availability"}</option>
          <option value="online">{t.onlineType}</option>
          <option value="in-person">{t.inPerson}</option>
          <option value="both">{t.both || "Both"}</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.experience}
        </label>
        <input
          type="number"
          name="experience"
          min={0}
          value={user.experience ?? ""}
          onChange={handleChange}
          placeholder="e.g. 5"
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {user.role === "doctor" && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              {t.languages}
            </label>
            <div className="flex">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                placeholder="e.g. Amharic"
                className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleLanguageAdd}
                className="ml-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium py-2.5 px-4 rounded-lg"
                disabled={!languageInput}
              >
                {t.add}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.language?.map((lang, index) => (
                <div
                  key={index}
                  className="bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-800"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => handleLanguageRemove(index)}
                    className="ml-2 text-red-500 hover:text-red-600"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              {t.specializations}
            </label>
            <div className="flex">
              <input
                type="text"
                value={specializationInput}
                onChange={(e) => setSpecializationInput(e.target.value)}
                placeholder="e.g. Cardiologist"
                className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleSpecializationAdd}
                className="ml-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium py-2.5 px-4 rounded-lg"
                disabled={!specializationInput}
              >
                {t.add}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.specialization?.map((spec, index) => (
                <div
                  key={index}
                  className="bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-800"
                >
                  {spec}
                  <button
                    type="button"
                    onClick={() => handleSpecializationRemove(index)}
                    className="ml-2 text-red-500 hover:text-red-600"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.password}
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="••••••••"
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {t.confirmPassword}
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {saving ? "Saving..." : t.saveChanges}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {t.cancel}
        </button>
      </div>
    </form>
  );
};

export default EditForm;
