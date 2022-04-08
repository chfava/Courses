/****************************************************************************
* Fichier: Bibliotheque.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 27 mars 2016
* Date de modification: 28 mars 2016
* Description: Fonctions reliées à la classe Bibliotheque
****************************************************************************/
#include "Bibliotheque.h"
#include "RechercheObjetEmpruntable.h"

using namespace std;
/****************************************************************************
* Fonction: Bibliotheque::Bibliotheque
* Description: Constructeur par défaut
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Bibliotheque::Bibliotheque(){
	
};
/****************************************************************************
* Fonction: Bibliotheque::~Bibliotheque
* Description: Destructeur
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
Bibliotheque::~Bibliotheque(){
	DetruireEmprunt detruireEmprunt();
	gestEmprunts_.retirerContenu(detruireEmprunt);
};
/*********************************************************************************
* Fonction: Bibliotheque::trouverAbonne
* Description: Retourne le pointeur de l'abonne qui correspond au matricule
* Paramètres: - string matricule: un matricule à chercher dans le gestAbonnes_
* Retour: (Abonne*) un pointeur d'abonne
**********************************************************************************/
Abonne* Bibliotheque::trouverAbonne(std::string& matricule) const{
	return gestAbonnes_.trouverElement(MemeObjet<const string>(matricule));
};
/*****************************************************************************************
* Fonction: Bibliotheque::ajouterAbonne
* Description: Verifie si un abonne a été ajouté a la bibliotheque
* Paramètres: - Abonne abonne: un abonne a ajouter
* Retour: (bool) true si l'abonne est ajouté, false s'il est deja dans le gestAbonnes_
*****************************************************************************************/
bool Bibliotheque::ajouterAbonne(Abonne& abonne){
	return gestAbonnes_.ajouterElement(&abonne);
};
/****************************************************************************
* Fonction: Bibliotheque::retirerAbonne
* Description: Verifie si un abonne a ete retire
* Paramètres: - string matricule: le matricule d'un abonne (OUT)
* Retour: (bool) true si l'abonne a ete retire, false sinon
****************************************************************************/
bool Bibliotheque::retirerAbonne( std::string& matricule){
	if (gestEmprunts_.trouverElement(MemeObjet<const string>(matricule)))
		return false;
	return gestAbonnes_.retirerElement(trouverAbonne(matricule));
};
/*************************************************************************************
* Fonction: Bibliotheque::trouverObjetEmpruntable
* Description: Retourne le pointeur d'un objet empruntable qui correspond à la cote
* Paramètres: - string cote: une cote à trouver (OUT)
* Retour: (ObjetEmpruntable*) un pointeur d'un objet empruntable
*************************************************************************************/
ObjetEmpruntable* Bibliotheque::trouverObjetEmpruntable( const std::string& cote) const{
	return gestObj_.trouverElement(MemeObjet<const string>(cote));
};
/************************************************************************************************************************
* Fonction: Bibliotheque::ajouterObjetEmpruntable
* Description: Verifie si un objet empruntable a ete ajoute et ajoute un pointeur ObjetEmpruntable a la Bibliotheque
* Paramètres: - ObjetEmpruntable* objet: le pointeur d'un objet a ajouter (OUT)
* Retour: (bool) true si l'objet a ete ajoute, false sinon
*************************************************************************************************************************/
bool Bibliotheque::ajouterObjetEmpruntable(ObjetEmpruntable* objet){
	return gestObj_.ajouterElement(objet);
};
/******************************************************************************************************
* Fonction: Bibliotheque::retirerObjetEmpruntable
* Description: Verifie si un objet empruntable a ete retire et retire cet objet a la bibliotheque
* Paramètres: - string cote: la cote de l'objet empruntable a retirer (OUT)
* Retour: (bool) true si l'objet a ete retire, false sinon
*******************************************************************************************************/
bool Bibliotheque::retirerObjetEmpruntable(std::string& cote){
	if (!gestObj_.trouverElement(MemeObjet<const string>(cote)))
		return false;
	return gestObj_.retirerElement(trouverObjetEmpruntable(cote));
};
/****************************************************************************
* Fonction: Bibliotheque::rechercherObjetEmpruntable
* Description: Recherche une chaine de mots dans les attributs d'un objet empruntable
* Paramètres: - string str: la chaine de mots à chercher (OUT)
* Retour: aucun
****************************************************************************/
void Bibliotheque::rechercherObjetEmpruntable(const std::string& str) const{
	list <ObjetEmpruntable*> listeObjets = gestObj_.trouverContenu(RechercheObjetEmpruntable(str));
	if (listeObjets.size() != 0) {
		listeObjets.sort(TrieParTitre());


		for (auto pos = listeObjets.begin(); pos != listeObjets.end(); pos++) {
			cout << *(*pos) << endl;
		}
	}
	else
		cout << "Il n'y a pas d'objet empruntable dans la bibliotheque contenant " << str << endl; 

};
/*******************************************************************************************
* Fonction: Bibliotheque::emprunter
* Description: Ajoute l'objet empruntable au gestEmprunts_
* Paramètres: - string matricule: le matricule de l'abonne qui veut faire l'emprunt (OUT)
*             - string cote: la cote de l'objet empruntable (OUT)
*             - unsigned int date: la date de retour pour l'emprunt (IN)
* Retour: (bool) true si l'emprunt est fait, false sinon
*******************************************************************************************/
bool Bibliotheque::emprunter(std::string& matricule, std::string& cote, unsigned int date){
	Abonne* abonne = trouverAbonne(matricule);
	ObjetEmpruntable* objetEmpruntable = trouverObjetEmpruntable(cote);
	
	unsigned int nLivresEmpruntes = 0;
	bool estEmprunte = true;

	gestEmprunts_.trouverContenu(Empruntable(matricule, cote, nLivresEmpruntes, estEmprunte));

	if (abonne->obtenirLimiteEmprunt() > nLivresEmpruntes && (estEmprunte) && objetEmpruntable->obtenirNbDisponibles() > 0 && 
		objetEmpruntable->obtenirAgeMinimal() <= abonne->obtenirAge()) {
		Emprunt* emprunt = new Emprunt(matricule, objetEmpruntable, date);
		estEmprunte = gestEmprunts_.ajouterElement(emprunt);
		objetEmpruntable->modifierNbDisponibles((objetEmpruntable->obtenirNbDisponibles() - 1));
	}
	else
		estEmprunte = false;
	return estEmprunte;
};
/**********************************************************************************************
* Fonction: Bibliotheque::retourner
* Description: Retourne un emprunt et enlève l'objet empruntable du gestEmprunts_
* Paramètres: - string matricule: le matricule de l'abonne qui retourne l'objet empruntable
*             - string cote: la cote de l'objet empruntable qui est retourne
* Retour: (bool) true le retour est fait, false sinon
**********************************************************************************************/
bool Bibliotheque::retourner(std::string& matricule, std::string& cote){
	pair<string, string>condition (matricule, cote);
	Emprunt* emprunt = gestEmprunts_.trouverElement(MemeObjet<pair< string,  string>>(condition));
	if (!emprunt)
		return false;
	ObjetEmpruntable* objet = trouverObjetEmpruntable(cote);
	objet->modifierNbDisponibles((objet->obtenirNbDisponibles() + 1));
	return gestEmprunts_.retirerElement(emprunt);
	
	
};
/*****************************************************************************************
* Fonction: Bibliotheque::infoAbonne
* Description: Affiche les informations de l'abonne qui correspond au matricule donne
* Paramètres: - string matricule: le matricule de l'abonne (OUT)
* Retour: aucun
*****************************************************************************************/
void Bibliotheque::infoAbonne(std::string matricule) const{
	Abonne* ab = trouverAbonne(matricule);

	if (ab != nullptr)
	{
		string classe = ab->obtenirNomClasse();

		if (classe.find("Abonne") != std::string::npos)
			cout << dynamic_cast<Abonne&>(*ab) << endl;

		else if (classe.find("Professeur") != string::npos)
			cout << dynamic_cast<Professeur&>(*ab) << endl;


		else if (classe.find("Etudiant") != string::npos)
			cout << dynamic_cast<Etudiant&>(*ab) << endl;


		else if (classe.find("EtudiantBaccalaureat") != string::npos)
			cout << dynamic_cast<EtudiantBaccalaureat&>(*ab) << endl;

		map<string, Emprunt*> mapEmprunts = trierEmprunt(ab);
		for (auto pos = mapEmprunts.begin(); pos != mapEmprunts.end(); pos++) {
			cout << *(pos->second) << endl;
		}
	}
	else
	{
		cout << "Abonne - " << matricule << " - non trouve" << endl;
	}
};
/****************************************************************************************
* Fonction: Bibliotheque::operator+=
* Description: Ajoute un abonne
* Paramètres: - Abonne* abonne: un pointeur d'abonne à ajouter à la bibliotheque(OUT)
* Retour: (Bibliotheque) la bibliotheque avec le nouvel abonne
*****************************************************************************************/
Bibliotheque& Bibliotheque::operator+=(Abonne* abonne){
	ajouterAbonne(*abonne);
	return *this;
};
/**************************************************************************************************************
* Fonction: Bibliotheque::operator+=
* Description: Ajoute un objet empruntable
* Paramètres: - ObjetEmpruntable* obj : un pointeur d'un objet empruntable a ajouter a la bibliotheque (OUT)
* Retour: (Bibliotheque) la bibliotheque avec le nouvel objet empruntable
**************************************************************************************************************/
Bibliotheque& Bibliotheque::operator+=(ObjetEmpruntable* obj){
	ajouterObjetEmpruntable(obj);
	return *this;
};
/********************************************************************************************
* Fonction: Bibliotheque::operator-=
* Description: Retire un abonne
* Paramètres: - Abonne* abonne: un pointeur d'abonne a retirer de la bibliotheque (OUT)
* Retour: (Bibliotheque) la bibliotheque sans l'abonne retire
********************************************************************************************/
Bibliotheque& Bibliotheque::operator-=(Abonne* abonne){
	retirerAbonne(abonne->obtenirMatricule());
	return *this;
};
/**************************************************************************************************************
* Fonction: Bibliotheque::operator-=
* Description: Retire un objet empruntable
* Paramètres: - ObjetEmpruntable* obj: un pointeur d'un objet empruntable a retirer de la bibliotheque (OUT)
* Retour: (Bibliotheque) la bibliotheque sans l'objet empruntable retire
**************************************************************************************************************/
Bibliotheque& Bibliotheque::operator-=(ObjetEmpruntable* obj){
	retirerObjetEmpruntable(obj->obtenirCote());
	return *this;
};
/***************************************************************************************************
* Fonction: operator >>
* Description: Recherche un mot fourni par l'utilisateur dans la bibliotheque
* Paramètres: - istream in: un paramètre d'entrée (IN)
*             - Bibliotheue biblio: une bibliotheque pour trouver le in fourni par l'utilisateur
* Retour: (istream) la valeur de in
****************************************************************************************************/
istream& operator>>(istream& in, const Bibliotheque& biblio){
	string mot;
	in >> mot;
	biblio.rechercherObjetEmpruntable(mot);
	return in;
};

std::string Bibliotheque::obtenirClasseObjet(const std::string & cote) const{
	return trouverObjetEmpruntable(cote)->obtenirNomClasse();
};
/***************************************************************************************************
* Fonction: Bibliotheuqe::trierEmprunt
* Description: Trie les emprunts en ordre alphabétique selon les titres des objets empruntés
* Paramètres: - Abonne abonne: un abonne à trier la liste d'emprunts (OUT)
* Retour: (map <string, Emprunt*>) la valeur de map
****************************************************************************************************/
map<string, Emprunt*> Bibliotheque::trierEmprunt(Abonne * abonne) const{
	map<string, Emprunt*>map;
	auto listeEmprunts = gestEmprunts_.trouverContenu(MemeObjet<const string>(abonne->obtenirMatricule()));
	for (auto pos = listeEmprunts.begin(); pos != listeEmprunts.end(); ++pos)
		map.insert(make_pair((*pos)->obtenirObjetEmpruntable()->obtenirTitre(), (*pos)));
	return map;
	

	return map;
};