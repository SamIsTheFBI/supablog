"use server"

import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { githubOauth, lucia } from "@/server/auth/lucia";
import { db } from "@/server/db"
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema/auth";
import { genericError, setAuthCookie } from "@/server/auth/utils";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens = await githubOauth.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const githubUserEmailsResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    const githubUser: GitHubUser = await githubUserResponse.json();
    let userEmail: string
    if (githubUser.email) {
      userEmail = githubUser.email
    } else {
      userEmail = githubUser.login
    }

    // Replace this with your own DB client.
    const [existingUser] = await db.select().from(users).where(eq(users.email, userEmail))

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
        name: githubUser.login,
        email: userEmail,
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

interface GitHubUser {
  id: string;
  login: string;
  email?: string;
}
