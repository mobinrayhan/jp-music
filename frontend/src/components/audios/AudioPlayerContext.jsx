import React, { createContext, useState, useContext, useCallback } from 'react';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState({});
  const [playlist, setPlaylist] = useState([]);

  const playTrack = useCallback((track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const updateTrackProgress = useCallback((trackId, progress) => {
    if (typeof progress === 'number' && isFinite(progress)) {
      setTrackProgress(prev => ({ ...prev, [trackId]: progress }));
    }
  }, []);

  const playNext = useCallback(() => {
    if (playlist.length > 0 && currentTrack) {
      const currentIndex = playlist.findIndex(track => track._id === currentTrack._id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      playTrack(playlist[nextIndex]);
    }
  }, [playlist, currentTrack, playTrack]);

  const playPrevious = useCallback(() => {
    if (playlist.length > 0 && currentTrack) {
      const currentIndex = playlist.findIndex(track => track._id === currentTrack._id);
      const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      playTrack(playlist[previousIndex]);
    }
  }, [playlist, currentTrack, playTrack]);

  const setAudioPlaylist = useCallback((newPlaylist) => {
    setPlaylist(newPlaylist);
  }, []);

  return (
    <AudioPlayerContext.Provider 
      value={{ 
        currentTrack, 
        isPlaying, 
        trackProgress, 
        playlist,
        playTrack, 
        togglePlay, 
        updateTrackProgress,
        playNext,
        playPrevious,
        setAudioPlaylist
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
