/****************************************************************************
* Fichier: Professeur.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 10 mars 2016
* Date de modification: 28 mars 2016
* Description: Fonctions reliées à classe Professeur
****************************************************************************/
#include "Professeur.h"

using namespace std;
/****************************************************************************
* Fonction: Professeur::Professeur
* Description: Constructeur par défaut
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Professeur::Professeur() : Abonne()
{

}
/****************************************************************************
* Fonction: Professeur::Professeur
* Description: Constructeur par paramètres
* Paramètres: - string matricule: un matricule (OUT)
*             - string nom: un nom (OUT)
*             - string prenom: un prenom (OUT)
*             - unsigned int age: un age (IN)
*             - vector <string> ecoles: un vecteur d'ecoles (OUT)
* Retour: aucun
****************************************************************************/
Professeur::Professeur(const string& matricule, const string& nom, const string& prenom, unsigned int age, list<string> ecoles) :
	Abonne(matricule, nom, prenom, age), listEcoles_(ecoles)
{

}
/****************************************************************************
* Fonction: Professeur::~Professeur
* Description: Destructeur
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Professeur::~Professeur()
{

}
/****************************************************************************
* Fonction: Professeur::obtenirEcole
* Description: Retourne la valeur de listEcoles_
* Paramètres: aucun
* Retour: (list <string>) la liste d'ecoles du professeur
****************************************************************************/
list<string> Professeur::obtenirEcole() const
{
	return listEcoles_;
}
/****************************************************************************
* Fonction: Professeur::ajouterEcole
* Description: Ajoute une ecole à la liste d'ecoles du professeur
* Paramètres: - string ecole: une ecole à ajouter (OUT)
* Retour: aucun
****************************************************************************/
void Professeur::ajouterEcole(std::string const & ecole)
{
	bool present = false;
	// ajoute l'ecole que si elle n'est pas déjà présente dans le vecteur
	list<string>::iterator pos;
	for (pos = listEcoles_.begin(); pos != listEcoles_.end(); pos++)
	{
		if (*pos == ecole)
		{
			present = true;
		}
	}
	if (!present)
		listEcoles_.push_back(ecole);
}
/****************************************************************************
* Fonction: Professeur::retirerEcole
* Description: Vérifie si l'ecole a été retiré
* Paramètres: - string ecole: une ecole à retirer de la liste (OUT)
* Retour: (bool) true si l'ecole est retire, false sinon
****************************************************************************/
bool Professeur::retirerEcole(std::string const & ecole)
{
	list<string>::iterator pos;
	for (pos = listEcoles_.begin(); pos != listEcoles_.end(); pos++)
	{
		// retire l'ecole que si elle est présente dans le vecteur

		if (*pos == ecole)
		{
			listEcoles_.erase(pos);
			return true;
		}
	}
	return false;
}
/****************************************************************************
* Fonction: Professeur::obtenirLimiteEmprunt
* Description: Retourne la limite d'emprunts pour un professeur
* Paramètres: aucun
* Retour: (unsigned int) la limite d'emprunts pour un professeur
****************************************************************************/
unsigned int Professeur::obtenirLimiteEmprunt() const
{
	return Abonne::obtenirLimiteEmprunt()*listEcoles_.size();
}
/****************************************************************************
* Fonction: operator <<
* Description: Affiche les informations pour un professeur
* Paramètres: - ostream o: un paramètre de sortie (OUT)
*             - Professeur professeur: un professeur à afficher (OUT)
* Retour: (ostream) la valeur de o
****************************************************************************/
ostream & operator<<(ostream & o, Professeur & professeur)
{
	const Abonne* ab = &professeur;
	o << *ab 
	<< "Limite d'emprunts : " << professeur.obtenirLimiteEmprunt() << endl;;
		
	//Trier en ordre décroissant
	professeur.listEcoles_.sort();
	professeur.listEcoles_.reverse();
	
	o << "LISTE DES ECOLES : " ;

	// Affichage de la liste des ecoles
	list<string>::iterator pos;
	for (pos = professeur.listEcoles_.begin(); pos != professeur.listEcoles_.end(); pos++)
	{
		o << *pos << "; ";
	}
	o << endl;
	return o;
}