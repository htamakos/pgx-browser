FROM oraclelinux:7-slim

RUN sed -i -e "/\[ol7_developer_EPEL\]/,/enabled=0/ s/enabled=0/enabled=1/" /etc/yum.repos.d/public-yum-ol7.repo
RUN yum install -y nginx java-1.8.0-openjdk.x86_64 unzip \
    && rm -rf /var/cache/yum/* \
    && yum clean all
 
RUN mkdir -p /opt/oracle
ADD ./nginx_confs/docker.conf /etc/nginx/nginx.conf
ADD ./packages/pgx-2.7.0-server.zip /opt/oracle/pgx_server.zip

RUN unzip /opt/oracle/pgx_server.zip -d /opt/oracle \
    && rm /opt/oracle/pgx_server.zip

ADD ./pgx_conf/server.conf /opt/oracle/pgx-2.7.0/conf/server.conf
ADD ./pgx_conf/pgx.conf /opt/oracle/pgx-2.7.0/conf/pgx.conf 

ADD ./docker_startup.sh /docker_startup.sh

ADD ./index.html /opt/oracle/index.html
ADD ./dest/bundle.js /opt/oracle/bundle.js
EXPOSE 80
CMD ["sh", "docker_startup.sh"]
