FROM node:12
WORKDIR /app
ADD package.json /app/package.json
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install
ADD . /app
EXPOSE 3001
CMD ["npm", "run", "start"]
