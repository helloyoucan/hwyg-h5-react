FROM nginx
RUN mkdir /usr/share/nginx/app \
    && rm -rf /etc/nginx/nginx.conf \
    && /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' >/etc/timezone
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/app
EXPOSE 8080
