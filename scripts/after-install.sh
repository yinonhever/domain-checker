#!/bin/bash

cd /var/www/domain-checker
sudo git pull
sudo npm install
sudo npm run build 
sudo pm2 restart domain-checker