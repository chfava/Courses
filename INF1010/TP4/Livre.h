/*
Fichier: Livre.h
Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
Date de creation: 1er mars 2016
Date de modification: 4 mars 2016
Description: Définition de la classe Livre
*/
#ifndef LIVRE_H
#define LIVRE_H
#include "ObjetEmpruntable.h"


class Livre :
	public ObjetEmpruntable
{
public:
	Livre();
	Livre(const std::string& cote, const std::string& titre, unsigned int annee,
		unsigned int ageMin, unsigned int nbExemplaires, const std::string& auteur, const std::string& genre);
	~Livre();

	std::string obtenirAuteur() const;
	std::string obtenirGenre() const;

	void modifierAuteur(std::string const& auteur);
	void modifierGenre(std::string const& genre);

	//recherche renvoie true si motsCle est présent dans les attributs de type string; false sinon
	bool recherche(const std::string& motsCle) const;

	friend std::ostream& operator<<(std::ostream& o, const Livre& livre);

protected :
	std::string auteur_;
	std::string genre_;
};

#endif
