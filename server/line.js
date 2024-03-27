import axios from "axios";

export async function getProfile(token) {
  const res = await axios.get("https://api.line.me/v2/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  return res.data;
}
