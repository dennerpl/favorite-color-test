FROM node:20.12.1
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./
COPY . .
RUN npx prisma generate
RUN npm rebuild bcrypt --build-from-source
EXPOSE 3001
CMD ["npm", "run", "start:prod"]