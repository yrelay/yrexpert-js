/*

#!----------------------------------------------------------------------------!
#!                                                                            !
#! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
#! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
#!                                                                            !
#!----------------------------------------------------------------------------!

 Build 1: 16 janvier 2016

*/

var readline = require('readline');
var os = require('os');
var fs = require('fs');

var copyFilesInDirectory = function(oldPath, newPath) {
  console.log("Déplacer les fichiers dans " + oldPath + " vers " + newPath);
  var files = fs.readdirSync(oldPath);
  //if (files) console.log(files.length + ' fichiers trouvés');
  var file;
  var stats;
  var oldFilePath;
  var newFilePath;
  var error = false;
  for (var i = 0; i < files.length; i++) {
    file = files[i];
    //console.log('Fichier : ' + file);
    stats = fs.lstatSync(oldPath + '/' + file);
    if (stats.isFile()) {
      oldFilePath = oldPath + '/' + file;
      newFilePath = newPath + '/' + file;
      try {
        fs.renameSync(oldFilePath, newFilePath);
      }
      catch(err) {
        error = true;
        console.log('Impossible de déplacer ' + oldPath + ' - vérifier les droits');
        console.log('Erreur : ' + err);
      }
    }
  }
  return error
};


var moveDirectory = function(oldPath, newPath) {
  console.log("Déplacer le répertoire " + oldPath + " vers " + newPath);
  var error = false;
  if (fs.existsSync(oldPath)) {
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);    
    }
    // Passer par les sous-répertoires

    var files = fs.readdirSync(oldPath);
    var file;
    var stats;
    if (files) for (var i = 0; i < files.length; i++) {
      file = files[i];
      stats = fs.lstatSync(oldPath + '/' + file);
      if (stats.isDirectory()) {
        oldSubDirectoryPath = oldPath + '/' + file;
        newSubDirectoryPath = newPath + '/' + file;
        error = moveDirectory(oldSubDirectoryPath, newSubDirectoryPath);
        if (error) break;
      }
    }
    // Copier tous les fichiers dans ce répertoire
    if (error) return error;

    error = copyFilesInDirectory(oldPath, newPath);
    if (error) {
      return error;
    }
    else {
      fs.rmdirSync(oldPath);
    }
  }
  else {
    console.log('Mise en garde : ' + oldPath + ' le module yrexpert-js n\'existe plus dans le répertoire');
  }
  return error;

};

var deleteDirectory = function(path) {
  var files = [];
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // Récurant
        deleteDirectory(curPath);
      } 
      else { // Supprimer le fichier
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

var tidyUp = function(path) {
  var postinstallPath = path + '/node_modules/yrexpert-js/postinstall';
  fs.unlinkSync(postinstallPath + '/install.js');
  process.chdir(path);
  fs.rmdirSync(postinstallPath);
}; 

var installEWD = function(path) {
  var installErrors = false;
  console.log('installer yrexpert-js vers ' + path);
  //if (os.type() === 'Linux') {}

  var postinstallPath = path + '/node_modules/yrexpert-js/postinstall';

  // Copier le répertoire /www dans yrexpert-js

  var oldPath = postinstallPath + '/www';
  var newPath = path + '/www';
  installErrors = moveDirectory(oldPath, newPath);
  if (installErrors) {
    console.log('Installation interrompue');
    return;
  }

  // Créer le répertoire /ssl si ce n'est pas déjà fait

  newPath = path + '/ssl';
  if (!fs.existsSync(newPath)) fs.mkdirSync(newPath);

  oldPath = postinstallPath + '/node_modules';
  newPath = path + '/node_modules';
  installErrors = moveDirectory(oldPath, newPath);
  // Le répertoire a été déplacé
  //installErrors = copyFilesInDirectory(oldPath, newPath);

  if (installErrors) {
    console.log('Installation interrompue');
    return;
  }
  // Le répertoire a été déplacé
  //fs.rmdirSync(oldPath);

  console.log('yrexpert-js a été installé et configuré avec succès');

};

var installExtras = function(path) {
  var installErrors = false;
  console.log('Installer des ressources supplémentaires à yrexpert-js ' + path);

  var extrasPath = path + '/node_modules/yrexpert-js/extras';

  var oldPath = extrasPath + '/node_modules';
  var newPath = path + '/node_modules';
  var installErrors = copyFilesInDirectory(oldPath, newPath);

  if (installErrors) {
    console.log('Installation interrompue');
    return;
  }
  fs.rmdirSync(oldPath);

  oldPath = extrasPath + '/ssl';
  newPath = path + '/ssl';
  installErrors = copyFilesInDirectory(oldPath, newPath);

  if (installErrors) {
    console.log('Installation interrompue');
    return;
  }
  fs.rmdirSync(oldPath);

  oldPath = extrasPath + '/startupExamples';
  newPath = path ;
  installErrors = copyFilesInDirectory(oldPath, newPath);

  if (installErrors) {
    console.log('Installation interrompue');
    return;
  }
  fs.rmdirSync(oldPath);

  oldPath = extrasPath + '/www';
  newPath = path + '/www';
  installErrors = moveDirectory(oldPath, newPath);

  if (installErrors) {
    console.log('Installation interrompue');
    return;
  }
  deleteDirectory(oldPath);

};

// *********************************************************************
//
//    Commence ici
//
// *********************************************************************


// Mode silencieux : Essayer de lire les options de configuration à partir du fichier nommé yrexpert-jsSilent.js

/* 
  Exemple, le contenu du fichier pourrait être :
     {
       "silent": true,
       "extras": false
     }
*/

var installPath;
var params = {
  silent: false
};
var paramsFile = '../../yrexpert-jsSilent.js';
if( fs.existsSync(paramsFile) ) {
  try {
    params = JSON.parse(fs.readFileSync(paramsFile, 'utf8'));
    fs.unlinkSync(paramsFile);
  }
  catch(err) {
    // Mode silencieux :
  }
}

if (params.silent) {
  if (!params.installPath) {
    process.chdir('../..');
    installPath = process.cwd();
  }
  else {
    installPath = params.installPath;
  }
  installEWD(installPath);
  if (params.extras) {
    installExtras(installPath);
  }
  else {
    var extrasPath = installPath + '/node_modules/yrexpert-js/extras';
    deleteDirectory(extrasPath);
  }
  tidyUp(installPath);
  process.chdir(installPath);
  return;
}

// Mode interactif :

var interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.chdir('../..');
console.log(' ');

interface.question('Installer yrexpert-js vers le répertoire (' + process.cwd() + '): ', function(installPath) {
  if (installPath === '' || installPath === 'Y' || installPath === 'y') installPath = process.cwd();
  if (installPath.slice(-1) === '/') installPath = installPath.slice(0,-1);
  installEWD(installPath);
  console.log('  ');
  console.log('Voulez-vous installer des ressources supplémentaires à partir du répertoire /extras ?');
  console.log("Si vous êtes nouveau sur yrexpert-js ou voulez créer un environnement de test, entrer Y");
  console.log("Si vous êtes un utilisateur expérimenté ou ceci est un environnement de production, entrer N");
  interface.question("Entrer Y/N: ", function(answer) {
    if (answer === 'Y' || answer === 'y') {
      installExtras(installPath);
    }
    else {
      var extrasPath = installPath + '/node_modules/yrexpert-js/extras';
      deleteDirectory(extrasPath);
    }
    tidyUp(installPath);
    interface.close();
    process.chdir(installPath);
  });
});


