#!/usr/bin/env bash
#!----------------------------------------------------------------------------!
#!                                                                            !
#! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
#! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
#!                                                                            !
#!----------------------------------------------------------------------------!

# Script d'installation de yrexpert-js, EWD.js et autres modules nodejs

# Vérifier la présence des variables requises
if [[ -z $instance && $gtmver && $gtm_dist && $basedir ]]; then
    echo "Les variables requises ne sont pas définies (instance, gtmver, gtm_dist)"
fi

# Définir la version de node
nodever="6" #version LST

# Définir la variable arch
arch=$(uname -m | tr -d _)

# Exécuter en tant que propriétaire de l'instance
if [[ -z $basedir ]]; then
    echo "La variable requise \$instance n'existe pas"
fi

echo "Installer yrexpert-js"

# Copier les scripts init.d dans le répertoite scripts de yrexpert
su $instance -c "cp -R config $basedir"

# Aller à $basedir
cd $basedir

# Installer node.js en utilisant NVM (node version manager) - https://github.com/creationix/nvm
echo "Télécharger et installer NVM"
su $instance -c "curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash"
echo "Installation de NVM terminé"

# Installer node $nodever
su $instance -c "source $basedir/.nvm/nvm.sh && nvm install $nodever > /dev/null 2>&1 && nvm alias default $nodever && nvm use default"

# Dire à $basedir/config/env notre nodever
echo "export nodever=$nodever" >> $basedir/config/env

# Dire à nvm d'utiliser la version de node dans .profile et .bash_profile
if [ -s $basedir/.profile ]; then
    echo "" >> $basedir/.profile
    echo "source \$HOME/.nvm/nvm.sh" >> $basedir/.profile
    echo "nvm use $nodever" >> $basedir/.profile
fi

if [ -s $basedir/.bash_profile ]; then
    echo "source \$HOME/.nvm/nvm.sh" >> $basedir/.bash_profile
    echo "nvm use $nodever" >> $basedir/.bash_profile
fi

# Créer les répertoires pour node
su $instance -c "source $basedir/config/env && mkdir $basedir/nodejs"

# Créer un script d'installation silencieux pour EWD.js
cat > $basedir/nodejs/silent.js << EOF
{
    "silent": true,
    "extras": false
}
EOF

# Mettre les droits corrects
chown $instance:$instance $basedir/nodejs/silent.js

# Créer un script d'installation silencieux pour yrexpert-term
cat > $basedir/nodejs/yrexpert-termSilent.js << EOF
{
    "silent": true,
    "extras": true
}
EOF

# Mettre les droits corrects
chown $instance:$instance $basedir/nodejs/yrexpert-termSilent.js

# Créer un script d'installation silencieux pour yrexpert-js
cat > $basedir/nodejs/yrexpert-jsSilent.js << EOF
{
    "silent": true,
    "extras": true
}
EOF

# Mettre les droits corrects
chown $instance:$instance $basedir/nodejs/yrexpert-jsSilent.js


# Installer les modules de node requis dans $basedir/nodejs
# L'installation de yrexpert-js comprend :
# * les modules yrexpert :
#    yrexpert-term - Terminal mode navigateur pour yrexpert-js...
#    yrexpert-rpc - Accès REST aux RPCs de yrexpert... 
#    yrexpert-gtm - Intégrer des modules workers avec la base de données GT.M
# * les modules standard : 
#    express
#    toastr
#    body-parser
#    moment
#    reactify
#    nodem
# * les modules de node ewd :
#    ewd-qoper8-express
#    ewd-xpress
#    ewd-qoper8
#    ewd-session
#    ewd-document-store
#    ewd-client
#    ewd-react-tools
#    ewd-xpress-react
# * les outils de développement :
#    react
#    react-dom
#    react-json-inspector
#    babelify
#    babel-preset-react
#    react-bootstrap
#    react-toastr
#    react-select
#    socket.io-client
#    jquery
#    babel-preset-es2015 - à supprimer car deprecated *****
#    babel-preset-env
#    babel-plugin-transform-object-rest-spread
#    babel-preset-stage-0
#    babel-preset-stage-1
#    babel-preset-stage-2
#    babel-preset-stage-3
#    webpack - 171001
#    webpack-dev-server - 171001
#    babel-core - 171001
#    babel-loader - 171001
#    babel-preset-react-hmre - 171001
#    react-router - 171001
# * le générateur de documentation :
#    jsdoc
# Les outils installés en mode global :
#    browserify"
#    uglify-js"

# Installer les modules de node requis
cd $basedir/nodejs
#echo "0/5 Initialiser le fichier package.json"
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm set init.author.email 'info@yrelay.fr' >> $basedir/log/initNpm.log"
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm set init.author.name 'yrelay' >> $basedir/log/initNpm.log"
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm set init.license 'GPL-3.0' >> $basedir/log/initNpm.log"
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm set init.description 'Interface Web pour votre système expert...' >> $basedir/log/initNpm.log"
#su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm set init.keywords '[yrexpert-js]' >> $basedir/log/initNpm.log"
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm init -y >> $basedir/log/initNpm.log"

# Installer en mode global
echo "1/5 browserify" # http://doc.progysm.com/doc/browserify
###npm install --quiet -g browserify >> $basedir/log/installerBrowserify.log && chown $instance:$instance $basedir/log/installerBrowserify.log
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm install --quiet -g browserify >> $basedir/log/installerBrowserify.log"
echo "2/5 uglify-js"
###npm install --quiet -g uglify-js >> $basedir/log/installerUglify-js.log && chown $instance:$instance $basedir/log/installerUglify-js.log
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm install --quiet -g uglify-js >> $basedir/log/installerUglify-js.log"
echo "3/5 marked"
###npm install --quiet -g marked@0.3.6 >> $basedir/log/installerMarked.log && chown $instance:$instance $basedir/log/installerMarked.log
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm install --quiet -g marked@0.3.6 >> $basedir/log/installerMarked.log"
echo "4/5 react-tools"
###npm install --quiet -g react-tools@0.13.3 >> $basedir/log/installerReact-tools.log && chown $instance:$instance $basedir/log/installerReact-tools.log
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm install --quiet -g react-tools@0.13.3 >> $basedir/log/installerReact-tools.log"
# Installer le module yrexpert-js
echo "5/5 yrexpert-js"
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && npm install --quiet --save-prod --save-dev yrexpert-js >> $basedir/log/installerYRexpert-js.log"

# Certaines distributions linux installent nodejs non comme exécutable "node" mais comme "nodejs".
# Dans ce cas, vous devez lier manuellement à "node", car de nombreux paquets sont programmés après le node "binaire". Quelque chose de similaire se produit également avec "python2" non lié à "python".
# Dans ce cas, vous pouvez faire un lien symbolique. Pour les distributions linux qui installent des binaires de package dans /usr/bin, vous pouvez faire
if [ -h /usr/bin/node ]; then
  rm -f /usr/bin/node
fi
ln -s /usr/bin/nodejs /usr/bin/node

echo "Créer le fichier bundle.js requis par l'application"
su $instance -c "cd $basedir/nodejs/node_modules/yrexpert-js && rm -rf build && mkdir build"
#su $instance -c "cd $basedir/nodejs/node_modules/yrexpert-js/src/js && browserify -t [ babelify --compact false --presets [es2015 react stage-2] ] App.js | uglifyjs > ../../build/bundle.js"
su $instance -c "cd $basedir/nodejs/node_modules/yrexpert-js/src/js && browserify -t [ babelify --compact false --presets [es2015 react stage-3] ] App.js | uglifyjs > ../../build/bundle.js"

su $instance -c "cd $basedir/nodejs/node_modules/yrexpert-js && cp -f src/index.html build/index.html"
su $instance -c "cd $basedir/nodejs/node_modules/yrexpert-js && cp -f src/css/json-inspector.css build/json-inspector.css"
su $instance -c "cd $basedir/nodejs/node_modules/yrexpert-js && cp -f src/css/Select.css build/Select.css"
su $instance -c "cd $basedir/nodejs/node_modules/yrexpert-js && cp -rf src/images build/images"
# Mettre les droits
chown -R $instance:$instance $basedir/nodejs/node_modules/yrexpert-js/build
chmod -R g+rw $basedir/nodejs/node_modules/yrexpert-js/build
rm -rf $basedir/nodejs/www/yrexpert
if [ ! -d "$basedir/nodejs/www/yrexpert" ];then
  su $instance -c "mkdir $basedir/nodejs/www/yrexpert && cp -rf $basedir/nodejs/node_modules/yrexpert-js/build/* $basedir/nodejs/www/yrexpert"
  su $instance -c "mkdir $basedir/nodejs/www/yrexpert/docs && cp -rf $basedir/nodejs/node_modules/yrexpert-js/docs/* $basedir/nodejs/www/yrexpert/docs"
  su $instance -c "mkdir $basedir/nodejs/www/yrexpert/help && cp -rf $basedir/nodejs/node_modules/yrexpert-js/help/* $basedir/nodejs/www/yrexpert/help"
  # Mettre les droits
  chown -R $instance:$instance $basedir/nodejs/www/yrexpert
  chmod -R g+rw $basedir/nodejs/www/yrexpert
fi

# Créer le répertoire docs utilisé par l'application
su $instance -c "cd $basedir/nodejs/node_modules/yrexpert-js && rm -rf docs && mkdir docs"
su $instance -c "cd $basedir/nodejs/node_modules/yrexpert-js && ../.bin/jsdoc lib src -r -d docs"
# Mettre les droits
chown -R $instance:$instance $basedir/nodejs/node_modules/yrexpert-js/docs
chmod -R g+rw $basedir/nodejs/node_modules/yrexpert-js/docs

# ewd-express
echo "Copier les fichiers ewd-express"
su $instance -c "mkdir $basedir/nodejs/www/ewd-xpress-monitor"
su $instance -c "cp $basedir/nodejs/node_modules/ewd-xpress-monitor/www/bundle.js $basedir/nodejs/www/ewd-xpress-monitor"
su $instance -c "cp $basedir/nodejs/node_modules/ewd-xpress-monitor/www/*.html $basedir/nodejs/www/ewd-xpress-monitor"
su $instance -c "cp $basedir/nodejs/node_modules/ewd-xpress-monitor/www/*.css $basedir/nodejs/www/ewd-xpress-monitor"

# Copier mumps$nodever.node_$arch
#su $instance -c "cp $basedir/nodejs/node_modules/nodem/lib/mumps"$nodever".node_$arch $basedir/nodejs/mumps.node"
#su $instance -c "mv $basedir/nodejs/node_modules/nodem/lib/mumps"$nodever".node_$arch $basedir/nodejs/node_modules/nodem/lib/mumps.node"

# Copier toutes les routines de yrexpert-js
su $instance -c "find $basedir/nodejs/node_modules/yrexpert-js -name \"*.m\" -type f -exec cp {} $basedir/p/ \;"

# Configurer de GTM C Callin
# avec nodem 0.3.3 le nom de la ci a changé. Déterminer l'utilisation ls -1
calltab=$(ls -1 $basedir/nodejs/node_modules/nodem/resources/*.ci)
echo "export GTMCI=$calltab" >> $basedir/config/env
# Ajouter les routines nodem dans gtmroutines
echo "export gtmroutines=\"\${gtmroutines}\"\" \"\$basedir/nodejs/node_modules/nodem/src" >> $basedir/config/env

# Ajouter les routines yrexpert-RPC dans gtmroutines
########echo "export gtmroutines=\"\${gtmroutines}\"\" \"\$basedir/nodejs/node_modules/yrexpert-RPC/mumps" >> $basedir/config/env
######su $instance -c "cp $basedir/nodejs/node_modules/yrexpert-rpc/mumps/*.m $basedir/s"

# Créer la configuration ewd.js
cat > $basedir/nodejs/node_modules/yrelay-config.js << EOF
module.exports = {
  setParams: function() {
    return {
      ssl: true
    };
  }
};
EOF

# Mettre les droits corrects
chown $instance:$instance $basedir/nodejs/node_modules/yrelay-config.js

# Installer les droits webservice
#echo "Installer les droits webservice"
#su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/config/env && nvm use $nodever && cd $basedir/nodejs && node registerWSClient.js"

# Modifier les scripts init.d pour les rendre compatibles avec $instance
perl -pi -e 's#y-instance#'$instance'#g' $basedir/config/init.d/yrexpert-js

# Créer le démarrage de service
# TODO: A supprimer
if [ -h /etc/init.d/${instance}yrexpert-js ]; then
    rm /etc/init.d/${instance}yrexpert-js
fi
ln -s $basedir/config/init.d/yrexpert-js /etc/init.d/${instance}yrexpert-js

# Installer le script init
if [[ $debian || -z $RHEL ]]; then
    update-rc.d ${instance}yrexpert-js defaults
fi

if [[ $RHEL || -z $debian ]]; then
    chkconfig --add ${instance}yrexpert-js
fi

# Add firewall rules
if [[ $RHEL || -z $debian ]]; then
    iptables -I INPUT 1 -p tcp --dport 8080 -j ACCEPT # EWD.js
    iptables -I INPUT 1 -p tcp --dport 8000 -j ACCEPT # EWD.js Webservices
    iptables -I INPUT 1 -p tcp --dport 8081 -j ACCEPT # EWD yrexpert Term
    iptables -I INPUT 1 -p tcp --dport 8082 -j ACCEPT # Pour test
    iptables -I INPUT 1 -p tcp --dport 3000 -j ACCEPT # Débuggeur node-inspector

    service iptables save
fi

# Démarrer le service
service ${instance}yrexpert-js start

echo "Installation EWD.js terminée..."





