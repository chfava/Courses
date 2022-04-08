#include "Vehicule.h"

using namespace std;

Vehicule::Vehicule()
{
	zoneDepart_ = "";
	estLibre_ = true;
	positionActuelle_ = ""; 
};
Vehicule::Vehicule(string zoneDepart, bool estLibre)
{
	zoneDepart_ = zoneDepart;
	estLibre_ = estLibre;
};
Vehicule::~Vehicule() 
{
};

const string Vehicule::getZoneDepart()
{
	return zoneDepart_;
};
void Vehicule::setZoneDepart(string zoneDepart)
{
	zoneDepart_ = zoneDepart;
};
const bool Vehicule::getEstLibre() 
{
	return estLibre_;
};
void Vehicule::setEstLibre(bool estLibre) 
{
	estLibre_ = estLibre;
};

const int Vehicule::getTrajetsOccupes()
{
	return trajetsOccupes_;
};
void Vehicule::setTrajetsOccupes(int trajetsOccupes)
{
	trajetsOccupes_ = trajetsOccupes;
};
const int Vehicule::getTrajetsVides()
{
	return trajetsVides_;
};
void Vehicule::setTrajetsVides(int trajetsVides)
{
	trajetsVides_ = trajetsVides_;
};

void Vehicule::incrementerTrajetsOccupes()
{
	trajetsOccupes_++;
};
void Vehicule::incrementerTrajetsVides()
{
	trajetsVides_++;
};

const std::string Vehicule::getPositionActuelle() 
{
	return positionActuelle_;
};
void Vehicule::setPositionActuelle(std::string positionActuelle) 
{
	positionActuelle_ = positionActuelle;
};