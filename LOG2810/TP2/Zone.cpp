#include "Zone.h"

using namespace std;

Zone::Zone()
{
	nameZone_ = "";
};
Zone::~Zone()
{

};

void Zone::addCar(Vehicule* car)
{
	cars_.push_back(car);
};

 void Zone::deleteCar(Vehicule* car){
	for (int i = 0; i < cars_.size(); i++){
		if (cars_[i] == car)
		{
			cars_.erase(cars_.begin() + i);
		}
	}
};

const bool Zone::findCarZone(Vehicule* car){
	for (int i = 0; i < cars_.size(); i++){
		if (cars_[i] == car)
			return true;
	}
	return false;

};
void Zone::creerLexique(){

};
const string Zone::getName(){
	return nameZone_;
};
void Zone::changeName(string name){
	nameZone_ = name;
};
 const vector <string*> Zone::getVecZipCodes()
{
	return vecZipCodes_;
};

int Zone::getCarsSize()
{
	return cars_.size();
};