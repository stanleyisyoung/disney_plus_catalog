import EventBus from '../events/eventBus.js';

class StateManager {
  constructor() {
    this.state = {
      contentData: [],
      focusedTile: { containerIndex: 0, itemIndex: 0 },
      selectedTile: null,
    };
  }

  setContentData(data) {
    this.state.contentData = data;
    EventBus.emit('stateChanged', this.state);
  }

  setFocusedTile(containerIndex, itemIndex) {
    this.state.focusedTile = { containerIndex, itemIndex };
    EventBus.emit('focusChanged', this.state.focusedTile);
  }

  setSelectedTile(tile) {
    this.state.selectedTile = tile;
    EventBus.emit('tileSelected', tile);
  }

  setSelectedTile(selectedTile) {
    this.state.selectedTile = selectedTile;
    EventBus.emit('selectedTileChanged', selectedTile);
  }

  clearSelectedTile() {
    this.state.selectedTile = null;
    EventBus.emit('selectedTileChanged', null);
  }

  getState() {
    return this.state;
  }

  getFocusedTile() {
    const { containerIndex, itemIndex } = this.state.focusedTile;
    return this.state.contentData[containerIndex]?.items[itemIndex] || null;
  }
}

export default new StateManager();