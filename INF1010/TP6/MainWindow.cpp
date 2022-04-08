/****************************************************************************
* Fichier: MainWindow.cpp
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Fonctions reliées à classe MainWindow
****************************************************************************/
#include "MainWindow.h"
#include "ui_mainwindow.h"

#include <QDialog>
#include <QLabel>
#include <QListWidget>
#include <QMessageBox>
#include <QPushButton>
#include <QStringList>
#include <QStandardItemModel>
#include <QTableView>
#include <QHBoxLayout>
#include <QVBoxLayout>
#include <QVariant>

#include <iostream>
#include <list>

#include "ExceptionEchecEmprunt.h"
#include "ExceptionEchecRetour.h"
#include "DialogEmprunter.h"
#include "Bibliotheque.h"



using namespace std;

Q_DECLARE_METATYPE(Abonne*)
int ExceptionEchecEmprunt::compteur_ = 0;
/****************************************************************************
* Fonction: MainWindow::MainWindow
* Description: Constructeur par paramètres
* Paramètres: - Bibliotheque biblio: un pointeur d'une bibliotheque (OUT)
*             - QWidget parent: un pointeur d'un qwidget (OUT)
* Retour: aucun
****************************************************************************/
MainWindow::MainWindow(Bibliotheque * biblio, QWidget *parent) :
    QMainWindow(parent)
{
    biblio_ = biblio;

    // crée l'interface
    setUI();

    // Connexions entre les signaux et les slots
    setConnections();

    // charge la liste d'abonnes dans l'interface
    chargerAbonnes();
}
/****************************************************************************
* Fonction: MainWindow::~MainWindow
* Description: Destructeur
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
MainWindow::~MainWindow()
{

}
/****************************************************************************
* Fonction: MainWindow::setUI
* Description: Créé les différents de l'interface
* Paramètres: aucun
* Retour: aucun
****************************************************************************/
void MainWindow::setUI()
{
    // Widget et layout pour la liste d'abonnes
    listeAbonnes_ = new QListWidget(this);
    listeAbonnes_->setSortingEnabled(true);
    listeAbonnes_->setFixedWidth(180);
    QVBoxLayout* listeAbLayout = new QVBoxLayout;
    listeAbLayout->addWidget(new QLabel("Liste d'abonnés"));
    listeAbLayout->addWidget(listeAbonnes_);

    // Widget et layout pour le tableau d'emprunts d'un abonne
    tabEmprunts_ = new QTableView(this);
    model_ = new QStandardItemModel(0,3,this);
    model_->setHorizontalHeaderLabels(QStringList() << "Cote" << "Titre" << "Retour prévu");
    tabEmprunts_->setModel(model_);
    int w[3] = {60,220,80};
    for (int i = 0; i < 3; i++) {
        tabEmprunts_->setColumnWidth(i,w[i]);
    }
    tabEmprunts_->setFixedWidth(w[0]+w[1]+w[2]+18);
    QVBoxLayout* tabEmpruntsLayout = new QVBoxLayout;
    tabEmpruntsLayout->addWidget(new QLabel("Emprunts"));
    tabEmpruntsLayout->addWidget(tabEmprunts_);


    ///////////////////////////////////////////////////
    //            !!!!! A FAIRE !!!!!
    // Ajout des boutons Retourner et Ajouter emprunt
    // (avec la même apparence que dans l'exemple)
    ///////////////////////////////////////////////////

    boutonAjoutEmprunt_ = new QPushButton("Ajouter Emprunt",this);
    boutonRetourner_ = new QPushButton("Retirer",this);


    QHBoxLayout* layoutButton = new QHBoxLayout;
    layoutButton->addWidget(boutonAjoutEmprunt_);
    layoutButton->addWidget(boutonRetourner_);
    QVBoxLayout* layoutButtonEmprunt = new QVBoxLayout;
    layoutButtonEmprunt->addLayout(tabEmpruntsLayout);
    layoutButtonEmprunt->addLayout(layoutButton);


    // Layout principal de la fenetre
    QHBoxLayout* mainLayout = new QHBoxLayout;
    mainLayout->addLayout(listeAbLayout);
    mainLayout->addLayout(layoutButtonEmprunt);
    // Crée un nouveau Widget comprenant le layout principal
    QWidget* widget = new QWidget;
    widget->setLayout(mainLayout);
    // Définit ce widget comme etant le widget central de notre classe
    setCentralWidget(widget);

    // Titre de la fenêtre
    setWindowTitle("Gestion de bibliothèque");
}
/**************************************************************************************************
* Fonction: MainWindow::setConnections
* Description: Connecte les événements des éléments de l'interface aux méthodes private slots
* Paramètres: aucun
* Retour: aucun
**************************************************************************************************/
void MainWindow::setConnections()
{
    connect(listeAbonnes_, SIGNAL(itemClicked(QListWidgetItem*)),
            this, SLOT(afficherEmpruntsAbonne(QListWidgetItem*)));


	//////////////////////////////////////
	//       !!!!! A FAIRE !!!!!
	// Ajout des connexions manquantes
	//////////////////////////////////////

    connect(boutonAjoutEmprunt_,SIGNAL(itemClicked()),this, SLOT(ajouterEmprunt()));
    connect(boutonRetourner_,SIGNAL(itemClicked()),this, SLOT(retirerEmprunt()));
    connect(this,SIGNAL(empruntAjoute(QListWidgetItem*)),this, SLOT(afficherEmpruntsAbonne(QListWidgetItem*)));
}
/*******************************************************************************************************
* Fonction: MainWindow::chargerAbonnes
* Description:  Remplit l’objet QListWidget avec la liste de tous les abonnés de la bibliothèque
* Paramètres: aucun
* Retour: aucun
******************************************************************************************************/
// Fonction qui remplit la liste d'abonnes a partir de ceux de la bibliotheque
void MainWindow::chargerAbonnes()
{
    // remplit la liste d'abonnes
    list<Abonne*> abonnes = biblio_->obtenirListeAbonnes();
    for (auto it = abonnes.begin(); it != abonnes.end(); it++) {
        QString s = ((*it)->obtenirNom() + ", " + (*it)->obtenirPrenom()).c_str();
        QListWidgetItem* item = new QListWidgetItem(s, listeAbonnes_);
        item->setData(Qt::UserRole, QVariant::fromValue<Abonne*>(*it));
    }
}
/****************************************************************************************************************
* Fonction: MainWindow::afficherEmpruntsAbonne
* Description: Récupère le pointeur de l'abonné sélectionné dans la liste et les affiche dans la QTableView
* Paramètres: - QListWidgetItem item: le pointeur de l'abonné sélectionné dans la liste
* Retour: aucun
****************************************************************************************************************/
// Fonction qui recupere le pointeur de l'abonne selectionne dans la liste
// et charge les emprunts de cet abonne pour les afficher dans le tableau
void MainWindow::afficherEmpruntsAbonne(QListWidgetItem* item)
{
    Abonne* ab = item->data(Qt::UserRole).value<Abonne*>();
    map<string, Emprunt*> map = biblio_->trierEmprunt(ab);

    model_->removeRows(0,model_->rowCount());
    for (auto it = map.begin(); it != map.end(); it++) {
        Emprunt* e = (*it).second;
        QString cote = e->obtenirObjetEmpruntable()->obtenirCote().c_str();
        QString titre = e->obtenirObjetEmpruntable()->obtenirTitre().c_str();
        QString retour = QString::number(e->obtenirDateRetour());
        QList<QStandardItem*> row;
        row << (new QStandardItem(cote)) << (new QStandardItem(titre)) << (new QStandardItem(retour));
        model_->appendRow(row);
    }
}
/******************************************************************************************************************************
* Fonction: MainWindow::ajouterEmprunt
* Description: Affiche dans une fenêtre dialogue la liste des objets empruntables et permet d’en sélectionner un à emprunter
* Paramètres: aucun
* Retour: aucun
******************************************************************************************************************************/
// Fonction pour l'ajout d'un emprunt a l'abonne selectionne
void MainWindow::ajouterEmprunt()
{

	/////////////////////////////////////////////////////////////
	//                  !!!!! A FAIRE !!!!!
	// - Intercepter les exceptions pouvant être lancées lors 
	//   de l'exécution de cette méthode et afficher des boîtes 
	//   de message appropriées (voir exemple).
	// - Émettre le signal approprié lorsqu'un emprunt est 
	//   réussi pour permettre la mise à jour du tableau 
	//   d'emprunts de l'abonné.
	/////////////////////////////////////////////////////////////

	// Recupere le pointeur de l'abonne selectionne

    try{
    QListWidgetItem* itemAb = obtenirAbonneSelectionne(); // exception possible ici 
    Abonne* ab = itemAb->data(Qt::UserRole).value<Abonne*>();

	// Cree et affiche la fenetre dialogue pour selectionner un nouvel objet a emprunter
    DialogEmprunter* dialog = new DialogEmprunter(biblio_->obtenirListeObjets());
    int result = dialog->exec();
	
	// Tente d'effectuer l'emprunt si on clique sur le bouton Ajouter emprunt
	// (rien de particulier se produit si on clique sur le bouton Annuler)
    if (result == QDialog::Accepted) {
		// pointeur sur l'objet selectionne dans la liste:
        ObjetEmpruntable* obj = dialog->obtenirObjetSelectionne();
		// tentative d'emprunt:
        try{
        biblio_->emprunter(ab->obtenirMatricule(),obj->obtenirCote(),160530); // exception possible ici
        } catch (ExceptionEchecEmprunt& e){
            QMessageBox message;
            QString title = "Échec d'emprunt (" + QString::number(e.obtenirValeurCompteur());
            title = title + "e erreur";
            message.critical(0, title, e.what());
        }
        }
    delete dialog;
    }catch (std::length_error& e){
        QMessageBox message;
        message.critical(0, "Oups !  ", e.what());
    }
}
/****************************************************************************************************************
* Fonction: MainWindow::retirerEmprunt
* Description: La fonction tente de retourner un objet empruntable inexistant pour un abonné inexistant
* Paramètres: aucun
* Retour: aucun
****************************************************************************************************************/
// Fonction de retour d'objet emprunte
void MainWindow::retirerEmprunt()
{

	///////////////////////////////////////////////////////////////
	//                    !!!!! A FAIRE !!!!!
	// Intercepter l'exception lancée par la méthode retourner()
	// et afficher une boîte de message appropriée (voir exemple)
	///////////////////////////////////////////////////////////////
	try {
		biblio_->retourner("0", "0"); // genere une erreur car cet emprunt n'existe pas
	}
	catch (ExceptionEchecRetour& e) {
		QString qstr = QString::fromStdString("Emprunt non trouvé");

		QMessageBox* messageErreur = new QMessageBox(this);
		messageErreur->setIcon(QMessageBox::Critical);
		messageErreur->setWindowTitle(qstr);
		messageErreur->setText(e.what());
		messageErreur->exec();
	}

   

}
/****************************************************************************************************************
* Fonction: MainWindow::obtenirAbonneSelectionne
* Description: Retourne l’élément sélectionné dans la liste d’abonnés
* Paramètres: aucun
* Retour: (QListWidgetItem*) l'élément sélectionné dans la liste d'abonnés
****************************************************************************************************************/
// Fonction qui retourne l'item correspondant a l'abonne selectionne dans la liste
QListWidgetItem* MainWindow::obtenirAbonneSelectionne()
{
    QList<QListWidgetItem*> selection = listeAbonnes_->selectedItems();
    if (selection.isEmpty()) {
        throw std::length_error("Aucun abonne n'est selectionne!");
    }
    return selection.back();
}

