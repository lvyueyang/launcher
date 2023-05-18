#!/bin/bash

git clone https://github.com/lvyueyang/launcher.git --branch gh-pages --single-branch gh-pages-tmp

npm run build:demo

rm -rf gh-pages-tmp/*
cp -R dist/* gh-pages-tmp/

# Commit and push the changes
cd gh-pages-tmp
git add .
git commit -m "Update gh-pages"
git push origin gh-pages

# Clean up
cd ..
rm -rf gh-pages-tmp