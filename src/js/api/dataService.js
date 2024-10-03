const API_BASE_URL = 'https://cd-static.bamgrid.com/dp-117731241344';

class DataService {
  async getHomePageData() {
    try {
      const response = await fetch(`${API_BASE_URL}/home.json`);
      if (!response.ok) throw new Error('Error fetching content data');
      const data = await response.json();
      return this.parseContentData(data);
    } catch (error) {
      console.error('Error fetching page data:', error);
      throw error;
    }
  }

  async parseContentData(data) {
    const containers = data?.data?.StandardCollection?.containers;
    if (!containers) {
      throw new Error('No containers found');
    }
    const containerPromises = containers.map(async (container) => {
      let updatedContainer = { ...container };
      let updatedSet = { ...container.set };

      if (!updatedSet.items || updatedSet.items.length === 0) {
        if (updatedSet.refId) {
          const setData = await this.getSetData(updatedSet.refId);
          updatedSet = {
            ...updatedSet,
            items: setData.items,
            text: updatedSet.text || { 
              title: { 
                full: { 
                  set: { 
                    default: { 
                      content: setData.title 
                    } 
                  } 
                } 
              } 
            }
          };
        } else {
          console.warn(`Container with no items or refId encountered:`, updatedContainer);
        }
      }

      const parsedItems = this.parseItems(updatedSet.items || []);
      
      return {
        type: updatedSet.type,
        title: updatedSet.text?.title?.full?.set?.default?.content || 'Untitled',
        refId: updatedSet.refId,
        items: parsedItems,
      };
    });
    
    return Promise.all(containerPromises);
  }

  parseItems = (items) => {
    return items.map(item => ({
      id: item.contentId,
      title: this.getTitle(item),
      image: this.getImageUrl(item),
      type: item.type,
      tags: item.tags?.map(tag => tag?.type || tag) ?? [],
      rating: this.getItemRating(item),
      releaseYear: item.releases?.[0]?.releaseYear || item.releaseYear || 'Unknown'
    }));
  }

  getItemRating = (item) => {
    return item.ratings?.[0]?.value || item.rating || 'Not Rated';
  }

  getImageUrl = (item) => {
    if (typeof item.image === 'string') {
      return item.image;
    }

    const tileFormats = item?.image?.tile;
    if (tileFormats) {
      const preferredFormats = ['1.78', '2.00'];
      let format;
  
      for (const formatKey of preferredFormats) {
        if (tileFormats[formatKey]) {
          format = tileFormats[formatKey];
          break;
        }
      }
  
      if (!format) {
        format = Object.values(tileFormats)[0];
      }
  
      if (format) {
        const keys = Object.keys(format);
  
        for (const key of keys) {
          const url = format[key]?.default?.url;
          if (url) {
            return url;
          }
        }
      }
    }
    return '';
  }
  
  getTitle = (item) => {
    if (item?.title){
      return item.title;
    }

    const fullTitle = item?.text?.title?.full;
    if (fullTitle) {
      for (const key of Object.keys(fullTitle)) {
        const content = fullTitle[key]?.default?.content;
        if (content) {
          return content;
        }
      }
    }
    return '';
  }

  async getSetData(refId) {
    try {
      const response = await fetch(`${API_BASE_URL}/sets/${refId}.json`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return this.parseSetData(data);
    } catch (error) {
      console.error(`Error fetching set data for refId ${refId}:`, error);
      throw error;
    }
  }

  parseSetData(data) {
    const setData = data.data;
    const keys = Object.keys(setData);

    if (keys.length === 0) {
      throw new Error('No set data found');
    }

    const set = setData[keys[0]];

    if (!set || !set.type || !set.text || !set.items) {
      throw new Error(`Set data under key '${keys[0]}' is missing properties`);
    }

    return {
      type: set.type,
      title: set.text?.title?.full?.set?.default?.content || '',
      items: this.parseItems(set.items)
    };
  }
}

export default new DataService();