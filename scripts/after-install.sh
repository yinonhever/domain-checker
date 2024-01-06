#!/bin/bash

cd /var/www/domain-checker
sudo git pull
sudo npm install
sudo npm run build 
sudo -u ec2-user /usr/local/bin/pm2 restart domain-checker