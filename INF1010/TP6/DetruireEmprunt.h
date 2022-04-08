/****************************************************************************
* Fichier: DetruireEmprunt.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Description du foncteur DetruireEmprunt
****************************************************************************/
#ifndef DETRUIREEMPRUNT_H
#define DETRUIREEMPRUNT_H

#include "Emprunt.h"

class DetruireEmprunt
{
public:
	bool operator() (Emprunt* element) { delete element; return true; };

};

#endif // DETRUIREEMPRUNT_H