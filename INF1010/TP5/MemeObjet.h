/****************************************************************************
* Fichier: MemeObjet.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 25 mars 2016
* Date de modification: 28 mars 2016
* Description: Description du foncteur MemeObjet
****************************************************************************/
#ifndef MEMEOBJET_H
#define MEMEOBJET_H

#include <string>
#include "ObjetEmpruntable.h"

using namespace std;

template <class P>
class MemeObjet {
public:
	MemeObjet(P& attribut);

	template <typename T>
	bool operator() (const T* objet) const;

private:
	P* attribut_;
};

template <class P>
MemeObjet<P>::MemeObjet(P &attribut) : attribut_(&attribut) { }

template <class P>
template <typename T>
bool MemeObjet<P>::operator()(const T *objet) const {
	return *attribut_ == *objet;
}
#endif