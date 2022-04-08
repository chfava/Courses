/****************************************************************************
* Fichier: Professeur.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 10 mars 2016
* Date de modification: 28 mars 2016
* Description: Description de la classe Professeur
****************************************************************************/
#ifndef PROFESSEUR_H
#define PROFESSEUR_H

#include <list>
#include "Abonne.h"
class Professeur :
	public Abonne
{
public:
	Professeur();
	Professeur(const std::string& matricule, const std::string& nom, const std::string& prenom, unsigned int age, std::list<std::string> ecoles);
	~Professeur();

	std::list<std::string> obtenirEcole() const;
	void ajouterEcole(std::string const& ecole);
	bool retirerEcole(std::string const& ecole);
	virtual unsigned int obtenirLimiteEmprunt() const;
	// TODO: modifer l'affichage, trie des acteurs en ordre alphabétique inverse
	friend std::ostream & operator<<(std::ostream & o,Professeur & professeur);

private:
	// TODO: modifier le vector par une list listEcoles_
	std::list<std::string> listEcoles_;
};
#endif // !PROFESSEUR_H
