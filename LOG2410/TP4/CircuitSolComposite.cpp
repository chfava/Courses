///////////////////////////////////////////////////////////
//  CircuitSolComposite.cpp
//  Implementation of the Class CircuitSolComposite
//  Created on:      27-oct.-2016 15:12:34
//  Original author: francois
///////////////////////////////////////////////////////////

#include <stdexcept>

#include "CircuitSolComposite.h"


CircuitSolComposite::CircuitSolComposite(){

}



CircuitSolComposite::~CircuitSolComposite(){

}


CircuitSolComposite::ElmCircuitSolPtr CircuitSolComposite::getSousElement(size_t index){
	if (m_CircuitSolide.size() > index)
		return m_CircuitSolide[index];
	return  nullptr;
}

const CircuitSolComposite::ElmCircuitSolPtr CircuitSolComposite::getSousElement(size_t index) const {
	if (m_CircuitSolide.size() > index)
		return m_CircuitSolide[index];
	return  nullptr;
}

int CircuitSolComposite::nombreSousElements() const {
	return m_CircuitSolide.size();
}


void CircuitSolComposite::addSousElement(const ElmCircuitSolPtr& sousElem){
	m_CircuitSolide.push_back(sousElem);
}

void CircuitSolComposite::addSousElement(ElmCircuitSolide* sousElem){
	ElmCircuitSolPtr sousElemPtr(sousElem);
	m_CircuitSolide.push_back(sousElemPtr);
}

float CircuitSolComposite::getDebris(void) const {
	// Recuperer la quantite de debris maximum parmi tous les enfants
	float debrisMax = 0;
	for (unsigned i = 0; i < m_CircuitSolide.size(); i++)
		if (m_CircuitSolide[i]->getDebris() > debrisMax)
			debrisMax = m_CircuitSolide[i]->getDebris();
	return debrisMax;
}

void CircuitSolComposite::operer( float duree ){
	for (unsigned i = 0; i < m_CircuitSolide.size(); i++)
		m_CircuitSolide[i]->operer(duree);
}

void CircuitSolComposite::nettoyer(){
	for (unsigned i = 0; i < m_CircuitSolide.size(); i++)
		m_CircuitSolide[i]->nettoyer();
}


