/*
Fichier: Abonne.h
Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
Date de creation: 1er mars 2016
Date de modification: 4 mars 2016
Description: Description de la classe Abonne
*/

#ifndef ABONNE_H
#define ABONNE_H

#include <string>
#include "Emprunt.h"
#include "ObjetEmpruntable.h"
#include <vector>
#include <iostream>

#define LIMITE_EMPRUNTS 2

class Abonne
{
public:

	/// TP4
	std::string Abonne::obtenirNomClasse() const;

	
	/// TP3
	Abonne();
	Abonne(const std::string& matricule, const std::string& nom, const std::string& prenom, unsigned int age);

	~Abonne();

	virtual std::string obtenirMatricule() const;	
	virtual std::string obtenirNom() const;
	virtual std::string obtenirPrenom() const;
	virtual unsigned int obtenirAge() const;

	virtual void modifierMatricule(const std::string& matricule);
	virtual void modifierNom(const std::string& nom);
	virtual void modifierPrenom(const std::string& prenom);
	virtual void modifierAge(unsigned int age);
	virtual std::vector<Emprunt*>  obtenirEmprunts() const;
	virtual unsigned int obtenirNombreEmprunte() const;
	friend std::ostream& operator<<(std::ostream& o, const Abonne& abonne);
	virtual bool operator==(const Abonne& abonne) const;
	virtual bool operator==(const std::string& matricule) const;
	friend bool operator==(const std::string& matricule, const Abonne& abonne);

	/// ____TP3_____
	virtual unsigned int obtenirLimiteEmprunt() const;
	bool estEmprunte(const ObjetEmpruntable& objetEmpruntable) const;
	void ajouterEmprunt(Emprunt* emprunt);
	bool retirerEmprunt(ObjetEmpruntable * objetEmpruntable);

private:
	std::string matricule_;
	std::string nom_;
	std::string prenom_;
	unsigned int age_;
	std::vector<Emprunt*> vecEmprunts_;

	/// ____TP3_____
	unsigned int limiteEmprunt_;

};

	
#endif
