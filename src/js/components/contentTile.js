class ContentTile {
  constructor(item, containerIndex, itemIndex) {
    this.item = item;
    this.containerIndex = containerIndex;
    this.itemIndex = itemIndex;
  }

  render() {
    // tile
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.containerIndex = this.containerIndex;
    tile.dataset.itemIndex = this.itemIndex;

    // content cover image
    const imageElement = document.createElement('img');
    imageElement.className = 'tile-image';
    imageElement.src = this.item.image || '';
    imageElement.alt = this.item.title || 'No title available';

    tile.appendChild(imageElement);
    return tile;
  }
}

export default ContentTile;
