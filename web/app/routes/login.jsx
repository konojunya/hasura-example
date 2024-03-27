import { Link } from "@remix-run/react";
import { getLineLoginUrl } from "../libs/line";

export default function Login() {
  return (
    <div>
      <h1>LINE でログイン</h1>
      <Link to={getLineLoginUrl()}>ログイン</Link>
    </div>
  );
}
