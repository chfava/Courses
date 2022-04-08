/*
Fichier: Bibliotheqe.cpp
Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
Date de creation: 1er mars 2016
Date de modification: 4 mars 2016
Description: Fonctions reliées à classe Bibliotheque
*/

#include <iostream>
#include <vector>
#include <string>
#include "Bibliotheque.h"
#include "Abonne.h"
#include "Etudiant.h"
#include "Professeur.h"
#include "EtudiantBaccalaureat.h"

using namespace std;
/****************************************************************************
* Fonction: Bibliotheque::Bibliotheque
* Description: Constructeur par défaut
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Bibliotheque::Bibliotheque()
{

}

/****************************************************************************
* Fonction: Bibliotheque::~Bibliotheque
* Description: Destructeur
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Bibliotheque::~Bibliotheque()
{
	// Supprimer uniquement les emprunts
	for (size_t i = 0; i < vecEmprunts_.size(); i++)
	{
		delete vecEmprunts_.back();
		vecEmprunts_.pop_back();
	}
}

/*********************************************************************************
* Fonction: Bibliotheque::trouverAbonne
* Description: Retourne le pointeur de l'abonne qui correspond au matricule
* Paramètres: - string matricule: un matricule à chercher dans le vecAbonnes_
* Retour: (Abonne*) un pointeur d'abonne
**********************************************************************************/
Abonne * Bibliotheque::trouverAbonne(const std::string & matricule) const
{
	for (size_t i = 0; i < vecAbonnes_.size(); i++)
	{
		if (*(vecAbonnes_[i]) == matricule)
		{
			return vecAbonnes_[i];
		}
	}
	return nullptr;
}



/*************************************************************************************
* Fonction: Bibliotheque::trouverObjetEmpruntable
* Description: Retourne le pointeur d'un objet empruntable qui correspond à la cote
* Paramètres: - string cote: une cote à trouver (OUT)
* Retour: (ObjetEmpruntable*) un pointeur d'un objet empruntable 
*************************************************************************************/
ObjetEmpruntable* Bibliotheque::trouverObjetEmpruntable(const std::string& cote) const
{
	for (size_t i = 0; i < vecObj_.size(); i++)
	{
		if (vecObj_[i]->obtenirCote() == cote)
			return vecObj_[i];
	}
	return nullptr;
}




/****************************************************************************
* Fonction: Bibliotheque::obtenirClasseObjet
* Description: Retourne la classe de l'objet empruntable pour une cote donnee
* Paramètres: - string cote: une cote d'un objet empruntable (OUT)
* Retour: (string) la classe de l'objet empruntable pour cette cote 
****************************************************************************/
std::string Bibliotheque::obtenirClasseObjet(std::string const & cote) const
{
	return trouverObjetEmpruntable(cote)->obtenirNomClasse();
}


/*****************************************************************************************
* Fonction: Bibliotheque::ajouterAbonne
* Description: Verifie si un abonne a été ajouté a la bibliotheque
* Paramètres: - Abonne abonne: un abonne a ajouter
* Retour: (bool) true si l'abonne est ajouté, false s'il est deja dans le vecAbonnes_
*****************************************************************************************/
bool Bibliotheque::ajouterAbonne(Abonne& abonne)
{
	// Vérifier s'il est présent dans le vecteur. Si non, l'ajouter
	bool estPresent = false;
	Abonne* ab = trouverAbonne(abonne.obtenirMatricule());
	if (ab != nullptr) {
		for (size_t i = 0; i < vecAbonnes_.size(); i++)
		{
			if ((*vecAbonnes_[i]) == abonne)
				estPresent = true;
		}
	}
	if (!estPresent)
	{
		vecAbonnes_.push_back(&abonne);
	}
	return !estPresent;
}
/****************************************************************************
* Fonction: Bibliotheque::retirerAbonne
* Description: Verifie si un abonne a ete retire
* Paramètres: - string matricule: le matricule d'un abonne (OUT)
* Retour: (bool) true si l'abonne a ete retire, false sinon
****************************************************************************/
bool Bibliotheque::retirerAbonne(const string& matricule)
{
	bool estRetire = false;

	for (size_t i = 0; i < vecAbonnes_.size(); i++)
	{
		// Si l'abonne est trouvé, alors swap sa position avec le dernier élément du vecteur, 
		// puis enlever de le dernier élément du vecteur
		if ((*vecAbonnes_[i]) == matricule)
		{
			// Retirer tous les emprunts
			vector<Emprunt*> abEmprunt = vecAbonnes_[i]->obtenirEmprunts();
			for (size_t j = 0; j < abEmprunt.size(); j++)
			{
				retourner(matricule, abEmprunt[j]->obtenirObjetEmpruntable()->obtenirCote());
			}

			// Retirer l'abonné
			estRetire = true;
			vecAbonnes_[i] = vecAbonnes_.back();
			vecAbonnes_.pop_back();
		}
	}

	return estRetire;
}
/************************************************************************************************************************
* Fonction: Bibliotheque::ajouterObjetEmpruntable
* Description: Verifie si un objet empruntable a ete ajoute et ajoute un pointeur ObjetEmpruntable a la Bibliotheque
* Paramètres: - ObjetEmpruntable* objet: le pointeur d'un objet a ajouter (OUT)
* Retour: (bool) true si l'objet a ete ajoute, false sinon
*************************************************************************************************************************/
bool Bibliotheque::ajouterObjetEmpruntable(ObjetEmpruntable* objet)
{
	// Vérifier s'il est présent dans le vecteur. Si non, l'ajouter
	bool estPresent = false;
	for (size_t i = 0; i < vecObj_.size(); i++)
	{
		if (vecObj_[i] == objet)
			estPresent = true;
	}

	if (!estPresent)
	{
		vecObj_.push_back(objet);
	}
	return !estPresent;
}

/******************************************************************************************************
* Fonction: Bibliotheque::retirerObjetEmpruntable
* Description: Verifie si un objet empruntable a ete retire et retire cet objet a la bibliotheque
* Paramètres: - string cote: la cote de l'objet empruntable a retirer (OUT)
* Retour: (bool) true si l'objet a ete retire, false sinon
*******************************************************************************************************/
bool Bibliotheque::retirerObjetEmpruntable(const std::string & cote)
{

	for (size_t i = 0; i < vecObj_.size(); i++)
	{
		if (vecObj_[i]->obtenirCote() == cote){
			vecObj_[i] = vecObj_[vecObj_.size() - 1];
			vecObj_.pop_back();
		}
	}


	return false;
}

/****************************************************************************
* Fonction: Bibliotheque::rechercherObjetEmpruntable
* Description: Recherche une chaine de mots dans les attributs d'un objet empruntable
* Paramètres: - string str: la chaine de mots à chercher (OUT)
* Retour: aucun
****************************************************************************/
void Bibliotheque::rechercherObjetEmpruntable(const string& str) const
{
	bool trouve = false;
	cout << "Recherche pour le mot : " << str << endl;
	//recherche parmi les objets empruntable
	for (size_t i = 0; i < vecObj_.size(); i++)
	{
		if (vecObj_[i]->recherche(str)){
			vecObj_[i]->afficherObjetEmpruntable(cout);
			trouve = true;
		}
	}
		
	if (!trouve)
	{
		cout << "Aucun Resultat Trouve :-(" << endl;
	}
}

/**********************************************************************************************
* Fonction: Bibliotheque::estEmpruntable
* Description: Verifie si l'objet empruntable peut etre emprunte par un abonne 
* Paramètres: - string matricule: le matricule de l'abonne qui veut faire l'emprunt (OUT)
*             - ObjetEmpruntable objetEmpruntable: un objet à emprunter (OUT)
* Retour: (bool) true si l'objet empruntable peut etre emprunte par un abonne, false sinon
***********************************************************************************************/
bool Bibliotheque::estEmpruntable(const std::string & matricule, const ObjetEmpruntable & objetEmpruntable) const
{	
	bool empruntable = false;
	Abonne* abonne = trouverAbonne(matricule);
	//On doit vérifier que tous les vecteurs sont parcourus
	if (abonne != nullptr)
	{
		empruntable = (objetEmpruntable.obtenirNbDisponibles() >= 1) &&
			(abonne->obtenirAge() >= objetEmpruntable.obtenirAgeMinimal()) &&
			(!(abonne->estEmprunte(objetEmpruntable))) && abonne->obtenirEmprunts().size()<abonne->obtenirLimiteEmprunt();
	}
	
	return empruntable;
}
/*******************************************************************************************
* Fonction: Bibliotheque::emprunter
* Description: Ajoute l'objet empruntable au vecEmprunts_
* Paramètres: - string matricule: le matricule de l'abonne qui veut faire l'emprunt (OUT)
*             - string cote: la cote de l'objet empruntable (OUT)
*             - unsigned int date: la date de retour pour l'emprunt (IN)
* Retour: (bool) true si l'emprunt est fait, false sinon
*******************************************************************************************/
bool Bibliotheque::emprunter(const string& matricule, const string& cote, unsigned int date)
{
	//On doit vérifier que tous les vecteurs sont parcourus
	Abonne* ab = trouverAbonne(matricule);

	ObjetEmpruntable* obj = trouverObjetEmpruntable(cote);

	bool peutEmprunte = false;

	if ((ab != nullptr) && (obj != nullptr))
	{
		// Vérifier s'il est possible d'emprunter l'objet, puis l'emprunter

		peutEmprunte = (estEmpruntable(ab->obtenirMatricule(), *obj));

		if (peutEmprunte)
		{
			Emprunt* emprunt = new Emprunt(matricule, *obj, date);
			ab->ajouterEmprunt(emprunt);
			obj->modifierNbDisponibles(obj->obtenirNbDisponibles() - 1);
		}
	}

	return peutEmprunte;

}

/**********************************************************************************************
* Fonction: Bibliotheque::retourner
* Description: Retourne un emprunt et enlève l'objet empruntable du vecEmprunts_
* Paramètres: - string matricule: le matricule de l'abonne qui retourne l'objet empruntable
*             - string cote: la cote de l'objet empruntable qui est retourne 
* Retour: (bool) true le retour est fait, false sinon
**********************************************************************************************/
bool Bibliotheque::retourner(const string& matricule, const string& cote)
{
	int emPos = -1;
	bool estRetourne = false;

	// Chercher l'emprunt
	for (size_t i = 0; i < vecEmprunts_.size(); i++)
	{
		if ((vecEmprunts_[i]->obtenirMatricule() == matricule) &&
			(*(vecEmprunts_[i]->obtenirObjetEmpruntable()) == cote))
			emPos = i;
	}


	if (emPos != -1)
	{
		Emprunt* em = vecEmprunts_[emPos];
		ObjetEmpruntable* obj = em->obtenirObjetEmpruntable();
		//On doit vérifier que tous les vecteurs sont parcourus
		Abonne* ab = trouverAbonne(matricule);
	
		// Vérifier s'il est possible de retourner l'objetEmpruntable, puis le retourner et détruire l'emprunt
		estRetourne = ab->estEmprunte(*obj);
		if (estRetourne)
		{
			ab->retirerEmprunt(obj);
			vecEmprunts_[emPos] = vecEmprunts_.back();
			vecEmprunts_.pop_back();
			delete em;
			obj->modifierNbDisponibles(obj->obtenirNbDisponibles() + 1);
		}
	}
	return estRetourne;

}

/****************************************************************************
* Fonction: Bibliotheque::infoAbonne
* Description: Affiche les informations de l'abonne qui correspond au matricule donne
* Paramètres: - string matricule: le matricule de l'abonne (OUT)
* Retour: aucun
****************************************************************************/
void Bibliotheque::infoAbonne(const string& matricule) const
{
	//On doit vérifier que tous les vecteurs sont parcourus
	Abonne* ab = trouverAbonne(matricule);

	if (ab != nullptr)
	{
		string type = ab->obtenirNomClasse();
		if (type == "Professeur"){
			cout << dynamic_cast<Professeur*>(ab);
		}
		else{
			if (type == "Etudiant"){
				cout << dynamic_cast<Etudiant*>(ab);
			}
			else if(type == "EtudiantBaccalaureat"){
				cout << dynamic_cast<EtudiantBaccalaureat*>(ab);
			}
		}

	}
	else
	{
		cout << "Abonne - " << matricule << " - non trouve" << endl;
	}

}

/****************************************************************************************
* Fonction: Bibliotheque::operator+=
* Description: Ajoute un abonne
* Paramètres: - Abonne* abonne: un pointeur d'abonne à ajouter à la bibliotheque(OUT)
* Retour: (Bibliotheque) la bibliotheque avec le nouvel abonne
*****************************************************************************************/
Bibliotheque & Bibliotheque::operator+=(Abonne * abonne)
{
	
	ajouterAbonne(*abonne);
	return *this;
}

/**************************************************************************************************************
* Fonction: Bibliotheque::operator+=
* Description: Ajoute un objet empruntable 
* Paramètres: - ObjetEmpruntable* obj : un pointeur d'un objet empruntable a ajouter a la bibliotheque (OUT)
* Retour: (Bibliotheque) la bibliotheque avec le nouvel objet empruntable
**************************************************************************************************************/
Bibliotheque & Bibliotheque::operator+=(ObjetEmpruntable * obj)
{
	ajouterObjetEmpruntable(obj);
	return *this;
}

/****************************************************************************
* Fonction: Bibliotheque::operator-=
* Description: Retire un abonne
* Paramètres: - Abonne* abonne: un pointeur d'abonne a retirer de la bibliotheque (OUT)
* Retour: (Bibliotheque) la bibliotheque sans l'abonne retire
****************************************************************************/
Bibliotheque & Bibliotheque::operator-=(Abonne * abonne)
{
	retirerAbonne(abonne->obtenirMatricule());
	return *this;
}

/****************************************************************************
* Fonction: Bibliotheque::operator-=
* Description: Retire un objet empruntable
* Paramètres: - ObjetEmpruntable* obj: un pointeur d'un objet empruntable a retirer de la bibliotheque (OUT)
* Retour: (Bibliotheque) la bibliotheque sans l'objet empruntable retire
****************************************************************************/
Bibliotheque & Bibliotheque::operator-=(ObjetEmpruntable * obj)
{
	retirerObjetEmpruntable(obj->obtenirCote());
	return *this;
}

/***************************************************************************************************
* Fonction: operator >>
* Description: Recherche un mot fourni par l'utilisateur dans la bibliotheque 
* Paramètres: - istream in: un paramètre d'entrée (IN)
*             - Bibliotheue biblio: une bibliotheque pour trouver le in fourni par l'utilisateur 
* Retour: (istream) la valeur de in
****************************************************************************************************/
std::istream & operator>>(std::istream & in, const Bibliotheque & biblio)
{
	string mot;
	in >> mot;
	biblio.rechercherObjetEmpruntable(mot);
	return in;
}


