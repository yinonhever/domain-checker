#!/bin/bash

cd /var/www/domain-checker
sudo -u ec2-user git pull
sudo -u ec2-user npm install
sudo -u ec2-user npm run build 
sudo -u ec2-user /usr/local/bin/pm2 restart domain-checker