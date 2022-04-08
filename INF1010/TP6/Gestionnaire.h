/****************************************************************************
* Fichier: Gestionnaire.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Description de la classe Gestionnaire
****************************************************************************/
#ifndef GESTIONNAIRE_H
#define GESTIONNAIRE_H

#include <list>
#include <algorithm>
#include <iostream>
#include <iterator>

template <typename T>
class Gestionnaire 
{
public:
	// Constructeurs et destructeurs
	/****************************************************************************
	* Fonction: Gestionnaire::Gestionnaire
	* Description: Constructeur par défaut
	* Paramètres: aucun
	* Retour: aucun
	****************************************************************************/
	Gestionnaire() {};
	/****************************************************************************
	* Fonction: Gestionnaire::Gestionnaire
	* Description: Destructeurs
	* Paramètres: aucun
	* Retour: aucun
	****************************************************************************/
	~Gestionnaire() {};

	bool ajouterElement(T* element);
	bool retirerElement(T* element);
	template<typename Predicate>
	bool retirerContenu(const Predicate& p);
	bool trouverElement(const T& element)const;
	template<typename Predicate>
	T* trouverElement(const Predicate& p)const;
	template<typename Predicate>
	std::list<T*> trouverContenu(Predicate& p)const;
private:
	// Attributs
	std::list<T*> listeContenu_;
};

using namespace std;

/****************************************************************************
* Fonction: Gestionnaire::ajouterElement
* Description: Ajoute un pointeur seulement s'il n'est pas dans le conteneur
* Paramètres: - T objet: un pointeur d'objet
* Retour: (bool) true si l'ajout est fait, false sinon
****************************************************************************/
// Ajouter le contenu
template<typename T>
bool Gestionnaire<T>::ajouterElement(T* element)
{
	if (trouverElement(*element))
		return false;
	listeContenu_.push_back(element);
	return true;
}
/****************************************************************************
* Fonction: Gestionnaire::retirerElement
* Description: Retire un pointeur d'un conteneur
* Paramètres: - T objet: un pointeur d'objet
* Retour: (bool) true si l'objet est retiré, false sinon
****************************************************************************/
// retirer le contenu
template<typename T>
bool Gestionnaire<T>::retirerElement(T* element)
{
	size_t sizeAvant = listeContenu_.size();
	listeContenu_.remove(element);
	return  (sizeAvant != listeContenu_.size());
}
/****************************************************************************
* Fonction: Gestionnaire::retirerContenu
* Description: Retire l'objet ou les objets qui vérifient la condition
* Paramètres: - predicate condition: une condition à vérifier
* Retour: (bool) true si les objets sont retirés, false sinon
****************************************************************************/
template<typename T>
template<typename Predicate>
bool Gestionnaire<T>::retirerContenu(const Predicate &p)
{
	size_t sizeAvant = listeContenu_.size();
	listeContenu_.remove_if(p);
	return  (sizeAvant != listeContenu_.size());
}
/****************************************************************************
* Fonction: Gestionnaire::trouverElement
* Description: Recherche l'objet
* Paramètres: - T objet: un objet à trouver
* Retour: (bool) true si l'objet a été trouvé, false sinon
****************************************************************************/
// trouver le contenu
template<typename T>
bool Gestionnaire<T>::trouverElement(const T& element) const
{
	return (find(listeContenu_.begin(), listeContenu_.end(), &element) != listeContenu_.end());
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
	list <T*>::const_iterator trouve = find_if(listeContenu_.begin(), listeContenu_.end(), p);
	if (trouve != listeContenu_.end())
		return (*trouve);
	return nullptr;
}
/***********************************************************************************************************
* Fonction: Gestionnaire::trouverContenu
* Description: Recherche tous les objets qui vérifient une condition et retourne une liste de pointeurs
* Paramètres: - predicate condition
* Retour: (list <T*>) une liste de pointeurs des objets qui vérifient une condition
***********************************************************************************************************/
template<typename T>
template<typename Predicate>
list<T*> Gestionnaire<T>::trouverContenu( Predicate& p) const
{
	list<T*> local;
	copy_if(listeContenu_.begin(), listeContenu_.end(), back_inserter(local), p);
	return local;
}
#endif //GESTIONNAIRE_H
