# PEER 
<img src="https://user-images.githubusercontent.com/201428/165138572-711bb040-f827-473d-898b-1a325f00bbe1.png" align="right" width=240 />
The Covid Probability Estimator for Exposure Risk (PEER) provides everyday decision-makers with easy-to-understand, actionable data on Covid risks. This app is built using (React.js)[https://reactjs.org/docs/getting-started.html] and [Material UI](https://mui.com/) components. The 

## Local Environment Setup: Prerequisites
The PEER React App uses Node.js (v17.x.x) and Yarn package manager. Before installing and using the Yarn package manager, you will need to have Node.js installed. To see if you already have Node.js installed, type the following command into your local command line terminal:
```node -v```

If you see a version number, such as `v17.9.0` printed, you have Node.js installed. If you get a command not found error (or similar phrasing), please install Node.js before continuing. To install Node.js, follow this tutorial for [macOS](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-macos).

Once you have Node.js installed, proceed to install the Yarn package manager globally:
```sudo npm install -g yarn```

After the package install successfully, you can check it's version by running `yarn --version`. This should return the current version of Yarn installed.

## Local Environment Setup: Running locally
From your terminal window, run `yarn run`. This will install all the dependency packages in `package.json` and will spin up the application in your browser, at http://localhost:3000

## Build and Deploy
In order to build a deployable bundle of html, css, and the compiled javascript, run `yarn build`. This will generate a `/build` folder in your project that has the compiled project ready to be deployed to cloud environment.

@todo: 
- deployment and integration pipeline to Pantheon and AWS

## Backend
@todo:
- documentation on data pipeline, and output geobuf file on S3

## Additional Documentation
@todo

## More on React and Material-UI
@todo
