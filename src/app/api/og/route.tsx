import { ImageResponse } from "next/og";

export const runtime = 'edge';

export async function GET(req: Request) {
  try {
    const interBold = fetch(
      new URL('./Inter-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    const { searchParams, protocol, host } = new URL(req.url)

    const title = searchParams.get('title') || 'MUNSOC NITA'
    const author = searchParams.get('author') || 'Anon'
    const date = searchParams.get('date') || '2003-01-06T12:00:00.000Z'
    const cover = searchParams.get('cover')

    // const coverUrl = cover && `${protocol}//${host}/_next/image?url=${encodeURIComponent(cover)}&w=1200&q=75`
    // const coverUrl = cover && `http://localhost:3000/_next/image?url=${cover}&w=1200&q=75`

    const coverUrl = cover
    // const logo = `${protocol}//${host}/MUNSOClogo.png`

    return new ImageResponse(
      (
        <div tw="w-full h-full flex flex-col justify-end items-stretch bg-black">
          {coverUrl &&
            <img src={coverUrl} alt="" tw="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center' }} />
          }
          <div tw="flex bg-yellow-400 p-8 gap-4">
            {/*logo &&
              <img src={logo} alt="" tw="w-40 h-36" style={{ paddingLeft: '32px', paddingRight: '32px', objectFit: 'cover', objectPosition: 'center' }} />
            */}
            <div tw="flex flex-col">
              <div tw="text-5xl mb-2 tracking-tight">{title}</div>
              <div tw="text-2xl">
                {author}
              </div>
              <div>
                {new Date(date).toLocaleString('en-US', { dateStyle: 'long' })}
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
  } catch (e) {
    console.error(e);
    return new Response('Something went wrong!', { status: 500 });
  }
}
