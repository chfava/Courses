/****************************************************************************
* Fichier: Empruntable.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonctions liées au foncteur Empruntable
****************************************************************************/
#ifndef EMPRUNTABLE_H
#define EMPRUNTABLE_H

#include "Emprunt.h"
#include <string>
class Empruntable
{
public:

	Empruntable(const std::string& matricule, const std::string& cote,bool& estDejaEmprunte,unsigned int& nombreEmrunte);
	bool operator() (Emprunt* element);
	int obtenirNombreEmrunte();
	bool estDejaEmrunte();
private:
	std::string matricule_;
	std::string cote_;
	bool* estDejaEmprunte_;
	unsigned int* nombreEmrunte_;

};

#endif // EMPRUNTABLE_H