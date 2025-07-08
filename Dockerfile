# Étape 1 : Construire l'application
FROM node:20-alpine AS build
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers de l'application et construire l'application
COPY . .
RUN npm run build

# Étape 2 : Configurer l'image de production
FROM node:20-alpine AS production

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour exécuter l'application
COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./build
COPY --from=build /app/src ./src
COPY --from=build /app/static ./static
COPY --from=build /app/svelte.config.js ./svelte.config.js

# Installer les dépendances de production
RUN npm install --omit=dev

EXPOSE 3000

# Démarrer l'application
CMD ["node", "/app/build/index.js"]