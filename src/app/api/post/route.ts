import { getPostBySlug, getUserById } from "@/server/actions/blogActions"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams, protocol, host } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (slug === null) {
    return NextResponse.json({
      error: 'Provide post slug!',
    })
  }

  const [post] = await getPostBySlug(slug)
  const [author] = await getUserById(post.authorId)

  const title = post.title || 'No Title'
  const authorName = author.name || 'Anonymous'
  const date = post.createdAt.toLocaleString('en-us', { dateStyle: 'long' }) || '2022-11-08T12:00:00.000Z'
  const cover = post.coverImage
  const logo = `${protocol}//${host}/MUNSOClogo.png`

  return NextResponse.json({
    title: title,
    authorName: authorName,
    date: date,
    cover: cover,
    // logo: logo,
  })
}


