/****************************************************************************
* Fichier: Abonne.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonctions reliées à classe Bibliotheque
****************************************************************************/

#include "Bibliotheque.h"
#include "MemeElement.h"
#include "RechercheObjetEmpruntable.h"
#include "Empruntable.h"
#include "DetruireEmprunt.h"
#include "TrieParTitre.h"
#include "Professeur.h"
#include "Etudiant.h"
#include "EtudiantBaccalaureat.h"
#include "ExceptionEchecEmprunt.h"
#include "ExceptionEchecRetour.h"

#include <list>

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
			//gestEmprunts_.retirerContenu([](Emprunt* a) { delete a; return true; });
	DetruireEmprunt detruire;
	gestEmprunts_.retirerContenu(detruire);
}
/*********************************************************************************
* Fonction: Bibliotheque::obtenirListeAbonnes
* Description: Retourne la liste d'abonnes
* Paramètres: aucun
* Retour: (list <Abonne*>) une liste de pointeurs d'abonnes
**********************************************************************************/
list<Abonne*> Bibliotheque::obtenirListeAbonnes() const
{
    return gestAbonnes_.trouverContenu([](Abonne*){return true;});
}
/*********************************************************************************
* Fonction: Bibliotheque::obtenirListeEmprunts
* Description: Retourne la liste d'emprunts
* Paramètres: aucun
* Retour: (list <Emprunt*>) une liste de pointeurs d'abonnes
**********************************************************************************/
list<Emprunt*> Bibliotheque::obtenirListeEmprunts() const
{
    return gestEmprunts_.trouverContenu([](Emprunt*){return true;});
}
/*********************************************************************************
* Fonction: Bibliotheque::obtenirListeObjets
* Description: Retourne la liste d'objet empruntable
* Paramètres: aucun
* Retour: (list <ObjetEmpruntable*>) une liste de pointeurs d'objets empruntables
**********************************************************************************/
list<ObjetEmpruntable*> Bibliotheque::obtenirListeObjets() const
{
    return gestObj_.trouverContenu([](ObjetEmpruntable*){return true;});
}
/*********************************************************************************
* Fonction: Bibliotheque::trouverAbonne
* Description: Retourne le pointeur de l'abonne qui correspond au matricule
* Paramètres: - string matricule: un matricule à chercher dans le gestAbonnes_
* Retour: (Abonne*) un pointeur d'abonne
**********************************************************************************/
// Retourne l'abonné selon le matricule donné
Abonne* Bibliotheque::trouverAbonne(const string & matricule) const
{
			//return gestAbonnes_.trouverElement([matricule](Abonne* ab) {if (*ab == matricule) return true; return false; });
	MemeElement<Abonne, const string> trouve(&matricule);
	return gestAbonnes_.trouverElement(trouve);
}

/*************************************************************************************
* Fonction: Bibliotheque::trouverObjetEmpruntable
* Description: Retourne le pointeur d'un objet empruntable qui correspond à la cote
* Paramètres: - string cote: une cote à trouver (OUT)
* Retour: (ObjetEmpruntable*) un pointeur d'un objet empruntable
*************************************************************************************/
// Retourne l'objet empruntable selon la cote donnée
ObjetEmpruntable* Bibliotheque::trouverObjetEmpruntable(const string& cote) const
{
			//return gestObj_.trouverElement([cote](ObjetEmpruntable* obj) {if (*obj == cote) return true; return false; });
	MemeElement<ObjetEmpruntable, const string> trouve(&cote);
	return gestObj_.trouverElement(trouve);
}
/*****************************************************************************************
* Fonction: Bibliotheque::ajouterAbonne
* Description: Verifie si un abonne a été ajouté a la bibliotheque
* Paramètres: - Abonne abonne: un abonne a ajouter
* Retour: (bool) true si l'abonne est ajouté, false s'il est deja dans le gestAbonnes_
*****************************************************************************************/
bool Bibliotheque::ajouterAbonne(Abonne& abonne)
{
	return gestAbonnes_.ajouterElement(&abonne);
}
/****************************************************************************
* Fonction: Bibliotheque::retirerAbonne
* Description: Verifie si un abonne a ete retire
* Paramètres: - string matricule: le matricule d'un abonne (OUT)
* Retour: (bool) true si l'abonne a ete retire, false sinon
****************************************************************************/
bool Bibliotheque::retirerAbonne(const string& matricule)
{
			//return gestAbonnes_.retirerContenu([matricule](Abonne* ab) {if (*ab == matricule) return true; return false; });
	MemeElement<Emprunt, const string> trouve(&matricule);
	//trouver tous les emprunts de l'abonne
	list<Emprunt*> listLocal = gestEmprunts_.trouverContenu(trouve);
	// retourner ses emprunts
	for (list<Emprunt*>::iterator it = listLocal.begin(); it != listLocal.end(); it++)
		retourner(matricule, (*it)->obtenirObjetEmpruntable()->obtenirCote());
	//retirer l'abonne 
	Abonne* ab = trouverAbonne(matricule);
	return gestAbonnes_.retirerElement(ab);
}
/************************************************************************************************************************
* Fonction: Bibliotheque::ajouterObjetEmpruntable
* Description: Verifie si un objet empruntable a ete ajoute et ajoute un pointeur ObjetEmpruntable a la Bibliotheque
* Paramètres: - ObjetEmpruntable* objet: le pointeur d'un objet a ajouter (OUT)
* Retour: (bool) true si l'objet a ete ajoute, false sinon
*************************************************************************************************************************/
bool Bibliotheque::ajouterObjetEmpruntable(ObjetEmpruntable* objet)
{
	return gestObj_.ajouterElement(objet);
}
/******************************************************************************************************
* Fonction: Bibliotheque::retirerObjetEmpruntable
* Description: Verifie si un objet empruntable a ete retire et retire cet objet a la bibliotheque
* Paramètres: - string cote: la cote de l'objet empruntable a retirer (OUT)
* Retour: (bool) true si l'objet a ete retire, false sinon
*******************************************************************************************************/
bool Bibliotheque::retirerObjetEmpruntable(const string & cote)
{
			//return gestObj_.retirerContenu([cote](ObjetEmpruntable* obj) {if (*obj == cote) return true; return false; });
	MemeElement<Emprunt, const string> trouve(&cote);
	//verifier si l'objet n'est pas emprunté
	Emprunt* emprunt = gestEmprunts_.trouverElement(trouve);
	//on le retire si aucune exemplaire n'est empruntee 
	if (emprunt == nullptr) {
		ObjetEmpruntable* obj = trouverObjetEmpruntable(cote);
		return gestObj_.retirerElement(obj);
	}
	return false;
}
/******************************************************************************************
* Fonction: Bibliotheque::rechercherObjetEmpruntable
* Description: Recherche une chaine de mots dans les attributs d'un objet empruntable
* Paramètres: - string str: la chaine de mots à chercher (OUT)
* Retour: aucun
******************************************************************************************/
//recherche la chaine de mots parmi les attributs de type string de tous les classes de la famille ObjetEmpruntable
void Bibliotheque::rechercherObjetEmpruntable(const string& str) const
{
	cout << "Recherche pour le mot : " << str << endl;
			//list<ObjetEmpruntable*> listObj = gestObj_.trouverContenu([str](ObjetEmpruntable* obj) {return obj->recherche(str); });
	//creer le foncteur
	RechercheObjetEmpruntable recherche(str);
	//recherche parmi les objets empruntable à l'aide d'un prédicate
	list<ObjetEmpruntable*> listObj = gestObj_.trouverContenu(recherche);

	//creer un foncteur de trie
	TrieParTitre trie;
	//trier la liste des objetEmpruntable selon l'ordre aphabitique
	listObj.sort(trie);
			//Solution avec des lambdas
			//listObj.sort([](ObjetEmpruntable* a, ObjetEmpruntable* b) {if (a->obtenirTitre() < b->obtenirTitre()) return true; return false; });

	//Affciher les objets triés
	for (list<ObjetEmpruntable*>::iterator it = listObj.begin(); it != listObj.end(); it++)
		cout << (*(*it)) << endl;

	if (listObj.empty())
		cout << "Aucun Resultat Trouve :-(" << endl;

}
/*******************************************************************************************
* Fonction: Bibliotheque::emprunter
* Description: Ajoute l'objet empruntable au gestEmprunts_ et lance une exception selon 
*              certaines conditions
* Paramètres: - string matricule: le matricule de l'abonne qui veut faire l'emprunt (OUT)
*             - string cote: la cote de l'objet empruntable (OUT)
*             - unsigned int date: la date de retour pour l'emprunt (IN)
* Retour: aucun
*******************************************************************************************/
// Emprunte l'objet selon d'après sa cote pour la personne correspondant au matricule
void Bibliotheque::emprunter(const string& matricule, const string& cote, unsigned int date)
{
	//On doit vérifier que tous les vecteurs sont parcourus
	Abonne* ab = trouverAbonne(matricule);

	if (ab == nullptr) {
		ExceptionEchecEmprunt echecEmprunt("Abonné non trouvé ");
		throw echecEmprunt;
	}

	ObjetEmpruntable* obj = trouverObjetEmpruntable(cote);

	if (obj == nullptr) {
		ExceptionEchecEmprunt echecEmprunt("Objet empruntable non trouvé ");
		throw echecEmprunt;
	}
    else{

    // On s'assure qu'il est possible d'emprunter l'objet

	///////////////////////////////////////////////////////////////
	//                    !!!!! A FAIRE !!!!!
	// Vérifier les conditions d'emprunts et lancer l'exception
	// appropriée avec le message approprié le cas échéant.
	///////////////////////////////////////////////////////////////

    // vérifier si l'abonné à déjà emprunter l'objet ou s'il a atteint la limite d'emprunter
    unsigned int count = 0;
    bool estTrouve = false;
    Empruntable empruntable(matricule, cote, estTrouve, count);
    gestEmprunts_.trouverContenu(empruntable);
    
	///////////////////////////////////////////////////////////////
	//                    !!!!! A FAIRE !!!!!
	// Vérifier les que l'abonné n'a pas déjà emprunté cet objet
	// et qu'il n'a pas atteint sa limite d'emprunts. Lancer 
	// l'exception appropriée avec le message approprié le cas échéant.
	///////////////////////////////////////////////////////////////
    if (obj->obtenirNbDisponibles() == 0) {
        ExceptionEchecEmprunt echecEmprunt("Aucun exemplaire disponible ");
        throw echecEmprunt;
    }

	if (ab->obtenirAge() < obj->obtenirAgeMinimal()) {
		ExceptionEchecEmprunt echecEmprunt("L'abonné n'a pas l'âge minimal requis ");
		throw echecEmprunt;

	}

	if (estTrouve) {
		ExceptionEchecEmprunt echecEmprunt("L'abonné a déjà emprunté cet objet ");
		throw echecEmprunt;
	}

	if (count >= ab->obtenirLimiteEmprunt()) {
		ExceptionEchecEmprunt echecEmprunt("L'abonné a atteint sa limite d'emprunts ");
		throw echecEmprunt;
	}

    //On ajoute l'emprunt
    else{
    Emprunt* nouvelEmprunt = new Emprunt(ab->obtenirMatricule(), obj, date);
    gestEmprunts_.ajouterElement(nouvelEmprunt);
    obj->modifierNbDisponibles(obj->obtenirNbDisponibles() - 1);
    }
    }
}
/**********************************************************************************************
* Fonction: Bibliotheque::retourner
* Description: Enlève l'objet empruntable du gestEmprunts_ et lance 
*              une exception dans le cas où le pointeur est nul
* Paramètres: - string matricule: le matricule de l'abonne qui retourne l'objet empruntable
*             - string cote: la cote de l'objet empruntable qui est retourne
* Retour: aucun
**********************************************************************************************/
void Bibliotheque::retourner(const string& matricule, const string& cote)
{
    pair<string, string> paire(matricule, cote);
    MemeElement<Emprunt, pair<string, string>> trouve(&paire);

    // Chercher l'emprunt
    Emprunt* em = gestEmprunts_.trouverElement(trouve);

    
	///////////////////////////////////////////////////////////////
	//                    !!!!! A FAIRE !!!!!
    // Lancer l'exception appropriée si l'emprunt n'est pas trouvé.
	///////////////////////////////////////////////////////////////
	if (em == nullptr) {
		ExceptionEchecRetour echecRetour("Emprunt non trouvé ");
		throw echecRetour;
	}

    else{
    ObjetEmpruntable* obj = em->obtenirObjetEmpruntable();
    gestEmprunts_.retirerContenu(trouve);
    delete em;
    obj->modifierNbDisponibles(obj->obtenirNbDisponibles() + 1);
    }
}
/*****************************************************************************************
* Fonction: Bibliotheque::infoAbonne
* Description: Affiche les informations de l'abonne qui correspond au matricule donne
* Paramètres: - string matricule: le matricule de l'abonne (OUT)
* Retour: aucun
*****************************************************************************************/
// Afficher l'information de l'abonné correspondant au matricule
void Bibliotheque::infoAbonne(const string& matricule) const
{
	//On doit vérifier que tous les vecteurs sont parcourus
	Abonne* ab = trouverAbonne(matricule);

	if (ab != nullptr)
	{
		if (ab->obtenirNomClasse() == typeid(Abonne).name())
		{
			cout << *ab;
		}
		else if (ab->obtenirNomClasse() == typeid(Etudiant).name())
		{
			Etudiant * et = dynamic_cast<Etudiant*>(ab);
			cout << *et;
		}
		else if (ab->obtenirNomClasse() == typeid(EtudiantBaccalaureat).name())
		{
			EtudiantBaccalaureat * etB = dynamic_cast<EtudiantBaccalaureat*>(ab);
			cout << *etB;
		}
		else if (ab->obtenirNomClasse() == typeid(Professeur).name())
		{
			Professeur * pro = dynamic_cast<Professeur*>(ab);
			cout << *pro;
		}

		cout << "LISTE DE LIVRES :" << endl;
		//appeler la fonction de trie
        map<string, Emprunt*> map = trierEmprunt(ab);
        int i = 0;
        //Afficher les Objets triés
        for each (pair<string, Emprunt*> paire in map)
            cout << ++i << " - " << (*paire.second) << endl;
    }
	else
	{
		cout << "Abonne - " << matricule << " - non trouve" << endl;
	}
}
/***************************************************************************************************
* Fonction: Bibliotheuqe::trierEmprunt
* Description: Trie les emprunts en ordre alphabétique selon les titres des objets empruntés
* Paramètres: - Abonne abonne: un abonne à trier la liste d'emprunts (OUT)
* Retour: (map <string, Emprunt*>) la valeur de map
****************************************************************************************************/
map<string, Emprunt*> Bibliotheque::trierEmprunt(Abonne * abonne) const
{
	//creer un foncteur 
	string mat = abonne->obtenirMatricule();
	MemeElement<Emprunt, string> trouve(&mat);
	// trouver les emprunt de l'abonne
	list<Emprunt*> listEmp = gestEmprunts_.trouverContenu(trouve);

	map<string, Emprunt*> map;
	for (list<Emprunt*>::iterator it = listEmp.begin(); it != listEmp.end(); it++)
		map[(*it)->obtenirObjetEmpruntable()->obtenirTitre()] = (*it);

	return map;
}

// Retourne un string correspondant au nom de la classe selon la cote donnée
std::string Bibliotheque::obtenirClasseObjet(std::string const & cote) const
{
	ObjetEmpruntable* obj = trouverObjetEmpruntable(cote);
	
	if (obj != nullptr)
		return obj->obtenirNomClasse();
	return "";
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

/********************************************************************************************
* Fonction: Bibliotheque::operator-=
* Description: Retire un abonne
* Paramètres: - Abonne* abonne: un pointeur d'abonne a retirer de la bibliotheque (OUT)
* Retour: (Bibliotheque) la bibliotheque sans l'abonne retire
********************************************************************************************/
Bibliotheque & Bibliotheque::operator-=(Abonne * abonne)
{
	retirerAbonne(abonne->obtenirMatricule());
	return *this;
}
/**************************************************************************************************************
* Fonction: Bibliotheque::operator-=
* Description: Retire un objet empruntable
* Paramètres: - ObjetEmpruntable* obj: un pointeur d'un objet empruntable a retirer de la bibliotheque (OUT)
* Retour: (Bibliotheque) la bibliotheque sans l'objet empruntable retire
**************************************************************************************************************/
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


