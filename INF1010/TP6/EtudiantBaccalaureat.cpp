/****************************************************************************
* Fichier: EtudiantBaccalaureat.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonctions reliées à classe EtudiantBaccalaureat
****************************************************************************/
#include "EtudiantBaccalaureat.h"

using namespace std;
/****************************************************************************
* Fonction: EtudiantBaccalaureat::EtudiantBaccalaureat
* Description: Constructeur par paramètres
* Paramètres: - string matricule: un matricule (OUT)
*             - string nom : un nom (OUT)
*             - string prenom: un prenom (OUT)
*             - unsigned int age: un age (IN)
* Retour: aucun
****************************************************************************/
EtudiantBaccalaureat::EtudiantBaccalaureat(const std::string& matricule, const std::string& nom, const std::string& prenom, unsigned int age)
	: Etudiant(matricule, nom, prenom, age, "Polytechnique Montreal")
{

}
/****************************************************************************
* Fonction: EtudiantBaccalaureat::obtenirLimiteEmprunt
* Description: Retourne la limite d'emprunt pour un etudiant au baccalaureat
* Paramètres: aucun
* Retour: (unsigned int) la limite d'emprunt pour un etudiant au baccalaureat
****************************************************************************/
unsigned int EtudiantBaccalaureat::obtenirLimiteEmprunt() const
{
	return (Etudiant::obtenirLimiteEmprunt()) * 2;
}

