# PEER 
<img src="https://user-images.githubusercontent.com/201428/165138572-711bb040-f827-473d-898b-1a325f00bbe1.png" align="right" width=240 />
The Covid Probability Estimator for Exposure Risk (PEER) provides everyday decision-makers with easy-to-understand, actionable data on Covid risks. This app is built using [React](https://reactjs.org/docs/getting-started.html) and [Material UI](https://mui.com/) components. The 

## Local Environment Setup: Prerequisites
The PEER React App uses Node.js (v17.x.x) and Yarn package manager. Before installing and using the Yarn package manager, you will need to have Node.js installed. To see if you already have Node.js installed, type the following command into your local command line terminal:
```node -v```

If you see a version number, such as `v17.9.0` printed, you have Node.js installed. If you get a command not found error (or similar phrasing), please install Node.js before continuing. To install Node.js, follow this tutorial for [macOS](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-macos).

Once you have Node.js installed, proceed to install the Yarn package manager globally:
```sudo npm install -g yarn```

After the package install successfully, you can check it's version by running `yarn --version`. This should return the current version of Yarn installed.

### Environment Variables and Mapbox Token
- Make a duplicate of the `.env` file that contains environment variables. Name this duplicate `.env.local`. This will use environment variables for your local. 
- Create an account on [Mapbox](https://www.mapbox.com)
- Once logged in, go to [Access Tokens](https://account.mapbox.com/access-tokens/) to get your default token or generate a new.
- Set the `REACT_APP_MAPBOX_TOKEN` variable to use your token in `.env.local` for local development.

## Local Environment Setup: Running locally
From your terminal window, run `yarn start`. This will install all the dependency packages in `package.json` and will spin up the application in your browser, at http://localhost:3000

## Running Tests locally
PEER utilizes Jest to run tests. The tests are all located in the `src/tests` folder. In order to run them, from your terminal window, run `yarn test:jest`. This will run all the tests in all files in the folder and tell you if they Pass or Fail, as well as spit out metrics like the number of lines covered and number of functions in each component that is tested.

## Precommit Hooks
Precommit hooks are handled using [husky](https://typicode.github.io/husky/#/). It is included in `package.json` and will install and setup on initial `yarn install` for the PEER project.
When committing changes into a branch, a pre-commit hook will run that will run a linter, as well as tests. The pre-commit hook commands are available in `./husky/pre-commit`. The current commands that run on commit are `yarn lint` and `yarn test:jest`.

## Build and Deploy
In order to build a deployable bundle of html, css, and the compiled javascript, and then deploy the bundle, run `sh peer_deploy.sh`. This will run a script that generates a `/build` folder in your project that has the compiled project ready to be deployed to the cloud environment, and then uploads the bundle to S3 and creates a new Invalidation for the CloudFront distribution domain. 

Note: The script assumes you already have AWS configured access key credentials that give you permissions to write to S3 and CloudFront. If you do not, create new credentials or retrieve existing credentials and configure AWS CLI on your machine first, and then run the script. For more information about setting up AWS CLI with credentials, click [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) to view the documentation.

## Backend
@todo:
- documentation on data pipeline, and output geobuf file on S3

## Additional Documentation
@todo

## More on React and Material-UI
@todo
