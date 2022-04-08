//
//  utilisateur.h
//  
//
//  Created by Stéphanie Leclerc on 2016-11-16.
//
//

#ifndef UTILISATEUR_H
#define UTILISATEUR_H

#include "Zone.h"
#include <iostream>

class Utilisateur {

public:
	Utilisateur();
	Utilisateur(std::string pointArrivee, int numeroGroupe, std::string zipCode);
	~Utilisateur();

	const std::string getPointArrivee();
	void setPointArrivee(std::string pointArrivee);

	const std::string getNomZoneUtilisateur();
	void setNomZoneUtilisateur(std::string nomZoneUtilisateur);

	const int getNumeroGroupe();
	void setNumeroGroupe(int numeroGroupe);

	const std::string getZipCode();
	void setZipCode(std::string zipCode);


private:
	std::string pointArrivee_;
	std::string nomZoneUtilisateur_;
	int numeroGroupe_;
	std::string zipCode_;
};


#endif 
