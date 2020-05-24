# stage: 1
FROM node as react-build
COPY package.json /app/
WORKDIR /app
RUN yarn --pure-lockfile
COPY . ./
RUN yarn build

# stage: 2
FROM nginx
COPY conf.d/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
