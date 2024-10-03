import DataService from './api/dataService.js';
import StateManager from './state/stateManager.js';
import ContentGrid from './components/contentGrid.js';
import ContentModal from './components/contentModal.js';
import NavigationController from './nav/navigationController.js';
import '../css/styles.css';

class App {
  constructor() {
    this.contentGrid = new ContentGrid();
    this.init();
  }

  async init() {
    try {
      // fetch and store initial data
      const data = await DataService.getHomePageData();
      StateManager.setContentData(data);

      // initialize components
      this.contentGrid.render();
      new NavigationController();
      new ContentModal();
    } catch (error) {
      console.error('Failed to start app:', error);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});

export default App;