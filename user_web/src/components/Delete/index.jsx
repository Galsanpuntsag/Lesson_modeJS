import React from "react";

const Delete = ({ userId, users }) => {
  const [userToDelete, setUserToDelete] = useState([users]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8008/api/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            s,
          },
        }
      );

      if (response.ok) {
        const updatedUsers = users.filter((u) => u.id !== userToDelete.id);
        setUserToDelete(updatedUsers);
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleChange = () => {
    setUserToDelete(user.Id);
  };
  return (
    <button className="  btn btn-error " onClick={handleDelete}>
      устгах
    </button>
  );
};

export default Delete;
