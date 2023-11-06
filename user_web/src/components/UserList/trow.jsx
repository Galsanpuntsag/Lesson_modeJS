import React, { useState } from "react";

const TRow = ({ user, users,}) => {
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8008/api/users/${userToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Filter the users list to remove the deleted user
        const updatedUsers = users.filter((u) => u.id !== userToDelete.id);
        // Update the state with the new user list
        setUserToDelete(updatedUsers
          )
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleChange = () => {
    setUserToDelete(user); // Open a confirmation modal or perform the delete directly
  };

  const getDepartment = (department) => {
    switch (department) {
      case "human resource": {
        return (
          <div className={`badge badge-primary badge-outline`}>
            {user.department}
          </div>
        );
      }
      case "technology": {
        return (
          <div className={`badge badge-secondary badge-outline`}>
            {user.department}
          </div>
        );
      }
      default: {
        return (
          <div className={`badge badge-accent badge-outline`}>
            {user.department}
          </div>
        );
      }
    }
  };
  return (
    <tr className="hover:bg-slate-100">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={user.avatarUrl} alt={user.firstName} />
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="font-bold">{user.firstName}</span>
      </td>
      <td>
        <span className="font-bold">{user.lastName}</span>
      </td>
      <td>
        <span className="font-bold">{user.email}</span>
      </td>
      <td>
        <button className="btn btn-ghost btn-xs">{user.birthDate}</button>
      </td>
      <td>{getDepartment(user.department)}</td>
      <td>
        <button className=" btn btn-warning  mx-2">засах</button>
        <button className="  btn btn-error " onClick={handleChange}>устгах</button>
      </td>
    </tr>
  );
};

export default TRow;
