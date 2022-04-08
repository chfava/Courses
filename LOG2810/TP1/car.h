//////////////////////////////////////////////////////////////////////////////
///FICHIER: car.h
///AUTEUR: Andreanne Laurin, Simon Barette & Charles-Olivier Favreau
///DATE:18 octobre 2016
///DESCRIPTION: Contient la definition de la classe Car
//////////////////////////////////////////////////////////////////////////////
#include <string>
#ifndef CAR_H
#define CAR_H

class Car{
public:

	//constructeur & destructeur
	Car();
	~Car();

	// Accesseurs
	std::string getType();
	int getMaxRange();
	int getActualRange();

	//mutateurs
	void setType(std::string type);
	void setMaxRange(int max);
	void setActualRange(int actual);

private:
	//Variable pour le type de la voiture (essence, electrique ou hybride), lautonomie maximale et actuelle
	std::string type_;
	int maxRange_;
	int actualRange_;
};



#endif