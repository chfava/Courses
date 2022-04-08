/****************************************************************************
* Fichier: TrieParTitre
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Description du foncteur TrieParTitre
****************************************************************************/
#ifndef TRIEPARTITRE_H
#define TRIEPARTITRE_H

#include "ObjetEmpruntable.h"

class TrieParTitre
{
public:
	bool operator() (ObjetEmpruntable* element1 , ObjetEmpruntable* element2) 
	{
		if (*element1 < *element2) 
			return true; 
		return false;
	};
};

#endif // TRIEPARTITRE_H