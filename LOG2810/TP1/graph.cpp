//////////////////////////////////////////////////////////////////////////////
///FICHIER: graph.cpp
///AUTEUR: Andreanne Laurin, Simon Barrette & Charles-Olivier Favreau
///DATE:18 octobre 2016
///DESCRIPTION: Contient l'implementation de la classe graph, soit la classe la
// plus importante. Elle connait en fait tout le graph et c'est a partir de
// cette classe que le graphe est affiche, que le chemin le plus cours est
// trouvé, etc.
//////////////////////////////////////////////////////////////////////////////

#include "graph.h"
#include <fstream>
#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

// Constructeur
Graph::Graph(){
	position_ = NULL;
	listArc_ = vector<Arc*>();
	listSommet_ = vector<Sommet*>();
};

// Destructeur
Graph::~Graph(){
	for (int i = 0; i < listArc_.size(); i++){
		delete listArc_[i];
	}
	for (int i = 0; i < listSommet_.size(); i++){
		delete listSommet_[i];
	}

	listArc_.clear();
	listSommet_.clear();
};

// Permet l'ajout d'un arc au vecteur d'arc
void Graph::addArc(Arc* arc){

	listArc_.push_back(arc);
};

// Permet l'ajout d'un sommet au vecteur sommet
void Graph::addSommet(Sommet* sommet){
	listSommet_.push_back(sommet);
};

// CreerGraphe lit le fichier texte puis créer les sommets et les arcs puis appel link
void Graph::creerGraphe(const std::string fileName){
	ifstream buffer;
	buffer.open("graphe1.txt");
	string identifiant1;
	string identifiant2;
	string input;
	string type;
	int distance = 0;


	//Check opening
	if (buffer.fail()) {
		cout << fileName << endl;
		cout << "Probleme ouverture" << endl;
		buffer.close();
	}
    
    // On lit la premiere ligne du fichier et on ajoute les sommets au vecteur de sommet
	while (input != "\n"){
		getline(buffer, identifiant1, ',');
		getline(buffer, type, ';');
		input = buffer.peek();

		if (identifiant1 != "" && type != ""){
			Sommet* sommet = new Sommet(identifiant1, type);
			listSommet_.push_back(sommet);
			identifiant1 = "";
			type = "";
		}
	}
	buffer.ignore(1);
    // On lit la deuxieme ligne du fichier et on ajoute les arcs entre les sommets et on appel link
	while (buffer.peek() != EOF){
		getline(buffer, input, ',');
		//buffer.ignore(1);
		identifiant1 = input;

		getline(buffer, input, ',');
		//buffer.ignore(1);
		identifiant2 = input;

		getline(buffer, input, ';');
		//buffer.ignore(1);
		distance = stoi(input, nullptr, 10);

		this->link(identifiant1, identifiant2, distance);
	}
	buffer.close();
	
	for (int i = 0; i < listSommet_.size(); i++){
		if (listSommet_[i]->getVectorEntrant().size() > 0)
			sortArc(listSommet_[i]->getVectorEntrant());
		if (listSommet_[i]->getVectorSortant().size() > 0)
			sortArc(listSommet_[i]->getVectorSortant());
	}
	
};

// ExtractionGraphe trouve tout les chemins possibles du départ a l'arrivée en fonction de l'autonomie
bool Graph::extractionGraphe(Car car, string depart, string arrivee){
	Sommet* start = findSommet(depart);
	Sommet* finish = findSommet(arrivee);
	bool oneFound = false;
	BrancheExt* shortest;

	vector<BrancheExt*> chemins = {};

	//Initialisation des premiers chemins possibles a partir du point de depart, vers un seul autre sommet
	for (int i = 0; i < start->getVectorSortant().size(); i++){
		BrancheExt* branche = new BrancheExt;
		branche->car = car;
		branche->vectSommets.push_back(start);
		if (isReachable(branche->car, start->getVectorSortant()[i])){
			string identifiant = ((Sommet*)start->getVectorSortant()[i]->getAfter())->getIdentifiant();
			string type = ((Sommet*)start->getVectorSortant()[i]->getAfter())->getType();
			Sommet* sommet = new Sommet(identifiant, type);			
			branche->vectSommets.push_back(sommet);
			branche->vectArcs.push_back(start->getVectorSortant()[i]);
			chemins.push_back(branche);
		}
		if (branche->vectSommets[branche->vectSommets.size() - 1]->getIdentifiant() == finish->getIdentifiant()){
			branche->finished = true;
			oneFound = true;
		}
	}
    // Permet de partir de la fin des chemins existants et boucler afin de trouver le prochain sommet, jusqu'à se
    // rendre au sommet final, sinon on supprime le chemin trouvé
	if (chemins.size() > 0){
		for (int k = 0; k < 100; k++){

			for (int j = 0; j < chemins.size(); j++){
				if (chemins[j] != nullptr){
					BrancheExt* thisBranche = chemins[j];
					if (thisBranche->finished == false){
						Sommet* actuel = findSommet(thisBranche->vectSommets[thisBranche->vectSommets.size() - 1]->getIdentifiant());
						for (int i = 0; i < actuel->getVectorSortant().size(); i++){
							BrancheExt* branche = new BrancheExt;
							branche->vectSommets = thisBranche->vectSommets;
							branche->car = thisBranche->car;
							if (isReachable(branche->car, actuel->getVectorSortant()[i])){
								string identifiant = ((Sommet*)actuel->getVectorSortant()[i]->getAfter())->getIdentifiant();
								string type = ((Sommet*)actuel->getVectorSortant()[i]->getAfter())->getType();
								Sommet* sommet = new Sommet(identifiant, type);
								branche->vectSommets.push_back(sommet);
								chemins.push_back(branche);
							}
							if (branche->vectSommets[branche->vectSommets.size() - 1]->getIdentifiant() == finish->getIdentifiant()){
								branche->finished = true;
								oneFound = true;
							}
						}
						chemins[j] = nullptr;
					}
				}
			}

		}
        // Si on a trouver minimalement un chemin qui fonctionne, on remplace les sommets accessible et
        // les arcs accessible dans les vecteurs de sommets et d'arc du graph original
		if (oneFound == true){
			
			vector<Sommet*> tempVectSommets = {};
			vector<Arc*> tempVectArcs = {};

			for (int i = 0; i < chemins.size(); i++){
				if (chemins[i] != nullptr){
					for (int j = 0; j < chemins[i]->vectSommets.size(); j++){
						if (!findSommet(chemins[i]->vectSommets[j], tempVectSommets))
							tempVectSommets.push_back(chemins[i]->vectSommets[j]);
					}
					for (int k = 0; k < chemins[i]->vectArcs.size(); k++){
						if (!findArc(chemins[i]->vectArcs[k], tempVectArcs))
							tempVectArcs.push_back(chemins[i]->vectArcs[k]);
					}
				}
			}
            //link sommets et arcs
			link(tempVectSommets, tempVectArcs);
			listArc_ = tempVectArcs;
			listSommet_ = tempVectSommets;
			return true;
		}
		else if (oneFound == false){
			cout << endl << "Aucun chemin possible considerant l'autonomie de la voiture" << endl;
			return false;
		}
	}
	else{
		cout << endl << "Aucun chemin possible considerant l'autonomie de la voiture" << endl;
		return false;
	}

	
};

// Link permet de lié chaque pointeur sommet avec ses arcs sortant et entrant respectif, et vice-versa
void Graph::link(vector<Sommet*> &vectSommets, vector<Arc*> &vectArcs ){
	for (int i = 0; i < vectArcs.size(); i++){
		for (int j = 0; j < vectSommets.size(); j++){
			if (vectSommets[j] == vectArcs[i]->getAfter())
				vectSommets[j]->addArcEntrant(vectArcs[i]);
			if (vectSommets[j] == vectArcs[i]->getBefore())
				vectSommets[j]->addArcSortant(vectArcs[i]);
		}
	}

};

// Vérifie si tout les sommets on été parcouru.
bool Graph::chaqueSommetParcouru(){
	for (int i = 0; i < listSommet_.size(); i++){
		if (!listSommet_[i]->getParcouru())
			return false;
	}
	return true;
}

//Vérifie si un automobile peut se rendre d'un sommet à un autre en fonction de son autonomie, du type de
// station sur laquelle elle se trouve et de la longeur de l'arc
bool Graph::isReachable(Car &car, Arc* arc){
	if (car.getMaxRange() < arc->getDistance())
		return false;
	if (((Sommet*)arc->getBefore())->getType() == "hybrid" || car.getType() == ((Sommet*)arc->getBefore())->getType() || (car.getType() == "hybrid" && ((Sommet*)arc->getBefore())->getType() != "rien")) {
		car.setActualRange(car.getMaxRange());
	}
	if (car.getActualRange() < arc->getDistance())
		return false;
	car.setActualRange(car.getActualRange() - arc->getDistance());
	return true;

	
}

// Trouve sur quel sommet le graphe se trouve
void Graph::setPosition(Sommet* position){
	position_ = position;
};

// Permet de dire au graphe sur quel sommet il se trouve
Sommet* Graph::getPosition(){
	return position_;
};

// Fait les liaisons entre les sommets et les arcs (surcharge de link)
void Graph::link(string identifiant1, string identifiant2, int distance){
	Sommet* sommet1;
	Sommet* sommet2;

	sommet1 = findSommet(identifiant1);
	sommet2 = findSommet(identifiant2);
	if (sommet1 != nullptr && sommet2 != nullptr){
		Arc* arc = new Arc((void*)sommet1, (void*)sommet2, distance);
		listArc_.push_back(arc);
		sommet1->addArcSortant(arc);
		sommet2->addArcEntrant(arc);
	}
	else
		cout << "Erreur fct sort(), nullptr";

};

// Trouve un sommet a partir de son identifiant (nom de station ex: A, B, C)
Sommet* Graph::findSommet(string identifant){
	for (int i = 0; i < listSommet_.size(); i++){
		if (listSommet_[i]->getIdentifiant() == identifant)
			return listSommet_[i];
	}
	return nullptr;
}

// LireGraphe affiche le graphe selon les requis du tp
void Graph::lireGraphe(){
	vector <Sommet*> sommetsVoisins = {};
	for (int i = 0; i < listSommet_.size(); i++){
		vector <Arc*> arcVoisinsEntrant = listSommet_[i]->getVectorEntrant();
		vector <Arc*> arcVoisinsSortant = listSommet_[i]->getVectorSortant();

		for (int j = 0; j < arcVoisinsSortant.size(); j++){
			sommetsVoisins.push_back((Sommet*)arcVoisinsSortant[j]->getAfter());
		}

		for (int a = 0; a < arcVoisinsEntrant.size(); a++){
			if (!findSommet(((Sommet*)(arcVoisinsEntrant[a]->getBefore())), sommetsVoisins)){
				sommetsVoisins.push_back((Sommet*)arcVoisinsEntrant[a]->getBefore());
			}
		}

		cout << "(" << listSommet_[i]->getIdentifiant() << ", " << listSommet_[i]->getType() << " (";
		for (int k = 0; k < sommetsVoisins.size(); k++){
			cout << sommetsVoisins[k]->getIdentifiant();
			if (k < sommetsVoisins.size() - 1)
				cout << ",";
		}
		cout << "))" << endl;
		sommetsVoisins.clear();
	}
}

  // Indique si un sommet se trouve dans la liste de sommet (surcharge de findsommet)
bool Graph::findSommet(Sommet* sommet, vector <Sommet*> &list){
	for (int i = 0; i < list.size(); i++){
		if (list[i] == sommet)
			return true;
	}
	return false;
}

// Indique si un arc se trouve dans la liste d'arc
bool Graph::findArc(Arc* arc, vector <Arc*> &list){
	for (int i = 0; i < list.size(); i++){
		if (list[i] == arc)
			return true;
	}
	return false;
}

// plusCourtChemin implemente l'algorithme de Djisktra
vector<Sommet*> Graph::plusCourtChemin(string identifiantStart, string identifiantFinish){
	Sommet* start = findSommet(identifiantStart);
	Sommet* finish = findSommet(identifiantFinish);
	bool isFound = false;
	Branche* shortest = nullptr;

	vector<Branche*> chemins = {};

	//Initialisation des chemins possibles a partir du point de depart
	for (int i = 0; i < start->getVectorSortant().size(); i++){
		Branche* branche = new Branche;
		branche->vectSommets.push_back(start);
		branche->vectSommets.push_back((Sommet*)start->getVectorSortant()[i]->getAfter());
		branche->distance = start->getVectorSortant()[i]->getDistance();
		chemins.push_back(branche);
		if (branche->vectSommets[branche->vectSommets.size() - 1]->getIdentifiant() == finish->getIdentifiant()){
			shortest = branche;
			isFound = true;
		}
	}

	sortChemins(chemins);

    // Continue d'aller d'un sommet a un autre en considérant la longeur de son trajet, et augmente toujours
    // la branche la plus courte jusqu'a atteinte de l'arrivee (bref, implementation de Djisktra)
	while (!isFound){

		Branche* thisBranche = chemins[0];

		for (int i = 0; i < thisBranche->vectSommets[thisBranche->vectSommets.size() - 1]->getVectorSortant().size(); i++){
			Branche* branche = new Branche;
			branche->vectSommets = thisBranche->vectSommets;
			branche->distance = thisBranche->distance;
			branche->vectSommets.push_back((Sommet*)thisBranche->vectSommets[thisBranche->vectSommets.size() - 1]->getVectorSortant()[i]->getAfter());
			branche->distance += thisBranche->vectSommets[thisBranche->vectSommets.size() - 1]->getVectorSortant()[i]->getDistance();
			chemins.push_back(branche);
			if (branche->vectSommets[branche->vectSommets.size() - 1]->getIdentifiant() == finish->getIdentifiant()){
				shortest = branche;
				isFound = true;
			}
		}
		//Swap premier et dernier
		chemins[0] = chemins[chemins.size() - 1];
		chemins.pop_back();
		sortChemins(chemins);

	}
	return shortest->vectSommets;
}

// Permet de mettre le plus cours chemin en premier dans le vecteur pour l'algorithme de Djikstra
void Graph::sortChemins(vector<Branche*> &vect){
	int smallest = 0;
	for (int i = 0; i < vect.size(); i++){
		if (vect[i] != nullptr){
			if (vect[i]->distance < vect[smallest]->distance)
				smallest = i;
		}
	}
	Branche* branche = vect[0];
	vect[0] = vect[smallest];
	vect[smallest] = branche;
}

 // Permet de mettre le plus cours arc en premier dans le vecteur pour l'algorithme de Djikstra
void Graph::sortArc(vector<Arc*> &vect){
	int smallest = 0;
	for (int i = 0; i < vect.size(); i++){
		if (vect[i]->getDistance() < vect[smallest]->getDistance())
			smallest = i;
	}
	Arc* arc = vect[0];
	vect[0] = vect[smallest];
	vect[smallest] = arc;
}




