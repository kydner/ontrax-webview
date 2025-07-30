FROM node:20 AS builder

RUN npm config set strict-ssl false \
    && npm config set cache /app/.npm-cache --global \
    && yarn config set strict-ssl false \
    && yarn config set cache-folder /app/.yarn-cache

WORKDIR /app

COPY package*.json yarn*.lock ./

RUN if ! command -v yarn >/dev/null 2>&1; then npm install -g yarn; fi

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/spa /usr/share/nginx/html/bakamla

COPY nginx.d.conf /etc/nginx/conf.d/bakamla.d.conf

# copy folder dist to docker nginx folder
# COPY ./dist/spa/ /usr/share/nginx/html/bakamla
