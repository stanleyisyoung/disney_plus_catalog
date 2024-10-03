import StateManager from '../state/stateManager.js';

class NavigationController {
  constructor() {
    this.bindKeys();
  }

  bindKeys() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    const state = StateManager.getState();
    const { containerIndex, itemIndex } = state.focusedTile;
    let newContainerIndex = containerIndex;
    let newItemIndex = itemIndex;

    switch (event.key) {
      case 'ArrowUp':
        newContainerIndex = Math.max(0, containerIndex - 1);
        newItemIndex = 0;
        break;
      case 'ArrowDown':
        newContainerIndex = Math.min(state.contentData.length - 1, containerIndex + 1);
        newItemIndex = 0;
        break;
      case 'ArrowLeft':
        newItemIndex = Math.max(0, itemIndex - 1);
        break;
      case 'ArrowRight':
        newItemIndex = Math.min(state.contentData[containerIndex].items.length - 1, itemIndex + 1);
        break;
      case 'Enter':
        const selectedTile = state.contentData[containerIndex].items[itemIndex];
        StateManager.setSelectedTile(selectedTile);
        break;
      case 'Backspace':
        StateManager.clearSelectedTile();
        break;  
      case 'Escape':
        StateManager.clearSelectedTile();
        break;  
    }

    if (newContainerIndex !== containerIndex || newItemIndex !== itemIndex) {
      StateManager.setFocusedTile(newContainerIndex, newItemIndex);
    }
  }
}

export default NavigationController;