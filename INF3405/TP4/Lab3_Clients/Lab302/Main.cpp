#undef UNICODE

#include <winsock2.h>
#include <ws2tcpip.h>
#include <stdlib.h>
#include <stdio.h>
#include <iostream>


using namespace std;

// Link avec ws2_32.lib
#pragma comment(lib, "ws2_32.lib")
extern DWORD WINAPI EchoHandler(void* sd_);
SOCKET leSocket;

int __cdecl main(int argc, char **argv)
{
    WSADATA wsaData;
    //SOCKET leSocket;// = INVALID_SOCKET;
    struct addrinfo *result = NULL,
                    *ptr = NULL,
                    hints;
    char motEnvoye[200];
	char motRecu[200];
    int iResult;

	//--------------------------------------------
    // InitialisATION de Winsock
    iResult = WSAStartup(MAKEWORD(2,2), &wsaData);
    if (iResult != 0) {
        printf("Erreur de WSAStartup: %d\n", iResult);
        return 1;
    }
	// On va creer le socket pour communiquer avec le serveur
	leSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (leSocket == INVALID_SOCKET) {
        printf("Erreur de socket(): %ld\n\n", WSAGetLastError());
        freeaddrinfo(result);
        WSACleanup();
		printf("Appuyez une touche pour finir\n");
		getchar();
        return 1;
	}
	//--------------------------------------------
	// On va chercher l'adresse du serveur en utilisant la fonction getaddrinfo.
    ZeroMemory( &hints, sizeof(hints) );
    hints.ai_family = AF_INET;        // Famille d'adresses
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_protocol = IPPROTO_TCP;  // Protocole utilisé par le serveur

	// On indique le nom et le port du serveur auquel on veut se connecter
	//char *host = "L4708-XX";
	//char *host = "L4708-XX.lerb.polymtl.ca";
	//char *host = "add_IP locale";
	//char *host = "132.207.29.113";
	char host[15] ;
	char port[4] ;

	cout << "entrer l'adresse ip du serveur" << endl;
	cin>>host;
	struct sockaddr_in sa;

	while (inet_pton(AF_INET, host, &(sa.sin_addr)) != 1)
	{
		cout << "entrer une adresse ip valide" << endl;
		cin >> host;
	}

	int portNum;

	cout << "entrer le port du serveur" << endl;
	cin >> portNum;
	
	while (portNum<5000 || portNum>5050)
	{
		cout << "entrer un port entre 5000 et 5050" << endl;
		cin >> portNum;
	}
	itoa(portNum, port, 10);
	cout << port;
	// getaddrinfo obtient l'adresse IP du host donné
    iResult = getaddrinfo(host, port, &hints, &result);
    if ( iResult != 0 ) {
        printf("Erreur de getaddrinfo: %d\n", iResult);
        WSACleanup();
        return 1;
    }
	//---------------------------------------------------------------------		
	//On parcours les adresses retournees jusqu'a trouver la premiere adresse IPV4
	while((result != NULL) &&(result->ai_family!=AF_INET))   
			 result = result->ai_next; 

//	if ((result != NULL) &&(result->ai_family==AF_INET)) result = result->ai_next;  
	
	//-----------------------------------------
	if (((result == NULL) ||(result->ai_family!=AF_INET))) {
		freeaddrinfo(result);
		printf("Impossible de recuperer la bonne adresse\n\n");
        WSACleanup();
		printf("Appuyez une touche pour finir\n");
		getchar();
        return 1;
	}

	sockaddr_in *adresse;
	adresse=(struct sockaddr_in *) result->ai_addr;
	//----------------------------------------------------
	printf("Adresse trouvee pour le serveur %s : %s\n\n", host,inet_ntoa(adresse->sin_addr));
	printf("Tentative de connexion au serveur %s avec le port %s\n\n", inet_ntoa(adresse->sin_addr),port);
	
	// On va se connecter au serveur en utilisant l'adresse qui se trouve dans
	// la variable result.
	iResult = connect(leSocket, result->ai_addr, (int)(result->ai_addrlen));
	if (iResult == SOCKET_ERROR) {
        printf("Impossible de se connecter au serveur %s sur le port %s\n\n", inet_ntoa(adresse->sin_addr),port);
        freeaddrinfo(result);
        WSACleanup();
		printf("Appuyez une touche pour finir\n");
		getchar();
        return 1;
	}

	printf("Connecte au serveur %s:%s\n\n", host, port);
    freeaddrinfo(result);
	bool compte = false;
	char user[200];
	char pass[200];
	char readBuffer[200];
	int readBytes;
	while (!compte)
	{
		printf("Creez ou entrez votre nom d'utilisateur \n");
		cin >> user;
		iResult = send(leSocket, user, 200, 0);
		if (iResult == SOCKET_ERROR) {
			printf("Erreur du send: %d\n", WSAGetLastError());
			closesocket(leSocket);
			WSACleanup();
			printf("Appuyez une touche pour finir\n");
			getchar();

			return 1;
		}
		readBytes = recv(leSocket, readBuffer, 200, 0);
		if (readBytes > 0) 
		{
			printf("\n");
			printf(readBuffer);
			printf("\n");
			cin >> pass;
			iResult = send(leSocket, pass, 200, 0);
			if (iResult == SOCKET_ERROR) {
				printf("Erreur du send: %d\n", WSAGetLastError());
				closesocket(leSocket);
				WSACleanup();
				printf("Appuyez une touche pour finir \n");
				getchar();
			}
		}
		readBytes = recv(leSocket, readBuffer, 200, 0);
		if (readBytes > 0)
		{

			if (string(readBuffer) == "connexion")
				compte = true;
			else
			{
				printf("\n");
				printf(readBuffer);
				printf("\n");
			}
		}



	}

	DWORD nThreadID;
	CreateThread(0, 0, EchoHandler, (void*)leSocket, 0, &nThreadID);
	bool premiereConnexion = true;
	bool deco = false;
	while (!deco)
	{
		//----------------------------
		// Demander à l'usager un mot a envoyer au serveur
		printf("Saisir un message a envoyer : ");
		gets_s(motEnvoye);
		if ((string)motEnvoye == "" && !premiereConnexion)
			deco = true;
		
			//-----------------------------
			// Envoyer le mot au serveur
		iResult = send(leSocket, motEnvoye, 200, 0);
		if (iResult == SOCKET_ERROR) {
			printf("Erreur du send: %d\n", WSAGetLastError());
			closesocket(leSocket);
			WSACleanup();
			printf("Appuyez une touche pour finir \n");
			getchar();

			return 1;
			}
		premiereConnexion = false;
		

			// cleanup
			//closesocket(leSocket);
			//WSACleanup();
			
			//printf("Appuyez une touche pour finir\n");
			//getchar();
	}
	//cleanup
	closesocket(leSocket);
	WSACleanup();

	printf("Appuyez une touche pour finir\n");
	getchar();
    return 0;
}

DWORD WINAPI EchoHandler(void* sd_)
{
	SOCKET sd = (SOCKET)sd_;
	while (1) {
		// Read Data from client
		char readBuffer[200], outBuffer[200];
		int readBytes;

		readBytes = recv(sd, readBuffer, 200, 0);
		if (readBytes > 0) {
			printf("\n");
			printf("------------------------------------------------------------");
			printf("\n");
			printf(readBuffer);
			printf("\n");
			printf("------------------------------------------------------------");
			printf("\n");
			printf("Saisir un message a envoyer : ");

		}
		else if (readBytes == SOCKET_ERROR) {
			cout << "Echec de la reception !" << endl;
		}
	}
	closesocket(sd);

	return 0;
	
	return NULL;
}