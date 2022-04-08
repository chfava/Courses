/****************************************************************************
* Fichier: Emprunt.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonctions reliées à classe Emprunt
****************************************************************************/
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
Emprunt::Emprunt(std::string matricule, ObjetEmpruntable * objEmprunt, unsigned int date)
	: matricule_(matricule), objEmprunt_(objEmprunt), dateRetour_(date)
{
}
/****************************************************************************
* Fonction: Emprunt::obtenirObjetEmpruntable
* Description: Retourne la valeur de objEmprunt_
* Paramètres: aucun
* Retour: (ObjetEmpruntable*) un pointeur d'objet empruntable
****************************************************************************/
ObjetEmpruntable * Emprunt::obtenirObjetEmpruntable() const
{
	return objEmprunt_;
}


/************************************************************************************
* Fonction: Emprunt::operator==
* Description: Retourne true ou false si les deux emprunts ont les mêmes attributs
* Paramètres: - Emprunt emprunt: un emprunt à comparer
* Retour: (bool) true si les emprunts ont les mêmes attributs, false, sinon
************************************************************************************/
bool Emprunt::operator==(const Emprunt& emprunt) const {
	return ((matricule_ == emprunt.matricule_) &&
		(*objEmprunt_ == *emprunt.objEmprunt_) &&
		(dateRetour_ == emprunt.dateRetour_));
};
/************************************************************************************
* Fonction: Emprunt::operator==
* Description: Retourne true ou false si le matricule correspond au str
* Paramètres: - string str: un matricule à comparer
* Retour: (bool) true si les emprunts ont les mêmes attributs, false, sinon
************************************************************************************/
bool Emprunt::operator==(const std::string& str) const
{
	return ((matricule_ == str) || (*objEmprunt_ == str));
}
/**************************************************************************************************
* Fonction: Emprunt::operator==
* Description: Retourne true ou false si les deux emprunts ont le même matricule et la même cote
* Paramètres: - pair <string, string> pair: deux attributs à comparer
* Retour: (bool) true si les emprunts ont le même matricule et la même cote, false, sinon
**************************************************************************************************/
bool Emprunt::operator==(const  pair<std::string, std::string>& pair) const
{
	return ((matricule_ == pair.first) && (objEmprunt_->obtenirCote() == pair.second));
}
/************************************************************************************
* Fonction: Emprunt::operator==
* Description: Retourne true ou false si les deux emprunts ont les mêmes attributs
* Paramètres: - string str: un mot clé à comparer
*             - Emprunt emprunt: un emprunt à comparer
* Retour: (bool) true si str correspond à l'emprunt, false, sinon
************************************************************************************/
bool operator==(const std::string& str, const Emprunt& emprunt)
{
	return (emprunt == str);
}
/**************************************************************************************************
* Fonction: Emprunt::operator==
* Description: Retourne true ou false si les deux emprunts ont le même matricule et la même cote
* Paramètres: - pair <string, string> pair: deux attributs à comparer
*             - Emprunt emprunt: un emprunt à comparer
* Retour: (bool) true si les emprunts ont le même matricule et la même cote, false, sinon
**************************************************************************************************/
bool operator==(const  pair<string, string>& pair, const Emprunt& emprunt)
{
	return ((emprunt.obtenirMatricule() == pair.first) && (emprunt.obtenirObjetEmpruntable()->obtenirCote() == pair.second));
}
/*********************************************************************************************
* Fonction: operator <<
* Description: Affichage des attributs concernant un emprunt
* Paramètres: - ostream o: un paramètre de sortie
*             - Emprunt emprunt: un emprunt à afficher (OUT)
* Retour: (ostream) la valeur de o
*********************************************************************************************/
ostream & operator<<(std::ostream & o, const Emprunt & emprunt)
{	

	o << "Usager #" <<
		emprunt.matricule_;
	if (emprunt.objEmprunt_ != nullptr)
	{
		o << ". " << emprunt.objEmprunt_->obtenirNomClasse() << ". ";
	}
	emprunt.objEmprunt_->afficherObjetEmpruntable(o);
	o <<
		"Retour prevu : " << emprunt.dateRetour_ <<
		endl;

	return o;
}
