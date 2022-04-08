//////////////////////////////////////////////////////////////////////////////
///FICHIER: main.cpp
///AUTEUR: Andreanne Laurin, Simon Barrette & Charles-Olivier Favreau
///DATE:18 octobre 2016
///DESCRIPTION: Contient l'execution principale de l'application
//////////////////////////////////////////////////////////////////////////////
#include "car.h"
#include "graph.h"
#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>


using namespace std;

//Affiche le menu de base de l'interface console
char showMenu()
{
	char choice;
	cout << endl << endl;
	cout << "Menu" << endl;
	cout << "Veuillez entrer la lettre correspondante a l'option voulue." << endl;
	cout << "(a). Demander les caracteristiques du vehicule" << endl;
	cout << "(b). Mettre a jour la carte" << endl;
	cout << "(c). Determiner le chemin le plus court" << endl;
	cout << "(d). Quitter" << endl;
	cout << endl;
	cout << "Entrer un choix: ";
	cin >> choice;
	choice = tolower(choice);
	return choice;
}

//Permet a l'utilisateur de choisir son type de carburant
void chooseCarburant(Car &car){
	int carburant;

	cout << "Quel est le type de carburant choisi ? Veuillez entrer le numero correspondant." << endl;
	cout << "1. Essence" << endl;
	cout << "2. Electricite" << endl;
	cout << "3. Hybrid" << endl;
	cin >> carburant; 
	

	switch (carburant) {

		case 1:
			car.setType("essence");
			break;

		case 2:
			car.setType("electrique");
			break;
		
		case 3:
			car.setType("hybrid");
			break;

		default :
			cin.clear();
			cin.ignore(100, '\n');
			cout << "Ce n'est pas un choix valide. Veuillez entrer 1, 2, ou 3." << endl << endl;
			chooseCarburant(car);

	}

}

//Permet a l'utilisateur de choisir l'autonomie maximale et actuelle de son automobile
void chooseAutonomie(Car &car) {
	int actual;
	int max;

	cout << "Quelle est l'autonomie maximale? Veuillez entrer un entier " << endl;
	cin >> max;
	while (cin.fail()) {
		cin.clear();
		cin.ignore(100, '\n');
		cout << "Ce n'est pas un choix valide. Veuillez entrer une valeur numerique: " << endl << endl;
		cin >> max;
	}
	bool info = false;

	cout << "Quelle est l'autonomie actuelle? Veuillez entrer un entier " << endl;
	while (!info) {

		cin >> actual;
		while (cin.fail()) {
			cin.clear();
			cin.ignore(100, '\n');
			cout << "Ce n'est pas un choix valide. Veuillez entrer une valeur numerique: " << endl << endl;
			cin >> max;
		}
		if (actual <= max) {
			car.setMaxRange(max);
			car.setActualRange(actual);
			info = true;
		}
		if(!info)
		cout << "L'autonomie actuelle ne peut etre plus grande que l'autonomie maximale. Veuillez entrer une autonomie actuelle plus petite ou egale a l'autonomie maximale." << endl;
	}
}


//Main function
int main() {
	bool quit = false;
	bool aSelected = false;
	bool bSelected = false;
	
	//Create graph
	Graph graph = Graph();
	Car car = Car();

	//Show menu and execute fonction 
	while (!quit) {
		switch (showMenu()) {

			case 'a': {
	
				chooseCarburant(car);
				chooseAutonomie(car);
				const string fileName = "graphe1.txt";
				graph.creerGraphe(fileName);
				aSelected = true;

			}
				break;

			case 'b': {
			
				const string fileName = "graphe1.txt";
				graph.creerGraphe(fileName);
				bSelected = true;
				cout << endl << "La carte a ete mise a jour!" << endl;
				break;
			}
			
			case 'c': {
				if(aSelected != true){
					cout << endl << "Veuillez choisir l'option a avant de pouvoir determiner le chemin" << endl;
					break;
				}

				if (bSelected != true){
					cout << endl << "Veuillez mettre a jour la carte avant de pouvoir determiner le chemin" << endl;
					break;
				}

				string villeA;
				string villeB;
				cout << endl << "Votre voiture est de type " << car.getType() << " et elle possede " << car.getMaxRange() << " d'autonomie maximale, en plus de " << car.getActualRange() << " d'autonomie actuelle." << endl;
				cout << " Voici la carte choisie: " << endl; graph.lireGraphe();
				cout << endl << "Veuillez choisir la station de depart (ex: A, B, C, ...) : ";
				cin >> villeA;
				cout << endl << "Veuillez choisir la station d'arrivee (ex: A, B, C, ...) : ";
				cin >> villeB;
				while (villeA == villeB) {
					cout << "Vous avez deja choisi " << villeA << " comme station de depart! " << endl << "Veuillez choisir une autre station d'arrivee: " << endl;
					cin.clear();
					cin.ignore(100, '\n');
					cin >> villeB;
				}
				if (graph.extractionGraphe(car, villeA, villeB)){
					vector<Sommet*> array = graph.plusCourtChemin(villeA, villeB);
					cout << endl << "Le chemin obtenu est le suivant: " << endl;
					for (int i = 0; i < array.size(); i++)
						cout << array[i]->getIdentifiant() << "  ";
				}
				aSelected = false;
				bSelected = false;
				break;
			}

			case 'd': {

				quit = true;
				break;
			}
			
			default: {
				cin.clear();
				cin.ignore(100, '\n');
				cout << "Ce n'est pas un choix valide. Veuillez entrer a, b, c ou d ." << endl << endl;
			}
		}
	}
}