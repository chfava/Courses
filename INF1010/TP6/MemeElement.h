/****************************************************************************
* Fichier: MemeElement.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Description du foncteur MemeElement
****************************************************************************/
#ifndef MEMEELEMENT_H
#define MEMEELEMENT_H


#include <string>
template<typename T, typename P>
class MemeElement
{
public:
	
	MemeElement(P* element) : element_(element) {};
	bool operator() (T *element);

private:
	P* element_;
};

template<typename T, typename P>
bool  MemeElement<T,P>::operator() (T *element)
{
	if (element_ != nullptr)
		return (*element) == (*element_);
	return false;
}

#endif // MEMEELEMENT_H