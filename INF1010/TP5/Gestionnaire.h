/****************************************************************************
* Fichier: Gestionnaire.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 10 mars 2016
* Date de modification: 28 mars 2016
* Description: Description de la classe Gestionnaire
****************************************************************************/
#ifndef GESTIONNAIRE_H
#define GESTIONNAIRE_H

#include <list>
#include <algorithm>

#include "Abonne.h"
#include "Emprunt.h"
#include "ObjetEmpruntable.h"

template <typename T>
class Gestionnaire {
public:
	Gestionnaire();
	~Gestionnaire();

	bool ajouterElement(T *element);
	bool retirerElement(T *element);

	template <typename Predicate>
	bool retirerContenu(const Predicate& p);

	template <typename Predicate>
	T* trouverElement(const Predicate& p) const;

	bool trouverElement(const T &element) const;

	template <typename Predicate>
	std::list<T*> trouverContenu(const Predicate& p) const;

private:
	std::list<T*> liste_;
};

/****************************************************************************
* Fonction: Gestionnaire::Gestionnaire
* Description: Constructeur par défaut
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
template<typename T>
Gestionnaire<T>::Gestionnaire()
{

}

/****************************************************************************
* Fonction: Gestionnaire::Gestionnaire
* Description: Destructeurs
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
template<typename T>
Gestionnaire<T>::~Gestionnaire()
{

}

/****************************************************************************
* Fonction: Gestionnaire::ajouterElement
* Description: Ajoute un pointeur seulement s'il n'est pas dans le conteneur
* Paramètres: - T objet: un pointeur d'objet
* Retour: (bool) true si l'ajout est fait, false sinon
****************************************************************************/
template<typename T>
bool Gestionnaire<T>::ajouterElement(T* element)
{

	if (std::find(liste_.begin(), liste_.end(), element) == liste_.end()) {
		liste_.push_back(element);
		return true;
	}

	return false;
}


/****************************************************************************
* Fonction: Gestionnaire::retirerElement
* Description: Retire un pointeur d'un conteneur
* Paramètres: - T objet: un pointeur d'objet
* Retour: (bool) true si l'objet est retiré, false sinon
****************************************************************************/
template<typename T>
bool Gestionnaire<T>::retirerElement(T *element)
{
	unsigned int taille = liste_.size();
	liste_.remove(element);
	if (liste_.size() != taille)
		return true;
	else
		return false;
}

/****************************************************************************
* Fonction: Gestionnaire::retirerContenu
* Description: Retire l'objet ou les objets qui vérifient la condition
* Paramètres: - predicate condition: une condition à vérifier
* Retour: (bool) true si les objets sont retirés, false sinon
****************************************************************************/
template<typename T>
template<typename Predicate>
bool Gestionnaire<T>::retirerContenu(const Predicate& p)
{
	bool estRetire = false;
	typename std::list<T*>::const_iterator it = std::find_if(liste_.begin(), liste_.end(), p);

	if (it != liste_.end())
	{
		liste_.remove_if(p);
		estRetire = true;
	}

	return estRetire;
}


/************************************************************************************
* Fonction: Gestionnaire::trouverElement
* Description: Recherche l'objet qui vérifie le prédicat et retourne son pointeur
* Paramètres: - predicate condition: une condition à vérifier
* Retour: (T*) le pointeur de l'objet qui vérifie la condition
*************************************************************************************/
template<typename T>
template<typename Predicate>
T* Gestionnaire<T>::trouverElement(const Predicate& p) const
{
	T* pointeur = nullptr;
	auto it = std::find_if(liste_.begin(), liste_.end(), p);

	if (it != liste_.end())
	{
		pointeur = *it;
	}
	return pointeur;
}

/****************************************************************************
* Fonction: Gestionnaire::trouverElement
* Description: Recherche l'objet
* Paramètres: - T objet: un objet à trouver
* Retour: (bool) true si l'objet a été trouvé, false sinon
****************************************************************************/
template<typename T>
bool Gestionnaire<T>::trouverElement(const T &element) const
{
	bool estTrouve = false;
	auto it = std::find(liste_.begin(), liste_.end(), element);

	if (it != liste_.end())
	{
		estTrouve = true;
	}
	return estTrouve;
}


/***********************************************************************************************************
* Fonction: Gestionnaire::trouverContenu
* Description: Recherche tous les objets qui vérifient une condition et retourne une liste de pointeurs
* Paramètres: - predicate condition
* Retour: (list <T*>) une liste de pointeurs des objets qui vérifient une condition
***********************************************************************************************************/
template<typename T>
template<typename Predicate>
std::list<T*> Gestionnaire<T>::trouverContenu(const Predicate& p) const
{
	std::list<T*> listePtr;

	std::copy_if(liste_.begin(), liste_.end(), back_inserter(listePtr), p);
	return listePtr;
}
#endif