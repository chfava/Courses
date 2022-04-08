/****************************************************************************
* Fichier: RechercheObjetEmpruntable.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Description du foncteur RechercheObjetEmpruntable
****************************************************************************/
#ifndef RECHERCHEOBJETEMPRUNTABLE_H
#define RECHERCHEOBJETEMPRUNTABLE_H

#include "ObjetEmpruntable.h"
#include <string>
class RechercheObjetEmpruntable
{
public:

	RechercheObjetEmpruntable(const std::string& cote) : cote_(cote) {};
	bool operator() (ObjetEmpruntable *element)
	{
		if (element != nullptr)
			return element->recherche(cote_);
		return false;
	};

private:
	std::string cote_;

};

#endif // RECHERCHEOBJETEMPRUNTABLE_H