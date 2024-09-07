import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { query } = await req.json()

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.youtube_api_key}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })

  const data = await response.json()

  return NextResponse.json(data, { status: 200 })
}
