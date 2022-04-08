//
//  zone.h
//  
//
//  Created by Vincent Dandenault on 2016-11-16.
//
//
#include "Vehicule.h"
#include "Utilisateur.h"
#include <iostream>
#include <vector>

#ifndef ZONE_H
#define ZONE_H


class Zone {

public:
	Zone();
	~Zone();

	void addCar(Vehicule* car);
	void deleteCar(Vehicule* car);
	const bool findCarZone(Vehicule* car);
	void creerLexique();
	const std::string getName();
	void changeName(std::string name);
	const std::vector <std::string*> getVecZipCodes();

	int getCarsSize();

private:
	std::vector<Vehicule*> cars_;
	std::vector<Utilisateur*> utilisateurs_;
	std::vector <std::string*> vecZipCodes_;
	std::string nameZone_;
};


#endif /* zone_h */
