# Используем официальный образ Node.js для сборки приложения
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Сборка приложения
RUN npm run build

# Настраиваем сервер для статических файлов
FROM nginx:alpine

# Копируем сгенерированные статические файлы из предыдущего этапа в директорию, обслуживаемую Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурацию Nginx (необязательно, если нужен кастомный конфиг)
COPY nginx.conf /etc/nginx/nginx.conf

# Порт, который будет использоваться
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
