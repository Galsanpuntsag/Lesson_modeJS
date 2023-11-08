import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import UserList from "@/components/UserList";
import Form from "@/components/Form";
import Toast from "@/components/Toast";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const closeForm = () => {
    console.log("Formee");
    setOpen(false);
    setCount(5);
    setRefresh(!refresh);
  };

  const getAllUser = async () => {
    const { users } = await fetch("http://localhost:8008/api/users").then(
      (res) => res.json()
    );
    setUserList(users);
  };

  const handleUpdate = async (userId) => {
    console.log("ID", userId);
    setOpen(true);
    const updateUser = userList.filter((user) => user.id === userId);
    console.log(userId, updateUser);
    setSelectedUser(updateUser[0]);
  };
  const handleDelete = async (userId) => {

    console.log("IIIDDID", userId)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "та устгахдаа итгэлтэй байна уу?",
      text: "та үүнийг буцаах боломжгүй!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Тийм",
      cancelButtonText: "Үгүй!",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
          await fetch("http://localhost:8008/api/users/" + userId, {
            method: "DELETE",
      });
        swalWithBootstrapButtons.fire({
          title: "Устгагдсан!",
          text: "Таний мэдээлэл устгагдлалаа.",
          icon: "success",
        timer: 2500
        }).then((r) => setRefresh(refresh))
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
    setRefresh(!refresh);
  };
    
  useEffect(() => {
    getAllUser();
  }, [refresh]);

  return (
    <main className={``}>
      <h1 className="text-center text-2xl font-bold my-4">
        Хэрэглэгчийн жагсаалт
      </h1>

      {/* <Form open={open} closeForm={closeForm} />
      <Toast message={"Шинэ хэрэглэгчийг амжилттай нэмлээ"} count={count} /> */}
      <div className=" m-5 flex justify-end">
        <button
          className="btn btn-primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Шинэ хэрэглэгч нэмэх {count}
        </button>
      </div>
     {open && <Form
        open={open}
        closeForm={closeForm}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        setRefresh={setRefresh}
        refresh={refresh}
      />}
      <UserList users={userList} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </main>
  );
}

// useEffect(() => {
//   const interval = setInterval(() => {
//     console.log("working");
//     setCount((count) => count - 1);
//   }, 1000);

//   if (count <= 0) {
//     clearInterval(interval);
//   }

//   return () => clearInterval(interval);
// }, [count]);
