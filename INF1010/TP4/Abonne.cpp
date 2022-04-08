/*
Fichier: Abonne.cpp
Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
Date de creation: 1er mars 2016
Date de modification: 4 mars 2016
Description: Fonctions reliées à classe Abonne
*/

#include <iostream>
#include "Abonne.h"

using namespace std;
/****************************************************************************
* Fonction: Abonne::obtenirNomClasse
* Description: Retourne le nom de la classe 
* Paramètres: aucun
* Retour: (string) le nom de la classe
****************************************************************************/
std::string Abonne::obtenirNomClasse() const
{
	if (this != nullptr)
	{
		return typeid(*this).name();
	}
	else
	{
		return "nullptr";
	}

}
/****************************************************************************
* Fonction: Abonne::Abonne
* Description: Constructeur par défaut
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Abonne::Abonne()
	:age_(0)
{

}
/****************************************************************************
* Fonction: Abonne:Abonne
* Description: Constructeur par paramètres
* Paramètres: - string matricule: valeur de matricule_ (OUT)
*             - string nom: valeur de nom_ (OUT)
*	      - string prenom: valeur de prenom_ (OUT)
*	      - unsigned int age: valeur de age_ (IN)
* Retour: aucun
****************************************************************************/
Abonne::Abonne(const std::string & matricule, const std::string & nom, const std::string & prenom, unsigned int age) 
	: matricule_(matricule), nom_(nom), prenom_(prenom), age_(age), limiteEmprunt_(LIMITE_EMPRUNTS)
{

}
/****************************************************************************
* Fonction: Abonne::~Abonne
* Description: Destructeur
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Abonne::~Abonne()
{

}
/****************************************************************************
* Fonction: Abonne::obtenirMatricule
* Description: Retourne matricule_
* Paramètres: aucun
* Retour: (string) la valeur de matricule_
****************************************************************************/
string Abonne::obtenirMatricule() const
{
	return matricule_;
}
/****************************************************************************
* Fonction: Abonne::obtenirNom
* Description: Retourne nom_
* Paramètres: aucun
* Retour: (string) la valeur de nom_
****************************************************************************/
string Abonne::obtenirNom() const
{
	return nom_;
}
/****************************************************************************
* Fonction: Abonne::obtenirPrenom
* Description: Retourne prenom_
* Paramètres: aucun
* Retour: (string) la valeur de prenom_
****************************************************************************/
string Abonne::obtenirPrenom() const
{
	return prenom_;
}
/****************************************************************************
* Fonction: Abonne::obtenirAge
* Description: Retourne age_
* Paramètres: aucun
* Retour: (unsigned int) la valeur de age_
****************************************************************************/
unsigned int Abonne::obtenirAge() const
{
	return age_;
}
/****************************************************************************
* Fonction: Abonne::obtenirMatricule
* Description: Retourne vecEmprunts_
* Paramètres: aucun
* Retour: (vector <Emprunt*>) la valeur de vecEmprunts_
****************************************************************************/
std::vector<Emprunt*> Abonne::obtenirEmprunts() const
{
	return vecEmprunts_;
}
/****************************************************************************
* Fonction: Abonne::modifierMatricule
* Description: Modifier matricule_
* Paramètres: - string matricule: la nouvelle valeur de matricule_ (OUT)
* Retour: aucun 
****************************************************************************/
void Abonne::modifierMatricule(const string& matricule)
{
	matricule_ = matricule;
}
/****************************************************************************
* Fonction: Abonne::modifierNom
* Description: Modifier nom_
* Paramètres: - string nom: la nouvelle valeur de nom_ (OUT)
* Retour: aucun 
****************************************************************************/
void Abonne::modifierNom(const string& nom)
{
	nom_ = nom;
}
/****************************************************************************
* Fonction: Abonne::modifierPrenom
* Description: Modifier prenom_
* Paramètres: - string prenom: la nouvelle valeur de prenom_ (OUT)
* Retour: aucun 
****************************************************************************/
void Abonne::modifierPrenom(const string& prenom)
{
	prenom_ = prenom;
}
/****************************************************************************
* Fonction: Abonne::modifierAge
* Description: Modifier age_
* Paramètres: - unsigned int: la nouvelle valeur de age_ (IN)
* Retour: aucun 
****************************************************************************/
void Abonne::modifierAge(unsigned int age)
{
	age_ = age;
}

/****************************************************************************
* Fonction: Abonne::obtenirNombreEmprunte
* Description: Retourne le nombre d'emprunts pour un abonne 
* Paramètres: aucun
* Retour: (unsigned int) la valeur de vecEmprunts_.size()
****************************************************************************/
unsigned int Abonne::obtenirNombreEmprunte() const
{
	return vecEmprunts_.size();
}

/****************************************************************************
* Fonction: operator << 
* Description: Affiche les informations concernant l'abonne
* Paramètres: - ostream o : un paramètre de sortie (OUT)
*             - Abonne& abonne: un abonne (OUT)
* Retour: (ostream) la valeur de o
****************************************************************************/
ostream & operator<<(ostream & o, const Abonne & abonne)
{
	// Affichage des informations de base
	o << abonne.prenom_ << ", " <<
		abonne.nom_ << ". " <<
		abonne.age_ << " ans. #" <<
		abonne.matricule_ << endl;

	o << "LISTE DE LIVRES :" << endl;

	// Affichage de la liste de objetEmpruntables

	for (int i = 0; i < abonne.vecEmprunts_.size(); i++)
	{
		o << i + 1 << " - " << *(abonne.vecEmprunts_[i]) << endl;
	}

	// retour
	return o;

}

/****************************************************************************
* Fonction: Abonne::operator==
* Description: Compare deux abonnes
* Paramètres: Abonne& abonne: un abonne à comparer (OUT)
* Retour: (bool) true si abonne_== abonne, sinon false
****************************************************************************/
bool Abonne::operator==(const Abonne & abonne) const
{
	return
		(matricule_ == abonne.matricule_) &&
		(nom_ == abonne.nom_) &&
		(prenom_ == abonne.prenom_) &&
		(age_ == abonne.age_);
}

/****************************************************************************
* Fonction: Abonne::operator==
* Description: Compare deux matricules 
* Paramètres: - string matricule: un matricule à comparer (OUT)
* Retour: (bool) true si matricule_==matricule, sinon false
****************************************************************************/
bool Abonne::operator==(const std::string & matricule) const
{
	return matricule_ == matricule;
}

/****************************************************************************
* Fonction: operator ==
* Description: Compare un abonne et un matricule 
* Paramètres: - string matricule: un matricule (OUT)
* 	      - Abonne& abonne: un abonne (OUT)
* Retour: (bool) true si abonne == matricule, sinon false
****************************************************************************/
bool operator==(const std::string & matricule, const Abonne & abonne)
{
	return abonne == matricule;
}

/// _____________TP3__________________

/****************************************************************************
* Fonction: Abonne::estEmprunte
* Description: Vérifie si l'objetEmpruntable est emprunté
* Paramètres: - ObjetEmpruntable& objetEmpruntable: un objet empruntable 
* Retour: (bool) true si l'objet est emprunté, false sinon 
****************************************************************************/
bool Abonne::estEmprunte(const ObjetEmpruntable & objetEmpruntable) const
{
	// vérifier si le objetEmpruntable est déjà emprunté
	for (int i = 0; i < vecEmprunts_.size(); i++)
	{
		if ((*(vecEmprunts_[i]->obtenirObjetEmpruntable())) == objetEmpruntable)
		{
			return true;
		}
	}
	return false;
}

/****************************************************************************
* Fonction: Abonne::ajouterEmprunt
* Description: Ajoute un emprunt au vecteur d'emprunts
* Paramètres: Emprunt* emprunt: un pointeur d'emprunt (OUT)
* Retour: aucun
****************************************************************************/
void Abonne::ajouterEmprunt(Emprunt* emprunt)
{
	vecEmprunts_.push_back(emprunt);
}

/*****************************************************************************************
* Fonction: Abonne::retirerEmprunt
* Description: Retire un emprunt du vecteur d'emprunts 
* Paramètres: ObjetEmpruntable* objetEmpruntable: un pointeur d'objet empruntable (Out)
* Retour: (bool) true si objetEmpruntable est retire, false sinon
*******************************************************************************************/
bool Abonne::retirerEmprunt(ObjetEmpruntable * objetEmpruntable)
{
	bool estRetire = false;
	for (int i = 0; i < vecEmprunts_.size(); i++)
	{
		if (*(vecEmprunts_[i]->obtenirObjetEmpruntable()) == *objetEmpruntable)
		{
			vecEmprunts_[i] = vecEmprunts_.back();
			vecEmprunts_.pop_back();
			estRetire = true;
		}
	}

	return estRetire;
}

/****************************************************************************
* Fonction: Abonne::obtenirLimiteEmprunt
* Description: Retourne la valeur de limiteEmprunt_
* Paramètres: aucun
* Retour: (unsigned int) la valeur de limiteEmprunt_
****************************************************************************/
unsigned int Abonne::obtenirLimiteEmprunt() const
{
	return limiteEmprunt_;
}
