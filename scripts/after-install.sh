#!/bin/bash

cd /var/www/domain-checker
npm run build 
pm2 restart domain-checker