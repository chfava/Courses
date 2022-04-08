/****************************************************************************
* Fichier: Dvd.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonctions reliées à classe Dvd
****************************************************************************/
#include "Dvd.h"
#include <algorithm>
#include <functional>
#include <iterator>
using namespace std;
/****************************************************************************
* Fonction: Dvd::Dvd
* Description: Constructeur par défaut
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Dvd::Dvd()
{
}
/***************************************************************************************
* Fonction: Dvd::Dvd
* Description: Constructeur par paramètres
* Paramètres: - string cote: une cote (OUT)
* 	      - string titre: un titre (OUT)
*             - unsigned int annee: une annee (IN)
*             - unsigned int ageMin: un age minimal pour emprunter le livre (IN)
*             - unsigned int nbExemplaires: un nombre d'exemplaires (IN)
*             - string realisateur: un realisateur (OUT)
*             - list <string> acteurs: une liste d'acteurs pour le Dvd (OUT)
* Retour: aucun
***************************************************************************************/
Dvd::Dvd(const string & cote, const string & titre, unsigned int annee, unsigned int ageMin,
	unsigned int nbExemplaires, string const & realisateur, vector<string> acteurs) :
	ObjetEmpruntable(cote, titre, annee, ageMin, nbExemplaires), realisateur_(realisateur)
{
	copy(acteurs.begin(),acteurs.end(), back_inserter(listActeurs_));
}
/****************************************************************************
* Fonction: Dvd::~Dvd
* Description: Destructeur
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Dvd::~Dvd()
{
}
/****************************************************************************
* Fonction: Dvd::obtenirRealisateur
* Description: Retourne la valeur de realisateur_
* Paramètres: aucun
* Retour: (string) la valeur de realisateur_
****************************************************************************/
string Dvd::obtenirRealisateur() const
{
	return realisateur_;
}
/****************************************************************************
* Fonction: Dvd::obtenirActeur
* Description: Retourne la valeur de listActeurs_
* Paramètres: aucun
* Retour: (list <string>) la liste d'acteurs
****************************************************************************/
list<string> Dvd::obtenirActeur() const
{
	return listActeurs_;
}
/****************************************************************************
* Fonction: Dvd::modifierRealisateur
* Description: Modifie la valeur de realisateur_
* Paramètres: - string realisateur: la nouvelle valeur de realisateur_(OUT)
* Retour: aucun
****************************************************************************/
void Dvd::modifierRealisateur(string const & realisateur)
{
	realisateur_ = realisateur;
}
/****************************************************************************
* Fonction: Dvd::ajouterActeur
* Description: Ajoute un acteur à listActeurs
* Paramètres: - string acteur: un acteur à ajouter (OUT)
* Retour: aucun
****************************************************************************/
void Dvd::ajouterActeur(string const & acteur)
{
	listActeurs_.push_back(acteur);
}
/****************************************************************************
* Fonction: Dvd::retirerActeur
* Description: Retire un acteur à listActeurs
* Paramètres: - string acteur: un acteur à retirer (OUT)
* Retour: aucun
****************************************************************************/
void Dvd::retirerActeur(string const & acteur)
{
	listActeurs_.remove(acteur);
}

/****************************************************************************
* Fonction: Dvd::recherche
* Description: Cherche si un mot clé correspond à un attribut d'un Dvd
* Paramètres: - string motsCle: un mot clé à chercher (OUT)
* Retour: (bool) true si le motsCle à été trouvé, false sinon
****************************************************************************/
bool Dvd::recherche(const string & motsCle) const
{
	bool present = false;
	size_t trouverRealisateur = convertirMinuscule(realisateur_).find(convertirMinuscule(motsCle));
	for (list<string>::const_iterator it = listActeurs_.begin(); it != listActeurs_.end(); it++){
		size_t trouveActeur = convertirMinuscule((*it)).find(convertirMinuscule(motsCle));
		present = present || (trouveActeur != string::npos);
	}
	//Utilisation du demasquage pour appeler la méthode de la classe mère
	bool trouve = ObjetEmpruntable::recherche(motsCle) 
		|| present
		|| (trouverRealisateur != string::npos);

	return trouve;
}
/****************************************************************************
* Fonction: operator <<
* Description: Affichage des informations concernant un Dvd
* Paramètres: - ostream o: un paramètre de sortie (OUT)
*             - Dvd dvd: un dvd à afficher (OUT)
* Retour: (ostream) la valeur de o
****************************************************************************/
ostream & operator<<(ostream & o, const Dvd&  dvd)
{
	const ObjetEmpruntable* obj = (&dvd);
	o << "Information sur le Dvd :" << endl;
	o << *obj
		<< " Realisateur : " << dvd.obtenirRealisateur()
		<< "; Acteurs : ";
	//affichage des acteurs
	list<string>  liste = dvd.obtenirActeur(); 
	liste.sort(greater<string>());
	for(list<string>::iterator it = liste.begin(); it != liste.end(); it++)
		o << (*it) << "; ";

	return o << endl;
}
