FROM ubuntu:22.04

RUN apt update
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_22.x -o /tmp/install.sh
RUN bash /tmp/install.sh
RUN apt install nodejs -y
WORKDIR /srv
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "bash", "entrypoint.sh" ]