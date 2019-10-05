import React from 'react';
import TorrentActions from '../../actions/TorrentActions';

export const TorrentItem = ({torrent, onAddClick}) => {
  const btnStyle = {
    padding: 8,
    margin: 4,
    fontSize: 16,
    backgroundColor: '#c8e6c9',
    borderRadius: 4,
    marginBottom: 24,
  };
  const addTorrent = link => {
    TorrentActions.addTorrentsByUrls({
      urls: [link],
      destination: '/home/rtorrent/downloads',
      isBasePath: false,
      start: true,
      tags: [],
    });
    onAddClick();
  };

  return (
    <div style={{textAlign: 'center'}}>
      <img src={torrent.image} alt={torrent.title} width={180} />
      <p>{torrent.title}</p>
      <div>
        <button onClick={() => addTorrent(torrent.torrent)} style={{...btnStyle}}>
          Torrent
        </button>
        <button onClick={() => addTorrent(torrent.magnet)} style={{...btnStyle, backgroundColor: '#e57373'}}>
          Magnet
        </button>
      </div>
    </div>
  );
};
