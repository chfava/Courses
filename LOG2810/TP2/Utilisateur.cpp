//
//  utilisateur.cpp
//  
//
//  Created by Stéphanie Leclerc on 2016-11-17.
//
//
#include "Utilisateur.h"

using namespace std; 

Utilisateur::Utilisateur() 
	{
		pointArrivee_ = "";
		numeroGroupe_ = 0;
		zipCode_ = "";
	};

Utilisateur::Utilisateur(std::string pointArrivee, int numeroGroupe, std::string zipCode)
	{
		pointArrivee_ = pointArrivee;
		numeroGroupe_ = numeroGroupe;
		zipCode_ = zipCode;
	};

	Utilisateur::~Utilisateur() 
	{

	};

	const std::string Utilisateur::getPointArrivee() 
	{
		return pointArrivee_;
	};

	void Utilisateur::setPointArrivee(std::string pointArrivee) 
	{
		pointArrivee_ = pointArrivee;
	};

	const int Utilisateur::getNumeroGroupe() 
	{
		return numeroGroupe_;
	};
	void Utilisateur::setNumeroGroupe(int numeroGroupe) 
	{
		numeroGroupe_ = numeroGroupe;
	};

	const std::string Utilisateur::getNomZoneUtilisateur() 
	{
		return nomZoneUtilisateur_;
	};
	void Utilisateur::setNomZoneUtilisateur(std::string nomZoneUtilisateur) 
	{
		nomZoneUtilisateur_ = nomZoneUtilisateur;
	};
	const std::string Utilisateur::getZipCode()
	{
		return zipCode_;
	};
	void Utilisateur::setZipCode(std::string zipCode)
	{
		zipCode_ = zipCode;
	};