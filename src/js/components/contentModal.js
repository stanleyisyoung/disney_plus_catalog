import EventBus from '../events/eventBus.js';

class ContentModal {
  constructor() {
    this.modalElement = document.getElementById('modal');
    EventBus.on('selectedTileChanged', this.render.bind(this));
  }

  render(selectedTile) {
    if (selectedTile) {
      this.modalElement.innerHTML = '';
      this.modalElement.classList.add('visible');

      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'modal-content';

      const titleElement = document.createElement('h2');
      titleElement.textContent = selectedTile.title;

      const imageElement = document.createElement('img');
      imageElement.src = selectedTile.image || '';
      imageElement.alt = selectedTile.title || 'No title available';

      const ratingElement = document.createElement('p');
      ratingElement.textContent = `Rating: ${selectedTile.rating}`;

      const releaseYearElement = document.createElement('p');
      releaseYearElement.textContent = `Release Year: ${selectedTile.releaseYear}`;

      // does not support closing modal by clicking 
      // text is for user to know they need to press back to close the modal
      const goBackElement = document.createElement('p');
      goBackElement.className = 'modal-back-text';
      goBackElement.textContent = '< Back';

      contentWrapper.appendChild(goBackElement);
      contentWrapper.appendChild(imageElement);
      contentWrapper.appendChild(titleElement);
      contentWrapper.appendChild(ratingElement);
      contentWrapper.appendChild(releaseYearElement);

      this.modalElement.appendChild(contentWrapper);
    } else {
      this.modalElement.classList.remove('visible');
      this.modalElement.innerHTML = '';
    }
  }
}

export default ContentModal;
