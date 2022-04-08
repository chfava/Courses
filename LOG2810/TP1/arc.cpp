//////////////////////////////////////////////////////////////////////////////
///FICHIER: arc.cpp
///AUTEUR: Andreanne Laurin, Simon Barrette & Charles-Olivier Favreau
///DATE:18 octobre 2016
///DESCRIPTION: Contient l'implémentation de la classe Arc
//////////////////////////////////////////////////////////////////////////////
#include "arc.h"

//Constructeurs
Arc::Arc(){
	distance_ = 0;
	before_ = nullptr;
	after_ = nullptr;
}
Arc::Arc(void* before, void* after, int distance ){
	distance_ = distance;
	before_ = before;
	after_ = after;
};

//Destructeurs
Arc::~Arc(){
}

//Accesseurs

//Retourne la longueur de larc
int Arc::getDistance(){
	return distance_;
};

//Retourne le sommet suivant
void* Arc::getAfter() const{
	return after_;
}

//Retourne le sommet precedent
void* Arc::getBefore() const{
	return before_;
}