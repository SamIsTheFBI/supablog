import { googleOauth } from "@/server/auth/lucia";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  const url = await googleOauth.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"]
  })

  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 90,
    sameSite: "lax"
  });

  cookies().set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 90,
    sameSite: "lax"
  });

  return Response.redirect(url);
}
