import React from "react";
import TRow from "./trow";

const TBody = ({ users, handleUpdate }) => {
  return (
    <tbody>
      {users.map((user) => (
        <TRow user={user} handleUpdate={handleUpdate} />
      ))}
    </tbody>
  );
};

export default TBody;
