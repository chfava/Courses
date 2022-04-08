#pragma once
#include <WinSock2.h>
#include <string>

using namespace std;

class Compte
{
private:
	string username;
	string password;
	SOCKET socket;
	bool connecte;
	
public:
	Compte();
	Compte(string user);
	Compte(string user, string pass);
	string getPassword();
	string getUser();
	void setPass(string pass);
	void setUser(string user);
	void setSocket(SOCKET socket);
	void deconnexion();
	bool getConnecte();
	void setConnecte(bool connexion);
	~Compte();

};

