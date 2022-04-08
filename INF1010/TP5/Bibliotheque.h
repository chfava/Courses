/*
Fichier: Bibliotheque.h
Auteur(s): Mohamed Amine Kibiche
Date de creation:
Date de modification: 25 février 2016
Description: la classe qui fait le lien entre toutes les autres classes 
*/
#ifndef BIBLIOTHEQUE_H
#define BIBLIOTHEQUE_H

#include <string>
#include <map>
#include "Abonne.h"
#include "ObjetEmpruntable.h"
#include "Emprunt.h"
#include "Gestionnaire.h"
#include "MemeObjet.h"
#include "RechercheObjetEmpruntable.h"
#include "TrieParTitre.h"
#include "DetruireEmprunt.h"
#include "Etudiant.h"
#include "Empruntable.h"
#include "EtudiantBaccalaureat.h"
#include "Professeur.h"
#include <iostream>


class Bibliotheque
{
public:

	Bibliotheque();
	~Bibliotheque();

	Abonne* trouverAbonne(std::string& matricule) const;

	ObjetEmpruntable* trouverObjetEmpruntable(const std::string& cote) const;

	std::string obtenirClasseObjet(const std::string & cote) const;

	bool ajouterAbonne(Abonne& abonne);
	bool retirerAbonne(std::string& matricule);	

	bool ajouterObjetEmpruntable(ObjetEmpruntable* objet);
	
	bool retirerObjetEmpruntable(std::string& cote);
	void rechercherObjetEmpruntable(const std::string& str) const;

	
	bool emprunter(std::string& matricule, std::string& cote, unsigned int date);
	bool retourner(std::string& matricule, std::string& cote);

	void infoAbonne(std::string matricule) const;

	Bibliotheque& operator+=(Abonne* abonne);
	Bibliotheque& operator+=(ObjetEmpruntable* obj);
	Bibliotheque& operator-=(Abonne* abonne);
	Bibliotheque& operator-=(ObjetEmpruntable* obj);

	friend std::istream& operator>>(std::istream& in, const Bibliotheque& biblio);

	/// ____ TP5 ___
	map<string, Emprunt*> Bibliotheque::trierEmprunt(Abonne * abonne) const;

private:

	/// ____ TP5 ___
	Gestionnaire<Abonne> gestAbonnes_;
	Gestionnaire<Emprunt> gestEmprunts_;
	Gestionnaire<ObjetEmpruntable>gestObj_;
};

#endif