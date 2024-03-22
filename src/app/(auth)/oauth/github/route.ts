"use server"

import { githubOauth } from "@/server/auth/lucia";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const state = generateState();
  const url = await githubOauth.createAuthorizationURL(state);
  console.log(url)

  cookies().set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  return Response.redirect(url);
}
