const getSpotifyLoginUrl = () => {
  if (!process.env.NEXT_PUBLIC_spotify_client_id) {
    throw new Error('Missing spotify_client_id environment variable')
  }

  const url = new URL('https://accounts.spotify.com/authorize')
  url.searchParams.append('client_id', process.env.NEXT_PUBLIC_spotify_client_id)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('redirect_uri', 'http://localhost:3000/spotify/callback')
  url.searchParams.append('scope', 'user-read-playback-state')
  return url.toString()
}

export default getSpotifyLoginUrl
