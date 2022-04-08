package shared;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

public interface ServeurCalculInterface extends Remote {
    int getCapacity(String login, String password) throws RemoteException, AuthentificationFailedException;

    int computeOperations(String login, String password, ArrayList<Operation> operations)
            throws RemoteException, AuthentificationFailedException, OverloadException;
}