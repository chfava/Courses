/*
Fichier: Professeur.h
Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
Date de creation: 1er mars 2016
Date de modification: 4 mars 2016
Description: Définition de la classe Professeur 
*/
#ifndef PROFESSEUR_H
#define PROFESSEUR_H


#include "Abonne.h"
class Professeur :
	public Abonne
{
public:
	Professeur();
	Professeur(const std::string& matricule, const std::string& nom, const std::string& prenom, unsigned int age, std::vector<std::string> ecoles);
	~Professeur();

	std::vector<std::string> obtenirEcole() const;
	void ajouterEcole(std::string const& ecole);
	bool retirerEcole(std::string const& ecole);
	unsigned int obtenirLimiteEmprunt() const;

	friend std::ostream& operator<<(std::ostream& o, const Professeur& professeur);

private:
	std::vector<std::string> vecEcole_;
};
#endif // !PROFESSEUR_H
