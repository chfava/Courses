//////////////////////////////////////////////////////////////////////////////
///FICHIER: car.cpp
///AUTEUR: Andreanne Laurin, Simon Barette & Charles-Olivier Favreau
///DATE:18 octobre 2016
///DESCRIPTION:Contient l'implémentation de la classe Car
//////////////////////////////////////////////////////////////////////////////
#include "car.h"

// Constructeurs/Destructeurs
Car::Car() {};
Car::~Car() {};

//Accesseurs

// Retourne le type de la voiture (essence, electrique ou hybride)
std::string Car::getType() {
    return type_;
};

// Retoune lautonomie maximale de la voiture
int Car::getMaxRange() {
    return maxRange_;
};

//Retourne lautonomie actuelle de la voiture
int Car::getActualRange() {
    return actualRange_;
};

//Mutateurs

//Attribue une valeurs a la variable type
void Car::setType(std::string type) {
    type_ = type;
};


//Attribue une valeurs a lautonomie maximale
void Car::setMaxRange(int max){
    maxRange_ = max;
};


//Attribue une valeurs a lautonomie actuelle
void Car::setActualRange(int actual) {
    actualRange_ = actual;
};