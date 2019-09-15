#!/usr/bin/env bash
#!----------------------------------------------------------------------------!
#!                                                                            !
#! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
#! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
#!                                                                            !
#!----------------------------------------------------------------------------!
# docker-entrypoint.sh

echo '!----------------------------------------------------------------------------!'
echo
echo '  IP = ' `hostname -I`
echo 
echo '                       *** Accès en mode terminal ***'
echo "Pour vous connecter en tant qu'utilisateur utilisant l'instance yrelay (par défaut) :"
echo '  $ ssh -p 50022 yrelayutil@localhost # mode de passe = util'
echo
echo '                          ***Accès en mode WEB***'
echo "Pour accéder à l'administration du serveur yrexpert-js-srv tapez dans l'URL de votre navigateur le lien suivant : "
echo '  http://localhost:50080/yrexpert/index.html'
echo
echo '!----------------------------------------------------------------------------!'

service ssh start
service yrelayyrexpert start
service yrelayyrexpert-js start
bash
