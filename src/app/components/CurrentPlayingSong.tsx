'use client'

import { useEffect, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

const CurrentPlayingSong = () => {
  const [currentSong, setCurrentSong] = useState({
    songName: '',
    artistName: '',
  })
  const [currentYoutubeVideoId, setCurrentYoutubeVideoId] = useState('')
  const [countdown, setCountdown] = useState<number>(30)
  const spotifyToken = localStorage.getItem('spotify_code')

  useEffect(() => {
    if (!spotifyToken || typeof localStorage.getItem('spotify_access_token') === 'string') {
      return
    }

    fetch('/api/spotify-acces-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: spotifyToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => localStorage.setItem('spotify_access_token', data.access_token))
  }, [spotifyToken])

  useEffect(() => {
    const fetchCurrentPlayingSong = () => {
      if (!localStorage.getItem('spotify_access_token')) {
        return
      }

      fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) =>
          setCurrentSong({
            songName: data.item.name,
            artistName: data.item.artists.map((artist: { name: string }) => artist.name).join(', '),
          })
        )
    }

    fetchCurrentPlayingSong()
    setCountdown(30)

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          fetchCurrentPlayingSong()
          return 30
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setCurrentYoutubeVideoId('')

    if (!currentSong.songName) {
      return
    }

    fetch('/api/youtube-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: currentSong.songName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data?.items || data.items.length === 0) {
          return
        }

        setCurrentYoutubeVideoId(data.items[0].id.videoId)
      })
  }, [currentSong])

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '800px',
    playerVars: {
      autoplay: 1,
    },
  }

  return (
    <>
      Current playing song: {currentSong.songName} by {currentSong.artistName}, refetching in: {countdown} seconds
      {currentYoutubeVideoId && <YouTube className="aspect-video h-full" videoId={currentYoutubeVideoId} opts={opts} />}
    </>
  )
}

export default CurrentPlayingSong
