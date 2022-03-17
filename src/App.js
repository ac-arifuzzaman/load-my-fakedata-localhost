import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [users, setUser] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3030/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email };
    // const newUser = { name, user };

    // send data to server
    fetch("http://localhost:3030/user", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        const addedUser = data;
        const newAddedUser = [...users, addedUser];
        setUser(newAddedUser);
      });

    nameRef.current.value = "";
    emailRef.current.value = "";

    e.preventDefault();
  };
  return (
    <div>
      <h4>Found users: {users.length}</h4>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" ref={nameRef} id="" placeholder="name" />
        <input type="email" name="" id="" placeholder="Email" ref={emailRef} />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} {user.name} {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
