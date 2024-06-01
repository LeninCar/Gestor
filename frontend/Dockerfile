FROM node:19-alpine

WORKDIR /app

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
#

#USER nonroot

COPY --chown=nonroot:nonroot package*.json ./

RUN npm install --ignore-scripts

COPY --chown=nonroot:nonroot src/ ./src/
COPY --chown=nonroot:nonroot public/ ./public/

#USER nonroot
#RUN --chown=nonroot:nonroot npm run build
RUN  npm run build

EXPOSE 3000

#USER nonroot

CMD ["npm", "start"]