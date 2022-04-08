//////////////////////////////////////////////////////////////////////////////
///FICHIER: arc.h
///AUTEUR: Andreanne Laurin, Simon Barrette & Charles-Olivier Favreau
///DATE:18 octobre 2016
///DESCRIPTION: Contient la definition de la classe Arc
//////////////////////////////////////////////////////////////////////////////
#ifndef ARC_H
#define ARC_H

class Arc{
public :

	//Constructeurs & Destructeur
	Arc();
	Arc(void* before,	void* after, int distance);
	~Arc();

	//Accesseurs
	int getDistance();
	void* getBefore() const;
	void* getAfter() const;

private:
	//Variable contenant la longueur de larc et les deux sommets quil lit.
	int distance_;
	void* before_;
	void* after_;
};

#endif