import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getProfile } from "./line.js";
import axios from "axios";

admin.initializeApp({
  credential: applicationDefault(),
});

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ message: "ok" });
});

app.get("/callback", async (c) => {
  const url = new URL(c.req.url);
  const searchParams = url.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error != null || code == null) {
    return c.json({ error }, 400);
  }

  const rb = new URLSearchParams();
  rb.append("grant_type", "authorization_code");
  rb.append("code", code);
  rb.append("redirect_uri", `${process.env.REDIRECT_URI}`);
  rb.append("client_id", `${process.env.CLIENT_ID}`);
  rb.append("client_secret", `${process.env.CLIENT_SECRET}`);

  const res = await axios.post("https://api.line.me/oauth2/v2.1/token", rb);

  if (res.status !== 200) {
    return c.json(
      { message: "can not get token", error: res.statusText },
      res.status
    );
  }

  const data = res.data;
  const profile = await getProfile(data.access_token);
  const auth = getAuth();
  const token = await auth.createCustomToken(profile.userId, {
    displayName: profile.displayName,
    pictureUrl: profile.pictureUrl,
  });

  // setting user profile
  await auth.updateUser(profile.userId, {
    displayName: profile.displayName,
    photoURL: profile.pictureUrl,
  });

  setCookie(c, "token", token, {
    path: "/",
    secure: true,
    sameSite: "Lax",
  });
  return c.redirect("http://localhost:3000/profile");
});

serve(
  {
    fetch: app.fetch,
    port: 3002,
  },
  console.log
);
