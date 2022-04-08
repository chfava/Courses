/****************************************************************************
* Fichier: Emprunt.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Description de la classe Emprunt
****************************************************************************/
#ifndef EMPRUNT_H
#define EMPRUNT_H

#include <string>
#include "Livre.h"
#include "Dvd.h"

class Emprunt
{
public:

	~Emprunt();

	std::string obtenirMatricule() const;
	unsigned int obtenirDateRetour() const;

	void modifierMatricule(const std::string& matricule);
	void modifierDateRetour(unsigned int date);


	/// _____ TP4 _____


	Emprunt(std::string matricule, ObjetEmpruntable* objEmprunt, unsigned int date);

	ObjetEmpruntable* obtenirObjetEmpruntable() const;
		
	friend std::ostream& operator<<(std::ostream& o, const Emprunt& emprunt);
	/// _____ TP5 _____
	bool operator==(const Emprunt& emprunt) const;
	bool operator==(const std::string& matricule) const;
	bool operator==(const std::pair<std::string, std::string>&)const;
	friend bool operator==(const std::string& matricule, const Emprunt& emprunt);
	friend bool operator==(const std::pair<std::string, std::string>&, const Emprunt& emprunt);

private:
	std::string matricule_;
	unsigned int dateRetour_;

	/// _____ TP4 _____
	ObjetEmpruntable* objEmprunt_;

};

#endif