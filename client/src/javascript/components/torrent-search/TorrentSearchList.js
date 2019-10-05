import React from 'react';
import torrentsFeed from './feed.json';
import {TorrentItem} from './TorrentItem';

export class TorrentSearchList extends React.Component {
  timerId = null;

  state = {
    torrents: torrentsFeed,
    searchValue: '',
  };

  handleSearchChange = event => {
    const {value} = event.target;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      if (value === '') {
        this.setState({torrents: torrentsFeed});
        return;
      }
      this.setState({
        torrents: torrentsFeed.filter(torrent => torrent.title.toLowerCase().includes(value.toLowerCase())),
      });
    }, 100);

    this.setState({searchValue: value});
  };

  render() {
    const {torrents, searchValue} = this.state;
    const {onAddTorrent} = this.props;

    return (
      <div style={{textAlign: 'center'}}>
        <p>{torrents.length} torrents</p>
        <input
          placeholder="Search here..."
          type="text"
          value={searchValue}
          onChange={this.handleSearchChange}
          style={{padding: 8, marginTop: 16, border: '1px solid #ccc', width: 280}}
        />
        <div
          style={{
            marginTop: 32,
            display: 'grid',
            gridGap: '12px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px , 1fr))',
          }}>
          {torrents.map((torrent, index) => (
            <TorrentItem key={parseInt(index, 10)} torrent={torrent} onAddClick={onAddTorrent} />
          ))}
        </div>
      </div>
    );
  }
}
