///////////////////////////////////////////////////////////
//  MachineAbs.cpp
//  Implementation of the Class MachineAbs
//  Created on:      27-oct.-2016 15:12:15
//  Original author: francois
///////////////////////////////////////////////////////////

#include <iostream>

#include "MachineAbs.h"

MachineAbs::MachineAbs( FiltrePtr f )
: m_filtre(f)
{
}

MachineAbs::~MachineAbs(){
}

resultat_test MachineAbs::diagnostiquer(){
	// Methode servant a appeler les operations de diagnostique pour les differentes composantes de la machine

	// Diagnostiquer le filtre
	// Diagnostiquer le circuit d'eau chaude
	// Diagnostiquer le circuit de the
	// Verifier si la machine a un circuit pour le lait, et si oui, le Diagnostiquer
	// Verifier si la machine a un circuit pour le sucre, et si oui, le Diagnostiquer
	auto diagnostiqueFiltre = this->opDiagnostiquerFiltre();
	auto diagnostiqueEau = this->opDiagnostiquerCircuitEau();
	auto diagnostiqueThe = this->opDiagnostiquerCircuitThe();
	auto diagnostiqueLait = resultat_test::succes;
	if (this->opACircuitLait())
		diagnostiqueLait = this->opDiagnostiquerCircuitLait();
	auto diagnostiqueSucre = resultat_test::succes;
	if (this->opACircuitSucre())
		diagnostiqueSucre = this->opDiagnostiquerCircuitSucre();

	bool diagnostique = diagnostiqueFiltre == resultat_test::succes  && diagnostiqueEau == resultat_test::succes 
		&& diagnostiqueThe == resultat_test::succes && diagnostiqueLait == resultat_test::succes && diagnostiqueSucre == resultat_test::succes;
	if (diagnostique)
		return resultat_test::succes;
	else
		return resultat_test::echec;
}


void MachineAbs::nettoyer(){
	// Methode servant a appeler les operations de nettoyage pour les differentes composantes de la machine
	
	// Nettoyer le filtre
	// Nettoyer le circuit d'eau chaude
	// Nettoyer le circuit de the
	// Verifier si la machine a un circuit pour le lait, et si oui, le nettoyer
	// Verifier si la machine a un circuit pour le sucre, et si oui, le nettoyer

	opNettoyerFiltre();
	opNettoyerCircuitEau();
	opNettoyerCircuitThe();
	if (this->opACircuitLait())
		opNettoyerCircuitLait();
	if (this->opACircuitSucre())
		opNettoyerCircuitSucre();

}

