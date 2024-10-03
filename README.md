# Disney ESPN Assignment
# Author: Stanley Young

# Overview
To use this app, get it up and running by following instructions in the quickstart section. Only keyboard navigation is supported using arrow keys (up, down, left, right) to move across content. `Enter` to select content and view more details. `Backspace` or `Esc` to exit the details modal. As you navigate horizontally and vertically across tiles, the app will auto-adjust.

## Quickstart:
Run the following commands to get the app up and running.
1. `npm install` 
2. `npm start` 
3. Go to http://localhost:9000/

## Requirements:
Requires `npm` to be installed. 

# Assumptions made:
- image `1.78` is assumed to be the default photo format

# Architecture overview
State is stored under `src/state/stateManager.js`.
Navigation is handled in `src/navigation/navigationController.js`.
Events are handled in `src/events/eventBus.js`.
Data fetching is handled in `src/api/dataService.js`.

An event bus approach was used to reduce coupling between our ContentGrid, ContentTile, and ContentModal. 

## Areas of improvement
With more time, some additional improvements would be:
- dynamically loading ref data by tracking when ref sets come into view
- adding tests to ensure our app is stable and behaves as expected without manual testing
- improved UI