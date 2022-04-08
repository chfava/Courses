#undef UNICODE

#include <winsock2.h>
#include <iostream>
#include <algorithm>
#include <strstream>
#include <locale>
#include <vector>
#include <deque>
#include <string> 
#include <fstream>
#include <ctime>
#include "Compte.h"

using namespace std;

// link with Ws2_32.lib
#pragma comment( lib, "ws2_32.lib" )

// External functions
extern DWORD WINAPI EchoHandler(void* sd_) ;
extern void DoSomething( char *src, char *dest );
fstream convoFile;
fstream usersFile;



// List of Winsock error constants mapped to an interpretation string.
// Note that this list must remain sorted by the error constants'
// values, because we do a binary search on the list when looking up
// items.
static struct ErrorEntry {
    int nID;
    const char* pcMessage;

    ErrorEntry(int id, const char* pc = 0) : 
    nID(id), 
    pcMessage(pc) 
    { 
    }

    bool operator<(const ErrorEntry& rhs) const
    {
        return nID < rhs.nID;
    }
} gaErrorList[] = {
    ErrorEntry(0,                  "No error"),
    ErrorEntry(WSAEINTR,           "Interrupted system call"),
    ErrorEntry(WSAEBADF,           "Bad file number"),
    ErrorEntry(WSAEACCES,          "Permission denied"),
    ErrorEntry(WSAEFAULT,          "Bad address"),
    ErrorEntry(WSAEINVAL,          "Invalid argument"),
    ErrorEntry(WSAEMFILE,          "Too many open sockets"),
    ErrorEntry(WSAEWOULDBLOCK,     "Operation would block"),
    ErrorEntry(WSAEINPROGRESS,     "Operation now in progress"),
    ErrorEntry(WSAEALREADY,        "Operation already in progress"),
    ErrorEntry(WSAENOTSOCK,        "Socket operation on non-socket"),
    ErrorEntry(WSAEDESTADDRREQ,    "Destination address required"),
    ErrorEntry(WSAEMSGSIZE,        "Message too long"),
    ErrorEntry(WSAEPROTOTYPE,      "Protocol wrong type for socket"),
    ErrorEntry(WSAENOPROTOOPT,     "Bad protocol option"),
    ErrorEntry(WSAEPROTONOSUPPORT, "Protocol not supported"),
    ErrorEntry(WSAESOCKTNOSUPPORT, "Socket type not supported"),
    ErrorEntry(WSAEOPNOTSUPP,      "Operation not supported on socket"),
    ErrorEntry(WSAEPFNOSUPPORT,    "Protocol family not supported"),
    ErrorEntry(WSAEAFNOSUPPORT,    "Address family not supported"),
    ErrorEntry(WSAEADDRINUSE,      "Address already in use"),
    ErrorEntry(WSAEADDRNOTAVAIL,   "Can't assign requested address"),
    ErrorEntry(WSAENETDOWN,        "Network is down"),
    ErrorEntry(WSAENETUNREACH,     "Network is unreachable"),
    ErrorEntry(WSAENETRESET,       "Net connection reset"),
    ErrorEntry(WSAECONNABORTED,    "Software caused connection abort"),
    ErrorEntry(WSAECONNRESET,      "Connection reset by peer"),
    ErrorEntry(WSAENOBUFS,         "No buffer space available"),
    ErrorEntry(WSAEISCONN,         "Socket is already connected"),
    ErrorEntry(WSAENOTCONN,        "Socket is not connected"),
    ErrorEntry(WSAESHUTDOWN,       "Can't send after socket shutdown"),
    ErrorEntry(WSAETOOMANYREFS,    "Too many references, can't splice"),
    ErrorEntry(WSAETIMEDOUT,       "Connection timed out"),
    ErrorEntry(WSAECONNREFUSED,    "Connection refused"),
    ErrorEntry(WSAELOOP,           "Too many levels of symbolic links"),
    ErrorEntry(WSAENAMETOOLONG,    "File name too long"),
    ErrorEntry(WSAEHOSTDOWN,       "Host is down"),
    ErrorEntry(WSAEHOSTUNREACH,    "No route to host"),
    ErrorEntry(WSAENOTEMPTY,       "Directory not empty"),
    ErrorEntry(WSAEPROCLIM,        "Too many processes"),
    ErrorEntry(WSAEUSERS,          "Too many users"),
    ErrorEntry(WSAEDQUOT,          "Disc quota exceeded"),
    ErrorEntry(WSAESTALE,          "Stale NFS file handle"),
    ErrorEntry(WSAEREMOTE,         "Too many levels of remote in path"),
    ErrorEntry(WSASYSNOTREADY,     "Network system is unavailable"),
    ErrorEntry(WSAVERNOTSUPPORTED, "Winsock version out of range"),
    ErrorEntry(WSANOTINITIALISED,  "WSAStartup not yet called"),
    ErrorEntry(WSAEDISCON,         "Graceful shutdown in progress"),
    ErrorEntry(WSAHOST_NOT_FOUND,  "Host not found"),
    ErrorEntry(WSANO_DATA,         "No host data of that type was found")
};
const int kNumMessages = sizeof(gaErrorList) / sizeof(ErrorEntry);
vector<SOCKET> listeUser;
vector<Compte> listeCompte;

deque<string> messageEnvoyes;

//// WSAGetLastErrorMessage ////////////////////////////////////////////
// A function similar in spirit to Unix's perror() that tacks a canned 
// interpretation of the value of WSAGetLastError() onto the end of a
// passed string, separated by a ": ".  Generally, you should implement
// smarter error handling than this, but for default cases and simple
// programs, this function is sufficient.
//
// This function returns a pointer to an internal static buffer, so you
// must copy the data from this function before you call it again.  It
// follows that this function is also not thread-safe.
const char* WSAGetLastErrorMessage(const char* pcMessagePrefix, int nErrorID = 0)
{
    // Build basic error string
    static char acErrorBuffer[256];
    ostrstream outs(acErrorBuffer, sizeof(acErrorBuffer));
    outs << pcMessagePrefix << ": ";

    // Tack appropriate canned message onto end of supplied message 
    // prefix. Note that we do a binary search here: gaErrorList must be
	// sorted by the error constant's value.
	ErrorEntry* pEnd = gaErrorList + kNumMessages;
    ErrorEntry Target(nErrorID ? nErrorID : WSAGetLastError());
    ErrorEntry* it = lower_bound(gaErrorList, pEnd, Target);
    if ((it != pEnd) && (it->nID == Target.nID)) {
        outs << it->pcMessage;
    }
    else {
        // Didn't find error in list, so make up a generic one
        outs << "unknown error";
    }
    outs << " (" << Target.nID << ")";

    // Finish error message off and return it.
    outs << ends;
    acErrorBuffer[sizeof(acErrorBuffer) - 1] = '\0';
    return acErrorBuffer;
}



int main(void) 
{

	//Initialize texts files

	
	convoFile.open("convo.txt", std::fstream::in | std::fstream::out | std::fstream::app); 
	if (convoFile)
	{
		cout << "Lecture des conversation successfull";
		
	}
	else
	{
		cout << "Creer nouveau fichier" << endl;
		convoFile.open("convo.txt", std::fstream::in | std::fstream::out | fstream::trunc);
	}

	
	usersFile.open("usersFile.txt", std::fstream::in | std::fstream::out | std::fstream::app);
	if (usersFile)
	{
		cout << "Lecture des conversation successfull";
		char compte[200];
		char pass[200];
		while (!usersFile.eof())
		{
			usersFile.getline(compte, 200);
			usersFile.getline(pass, 200);
			listeCompte.push_back(Compte((string)compte, (string)pass));
		}
		usersFile << endl;

	}
	else
	{
		cout << "Creer nouveau fichier" << endl;
		convoFile.open("usersFile.txt", std::fstream::in | std::fstream::out | fstream::trunc);
	}


	//----------------------
	// Initialize Winsock.
	WSADATA wsaData;
	int iResult = WSAStartup(MAKEWORD(2,2), &wsaData);
	if (iResult != NO_ERROR) {
		cerr << "Error at WSAStartup()\n" << endl;
		return 1;
	}
	
	//----------------------
	// Create a SOCKET for listening for
	// incoming connection requests.
	SOCKET ServerSocket;
	ServerSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	if (ServerSocket == INVALID_SOCKET) {
        cerr << WSAGetLastErrorMessage("Error at socket()") << endl;
		WSACleanup();
		return 1;
	}
	char option[] = "1";
	setsockopt(ServerSocket, SOL_SOCKET, SO_REUSEADDR, option, sizeof(option));

    //----------------------
    // The sockaddr_in structure specifies the address family,
    // IP address, and port for the socket that is being bound.
	int port=5000;
    
	//Recuperation de l'adresse locale
	hostent *thisHost;
	
	//TODO Modifier l'adresse IP ci-dessous pour celle de votre poste.
	thisHost=gethostbyname("132.207.29.75");
	char* ip;
	ip=inet_ntoa(*(struct in_addr*) *thisHost->h_addr_list);
	printf("Adresse locale trouvee %s : \n\n",ip);
	sockaddr_in service;
    service.sin_family = AF_INET;
    //service.sin_addr.s_addr = inet_addr("127.0.0.1");
	//	service.sin_addr.s_addr = INADDR_ANY;
	service.sin_addr.s_addr = inet_addr(ip);
    service.sin_port = htons(port);

    if (bind(ServerSocket, (SOCKADDR*) &service, sizeof(service)) == SOCKET_ERROR) {
		cerr << WSAGetLastErrorMessage("bind() failed.") << endl;
		closesocket(ServerSocket);
		WSACleanup();
		return 1;
	}
	
	//----------------------
	// Listen for incoming connection requests.
	// on the created socket
	if (listen(ServerSocket, 30) == SOCKET_ERROR) {
		cerr << WSAGetLastErrorMessage("Error listening on socket.") << endl;
		closesocket(ServerSocket);
		WSACleanup();
		return 1;
	}


	printf("En attente des connections des clients sur le port %d...\n\n",ntohs(service.sin_port));

    while (true) {	

		sockaddr_in sinRemote;
		 int nAddrSize = sizeof(sinRemote);
		// Create a SOCKET for accepting incoming requests.
		// Accept the connection.
		 SOCKET sd = accept(ServerSocket, (sockaddr*)&sinRemote, &nAddrSize);
		 if (sd != INVALID_SOCKET) {
			 cout << "Connection acceptee De : " <<
				 inet_ntoa(sinRemote.sin_addr) << ":" <<
				 ntohs(sinRemote.sin_port) << "." <<
				 endl;
			listeUser.push_back(sd);
			cout << "socket dans la liste" << endl;
			
            DWORD nThreadID;
            CreateThread(0, 0, EchoHandler, (void*)sd, 0, &nThreadID);
        }
        else {
            cerr << WSAGetLastErrorMessage("Echec d'une connection.") << 
                    endl;
           // return 1;
        }
    }
}


//// EchoHandler ///////////////////////////////////////////////////////
// Handles the incoming data by reflecting it back to the sender.

DWORD WINAPI EchoHandler(void* sd_) 
{
	SOCKET sd = (SOCKET)sd_;

	//Trouver l'utilisateur associe au socket 
	int user = -1;
	for (int i = 0; i < listeUser.size(); i++) {
		if (listeUser[i] - sd == 0)
			user = i;
	}
	
	if (user == -1)
		cout << "Erreur : Utilisateur ne se trouve pas dans la liste";
	bool connecteCompte = false;
	bool userExiste = false;
	Compte monCompte;
	while (!connecteCompte)
	{
		userExiste = false;
		char readBuffer[200], outBuffer[200];
		int readBytes;
		char user[200];
		char pass[200];
		readBytes = recv(sd, readBuffer, 200, 0);
		if (readBytes > 0) 
		{
			for (int i = 0; i < listeCompte.size();i++)
			{
				if (listeCompte.at(i).getUser().c_str() == (string)readBuffer)
				{
					if (listeCompte.at(i).getConnecte() == true)
						send(sd, "compte deja utilisé \n", 200, 0);
					else
					{
						send(sd, "entrez le mot de passe \n", 200, 0);

					}
					userExiste = true;
					readBytes = recv(sd, readBuffer, 200, 0);
					if (readBytes > 0)
					{
						if (listeCompte.at(i).getPassword().c_str() == (string)readBuffer)
						{
							monCompte = listeCompte.at(i);
							monCompte.setSocket(sd);
							connecteCompte = true;
						}
						else
						{
							send(sd, "Mauvaise combination utilisateur ou mot de passe \n", 200, 0);
						}
					}
				}
			}

			if (userExiste == false)
			{
				send(sd, "Compte cree \n creer le mot de passe \n ", 200, 0);
				string user = string(readBuffer);
				monCompte = Compte(user);
				listeCompte.push_back(monCompte);
				readBytes = recv(sd, readBuffer, 200, 0);
				
				if (readBytes > 0)
				{
					string pass = string(readBuffer);
					monCompte.setPass(pass);
					monCompte.setSocket(sd);
					monCompte.setConnecte(true);
					connecteCompte = true;
					usersFile.close();
					usersFile.open("usersFile.txt", std::fstream::in | std::fstream::out | std::fstream::app);

					usersFile << monCompte.getUser() << endl;
					usersFile << monCompte.getPassword() << endl;
				}
			}

		}
	}
	send(sd, "connexion", 200, 0);
	char resume[200];
	convoFile.close();
	convoFile.open("convo.txt", std::fstream::in | std::fstream::out | std::fstream::beg);
	while(!convoFile.eof())
	{
		convoFile.getline(resume, 200);
		send(sd, resume, 200, 0);
	}
	while (1) {
		// Read Data from client
		char readBuffer[200], outBuffer[200];
		int readBytes;

		readBytes = recv(sd, readBuffer, 200, 0);
		if (readBytes > 0) {
			cout << "Received " << readBytes << " bytes from client." << endl;
			cout << "Received " << readBuffer << " from client." << endl;
			for (int i = 0; i < listeUser.size(); i++)
			{
				string message = "[Utilisateur ";
				char messageChar[200];
				
				//Get IP address and port of sender
				struct sockaddr_in peerAddr;
				int addrSize = sizeof(peerAddr);
				getpeername(sd, (struct sockaddr*)&peerAddr, &addrSize);
				int port = ntohs(peerAddr.sin_port);


				//Get Time
				time_t t = time(0);   // get time now
				struct tm * now = localtime(&t);


				message += to_string(user);
				message += " - ";
				message += inet_ntoa(peerAddr.sin_addr);
				message += ":";
				message += to_string(port);
				message += " - ";
				message += to_string(now->tm_year + 1900);
				message += "-";
				message += to_string(now->tm_mon + 1);
				message += "-";
				message += to_string(now->tm_mday);
				message += "@";
				message += to_string(now->tm_hour);
				message += ":";
				message += to_string(now->tm_min);
				message += ":";
				message += to_string(now->tm_sec);
				message += "] : ";
				message += readBuffer;
				
				//Write to file
				if (messageEnvoyes.size() >= 15)
				{
					messageEnvoyes.pop_front();
					messageEnvoyes.push_back(message);
					convoFile.close();
					convoFile.open("convo.txt", std::fstream::in | std::fstream::out | std::fstream::trunc);


					for (int i = 0; i < messageEnvoyes.size(); i++)
					{
						convoFile << messageEnvoyes[i] << endl;
					}
				}

				else
				{
					messageEnvoyes.push_back(message);
					convoFile << message << endl;
				}

				strcpy(messageChar, message.c_str());
				send(listeUser.at(i), messageChar, 200, 0);
				cout << "message envoye a " << i <<  " : " << endl;
				cout << message << endl;
			}
			
		}
		else if (readBytes == SOCKET_ERROR) {
			cout << WSAGetLastErrorMessage("Echec de la reception !") << endl;
		}
	}
	closesocket(sd);

	return 0;
}
// Do Something with the information

