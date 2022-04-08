/****************************************************************************
* Fichier: EtudiantBaccalaureat.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Description de la classe EtudiantBaccalaureat
****************************************************************************/
#ifndef ETUDIANTBACCALAUREAT_H
#define ETUDIANTBACCALAUREAT_H
#include "Etudiant.h"

class EtudiantBaccalaureat : public Etudiant
{
public:

	EtudiantBaccalaureat(const std::string& matricule, const std::string& nom, const std::string& prenom, unsigned int age);
	virtual unsigned int obtenirLimiteEmprunt() const;

};
#endif