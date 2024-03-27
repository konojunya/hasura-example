import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { loginWithCustomToken } from "../libs/firebase";

function cookieParser(cookie) {
  return cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key.trim()] = value;
    return acc;
  }, {});
}

export async function loader({ request }) {
  const cookieHeaders = request.headers.get("cookie");
  const cookies = cookieParser(cookieHeaders);
  return json({ token: cookies.token });
}

async function fetchTodos(token) {
  const url = "http://localhost:8080/v1/graphql";
  const query = `query {
    todos {
      id
      title
    }
  }`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  return await res.json();
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    loginWithCustomToken(data.token).then(async (cred) => {
      setUser({
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
      });
      const token = await cred.user.getIdToken();
      fetchTodos(token).then((res) => {
        setTodos(res.data.todos);
      });
    });
  }, []);

  if (user == null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello, {user.displayName}</h1>
      <img src={user.photoURL} alt="" width={100} height={100} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
