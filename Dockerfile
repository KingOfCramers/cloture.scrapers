FROM node:15.2.0
LABEL maintainer="kingofcramers.dev@gmail.com"
WORKDIR /app

# Install Chromium (https://stackoverflow.com/questions/62345581/node-js-puppeteer-on-docker-no-usable-sandbox)
RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     # We install Chrome to get all the OS level dependencies, but Chrome itself
     # is not actually used as it's packaged in the node puppeteer library.
     # Alternatively, we could could include the entire dep list ourselves
     # (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)
     # but that seems too easy to get out of date.
     && apt-get install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

############
## NodeJS ##
############

COPY package*.json .
RUN npm install

# Copy over Typescript sources, compile project into build folder
COPY modules.d.ts global.d.ts tsconfig.json .
COPY src ./src
RUN npm run prod:build

# Set timezone to EST
ENV TZ=America/New_York

CMD ["node", "build/index.js"]
