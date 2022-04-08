package serveurCalcul;

import java.rmi.AccessException;
import java.rmi.ConnectException;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.lang.*;

import shared.AuthentificationFailedException;
import shared.Operation;
import shared.OverloadException;
import shared.ServeurCalculInterface;
import shared.ServeurNomInterface;

public class ServeurCalcul implements ServeurCalculInterface {
    private String myIp;
    private String serveurNomIp;
    private int capacity;
    private float errorRate;
    private ServeurNomInterface serveurNomStub;
    private Random random;

    public static void main(String[] args) {
        if (args.length < 3) {
            System.out.println("Paramètres manquants");
            return;
        } else if (args.length == 3) {
            ServeurCalcul serveurCalcul = new ServeurCalcul(args[0], args[1], Integer.parseInt(args[2]), 0.0f);
            serveurCalcul.run();
        } else if (args.length == 4) {
            ServeurCalcul serveurCalcul = new ServeurCalcul(args[0], args[1], Integer.parseInt(args[2]),
                    Float.parseFloat(args[3]));
            serveurCalcul.run();
        } else {
            System.out.println("Trop de paramètres");
            return;
        }
    }

    public ServeurCalcul(String myIp, String serveurNomIp, int capacity, float errorRate) {
        super();
        this.myIp = myIp;
        this.serveurNomIp = serveurNomIp;
        this.capacity = capacity;
        this.errorRate = errorRate / 100;

        System.out.println("Adresse IP du serveur de nom  :      " + this.serveurNomIp);
        System.out.println("Capacité du serveur de calcul :      " + this.capacity);
        System.out.println("Taux d'erreur du serveur de calcul : " + this.errorRate * 100 + "%");

        serveurNomStub = loadServeurNomInterface();
        try {
            serveurNomStub.addServeurCalcul(myIp);
        } catch (RemoteException e) {
            System.out.println("Erreur: " + e.getMessage());
        }

        random = new Random(System.nanoTime());
    }

    private void run() {
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }

        try {
            LocateRegistry.createRegistry(5017);
            ServeurCalculInterface stub = (ServeurCalculInterface) UnicastRemoteObject.exportObject(this, 5017);

            Registry registry = LocateRegistry.getRegistry(5017);
            registry.rebind("serveurCalcul", stub);
            System.out.println("Serveur pret !");
        } catch (ConnectException e) {
            System.err.println("Impossible de se connecter au registre RMI. Est-ce que rmiregistry est lancé ?");
            System.err.println();
            System.err.println("Erreur: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Erreur: " + e.getMessage());
        }
    }

    private ServeurNomInterface loadServeurNomInterface() {
        ServeurNomInterface stub = null;

        try {
            Registry registry = LocateRegistry.getRegistry(serveurNomIp, 5017);
            stub = (ServeurNomInterface) registry.lookup("serveurNom");
        } catch (NotBoundException e) {
            System.out.println("Erreur: Le nom '" + e.getMessage() + "' n'est pas défini dans le registre.");
        } catch (AccessException e) {
            System.out.println("Erreur: " + e.getMessage());
        } catch (RemoteException e) {
            System.out.println("Erreur: " + e.getMessage());
        }

        return stub;
    }

    @Override
    public int getCapacity(String login, String password) throws RemoteException, AuthentificationFailedException {
        try {
            serveurNomStub.verify(login, password);
        } catch (RemoteException e) {
            System.out.println("Erreur: " + e.getMessage());
            throw new AuthentificationFailedException(login); // pas tout a fait juste
        } catch (AuthentificationFailedException e) {
            System.out.println("Erreur: " + e.getMessage());
            throw new AuthentificationFailedException(login);
        }

        return capacity;
    }

    @Override
    public int computeOperations(String login, String password, ArrayList<Operation> operations)
            throws RemoteException, AuthentificationFailedException, OverloadException {
        int result = 0;

        try {
            serveurNomStub.verify(login, password);
        } catch (AuthentificationFailedException e) {
            throw new AuthentificationFailedException(login);
        }

        if (isRejected(operations.size())) {
            throw new OverloadException();
        }

        for (Operation operation : operations) {
            if (operation.getOperation() == Operation.PELL) {
                result = result % 4000 + Operations.pell(operation.getOperande());
            } else if (operation.getOperation() == Operation.PRIME) {
                result = result % 4000 + Operations.prime(operation.getOperande());
            }
        }

        if (isMalicious()) {
            result += 1;
        }

        return result % 4000;
    }

    private boolean isRejected(int length) {
        // Cas où le taux de rejet est négatif
        if (length < capacity) {
            return false;
        }

        float rejectRate = (length - capacity) / (4 * capacity);

        // Si un nombre aléatoire est plus petit que le taux de rejet, on rejette
        return random.nextFloat() < rejectRate;
    }

    private boolean isMalicious() {
        return random.nextFloat() < errorRate;
    }
}