/****************************************************************************
* Fichier: ExceptionEchecEmprunt.h
* Auteur(s): Charles-Olivier Favreau et Stéphanie Leclerc
* Date de creation: 7 avril 2016
* Date de modification: 13 avril 2016
* Description: Description de la classe ExceptionEchecEmprunt
****************************************************************************/
#ifndef EXCEPTIONECHECEMPRUNT_H
#define EXCEPTIONECHECEMPRUNT_H

#include <string>
#include <exception>

class ExceptionEchecEmprunt :public std::runtime_error
{
public:
    ExceptionEchecEmprunt(std::string message = ""): std ::runtime_error(message){
        compteur_++;
    }
    static int obtenirValeurCompteur(){
        return compteur_;
    }

private: 
     static int compteur_;

};

#endif
