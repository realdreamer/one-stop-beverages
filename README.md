# Frontend home assignment - One Stop Beverages

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Install dependencies
Before starting up the application please do `yarn install`
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn server`

Runs the instance of `json-server` mocked REST API on `localhost:3001`.
Once the API running, you'll be able to retrieve the assignment data set in order to focus only on the construction
of the front-end.

You can read more about [json-server in the official documentation](./server/DOCUMENTATION.md), and see what are the
[available routes for the API here](./server/ROUTES.md)

## TODO
- [ ] Move API URL to environment variables
- [ ] Few business logic could be move into separate hooks
- [ ] Styling for the loader/error/empty state
- [ ] CSS custom radio button
- [ ] Common types
- [ ] CSS variables (Usually I prefer to do it with colors and spacing with design tokens but because of time constraint went with direct usage
- [ ] Fetch data for components which are in the viewport

This also could be the good things to pair for the next round.
