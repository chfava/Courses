//
//  main.cpp
//  
//
//  Created by Vincent Dandenault on 2016-11-17.
//
//


#include <stdio.h>
#include <iostream>
#include <string>
#include <fstream>
#include <algorithm>
#include <stdlib.h>

#include "Utilisateur.h"
#include "Zone.h"
#include "Vehicule.h"
#include "Node.h"

static const int MAX_CARS = 10;
static const int ZONE_RANDOM = 4;
using namespace std;  

/**
* L'interface principale du menu
*/


char Menu()
{
	char choice;
	cout << endl << endl;
	cout << "Menu" << endl;
	cout << "Entrez la lettre correspondante a l'option voulue." << endl;
	cout << "(a) Créer les zones. SVP entrer les fichiers .txt contenant les lexiques des différentes zones." << endl;
	cout << "(b) Entrer les clients et les véhicules. Chaque clients doit avoir un point de départ, une destination, ainsi qu'un numéro de groupe." << endl;
	cout << "(c) Démarez la simulation." << endl;
	cout << "(d) Quitter" << endl;
	cout << endl;
	cout << "Entrez un choix s'il vous plait : ";
	cin >> choice;
	choice = tolower(choice);
	return choice;
}

void lireFichier(string nomFichier, vector< vector<string>>& zipCode)
{
	ifstream fichierALire(nomFichier);
	fichierALire.open(nomFichier, ifstream::in);
	if (fichierALire.fail()) 
	{
		cout << nomFichier << endl;
		cout << "Probleme ouverture" << endl;
		fichierALire.close();
	}
	int compteur = 0;
	while (!fichierALire.eof()) 
	{
		string carac = "";
		carac += fichierALire.get();
		if (carac == "\n")
		{
			compteur++;
			char carac = fichierALire.get();
		}
		zipCode[compteur].push_back(carac);
	}
};

Node* findParent(string& carac, Node* automate) {
	for (int i = 0; i < automate->getNodesEnfants().size(); i++)
	{
		if ((automate->getNodesEnfants()[i])->getEtat() == carac)
			return automate->getNodesEnfants()[i];
		if (automate->getNodesEnfants()[i] != nullptr)
			findParent(carac, automate->getNodesEnfants()[i]);
	}
}

void creerAutomates(vector< vector<string>>& zipCode, Node* automate)
{
	Node* node = new Node(zipCode[0][0]);
	automate->addNodeEnfants(node);
	vector<string> charAdded = vector<string>();
	charAdded.push_back(node->getEtat());

	for (int i = 0; i < zipCode.size(); i++) 
	{
		if (find(charAdded.begin(), charAdded.end(), zipCode[0][i]) != charAdded.end())
		{
			Node* node = new Node(zipCode[i][0]);
			charAdded.push_back(node->getEtat());
			automate->addNodeEnfants(node);
		}
	}

	for (int i = 1; i < zipCode.size(); i++){
		for (int j = 1; j < zipCode[i].size(); j++){
			if (find(charAdded.begin(), charAdded.end(), zipCode[i][j]) != charAdded.end())
			{
				Node* node = new Node(zipCode[i][j]);
				charAdded.push_back(node->getEtat());
				Node* nodeParent = findParent(zipCode[i][j - 1], automate);
				node->setNodeParent(nodeParent);
				nodeParent->addNodeEnfants(node);
			}
		}
		charAdded.clear();
	}
};

void equilibrerFlotte(vector <Zone*> zones, Zone* zoneDepart, Zone* zoneArrivee, Vehicule* vehicule, Utilisateur* utilisateur)
{
	bool desequilibre = true;
	while (desequilibre)
	{
		for (int i = 0; i < zones.size(); i++)
		{
			if (zones[i] == zoneArrivee && (zones[i]->getCarsSize() + 1) <= MAX_CARS)
			{
				zones[i]->addCar(vehicule);
				bool desequilibre = false;
				utilisateur->setZipCode(zoneArrivee->getName());
			}

			else
			{
				int zoneRandom = rand() % ZONE_RANDOM + 1;
				if (zones[zoneRandom] != zoneDepart && (zones[zoneRandom]->getCarsSize() + 1) <= MAX_CARS)
				{
					zones[zoneRandom]->addCar(vehicule);
					desequilibre = false;
					utilisateur->setZipCode(zones[zoneRandom]->getName());
				}
			}
		}
	}

};

/**

/**
* Démarre la simulation et affiche les deux tableaux montrant les résultats de la simulation. 
*
*  \param [in] 
*/

void lancerSimulation(vector<Vehicule*> vehicules, vector<Utilisateur**> utilisateurs, vector<Node*> automates = vector<Node*>())
{
	bool vehiculeLibreTrouve = false;

	//requete de l'utilisateur
	// /!\ cette boucle for(avec h) doit etre adapatee avec une recherche par automate 
	for (int h = 0; h < utilisateurs.size(); h++) //h est pour la vague
	{
		for (int i = 0; i < utilisateurs.size(); i++)
		{
			for (int j = 0; j < vehicules.size(); j++)
			{
				if (utilisateurs[h][i]->getZipCode() == vehicules[j]->getZoneDepart() //recherche vehicule
					&& vehicules[j]->getEstLibre())
				{
					vehicules[j]->setZoneDepart(utilisateurs[h][i]->getPointArrivee()); //vehicule va a l'arrivee
					vehicules[j]->incrementerTrajetsOccupes();
				}
				else
				{
					for (int k = 0; k < vehicules.size() && !vehiculeLibreTrouve; k++) //recherche vehicule libre
					{
						if (vehicules[k]->getEstLibre())
						{
							vehiculeLibreTrouve = true;

							vehicules[k]->setZoneDepart(utilisateurs[h][i]->getZipCode());//vehicule va a l'utilisateur
							vehicules[k]->incrementerTrajetsVides();

							vehicules[j]->setZoneDepart(utilisateurs[h][i]->getPointArrivee());//vehicule va a l'arrivee
							vehicules[j]->incrementerTrajetsOccupes();
						}
					}
				}
			}
		}
		//equilibrerFlotte();
	}
		
	//equilibrer flotte
};

int main()
{
	bool quit = false;
	bool aSelected = false;
	bool aChoisi = false;
	bool bChoisi = false;

	vector< vector<string>> zipCode = vector< vector<string>>();
	vector<Node*> automates = vector<Node*>();
	vector<Vehicule*> vehicules;
	vector<Utilisateur**> utilisateurs;
	vector<Zone*> zones;
	vector<int> nVehiculesZoneInitial;

	Zone zone1;

	//Afficher le menu et executer les options 

	while (!quit) {
		switch (Menu()) {

		case 'a': {
					  Node* automate = new Node();
					  automates.push_back(automate);
					  aChoisi = true;
					  bool done = false;
					  while (!quit)
					  {
						  char choice[] = "";
						  cout << "Entrez le nom du fichier .txt pour creer le lexique s'il vous plait,"
							  << "entrez quit lorsqu'il n'a plus de fichier à lire " << endl;
						  cin >> choice;
						  string str(choice);
						  if (choice == "quit")
						  {
							  quit = true;
							  break;
						  }
						  lireFichier(str, zipCode);
						  creerAutomates(zipCode, automate);
					  }
		}
			break;


		case 'b': {
					  bool done = false;
					  bChoisi = true;
					  if (aChoisi)
					  {
						  while (!quit)
						  {


						  }
					  }
					  break;
		}

		case 'c': {

					  for (int i = 0; i < zones.size(); i++)
					  {
						  nVehiculesZoneInitial[i] = zones[i]->getCarsSize();
					  }

					  lancerSimulation(vehicules, utilisateurs, automates);

					  cout << "_________________________________________________________________________" << endl
						  << "Numero du vehicule | Nombre de trajets occupes | Nombre de trajets a vide" << endl;
					  for (int i = 0; i < vehicules.size(); i++)
					  {
						  cout << "Vehicule " << i << " |   " << vehicules[i]->getTrajetsOccupes() << "   |    "
							  << vehicules[i]->getTrajetsOccupes() << endl;
					  }

					  cout << "_____________________________________________________________________________" << endl
						  << "Numero de la zone | Nombre de vehicules initiaux | Nombre de apres simulation" << endl;
					  for (int i = 0; i < vehicules.size(); i++)
					  {
						  cout << "Zone " << i << " |   " << nVehiculesZoneInitial[i] << "   |    "
							  << zones[i]->getCarsSize() << endl;
					  }
					  break;
		}

		case 'd': {
					  quit = true;
					  break;
		}

		default: {
					 cin.clear();
					 cin.ignore(100, '\n');
					 cout << "Ceci n'est pas un choix valide. Entrez a,b,c ou d s'il vous plait." << endl << endl;
		}
		}
	}
}