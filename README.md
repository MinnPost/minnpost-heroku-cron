# MinnPost Cron

A cron server for various things, meant to run on Heroku

## Setup

1. ```heroku apps:create minnpost-cron```
2. ```heroku addons:add scheduler:standard```

For AWS access, set environment variables:

1. ```heroku config:add AWS_ACCESS_KEY_ID=SDFJKSLDKFJ```
1. ```heroku config:add AWS_SECRET_ACCESS_KEY=SDFJKSLDKFJ```