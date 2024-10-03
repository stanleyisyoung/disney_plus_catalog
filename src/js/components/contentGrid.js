import StateManager from '../state/stateManager.js';
import EventBus from '../events/eventBus.js';
import ContentTile from './contentTile.js';

class ContentGrid {
  constructor() {
    this.container = document.getElementById('grid-container');
    EventBus.on('stateChanged', this.render.bind(this));
    EventBus.on('focusChanged', this.updateFocus.bind(this));
  }

  render() {
    const { contentData } = StateManager.getState();
    this.container.innerHTML = '';
    
    contentData.forEach((container, containerIndex) => {
      const containerElement = document.createElement('div');
      containerElement.className = 'container';
      
      const titleElement = document.createElement('h2');
      titleElement.textContent = container.title;
      containerElement.appendChild(titleElement);

      const rowElement = document.createElement('div');
      rowElement.className = 'row';
      
      container.items.forEach((item, itemIndex) => {
        const contentTile = new ContentTile(item, containerIndex, itemIndex);
        const tileElement = contentTile.render();

        rowElement.appendChild(tileElement);
      });
      
      containerElement.appendChild(rowElement);
      this.container.appendChild(containerElement);
    });

    this.updateFocus();
  }

  updateFocus() {
    const { focusedTile } = StateManager.getState();
    const tiles = this.container.querySelectorAll('.tile');
    tiles.forEach(tile => tile.classList.remove('focused'));
    const focusedElement = this.container.querySelector(
      `.tile[data-container-index="${focusedTile.containerIndex}"][data-item-index="${focusedTile.itemIndex}"]`
    );
    if (focusedElement) {
      focusedElement.classList.add('focused');
  
      // horizontal scrolling within the row
      const rowElement = focusedElement.closest('.row');
      const tileOffsetLeft = focusedElement.offsetLeft;
      const tileWidth = focusedElement.offsetWidth;
      const rowWidth = rowElement.offsetWidth;
  
      const newScrollLeft = tileOffsetLeft - (rowWidth - tileWidth) / 2;
  
      rowElement.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
  
      // vertical scrolling to bring the container into view
      const containerElement = focusedElement.closest('.container');
  
      // container's position relative to the viewport
      const containerRect = containerElement.getBoundingClientRect();
      const absoluteElementTop = containerRect.top + window.scrollY;
  
      const headerOffset = 160; 
      const scrollTop = absoluteElementTop - headerOffset;
  
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  }
  
}

export default ContentGrid;
