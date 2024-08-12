# Should work with Node 14++. Node 20 is LTS as of 2024-08-12
FROM node:20
# Override during build:
# docker build --build-arg ip_address=x.x.x.x -t ikamand .
ARG ip_address=192.168.10.1
# Make build arg available to runtime
ENV IP_ADDRESS=${ip_address}  
ENV NODE_ENV=production
RUN mkdir -p /app
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install --ci
COPY . /app
ENTRYPOINT node /app/index.js -i "${IP_ADDRESS}"