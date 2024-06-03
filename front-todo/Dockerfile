FROM node:19-alpine

WORKDIR /app

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
#


#
#COPY package*.json ./
COPY --chown=nonroot:nonroot package*.json ./


RUN npm install --ignore-scripts

#COPY src/ ./src/
COPY --chown=nonroot:nonroot src/ ./src/

#COPY public/ ./public/
COPY --chown=nonroot:nonroot public/ ./public/


#COPY index.html .
COPY --chown=nonroot:nonroot index.html .

COPY --chown=nonroot:nonroot vite.config.js .

# RUN mkdir -p /app/node_modules/.vite \
#     && chown -R nonroot:nonroot /app/node_modules
RUN chown -R nonroot:nonroot /app/node_modules


#
RUN npm run build


EXPOSE 3000

#USER nonroot

CMD ["npm", "start"]