//////////////////////////////////////////////////////////////////////////////
///FICHIER: sommet.cpp
///AUTEUR: Andreanne Laurin, Simon Barrette & Charles-Olivier Favreau
///DATE:18 octobre 2016
///DESCRIPTION: Contient l'implémentation de la classe Sommet
//////////////////////////////////////////////////////////////////////////////
#include "sommet.h"

using namespace std;

//Constructeurs 
Sommet::Sommet() {
	type_ = "";
	identifiant_ = "";

	entrant_ = vector<Arc*>();
	sortant_ = vector<Arc*>();
	parcouru = false;
};

Sommet::Sommet(string identifiant, string type){
	identifiant_ = identifiant;
	type_ = type;
	parcouru = false;
};

//Destructeur
Sommet::~Sommet() {};

//Methode ajoutant un arc au vecteur darc entrant
void Sommet::addArcEntrant(Arc* arcEntrant){
	entrant_.push_back(arcEntrant);
};

//Methode ajoutant un arc au vecteur darc sortant
void Sommet::addArcSortant(Arc* arcSortant){
	sortant_.push_back(arcSortant);
};

//Accesseurs

// Retourne lidentifiant du sommet
std::string Sommet::getIdentifiant() const{
	return identifiant_;
}

//Retourne le type du sommet
std::string Sommet::getType() const{
	return type_;
}

//Retourne le vecteur des arcs entrant du sommet
std::vector <Arc*> Sommet::getVectorEntrant()const{
	return entrant_;
};

//Retourne le vecteur des arcs sortant du sommet
std::vector <Arc*> Sommet::getVectorSortant() const{
	return sortant_;
};

//Retoune vrai si le sommet a deja ete parcouru
bool Sommet::getParcouru(){
	return parcouru;
};
