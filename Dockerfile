FROM node:15.5.1-alpine3.10

RUN mkdir -p /home/HelloErmine-Game-PR/HelloErmine-GamePR/app && chown -R node:node /home/HelloErmine-Game-PR/HelloErmine-GamePR/app

RUN apk update && apk upgrade


WORKDIR  /home/HelloErmine-Game-PR/HelloErmine-GamePR/app
COPY .  /home/HelloErmine-Game-PR/HelloErmine-GamePR/app
RUN yarn install
RUN yarn deploy

#USER node

EXPOSE 443

CMD [ "yarn", "start" ]
