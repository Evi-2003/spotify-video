'use client'
import getSpotifyLoginUrl from '../utils/getSpotifyLoginUrl'

const LoginWithSpotify = () => {
  const isLoggedIn = localStorage.getItem('spotify_code') !== null || ''

  return !isLoggedIn && <a href={getSpotifyLoginUrl()}>Login with Spotify</a>
}

export default LoginWithSpotify
