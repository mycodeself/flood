import React from 'react';
import {TorrentSearchList} from './TorrentSearchList';
import Close from '../icons/Close';

export const TorrentSearchModal = ({isOpen, onClose}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        top: 0,
        left: 0,
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundColor: '#FAFAFA',
        zIndex: 10,
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: 16,
      }}>
      <div style={{textAlign: 'right'}}>
        <button style={{height: 32, width: 32}} onClick={onClose}>
          <Close />
        </button>
      </div>
      <TorrentSearchList onAddTorrent={onClose} />
    </div>
  );
};
