import { useState } from "react";
import Select from "react-select";
import Input from "../../ui/Input";
import { usersRole } from "../auth/CreateNewUserPage";
import useEditUser from "./useEditUser";

export default function EditUserPop({ onClose, editableUser }) {
  const [errors, setErrors] = useState({}); // State to manage form errors
  const { isPending, updateUserMutate } = useEditUser();

  function handleEditUser(eve) {
    eve.preventDefault();

    const formData = new FormData(event.target); // Create a FormData object

    const updateFormData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    // Validate the form data
    const validationErrors = {};
    if (!updateFormData?.username)
      validationErrors.username = "Full name is required.";
    if (!updateFormData?.email)
      validationErrors.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(updateFormData?.email))
      validationErrors.email = "Enter a valid email address.";
    if (
      updateFormData?.password?.length &&
      updateFormData?.password?.length < 6
    )
      validationErrors.password = "Password must be at least 6 characters.";
    if (!updateFormData?.role) validationErrors.role = "Role is required.";

    setErrors(validationErrors);

    // If there are no errors, proceed with the form submission
    if (Object.keys(validationErrors).length === 0) {
      updateUserMutate(
        { updateFormData },
        {
          onSuccess: () => onClose(),
        },
      );
    }
  }

  return (
    <section className="absolute left-1/2 top-1/2 z-10 w-[50rem] -translate-x-1/2 -translate-y-1/2 bg-white">
      <div className="relative p-4">
        <button
          onClick={onClose}
          className="absolute right-[3%] cursor-pointer border border-slate-200 px-2 py-1 text-2xl"
        >
          &#x2715;
        </button>
      </div>

      <h1 className="text-center text-3xl font-semibold tracking-wider">
        Edit User
      </h1>

      <form className="grid grid-cols-4 gap-6 p-6" onSubmit={handleEditUser}>
        <div className="col-start-1 col-end-3">
          <Input
            header={"User Name"}
            placeholder="Changer User Name"
            name="username"
            id="username"
            required
            defaultValue={editableUser.username}
          />{" "}
        </div>
        <div className="col-start-3 col-end-[-1]">
          <Input
            header={"User Email"}
            placeholder="Change User Email"
            type="email"
            name="email"
            id="email"
            required
            defaultValue={editableUser.email}
          />
        </div>{" "}
        <div className="col-start-1 col-end-[3]">
          <Input
            header={"User Password"}
            placeholder="Change User Email"
            type="text"
            name="password"
            id="password"
            minLength={6}
          />
        </div>{" "}
        <div className="col-start-3 col-end-[-1]">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="role"
          >
            Category
          </label>
          <Select
            required
            options={usersRole}
            defaultValue={usersRole.find(
              (role) => role.value === editableUser.role,
            )}
            name="role"
          />
        </div>
        <button
          className={`"disabled:cursor-not-allowed bg-blue-500 p-3 tracking-wider text-white disabled:opacity-80`}
          disabled={isPending}
        >
          {isPending ? "Editing..." : "Edit User"}
        </button>
      </form>

      {Object.keys(errors).length ? (
        <p className="py-4 text-center text-red-500">
          {Object.values(errors)[0]}{" "}
        </p>
      ) : null}
    </section>
  );
}
