#!/bin/bash

cd /var/www/domain-checker
git pull
npm install
npm run build 
pm2 restart domain-checker