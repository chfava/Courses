/****************************************************************************
* Fichier: RechercheObjetEmpruntable.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 26 mars 2016
* Date de modification: 28 mars 2016
* Description: Description du foncteur RechercheObjetEmpruntable
****************************************************************************/
#ifndef RECHERCHEOBJETEMPRUNTABLE_H
#define RECHERCHEOBJETEMPRUNTABLE_H

#include <string>
#include "ObjetEmpruntable.h"



class RechercheObjetEmpruntable {
public:
	RechercheObjetEmpruntable(const std::string motCle);

	bool operator() (ObjetEmpruntable*  objet);

private:
	std::string motCle_;
};


RechercheObjetEmpruntable::RechercheObjetEmpruntable(const std::string motCle) : motCle_(motCle) {};

bool RechercheObjetEmpruntable::operator() (ObjetEmpruntable*  objet) {
	return objet->recherche(motCle_);
}
#endif