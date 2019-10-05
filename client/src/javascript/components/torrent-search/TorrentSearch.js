import React from 'react';
import {TorrentSearchModal} from './TorrentSearchModal';

export class TorrentSearch extends React.Component {
  state = {
    isOpen: false,
  };

  open = () => this.setState({isOpen: true});

  close = () => this.setState({isOpen: false});

  render() {
    return (
      <div style={{paddingLeft: 8, display: 'flex'}}>
        <button style={{fontWeight: 'bold', color: 'rgba(50, 50, 50, 0.7)'}} onClick={this.open}>
          TORRENTS
        </button>
        <TorrentSearchModal isOpen={this.state.isOpen} onClose={this.close} />
      </div>
    );
  }
}
