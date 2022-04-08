#ifndef VEHICULE_H
#define VEHICULE_H

#include <iostream>

class Vehicule {

public:

	Vehicule();
	Vehicule(std::string zoneDepart, bool estLibre);
	~Vehicule();

	const std::string getZoneDepart();
	void setZoneDepart(std::string zoneDepart);

	const bool getEstLibre();
	void setEstLibre(bool estLibre);
	
	const int getTrajetsOccupes();
	void setTrajetsOccupes(int trajetsOccupes);
	
	const int getTrajetsVides();
	void setTrajetsVides(int trajetsVides);

	void incrementerTrajetsOccupes();
	void incrementerTrajetsVides();

	const std::string getPositionActuelle();
	void setPositionActuelle(std::string positionActuelle);


private:
	std::string zoneDepart_;
	std::string positionActuelle_;
	bool estLibre_;
	int trajetsOccupes_;
	int trajetsVides_;
	
};


#endif 