import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { code } = await req.json()

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_spotify_client_id}:${process.env.spotify_client_secret}`, 'utf8').toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: Array.isArray(code) ? code[0] : code || '',
      redirect_uri: 'http://localhost:3000/spotify/callback',
    }).toString(),
  })

  const data = await response.json()

  return NextResponse.json(data, { status: 200 })
}
