#!----------------------------------------------------------------------------!
#!                                                                            !
#! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
#! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
#!                                                                            !
#!----------------------------------------------------------------------------!
# Dockerfile
#
# yrelay/yrexpert-js
# Version Docker d'YRexpert JS
#
# Consulter README.md pour plus d'informations sur ce fichier Docker
# Les instructions simples de construction/fonctionnement sont ci-dessous:
#
# Construire:
# $ docker build -t yrelay/yrexpert-js-srv:latest .
#
# Utilisation avec la persistance des données:
# $ docker run --rm -e ydb_chset=utf-8 -v `pwd`/ydb-data:/data -ti yrelay/yrexpert-js-srv:latest
#
# Accès à l'invite au bash :
# $ docker run --entrypoint "/bin/bash" -it yrelay/yrexpert-js-srv:latest

# Étape 1: construire yrelay/yrexpert-js depuis l'image YottaDB
ARG INSTANCE='yrelay'
FROM debian:buster
LABEL "about"="L'interface Web pour votre système expert..."

# Mise à jour de l'image debian
ARG DEBIAN_FRONTEND=noninteractive
RUN \
  apt-get update && apt-get upgrade -y \
  && apt-get install -y libc6 nano sudo git locales \
  && apt-get clean

# Regler LOCALE sur UTF8
RUN \
  echo "fr_FR.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen fr_FR.UTF-8 \
  && dpkg-reconfigure locales \
  && /usr/sbin/update-locale LANG=fr_FR.UTF-8
ENV LC_ALL fr_FR.UTF-8

# Installer la l'instance d'YRexpert - par défaut : yrelay
RUN \
  mkdir /tmp/yrelay \
  && cd /tmp/yrelay \
  && git clone https://github.com/yrelay/yrexpert-box.git \
  && cd /tmp/yrelay/yrexpert-box/debian \
  && ./installerAuto.sh -er

# Créer un acces SSH
# Pour connaitre l'IP de votre image (xxx.xxx.xxx.xxx) :
# $ docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ID_VOTRE_IMAGE
# Pour accéder à votre instance - par défaut : yrelay :
# $ ssh -p 2222 yrelay@xxx.xxx.xxx.xxx // mot de passe : yrelay
# $ ssh -p 2222 yrelayprog@xxx.xxx.xxx.xxx // mot de passe : prog
# $ ssh -p 2222 yrelayutil@xxx.xxx.xxx.xxx // mot de passe : util
#
# ENV NOTVISIBLE "dans le profil de l'utilisateur"
# RUN \
#   echo "export VISIBLE=now" >> /etc/profile \
#
RUN \
  apt-get update && apt-get install -y openssh-server \
  && mkdir /var/run/sshd \
  && echo 'root:root' | chpasswd \
  && sed 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' -i /etc/ssh/sshd_config \
  && sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
# Correctif de connexion. Sinon, l'utilisateur est lancé après la connexion

# Pour accéder à votre instance - par défaut : yrelay :
# Pour accéder à votre instance - par défaut : yrelay :
# EXPOSE \
#   "2280:8080" # yrexpert-js \
#   "2281:8081" # yrexpert-term \
#   "2282:8082" # yrexpert-rpc \
#   "2283:8083" # Libre pour test \
#   "2222:22"   # Accès SSH à yrelay
# /home/yrelay/scripts


EXPOSE 22/tcp 8080-8083/tcp

# TODO $instance
COPY ./docker-entrypoint.sh /home/yrelay/scripts/docker-entrypoint.sh
ENTRYPOINT ["/home/yrelay/scripts/docker-entrypoint.sh"]

CMD ["/usr/sbin/sshd", "-D"]
