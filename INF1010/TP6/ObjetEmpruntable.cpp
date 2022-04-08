/****************************************************************************
* Fichier: ObjetEmpruntable.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonctions reliées à classe ObjetEmpruntable
****************************************************************************/
#include <iostream>
#include <algorithm>
#include "ObjetEmpruntable.h"
#include "Livre.h"
#include "LivreNumerique.h"
#include "Dvd.h"

using namespace std;
/**********************************************************************************
* Fonction: ObjetEmpruntable:: obtenirNomClasse
* Description: Retourne la classe d'un objet empruntable
* Paramètres: aucun
* Retour: (string) la classe d'un objet empruntable s'il existe, sinon "nullptr"
**********************************************************************************/
std::string ObjetEmpruntable::obtenirNomClasse() const
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
* Fonction: ObjetEmpruntable:: afficherObjetEmpruntable
* Description: Affiche un objet empruntable
* Paramètres: ostream o: un paramètre de sortie (OUT)
* Retour: aucun
****************************************************************************/
void ObjetEmpruntable::afficherObjetEmpruntable(std::ostream& o) const
{

	if (this != nullptr)
	{
		if (this->obtenirNomClasse() == typeid(ObjetEmpruntable).name())
		{
			o << *this;
		}
		else if (this->obtenirNomClasse() == typeid(Livre).name())
		{
			const Livre * liv = dynamic_cast<const Livre*>(this);
			o << *liv;
		}
		else if (this->obtenirNomClasse() == typeid(LivreNumerique).name())
		{
			const LivreNumerique * liv = dynamic_cast<const LivreNumerique*>(this);
			o << *liv;
		}
		else if (this->obtenirNomClasse() == typeid(Dvd).name())
		{
			const Dvd * dvd = dynamic_cast<const Dvd*>(this);
			o << *dvd;
		}
	}
	
}
/****************************************************************************
* Fonction: ObjetEmpruntable::ObjetEmpruntable
* Description: Constructeur par défaut
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
ObjetEmpruntable::ObjetEmpruntable()
	: nbExemplaires_(0), nbDisponibles_(0), ageMinimal_(0)
{

}
/********************************************************************************************************
* Fonction: ObjetEmpruntable::ObjetEmpruntable
* Description: Constructeur par paramètres
* Paramètres: - string cote: une cote (OUT)
*             - string titre: un titre (OUT)
*             - unsigned int annee: une annee (IN)
*             - unsigned int ageMin : un age minimal pour emprunter cet objetEmpruntable (IN)
*             - unsigned int nbExemplaires: le nombre d'exemplaires pour cet objetEmpruntable (IN)
* Retour: aucun
*********************************************************************************************************/
ObjetEmpruntable::ObjetEmpruntable(const string& cote, const string& titre, unsigned int annee, unsigned int ageMin, unsigned int nbExemplaires)
	: cote_(cote), titre_(titre), annee_(annee), ageMinimal_(ageMin), nbExemplaires_(nbExemplaires), nbDisponibles_(nbExemplaires)
{

}
/****************************************************************************
* Fonction: ObjetEmpruntable::~ObjetEmpruntable
* Description: Destructeur
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
ObjetEmpruntable::~ObjetEmpruntable()
{

}
/****************************************************************************
* Fonction: ObjetEmpruntable::obtenirCote
* Description: Retourne cote_
* Paramètres: aucun
* Retour: (string) la valeur de cote_
****************************************************************************/
string ObjetEmpruntable::obtenirCote() const
{
	return cote_;
}
/****************************************************************************
* Fonction: ObjetEmpruntable::obtenirTitre
* Description: Retourne titre_
* Paramètres: aucun
* Retour: (string) la valeur de titre_
****************************************************************************/
string ObjetEmpruntable::obtenirTitre() const
{
	return titre_;
}
/****************************************************************************
* Fonction: ObjetEmpruntable::obtenirAnnee
* Description: Retourne annee_
* Paramètres: aucun
* Retour: (string) la valeur de annee_
****************************************************************************/
unsigned int ObjetEmpruntable::obtenirAnnee() const
{
	return annee_;
}
/****************************************************************************
* Fonction: ObjetEmpruntable::obtenirAgeMinimal
* Description: Retourne ageMinimal_
* Paramètres: aucun
* Retour: (unsigned int) la valeur de ageMinimal_
****************************************************************************/
unsigned int ObjetEmpruntable::obtenirAgeMinimal() const
{
	return ageMinimal_;
}
/****************************************************************************
* Fonction: ObjetEmpruntable::obtenirNbExemplaires
* Description: Retourne nbExemplaires_
* Paramètres: aucun
* Retour: (unsigned) la valeur de nbExemplaires_
****************************************************************************/
unsigned int ObjetEmpruntable::obtenirNbExemplaires() const
{
	return nbExemplaires_;
}
/****************************************************************************
* Fonction: ObjetEmpruntable::obtenirNbDisponibles
* Description: Retourne nbDisponibles_
* Paramètres: aucun
* Retour: (unsigned int) la valeur de nbDisponibles_
****************************************************************************/
unsigned int ObjetEmpruntable::obtenirNbDisponibles() const
{
	return nbDisponibles_;
}
/****************************************************************************************************
* Fonction: ObjetEmpruntable::convertirMinuscule
* Description: Retourne phraseRetour (phrase passée en paramètres qui a été converti en minuscule)
* Paramètres: - string phrase: une phrase à convertir en minuscule (OUT)
* Retour: (string) la valeur de phraseRetour
****************************************************************************************************/
// Converti une phrase en minuscule
std::string ObjetEmpruntable::convertirMinuscule(const std::string & phrase) const
{
	string phraseRetour = phrase;
	std::transform(phrase.begin(), phrase.end(), phraseRetour.begin(), ::tolower);
	return phraseRetour;
}
/***********************************************************************************
* Fonction: ObjetEmpruntable::modifierNbExemplaires
* Description: Modifie la valeur de nbExemplaires_
* Paramètres: - unsigned int nbExemplaires : la nouvelle valeur de nbExemplaires_ (IN)
* Retour: aucun
***********************************************************************************/
void ObjetEmpruntable::modifierNbExemplaires(unsigned int nbExemplaires)
{
	if (nbExemplaires >= nbExemplaires_)
		nbExemplaires_ = nbExemplaires;
	else
	{
		if (nbExemplaires - nbDisponibles_ >= 0)
		{
			nbExemplaires_ = nbExemplaires;
			nbDisponibles_ -= nbExemplaires;
		}
		else
		{
			cout << "Il n'y a pas assez d'exemplaires disponibles pour en supprimer ! " << endl;
		}
	}
}
/************************************************************************************
* Fonction: ObjetEmpruntable::modifierNbDisponibles
* Description: Modifie la valeur de nbDisponibles_
* Paramètres: - unsigned int nbDisponibles: la nouvelle valeur de nbDisponibles_ (IN)
* Retour: aucun
************************************************************************************/
void ObjetEmpruntable::modifierNbDisponibles(unsigned int nbDisponibles)
{
	nbDisponibles_ = nbDisponibles;
}
/****************************************************************************
* Fonction: ObjetEmpruntable::modifierTitre
* Description: Modifie la valeur de titre_
* Paramètres: - string titre: la nouvelle valeur de titre_ (OUT)
* Retour: aucun
****************************************************************************/
void ObjetEmpruntable::modifierTitre(const std::string & titre)
{
	titre_ = titre;
}
/****************************************************************************
* Fonction: ObjetEmpruntable::modifierCote
* Description: Modifie la valeur de cote_
* Paramètres: - string cote: la nouvelle valeur de cote_ (OUT)
* Retour: aucun
****************************************************************************/
void ObjetEmpruntable::modifierCote(const std::string & cote)
{
	cote_ = cote;
}
/****************************************************************************
* Fonction: ObjetEmpruntable::modifierAnnee
* Description: Modifie la valeur de annee_
* Paramètres: - unsigned int annee: la nouvelle valeur de annee_ (IN)
* Retour: aucun
****************************************************************************/
void ObjetEmpruntable::modifierAnnee(unsigned int annee)
{
	annee_ = annee;
}

/*********************************************************************************************
* Fonction: ObjetEmpruntable::operator==
* Description: Compare le titre et la cote de deux objets empruntables
* Paramètres: - ObjetEmpruntable objetEmpruntable : un objet empruntable à comparer (OUT)
* Retour: (bool) true s'ils ont les mêmes attributs, false sinon
**********************************************************************************************/
bool ObjetEmpruntable::operator==(const ObjetEmpruntable & objetEmpruntable) const
{
	return
		(titre_ == objetEmpruntable.titre_) &&
		(cote_ == objetEmpruntable.cote_);
}
/****************************************************************************
* Fonction: ObjetEmpruntable::operator==
* Description: Compare la cote de deux objets empruntables
* Paramètres: - string cote: une cote à comparer (OUT)
* Retour: (bool) true s'ils ont la même cote, false sinon
****************************************************************************/
bool ObjetEmpruntable::operator==(const std::string & cote) const
{
	return cote_ == cote;
}
/************************************************************************************************
* Fonction: ObjetEmpruntable::operator==
* Description: Compare la cote de deux objets empruntables
* Paramètres: - ObjetEmpruntable objetEmpruntable : un objet empruntable à comparer (OUT)
*             - string cote: une cote à comparer (OUT)
* Retour: (bool) true s'ils ont les mêmes attributs, false sinon
************************************************************************************************/
bool operator==(const std::string & cote, const ObjetEmpruntable & objetEmpruntable)
{
	return objetEmpruntable == cote;
}
/***************************************************************************************************************************
* Fonction: ObjetEmpruntable::operator<
* Description: Compare le titre de deux objets empruntables
* Paramètres: - ObjetEmpruntable objetEmpruntable : un objet empruntable à comparer (OUT)
* Retour: (bool) true si le titre de objet implicite est plus court que celui de l'objet passé en paramètres, false sinon
****************************************************************************************************************************/
bool ObjetEmpruntable::operator<(const ObjetEmpruntable & objetEmpruntable) const
{
	return titre_ < objetEmpruntable.titre_;
}
/**********************************************************************************
* Fonction: ObjetEmpruntable::recherche
* Description: Recherche un mot clé parmi les attributs d'un objet empruntable
* Paramètres: - string motsCle : un mot cle à rechercher (OUT)
* Retour: (bool) true si le mot cle est trouve, false sinon
**********************************************************************************/
// Recherche les informations d'un objetEmpruntable à partir d'un mot clé
bool ObjetEmpruntable::recherche(const std::string & motsCle) const
{
	std::size_t trouveTitre = convertirMinuscule(titre_).find(convertirMinuscule(motsCle));
	std::size_t trouveCote = convertirMinuscule(cote_).find(convertirMinuscule(motsCle));

	bool estTrouve =
		(trouveTitre != string::npos) ||
		(trouveCote != string::npos);

	return estTrouve;
}
/****************************************************************************
* Fonction: operator <<
* Description: Affiche les informations concernant un objet empruntable
* Paramètres: - ostream o : un paramètre de sortie (OUT)
*             - ObjetEmpruntable objetEmpruntable : un objet à afficher (OUT)
* Retour: (ostream) la valeur de o
****************************************************************************/
std::ostream & operator<<(std::ostream & o, const ObjetEmpruntable & objetEmpruntable)
{
	return o << 
		objetEmpruntable.cote_ << ". " <<
		objetEmpruntable.titre_ << ". " <<
		objetEmpruntable.annee_ << ". " <<
		objetEmpruntable.ageMinimal_ << " ans et plus.";
}

