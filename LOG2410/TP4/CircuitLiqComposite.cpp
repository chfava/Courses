///////////////////////////////////////////////////////////
//  CircuitLiqComposite.cpp
//  Implementation of the Class CircuitLiqComposite
//  Created on:      27-oct.-2016 15:19:51
//  Original author: francois
///////////////////////////////////////////////////////////

#include <stdexcept>
#include <vector>

#include "CircuitLiqComposite.h"


CircuitLiqComposite::CircuitLiqComposite(){

}

CircuitLiqComposite::~CircuitLiqComposite(){

}

ElmCircuitLiquide::ElmCircuitLiqPtr CircuitLiqComposite::getSousElement( size_t index ){
	if (m_CircuitLiquide.size() > index)
		return m_CircuitLiquide[index];
	return  nullptr;
}

const ElmCircuitLiquide::ElmCircuitLiqPtr CircuitLiqComposite::getSousElement(size_t index) const {
	if (m_CircuitLiquide.size() > index)
		return m_CircuitLiquide[index];
	return  nullptr;
}

int CircuitLiqComposite::nombreSousElements() const {
	return m_CircuitLiquide.size();
}

void CircuitLiqComposite::addSousElement(const ElmCircuitLiqPtr& sousElm){
	m_CircuitLiquide.push_back(sousElm);
}


void CircuitLiqComposite::addSousElement(ElmCircuitLiquide* sousElm){
	ElmCircuitLiqPtr sousElmPtr(sousElm);	
	m_CircuitLiquide.push_back(sousElmPtr);
}

float CircuitLiqComposite::getTartre(void) const {
	// Recuperer la quantite de tartre maximum parmi tous les enfants
	float tartreMax = 0;
	for (unsigned i = 0; i < m_CircuitLiquide.size(); i++)
		if (m_CircuitLiquide[i]->getTartre() > tartreMax)
			tartreMax = m_CircuitLiquide[i]->getTartre();
	return tartreMax;
}

void CircuitLiqComposite::operer(float duree){
	for (unsigned i = 0; i < m_CircuitLiquide.size(); i++)
		m_CircuitLiquide[i]->operer(duree);
}

void CircuitLiqComposite::nettoyer(){
	for (unsigned i = 0; i < m_CircuitLiquide.size(); i++)
		m_CircuitLiquide[i]->nettoyer();
}


