import { env } from '@/env'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await fetch(`${env.LUCIA_AUTH_URL}/api/post?slug=${params.slug}`).then((res) =>
    res.json()
  )

  const interBold = fetch(
    new URL('./Inter-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col justify-end items-stretch bg-black">
        {post.cover &&
          <img src={post.cover} alt="" tw="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center' }} />
        }
        <div tw="flex bg-yellow-400 p-8 gap-4">
          {post.logo &&
            <img src={post.logo} alt="" tw="w-40 h-36" style={{ paddingRight: '20px', objectFit: 'cover', objectPosition: 'center' }} />
          }
          <div tw="flex flex-col">
            <div tw="text-5xl mb-2 tracking-tight">{post.title}</div>
            <div tw="text-2xl">
              {post.author}
            </div>
            <div tw="text-2xl">
              {post.date}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      fonts: [
        {
          name: 'Inter',
          data: await interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
