//////////////////////////////////////////////////////////////////////////////
///FICHIER: sommet.h
///AUTEUR: Andreanne Laurin, Simon Barrette & Charles-Olivier Favreau
///DATE:18 octobre 2016
///DESCRIPTION: Contient la definition de la classe Sommet
//////////////////////////////////////////////////////////////////////////////
#ifndef SOMMET_H
#define SOMMET_H

#include <vector>
#include "arc.h"
#include <string>

class Sommet{
public:
	//Constructeurs & Destructeur
	Sommet();
	Sommet(std::string identifiant, std::string type);
	~Sommet();

	//Methodes
	void addArcEntrant(Arc* arcEntrant);
	void addArcSortant(Arc* arcSortant);

	//Accesseurs
	std::string getIdentifiant() const;
	std::string getType()const;
	std::vector <Arc*> getVectorEntrant() const;
	std::vector <Arc*> getVectorSortant() const;
	bool getParcouru();

private:
	//Variable pour les arc touchant au sommet, son type, son identifiant ainsi que sil a deja ete parcouru
	std::vector<Arc*> entrant_;
	std::vector<Arc*> sortant_;
	std::string type_;
	std::string identifiant_;
	bool parcouru;
};

#endif