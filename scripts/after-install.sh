#!/bin/bash

cd /var/www/domain-checker
git config --global --add safe.directory /var/www/domain-checker
sudo chown -R root:ec2-user /var/www/domain-checker
sudo chmod -R 775 /var/www/domain-checker
sudo -u ec2-user git stash 
sudo -u ec2-user git pull
sudo -u ec2-user npm install
sudo -u ec2-user npm run build 
sudo -u ec2-user /usr/local/bin/pm2 restart domain-checker