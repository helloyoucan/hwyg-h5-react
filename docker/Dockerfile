FROM nginx
RUN mkdir /usr/share/nginx/app \
	mkdir /etc/nginx/cert \
    && rm -rf /etc/nginx/nginx.conf \
    && /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' >/etc/timezone
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/app
COPY ./cert/ /etc/nginx/cert/
EXPOSE 443
