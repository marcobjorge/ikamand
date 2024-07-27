FROM node:lts
# Override during build:
# docker build --build-arg ip_address=x.x.x.x -t ikamand .
ARG ip_address=192.168.10.1
# Make build arg available to runtime
ENV ip_address=${ip_address}
ENV NODE_ENV=production
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install --ci
ENTRYPOINT node /app/index.js -i "${ip_address}"