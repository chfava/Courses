#!/bin/bash

pushd $(dirname $0) > /dev/null
basepath=$(pwd)
popd > /dev/null

cat << EndOfMessage
HELP: 
./serveurCalcul.sh ip_address ip_serveur_nom capacite taux_erreur
	- ip_address :		(MANDATORY) L'addresse ip de ce serveur
	- ip_serveur_nom:	(MANDATORY) L'adresse IP du serveur de nom
	- capacite :		(MANDATORY) La capacite du calcul
	- taux_erreur :		(OPTIONAL) Le taux d'erreur du serveur exprimé en pourcent (0 par défaut, 30 par exemple)

EndOfMessage


#IPADDR=$1
#-Djava.rmi.server.hostname="$IPADDR" \
# BUG

java -cp "$basepath"/serveurCalcul.jar:"$basepath"/shared.jar \
  -Djava.rmi.server.codebase=file:"$basepath"/shared.jar \
  -Djava.security.policy="$basepath"/policy \
  -Djava.net.preferIPv4Stack=true \
  serveurCalcul.ServeurCalcul $*
