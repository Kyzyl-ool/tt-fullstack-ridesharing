# stage: 1
FROM node as react-build
COPY package.json /app/
WORKDIR /app
RUN yarn --pure-lockfile
COPY . ./
RUN yarn build --env.MAPBOX_TOKEN="$MAPBOX_TOKEN"

# stage: 2
FROM nginx
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
