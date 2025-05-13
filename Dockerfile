FROM node:18

WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install -g pm2

# Copy root-level config
COPY package*.json ./
COPY ecosystem.config.cjs ./

# (Optional) Install root-level deps
RUN npm install

# Copy microservices
COPY ./email-service ./email-service
COPY ./user-service ./user-service
COPY ./order-service ./order-service

# Install microservices' deps
RUN cd ./email-service && npm install
RUN cd ./user-service && npm install
RUN cd ./order-service && npm install

# Start all services via PM2
CMD ["pm2-runtime", "ecosystem.config.cjs"]