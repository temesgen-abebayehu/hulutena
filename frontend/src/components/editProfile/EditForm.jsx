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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">{t.selectGender}</option>
          <option value="male">{t.male}</option>
          <option value="female">{t.female}</option>
        </select>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={handleLanguageAdd}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                {t.add}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.languages?.map((lang, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => handleLanguageRemove(index)}
                    className="ml-2 text-red-500"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={handleSpecializationAdd}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                {t.add}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.specializations?.map((spec, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {spec}
                  <button
                    type="button"
                    onClick={() => handleSpecializationRemove(index)}
                    className="ml-2 text-red-500"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t.saveChanges}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t.cancel}
        </button>
      </div>
    </form>
  );
};

export default EditForm;
