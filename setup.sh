#!/bin/bash

# ------------------------------------------
# install packages:
npm install


# ------------------------------------------
# create documentation files:
cat <<EOF > CHANGELOG.md
EOF

cat <<EOF > local.README.md
# TODO: APP_NAME
###### TODO: APP_DESCRIPTION

### Requirements:

### Quickstart:

### Requirements:
- git
- NodeJS
- npm

### TODO:
+ [ ] update package.json (name of application, etc.)
+ [ ] replace file paths in Gulpfile.js
    + [ ] remove completed TODOs from Gulpfile
+ [ ] update this README.md with relevant info (app name, license, etc.)
+ [ ] change LICENSE if needed

### License:
Copyright © Dee Reddy. BSD-2 License.
EOF


# ------------------------------------------
# create directories:


## TODO: uncomment the following section for production. WARNING: removes entire revision history.
## ------------------------------------------
## clean up:
## start fresh version control:
#rm -r .git
#git init
#git add .
#git commit -am "Initial commit."
