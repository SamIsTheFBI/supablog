"use server"

import { cookies } from "next/headers";
import { GoogleTokens, OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { googleOauth, lucia } from "@/server/auth/lucia";
import { db } from "@/server/db"
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema/auth";
import { genericError, setAuthCookie } from "@/server/auth/utils";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier = cookies().get("google_oauth_code_verifier")?.value ?? null

  if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens: GoogleTokens = await googleOauth.validateAuthorizationCode(code, storedCodeVerifier);
    const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const googleUser: GoogleUser = await googleUserResponse.json();
    console.log(googleUser)

    // Replace this with your own DB client.
    const [existingUser] = await db.select().from(users).where(eq(users.email, googleUser.email))

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/"
        }
      });
    }

    const userId = generateId(15);

    // Replace this with your own DB client.
    try {
      await db.insert(users).values({
        id: userId,
        name: googleUser.name,
        email: googleUser.email,
      })
    } catch (e) {
      return new Response(null, {
        status: 500
      });
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setAuthCookie(sessionCookie)

    // cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  email: string;
}

