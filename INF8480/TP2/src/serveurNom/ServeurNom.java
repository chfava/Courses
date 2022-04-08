package serveurNom;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.rmi.ConnectException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.HashMap;

import shared.ServeurNomInterface;
import shared.AuthentificationFailedException;

public class ServeurNom implements ServeurNomInterface {
    private HashMap<String, String> clientsHashMap;
    private ArrayList<String> listCalculateServersIP;

    public static void main(String[] args) {
        ServeurNom serveurNom = new ServeurNom();
        serveurNom.run();
    }

    public ServeurNom() {
        super();
        clientsHashMap = new HashMap<String, String>();
        listCalculateServersIP = new ArrayList<String>();
        loadClients();
    }

    private void run() {
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }

        try {
            LocateRegistry.createRegistry(5017);
            ServeurNomInterface stub = (ServeurNomInterface) UnicastRemoteObject.exportObject(this, 5017);

            Registry registry = LocateRegistry.getRegistry(5017);
            registry.rebind("serveurNom", stub);
            System.out.println("Serveur pret !");
        } catch (ConnectException e) {
            System.err.println("Impossible de se connecter au registre RMI. Est-ce que rmiregistry est lancé ?");
            System.err.println();
            System.err.println("Erreur: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Erreur: " + e.getMessage());
        }
    }

    private void loadClients() {
        File directory = new File("./Clients/");
        directory.mkdirs();

        File[] clientFiles = directory.listFiles();

        try {
            if (clientFiles != null) {
                for (File clientFile : clientFiles) {
                    byte[] buffer = Files.readAllBytes(clientFile.toPath());
                    clientsHashMap.put(clientFile.getName(), new String(buffer));
                }
            }
        } catch (IOException e) {
            System.out.println("Erreur: " + e.getMessage());
        }
    }

    @Override
    public ArrayList<String> listServeurCalculIp() throws RemoteException {
        return listCalculateServersIP;
    }

    @Override
    public boolean verify(String login, String password) throws RemoteException, AuthentificationFailedException {
        if (clientsHashMap.containsKey(login)) {
            if (clientsHashMap.get(login).equals(password)) {
                return true;
            } else {
                System.out.println("Client existant tente de se connecter avec le mauvais mot de passe");
                throw new AuthentificationFailedException(login);
            }
        } else {
            System.out.println("Client non existant");
            throw new AuthentificationFailedException(login);
        }
    }

    @Override
    public void addServeurCalcul(String ip) throws RemoteException {
        listCalculateServersIP.add(ip);
        System.out.println("Ajout d'un serveur de calcul à l'adresse " + ip);
    }
}