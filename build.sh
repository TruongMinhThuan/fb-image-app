#!/bin/bash
yarn build
mv -v build/static/js/main.*.js build/static/js/main.js
mv -v build/static/css/main.*.css build/static/css/main.css