/****************************************************************************
* Fichier: DetruireEmprunt.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 10 mars 2016
* Date de modification: 28 mars 2016
* Description: Description du foncteur DetruireEmprunt
****************************************************************************/
#ifndef DETRUIREEMRUNT_H
#define DETRUIREEMRUNT_H

#include "Gestionnaire.h"
#include "Emprunt.h"




class DetruireEmprunt {
public:
	DetruireEmprunt();

	void operator() (Emprunt* emprunt);
};

DetruireEmprunt::DetruireEmprunt() {};

void DetruireEmprunt::operator() (Emprunt* emprunt) {
	if (emprunt != nullptr)
		delete emprunt;
}
#endif
