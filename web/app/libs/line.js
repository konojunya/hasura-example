export function getLineLoginUrl() {
  return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2004362706&redirect_uri=${encodeURIComponent(
    "http://localhost:3002/callback"
  )}&state=12345abcde&scope=profile%20openid&nonce=09876xyz`;
}
