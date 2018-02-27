#!/bin/bash


# ------------------------------------------
# create directories:
mkdir dist src docs


# ------------------------------------------
# create documentation files:
cat <<EOF > docs/CHANGELOG.md
EOF

cat <<EOF > docs/ISSUES.md
EOF

cat <<EOF > README.md
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
+ [ ] update Webpack config (set global properties/options, file paths, etc.); remove TODOs
+ [ ] update this README.md with relevant info (app name, license, etc.)
+ [ ] change LICENSE if needed

### License:
Copyright © Dee Reddy. BSD-2 License.

EOF

cat <<EOF > LICENSE
BSD 2-Clause License

Copyright (c) 2018, Dee Reddy
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
EOF


# ------------------------------------------
# create core file:

cat <<EOF > .gitignore
# unversioned local files:
local/
local.*

# IDEs:
.idea/

# libraries:
node_modules/

# cached files:
.sass-cache/
*.pyc
.ipynb_checkpoints/

# misc:
*.css.map
setup.sh

EOF

cat<<EOF > package.json
{
  "name": "scaffolding",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.3",
    "webpack": "^4.0.0"
  },
  "scripts": {
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Dee Reddy",
  "license": "BSD-2-Clause",
  "homepage": "https://github.com/Deesus/scaffolding"
}


EOF


# ------------------------------------------
# install packages:
npm install


# ------------------------------------------
# clean up:

# start fresh version control:
git init
git add .
git commit -am "Initial commit."
