import classnames from 'classnames';
import React from 'react';
import {injectIntl} from 'react-intl';
import TorrentActions from '../../actions/TorrentActions';
import UIActions from '../../actions/UIActions';
import EventTypes from '../../constants/EventTypes';
import SettingsStore from '../../stores/SettingsStore';
import TorrentStore from '../../stores/TorrentStore';
import connectStores from '../../util/connectStores';
import Add from '../icons/Add';
import Remove from '../icons/Remove';
import StartIcon from '../icons/StartIcon';
import StopIcon from '../icons/StopIcon';
import Action from './Action';
import SortDropdown from './SortDropdown';
import {TorrentSearch} from '../torrent-search/TorrentSearch';

class ActionBar extends React.Component {
  handleAddTorrents() {
    UIActions.displayModal({id: 'add-torrents'});
  }

  handleRemoveTorrents() {
    UIActions.displayModal({
      id: 'remove-torrents',
    });
  }

  handleSortChange(sortBy) {
    SettingsStore.saveFloodSettings({id: 'sortTorrents', data: sortBy});
    UIActions.setTorrentsSort(sortBy);
  }

  handleStart() {
    TorrentActions.startTorrents(TorrentStore.getSelectedTorrents());
  }

  handleStop() {
    TorrentActions.stopTorrents(TorrentStore.getSelectedTorrents());
  }

  render() {
    const classes = classnames('action-bar', {
      'action-bar--is-condensed': this.props.torrentListViewSize === 'condensed',
    });

    return (
      <nav className={classes}>
        <TorrentSearch />
        <div className="actions action-bar__item action-bar__item--sort-torrents">
          <SortDropdown
            direction={this.props.sortBy.direction}
            onSortChange={this.handleSortChange}
            selectedProperty={this.props.sortBy.property}
          />
        </div>
        <div className="actions action-bar__item action-bar__item--torrent-operations">
          <div className="action-bar__group">
            <Action
              label={this.props.intl.formatMessage({
                id: 'actionbar.button.start.torrent',
                defaultMessage: 'Start Torrent',
              })}
              slug="start-torrent"
              icon={<StartIcon />}
              clickHandler={this.handleStart}
            />
            <Action
              label={this.props.intl.formatMessage({
                id: 'actionbar.button.stop.torrent',
                defaultMessage: 'Stop Torrent',
              })}
              slug="stop-torrent"
              icon={<StopIcon />}
              clickHandler={this.handleStop}
            />
          </div>
          <div className="action-bar__group action-bar__group--has-divider">
            <Action
              label={this.props.intl.formatMessage({
                id: 'actionbar.button.add.torrent',
                defaultMessage: 'Add Torrent',
              })}
              slug="add-torrent"
              icon={<Add />}
              clickHandler={this.handleAddTorrents}
            />
            <Action
              label={this.props.intl.formatMessage({
                id: 'actionbar.button.remove.torrent',
                defaultMessage: 'Remove Torrent',
              })}
              slug="remove-torrent"
              icon={<Remove />}
              clickHandler={this.handleRemoveTorrents}
            />
          </div>
        </div>
      </nav>
    );
  }
}

const ConnectedActionBar = connectStores(injectIntl(ActionBar), () => {
  return [
    {
      store: SettingsStore,
      event: EventTypes.SETTINGS_CHANGE,
      getValue: ({store}) => {
        return {
          sortBy: store.getFloodSettings('sortTorrents'),
          torrentListViewSize: store.getFloodSettings('torrentListViewSize'),
        };
      },
    },
  ];
});

export default ConnectedActionBar;
