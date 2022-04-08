/****************************************************************************
* Fichier: ExceptionEchecRetour.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonction reliée à la classe ExceptionEchecRetour
****************************************************************************/

#include "ExceptionEchecRetour.h"
#include <string>

using namespace std;
/****************************************************************************
* Fonction: ExceptionEchecRetour::ExceptionEchecRetour
* Description: Constructeur par paramètres
* Paramètres: string message: un message d'erreur
* Retour: aucun
****************************************************************************/
ExceptionEchecRetour::ExceptionEchecRetour(string message) :runtime_error(message) {};

