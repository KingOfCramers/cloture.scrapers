# ts_cloture.app.scrapers

### These are the scrapers that feed congressional hearing information to Cloture with Puppeteer.

This project uses Bull.js to create a queue of scrapers to various congressional committee websites.

## Installation

`yarn install`

## Configuration

Must add development variables for Node.js runtime, `.development.env` looks as follows:

```
MONGODB_URI="mongodb://username:password@localhost:27017/database?authSource=admin"
MONGODB_USER=username
MONGODB_PASS=password
REDIS_PORT=6379
REDIS_URL="127.0.0.1"
MONGOOSE_LOGS=true
HEADLESS=true

```

When the scrapers are processed, each is passed to the browser we have open (Chromium) which then runs a puppeteer scraping routine.

The results of the job are passed back to the listener queue, which then takes the data and saves it to our database.

These processes communicate over Redis.
