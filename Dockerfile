# --- STAGE 1: Build Stage (Code ko pack karna) ---
# Node.js ka base environment laao
FROM node:18-alpine as builder

# Dabbe ke andar '/app' naam ka folder banao
WORKDIR /app

# Dependencies (package.json) ki list copy karo
COPY package*.json ./

# Saari libraries install karo
RUN npm install

# Apne laptop se saara code dabbe mein copy karo
COPY . .

# Vite ka production build (dist folder) banao
RUN npm run build

# --- STAGE 2: Server Stage (Website chalana) ---
# Ek halka-fulka Nginx web server laao
FROM nginx:alpine

# Purane stage se 'dist' folder uthao aur Nginx ke public folder mein daal do
COPY --from=builder /app/dist /usr/share/nginx/html

# Port 80 ko open rakho taaki log website dekh sakein
EXPOSE 80

# Server ko background mein chalu rakho
CMD ["nginx", "-g", "daemon off;"]