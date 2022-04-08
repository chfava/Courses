/*
Fichier: Emprunt.h
Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
Date de creation: 1er mars 2016
Date de modification: 4 mars 2016
Description: Description de la classe Emprunt
*/
#ifndef EMPRUNT_H
#define EMPRUNT_H

#include <string>
#include "Livre.h"
#include "Dvd.h"
#include "Abonne.h"
#include <iostream>

class Emprunt 
{
public:
	~Emprunt();

	std::string obtenirMatricule() const;
	unsigned int obtenirDateRetour() const;
	

	void modifierMatricule(const std::string& matricule);
	void modifierDateRetour(unsigned int date);
	


	/// _____ TP4 _____
	Emprunt(const std::string& matricule, ObjetEmpruntable& objetEmpruntable, unsigned int dateRetour);
	ObjetEmpruntable* obtenirObjetEmpruntable() const;
	void modifierObjetEmpruntable(ObjetEmpruntable* objetEmpruntable);
	friend std::ostream& operator<<(std::ostream& o, ObjetEmpruntable& objetEmpruntable);



private:
	std::string matricule_;
	unsigned int dateRetour_;

	/// _____ TP4 _____
	ObjetEmpruntable* objEmprunt_;

};

#endif
