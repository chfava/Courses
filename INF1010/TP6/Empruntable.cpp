/****************************************************************************
* Fichier: Empruntable.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonctions liées au foncteur Empruntable
****************************************************************************/
#include "Empruntable.h"
/****************************************************************************
* Fonction: Empruntable::Empruntable
* Description: Constructeur par paramètres
* Paramètres: - string matricule: valeur de matricule_ (OUT)
*             - string cote: valeur de cote_ (OUT)
*	          - bool estDejaEmpruntable: valeur de estDejaEmpruntable_ (OUT)
*	          - unsigned int nombreEmprunte: valeur de nombreEmprunte_ (OUT)
* Retour: aucun
****************************************************************************/
Empruntable::Empruntable(const std::string& matricule, const std::string& cote, bool& estDejaEmprunte,unsigned int& nombreEmrunte) : matricule_(matricule), 
cote_(cote), estDejaEmprunte_(&estDejaEmprunte), nombreEmrunte_(&nombreEmrunte)
{}
/*****************************************************************************************
* Fonction: Empruntable::operator()
* Description: Verifie si l'element donné est empruntable 
* Paramètres: - Emprunt* element: un élément à vérifier s'il peut être emprunté (OUT)
* Retour: (bool) Retourne true si l'element est déjà emprunté, false sinon
*****************************************************************************************/
bool  Empruntable::operator() (Emprunt *element)
{
	if (element->obtenirMatricule() == matricule_)
	{
		(*nombreEmrunte_)++;
		if ((*element->obtenirObjetEmpruntable()) == cote_)
			(*estDejaEmprunte_) = true;
		return true;
	}
	return false;
}
/****************************************************************************
* Fonction: Empruntable::obtenirNombreEmrunte
* Description: Retourne *nombreEmrunte_
* Paramètres: aucun
* Retour: (int) la valeur de *nombreEmrunte_
****************************************************************************/
int Empruntable::obtenirNombreEmrunte() 
{ 
	return *nombreEmrunte_; 
}
/****************************************************************************
* Fonction: Empruntable::estDejaEmrunte
* Description: Retourne *estDejaEmprunte_
* Paramètres: aucun
* Retour: (bool) la valeur de *estDejaEmprunte_
****************************************************************************/
bool Empruntable::estDejaEmrunte() 
{ 
	return *estDejaEmprunte_; 
}
