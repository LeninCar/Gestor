FROM node:19-alpine

WORKDIR /app

# Create a non-root user and group
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

# Copy package files and install dependencies
COPY --chown=nonroot:nonroot package*.json ./
RUN npm install --ignore-scripts

# Copy application source files and set ownership
COPY --chown=nonroot:nonroot src/ ./src/
COPY --chown=nonroot:nonroot public/ ./public/
COPY --chown=nonroot:nonroot index.html .

# Copy Vite configuration file
COPY --chown=nonroot:nonroot vite.config.js .
RUN chmod 644 /app/vite.config.js

# Ensure node_modules directory is owned by nonroot user
RUN chown -R nonroot:nonroot /app/node_modules


# Build the application
RUN npm run build

RUN chown -R nonroot:nonroot /app/dist

RUN chown -R nonroot:nonroot /app

# Expose the port Vite uses
EXPOSE 3000

# Switch to the non-root user
USER nonroot

# Define the command to run the application
CMD ["npm", "start"]
