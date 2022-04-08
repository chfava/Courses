#!/bin/bash

pushd $(dirname $0) > /dev/null
basepath=$(pwd)
popd > /dev/null

cat << EndOfMessage
HELP: 
./repartiteur.sh ip_serveur_nom fichier
	- ip_serveur_nom : 	(MANDATORY) L'adresse IP du serveur de nom
	- fichier :		(MANDATORY) Le chemin du fichier d'opération

EndOfMessage

java -cp "$basepath"/repartiteur.jar:"$basepath"/shared.jar -Djava.security.policy="$basepath"/policy -Djava.net.preferIPv4Stack=true repartiteur.Repartiteur $*
