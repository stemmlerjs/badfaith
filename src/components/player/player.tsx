import React, { useEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ReactAudioPlayer from 'react-audio-player';
import { TextUtils } from '../../utils/TextUtils'
import "./player.sass"

const playButton = require('../../images/Polygon.svg')
const pauseButton = require('../../images/pause.svg')

const MEDIA_QUERY = graphql`
{
  allFile(filter: {ext: {eq: ".mp3"}}) {
    edges {
      node {
        publicURL
        name
      }
    }
  }
}
`

function formatTime (duration)
  {   
      // Hours, minutes and seconds
      var hrs = ~~(duration / 3600);
      var mins = ~~((duration % 3600) / 60);
      var secs = ~~duration % 60;
  
      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";
  
      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
  
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
  }

function usePlayer (playerRef) {
  let [isPlaying, setIsPlaying] = useState(false);
  let [currentTime, setCurrentTime] = useState(0);
  let [duration, setDuration] = useState(0);

  useEffect(() => {
    playerRef.current.audioEl.current.addEventListener('timeupdate', updateTime, false);
    playerRef.current.audioEl.current.addEventListener('ended', onEnded, false)
  }, [playerRef])

  const updateTime = (e) => {
    try {
      setCurrentTime(playerRef.current.audioEl.current.currentTime)
      setDuration(playerRef.current.audioEl.current.duration)
    } catch (err) {
      // Look into why this might error out when I leave the page when
      // the player is currently playing.
    }
  }

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

  const onEnded = () => {
    setIsPlaying(false);
  }

  return { 
    operations: { togglePlayer, onEnded },
    models: { isPlaying, currentTime, duration } 
  }
}

const Player = ({ title }) => {
  const playerRef = useRef(null);
  const { operations, models } = usePlayer(playerRef);
  const { allFile: { edges } } = useStaticQuery(MEDIA_QUERY);
  const edge = edges.find((e) => e.node.name === TextUtils.stripSpecialCharacters(title));

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
          <div>{formatTime(models.currentTime)} of {formatTime(models.duration)}</div>
        </div>
      </section>
      <div style={{ display: 'none' }}>
        <ReactAudioPlayer
          src={edge.node.publicURL}
          autoPlay={false}
          controls={false}
          ref={playerRef}
          onEnded={() => operations.onEnded()}
        />
      </div>
    </div>
  )
}

export default Player;