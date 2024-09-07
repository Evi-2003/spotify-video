import CurrentPlayingSong from './components/CurrentPlayingSong'
import LoginWithSpotify from './components/LoginWithSpotify'

export default function Home() {
  return (
    <main>
      <LoginWithSpotify />
      <CurrentPlayingSong />
    </main>
  )
}
