/*
Fichier: Professeur.cpp
Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
Date de creation: 1er mars 2016
Date de modification: 4 mars 2016
Description: Fonctions reliées à classe Professeur
*/
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
Professeur::Professeur(const string& matricule, const string& nom, const string& prenom, unsigned int age, vector<string> ecoles) :
	Abonne(matricule, nom, prenom, age), vecEcole_(ecoles)
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
* Description: Retourne la valeur de vecEcole_
* Paramètres: aucun
* Retour: (vector <string>) le vecteur d'ecoles du professeur
****************************************************************************/
vector<string> Professeur::obtenirEcole() const
{
	return vecEcole_;
}

/****************************************************************************
* Fonction: Professeur::ajouterEcole
* Description: Ajoute une ecole au vecteur d'ecoles du professeur
* Paramètres: - string ecole: une ecole à ajouter (OUT)
* Retour: aucun
****************************************************************************/
void Professeur::ajouterEcole(std::string const & ecole)
{
	bool present = false;
	// ajoute l'ecole que si elle n'est pas déjà présente dans le vecteur

	for  (int i = 0; i < vecEcole_.size(); i++)
	{
		if (vecEcole_[i] == ecole)
		{
			present = true;
		}
	}
	if (!present)
		vecEcole_.push_back(ecole);
}

/****************************************************************************
* Fonction: Professeur::retirerEcole
* Description: Vérifie si l'ecole a été retiré
* Paramètres: - string ecole: une ecole à retirer du vecteur (OUT)
* Retour: (bool) true si l'ecole est retire, false sinon
****************************************************************************/
bool Professeur::retirerEcole(std::string const & ecole)
{
	for (int i = 0; i < vecEcole_.size(); i++)
	{
		// retire l'ecole que si elle est présente dans le vecteur

		if (vecEcole_[i] == ecole)
		{
			vecEcole_[i] = vecEcole_.back();
			vecEcole_.pop_back();
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
	return Abonne::obtenirLimiteEmprunt()*vecEcole_.size();
}

/****************************************************************************
* Fonction: operator <<
* Description: Affiche les informations pour un professeur
* Paramètres: - ostream o: un paramètre de sortie (OUT)
*             - Professeur professeur: un professeur à afficher (OUT)
* Retour: (ostream) la valeur de o 
****************************************************************************/
ostream & operator<<(ostream & o, const Professeur & professeur)
{
	const Abonne* ab = &professeur;
	o << *ab 
	<< "Limite d'emprunts : " << professeur.obtenirLimiteEmprunt() << endl;;
		

	o << "LISTE DES ECOLES : " ;

	// Affichage de la liste des ecoles

	for (size_t i = 0; i < professeur.vecEcole_.size(); i++)
	{
		o << professeur.vecEcole_[i] << "; ";
	}
	o << endl;
	return o;
}
