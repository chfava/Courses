/*
Fichier: Emprunt.cpp
Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
Date de creation: 1er mars 2016
Date de modification: 4 mars 2016
Description: Fonctions reliées à classe Emprunt
*/
#include <iostream>
#include "Emprunt.h"

using namespace std;


/****************************************************************************
* Fonction: Emprunt::~Emprunt
* Description: Destructeur
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Emprunt::~Emprunt()
{

}

/****************************************************************************
* Fonction: Emprunt::obtenirMatricule
* Description: Retourne la valeur de matricule_
* Paramètres: aucun
* Retour: (string) la valeur de matricule_
****************************************************************************/
string Emprunt::obtenirMatricule() const
{
	return matricule_;
}

/****************************************************************************
* Fonction: Emprunt::obtenirDateRetour
* Description: Retourne la valeur de dateRetour_
* Paramètres: aucun
* Retour: (unsigned int) la valeur de dateRetour_
****************************************************************************/
unsigned int Emprunt::obtenirDateRetour() const
{
	return dateRetour_;
}


/****************************************************************************
* Fonction: Emprunt::modifierMatricule
* Description: Modifie la valeur de matricule_
* Paramètres: - string matricule: la nouvelle valeur de matricule_ (OUT)
* Retour: aucun
****************************************************************************/
void Emprunt::modifierMatricule(const string &matricule)
{
	matricule_ = matricule;
}

/****************************************************************************
* Fonction: Emprunt::modiferDateRetour
* Description: Modifie la valeur de dateRetour_
* Paramètres: - unsigned int date: la nouvelle valeur de dateRetour_ (IN)
* Retour: aucun
****************************************************************************/
void Emprunt::modifierDateRetour(unsigned int date)
{
	dateRetour_ = date;
}




/// TP4
/****************************************************************************
* Fonction: Emprunt::Emprunt
* Description: Constructeur par paramètres
* Paramètres: - string matricule: un matricule (OUT)
*             - ObjetEmpruntable objetEmpruntable: un objet empruntable (OUT)
*             - unsigned int dateRetour : une valeur de date retour (IN)
* Retour: aucun
****************************************************************************/
Emprunt::Emprunt(const string& matricule, ObjetEmpruntable& objetEmpruntable, unsigned int dateRetour) : matricule_(matricule), objEmprunt_(&objetEmpruntable), dateRetour_(dateRetour)
{

}

/****************************************************************************
* Fonction: Emprunt::obtenirObjetEmpruntable
* Description: Retourne la valeur de objEmprunt_
* Paramètres: aucun
* Retour: (ObjetEmpruntable*) un pointeur d'objet empruntable 
****************************************************************************/
ObjetEmpruntable* Emprunt::obtenirObjetEmpruntable() const
{
	return objEmprunt_;
}

/**********************************************************************************************
* Fonction: Emprunt::modifierObjetEmpruntable
* Description: Modifie la valeur de objEmprunt_
* Paramètres: - ObjetEmpruntable* objetEmpruntable: la nouvelle valeur de objEmprunt_ (OUT)
* Retour: aucun
**********************************************************************************************/
void Emprunt::modifierObjetEmpruntable(ObjetEmpruntable * objetEmpruntable)
{
	objEmprunt_ = objetEmpruntable;
}

/*********************************************************************************************
* Fonction: operator <<
* Description: Affichage des attributs concernant un emprunt
* Paramètres: - ostream o: un paramètre de sortie
*             - ObjetEmpruntable objetEmpruntable: un objet empruntable à afficher (OUT)
* Retour: (ostream) la valeur de o
*********************************************************************************************/
ostream& operator<<(ostream& o, const ObjetEmpruntable& objetEmpruntable) {
	o << objetEmpruntable.obtenirNomClasse() << endl;
	return o;
};






