import {
  Links,
  Meta,
  Outlet,
  Scripts,
  json,
  useLoaderData,
} from "@remix-run/react";

export async function loader() {
  return json({
    ENV: {
      CLIENT_ID: process.env.CLIENT_ID,
      REDIRECT_URI: process.env.REDIRECT_URI,
    },
  });
}

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>hasura example app</title>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.ENV = ${JSON.stringify(data.ENV)};
        `,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
