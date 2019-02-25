FROM python:3.6

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y vim less sudo aptitude
RUN apt-get install -y mecab libmecab-dev mecab-ipadic mecab-ipadic-utf8
RUN apt-get update
RUN apt-get install -y postgresql-9.4
RUN apt-get install -y libpq-dev
RUN apt-get install -y python-psycopg2
RUN mkdir -p /var/www/lovie/
RUN mkdir -p /usr/local/lib/mecab/dic/mecab-ipadic-neologd
COPY ./requirements.txt /opt/
RUN pip install -r /opt/requirements.txt
RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git
WORKDIR /mecab-ipadic-neologd
RUN ./bin/install-mecab-ipadic-neologd -n -y -p /usr/local/lib/mecab/dic/mecab-ipadic-neologd

RUN groupadd -r uwsgi \
    && useradd -r -g uwsgi uwsgi \
    && mkdir /home/uwsgi \
    && chown uwsgi:uwsgi /home/uwsgi \
    && chown -R uwsgi:uwsgi /var/www/lovie

WORKDIR /var/www/lovie
USER uwsgi
EXPOSE 8000
