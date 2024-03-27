import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <h1>Hello hasura example app</h1>
      <ul>
        <li>
          login: <Link to={{ pathname: "/login" }}>/login</Link>
        </li>
      </ul>
    </div>
  );
}
