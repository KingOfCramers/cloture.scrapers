# 🏛️ Cloture Scrapers

These are the webscrapers that pull down information for [Cloture.app](https://www.cloture.app), an online tool for journalists tracking congressional committee procedures.

The project uses [Bull.js](https://github.com/OptimalBits/bull) to handle the processing of roughly 40 different congressional committee websites.

_NOTE: This project requires connections to Redis and MongoDB, which must be installed locally in development. See the Environment section for how to configure them. It also requires a local installation of Chromium._

## Development

You must install and configure Chromium, Redis, and MongoDB locally.

1. `npm install`
2. `npm run dev:start`

## Production

1. `docker build -t cloture_scrapers:latest .`
2. `docker run -dit --env NODE_ENV=production --env-file .env cloture_scrapers:latest`

## Environment

This project connects to [Redis](https://redis.io/) for the queue and to [MongoDB](https://docs.mongodb.com/manual/installation/) for storage of the results of the scraping. In development (if you're on OSX) I'd recommend installing both with [Homebrew](https://brew.sh/).

In production, I'm using free cloud-based storage options to avoid having to configure these in separate docker containers. Redis' free option is available on [redislabs.com](redislabs.com); MongoDB likewise offers a managed DB which is adequate for this project.

Development `.env` file:

```
MONGODB_URI="mongodb://username:password@localhost:27017/database?authSource=admin"
MONGODB_USER=username
MONGODB_PASS=password
REDIS_PORT=6379
REDIS_URL="127.0.0.1"
MONGOOSE_LOGS=true
HEADLESS=true
```

Production`.env` file:

```
MONGODB_URI=mongodb+srv://username:password@connection-string-on-mongodb's-cloud-service
REDIS_URL=redis-special-url-goes-here.cloud.redislabs.com
REDIS_PASSWORD=your_password
REDIS_PORT=your_port
```

## How does this work?

Each congressional committee has certain instructions stored in a simple Javascript object. These are the tags to grab, and specific instructions that we'll use inside of Puppeteer when scraping the page. Each job is setup to run every half hour. Our BullJS queue sends the results of the completed jobs to the listener queue, which then takes the data and saves it to our database. All of the jobs communicate over Redis.
