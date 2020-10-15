import React, { useEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ReactAudioPlayer from 'react-audio-player';
import "./player.sass"

const playButton = require('../../images/Polygon.svg')
const pauseButton = require('../../images/pause.svg')

const MEDIA_QUERY = graphql`
{
  file(ext: {eq: ".mp3"}) {
    publicURL
  }
}
`

function usePlayer (playerRef) {
  let [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
  }, [playerRef])

  const play = () => {
    playerRef.current.audioEl.current.play();
    setIsPlaying(true);
  }

  const pause = () => {
    playerRef.current.audioEl.current.pause();
    setIsPlaying(false);
  }

  const togglePlayer = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  return { 
    operations: { togglePlayer },
    models: { isPlaying } 
  }
}

const Player = () => {
  const playerRef = useRef(null);
  const { operations, models } = usePlayer(playerRef);
  const { file: { publicURL } } = useStaticQuery(MEDIA_QUERY);

  return (
    <div>
      <section className="player-controls">
        <div onClick={() => operations.togglePlayer()} className="play-button">
          { !models.isPlaying ? (
            <>
              <img src={playButton}/>
              <div>Play</div>
            </>
          ) : (
            <>
              <img src={pauseButton}/>
              <div>Pause</div>
            </>
          )}
        </div>
        <div className="time">
          <div>0:12 of 3:02</div>
        </div>
      </section>
      <div style={{ display: 'none' }}>
        <ReactAudioPlayer
          src={publicURL}
          autoPlay={false}
          controls
          ref={playerRef}
        />
      </div>
    </div>
  )
}

export default Player;