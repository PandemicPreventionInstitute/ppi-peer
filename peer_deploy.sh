# This script is used to build the PEER application and deploy it
# This script also assumes the following are installed and configured on your device:
#   * git
#   * Node.js
#   * Yarn package manager
#   * AWS CLI (including configured access key credentials with S3 and CloudFront full permissions)

# Step 1: Checkout the dev branch and build the source project
git checkout dev
git pull # make sure you are building the latest version of the dev branch
yarn build:local

# Step 2: Upload build folder to S3 using AWS CLI
aws s3 cp build/ s3://ppi-estimator/ --recursive --exclude 'constants/*' --acl public-read

# Step 3: Invalidate current cloudfront
aws cloudfront create-invalidation --distribution-id EATXR4I42SDP4 --paths "/" "/*" "/*/*"
