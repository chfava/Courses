/****************************************************************************
* Fichier: LivreNumerique.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonctions reliées à classe LivreNumerique
****************************************************************************/
#include "LivreNumerique.h"


using namespace std;

/****************************************************************************
* Fonction: LivreNumerique::LivreNumerique
* Description: Constructeur par défaut
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
LivreNumerique::LivreNumerique() : 
	format_(FORMAT_INCONNU),tailleOctet_(0), lien_(""), Livre()
{
}
/****************************************************************************
* Fonction: LivreNumerique::LivreNumerique
* Description: Constructeur par paramètres
* Paramètres: - FORMAT_DOCUMENT format: valeur de format_ (IN)
*             - unsigned int tailleOctet: valeur de tailleOctet_(IN)
*             - string lien: valeur de lien_(IN)
*             - string cote: valeur de cote_(OUT)
*             - string titre: valeur de titre_(OUT)
*             - unsigned int annee: valeur de annee_(IN)
*             - unsigned int ageMin: valeur de ageMin_(IN)
*             - unsigned nbExemplaires: valeur de nbExemplaires_(IN)
*             - string auteur: valeur de auteur_(OUT)
*             - string genre: valeur de genre_(OUT)
* Retour: aucun
****************************************************************************/
LivreNumerique::LivreNumerique(
	FORMAT_DOCUMENT format, unsigned int tailleOctet, string lien,
	const string & cote, const string & titre, unsigned int annee,
	unsigned int ageMin, unsigned int nbExemplaires,
	const string & auteur, const string & genre) :
	format_(format),
	lien_(lien), tailleOctet_(tailleOctet),
	Livre(cote, titre, annee, ageMin, nbExemplaires, auteur, genre)
{

}

/****************************************************************************
* Fonction: LivreNumerique::~LivreNumerique
* Description: Destructeur
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
LivreNumerique::~LivreNumerique()
{
}
/****************************************************************************
* Fonction: LivreNumerique::obtenirFormat
* Description: Retourne format_
* Paramètres: aucun
* Retour: (FORMAT_DOCUMENT) la valeur de format_
****************************************************************************/
FORMAT_DOCUMENT LivreNumerique::obtenirFormat() const
{
	return format_;
}
/****************************************************************************
* Fonction: LivreNumerique::modifierFormat
* Description: Modifier format_
* Paramètres: FORMAT_DOCUMENT format: la nouvelle valeur de format_
* Retour: aucun
****************************************************************************/
void LivreNumerique::modifierFormat(FORMAT_DOCUMENT format)
{
	format_ = format;
}
/****************************************************************************
* Fonction: LivreNumerique::obtenirFormatStr
* Description: Retourne formatStr
* Paramètres: aucun
* Retour: (strin) la valeur de formatStr_
****************************************************************************/
std::string LivreNumerique::obtenirFormatStr() const
{
	string formatStr = "";
	switch (format_)
	{
	case FORMAT_PDF:
		formatStr = "pdf";
		break;
	case FORMAT_EPUB:
		formatStr = "epub";
		break;
	case FORMAT_DOCX:
		formatStr = "docx";
		break;
	case FORMAT_TXT:
		formatStr = "txt";
		break;
	case FORMAT_INCONNU:
		formatStr = "inconnu";
		break;
	default:
		formatStr = "inconnu";
		break;
	}

	return formatStr;
}

/*****************************************************************************************************
* Fonction: LivreNumerique::recherche
* Description: Cherche si un motsCle correspond à un Livre numérique
* Paramètres: string motsCle: un mot clé à trouver parmi les attributs d'un livre numérique
* Retour: (bool) true si motsCle se trouve parmi les attributs d'un livre numérique, false sinon
*****************************************************************************************************/
bool LivreNumerique::recherche(const std::string & motsCle) const
{
	size_t trouveAuteur = convertirMinuscule(auteur_).find(convertirMinuscule(motsCle));
	size_t trouveGenre = convertirMinuscule(genre_).find(convertirMinuscule(motsCle));
	size_t trouveFormat = convertirMinuscule(obtenirFormatStr()).find(convertirMinuscule(motsCle));

	//Utilisation du demasquage pour appeler la méthode de la classe mère
	bool trouve = ObjetEmpruntable::recherche(motsCle)
		|| (trouveAuteur != string::npos)
		|| (trouveGenre != string::npos)
		|| (trouveFormat != string::npos);

	return trouve;
}

/****************************************************************************
* Fonction: operator <<
* Description: Affiche les informations concernant le livre numerique
* Paramètres: - ostream o : un paramètre de sortie (OUT)
*             - LivreNumerique objet: un livre numerique (OUT)
* Retour: (ostream) la valeur de o
****************************************************************************/
std::ostream & operator<<(std::ostream & o, const LivreNumerique & objet)
{
	const Livre* liv = &objet;

	o << "Objet Numerique!  Taille : " <<
		objet.tailleOctet_ << " oct.  " <<
		objet.lien_ << "  Format : " 
		<< objet.obtenirFormatStr() << endl;

	o << *liv;
	return o;


}

/****************************************************************************
* Fonction: LivreNumerique::modifierTaille
* Description: Modifier tailleOctet_
* Paramètres: unsigned int tailleOctet: la nouvelle valeur de tailleOctet_
* Retour: aucun
****************************************************************************/
void LivreNumerique::modifierTaille(unsigned int tailleOctet)
{
	tailleOctet_ = tailleOctet;
}
/****************************************************************************
* Fonction: LivreNumerique::obtenirTaille
* Description: Retourne tailleOctet_
* Paramètres: aucun
* Retour: (unsigned int) la valeur de tailleOctet_
****************************************************************************/
unsigned int LivreNumerique::obtenirTaille() const
{
	return tailleOctet_;
}
/****************************************************************************
* Fonction: LivreNumerique::modifierLien
* Description: Modifier lien_
* Paramètres: string lien: la nouvelle valeur de lien_
* Retour: aucun
****************************************************************************/
void LivreNumerique::modifierLien(std::string lien)
{
	lien_ = lien;
}
/****************************************************************************
* Fonction: LivreNumerique::obtenirLien
* Description: Retourne lien_
* Paramètres: aucun
* Retour: (string) la valeur de lien_
****************************************************************************/
std::string LivreNumerique::obtenirLien() const
{
	return lien_;
}





