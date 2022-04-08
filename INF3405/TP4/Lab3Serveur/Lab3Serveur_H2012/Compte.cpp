#include "Compte.h"

using namespace std;


Compte::Compte()
{
	
	socket = NULL;
	connecte = false;
}


Compte::Compte(string user, string pass)
{
	username = user;
	password = pass;
	socket = NULL;
	connecte = false;
}
Compte::Compte(string user)
{
	username = user;
	socket = NULL;
	connecte = false;
}

string Compte::getPassword()
{
	return password;
}

void Compte::setPass(string pass)
{
	password = pass;
	return ;
}


void Compte::setSocket(SOCKET socket_)
{
	socket = socket_;
	return;
}

string Compte::getUser()
{
	return username;
}

void Compte::setUser(string user)
{
	 username= user;
}

void Compte::deconnexion()
{
	connecte = false;

	return;
}

void Compte::setConnecte(bool connexion)
{
	connecte = connexion;
}

bool Compte::getConnecte()
{
	return connecte;
}




Compte::~Compte()
{
}

