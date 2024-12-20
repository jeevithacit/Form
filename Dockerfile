# 1. Use Node.js
FROM node:18

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy both frontend and backend files
COPY ./backend ./backend
COPY ./frontend ./frontend

# 4. Install backend dependencies
WORKDIR /usr/src/app/backend
RUN npm install

# 5. Install frontend dependencies
WORKDIR /usr/src/app/frontend
RUN npm install

# 6. Expose the ports
EXPOSE 3000 3001

# 7. Command to run both frontend and backend
CMD ["sh", "-c", "cd /usr/src/app/backend && node server.js & cd /usr/src/app/frontend && npm start"]
