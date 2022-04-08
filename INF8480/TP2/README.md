# TP2-INF8480

## Matricules

1789479

1913962

## Installation des outils

```
sudo apt-get update
sudo apt-get install openjdk-8-jdk ant
```

## Compilation

Depuis la racine du dossier

```
ant
```

## Execution

Il n'y a pas besoin de créer le registre RMI initialement, celui-ci est créé à l'exécution par les différents serveurs sur le port 5017. Le serveur de nom doit être exécuté en premier, puis les serveurs de calcul.

Aucune fonction de retrait de serveur de calcul n'ayant été implémenté il faut arreter puis redémarrer le serveur de nom (puis redémarrer les serveurs de calcul) pour modifier le nombre ou les paramètres des serveurs de calcul.

Le fonctionnement a été vérifié pour des serveurs (de nom ou de calcul) s'exécutant sur des machines différentes.

### Serveur de nom

```
./serveurNom.sh ip_address
  ip_address      OPTIONNEL   L'adresse IP de ce serveur, mais n'est pas utilisée
```

D'autres utilisateurs peuvent être ajoutés dans le dossier Client : le nom du fichier est le nom d'utilisateur et le mot de passe le contenu, sans caractère de fin de ligne.

### Serveur de calcul

```
./serveurCalcul.sh ip_address ip_serveur_nom capacite taux_erreur
  ip_address      OBLIGATOIRE L'adresse IP de ce serveur
  ip_serveur_nom  OBLIGATOIRE L'adresse IP du serveur de nom
  capacite        OBLIGATOIRE La capacite du calcul
  taux_erreur     OPTIONNEL   Le taux d'erreur du serveur exprimé en pourcent
                              (0 par défaut, 30 par exemple)
```

### Répartiteur

```
./repartiteur.sh ip_serveur_nom fichier
  ip_serveur_nom  OBLIGATOIRE L'adresse IP du serveur de nom
  fichier         OBLIGATOIRE Le chemin du fichier d'opération
```

## Exemples

### Pour un calcul sur 4 serveurs fiables de capacité 4

```
./serveurNom.sh 132.201.12.40

./serveurCalcul.sh 132.207.12.41 132.207.12.40 4
./serveurCalcul.sh 132.207.12.42 132.207.12.40 4
./serveurCalcul.sh 132.207.12.43 132.207.12.40 4
./serveurCalcul.sh 132.207.12.44 132.207.12.40 4

./repartiteur.sh 132.207.12.40 operations-1481
```

### Pour un calcul sur un serveur malicieux à 50% et deux serveurs fiables de capacité 5

```
./serveurNom.sh 132.201.12.40

./serveurCalcul.sh 132.207.12.41 132.207.12.40 5 50
./serveurCalcul.sh 132.207.12.42 132.207.12.40 5
./serveurCalcul.sh 132.207.12.43 132.207.12.40 5

./repartiteur.sh 132.207.12.40 operations-1481
```
