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

export default function Profile() {
  const [user, setUser] = useState(null);
  const data = useLoaderData();

  useEffect(() => {
    loginWithCustomToken(data.token).then((cred) => {
      setUser({
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
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
    </div>
  );
}
