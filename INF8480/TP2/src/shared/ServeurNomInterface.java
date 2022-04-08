package shared;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;

public interface ServeurNomInterface extends Remote {

    public ArrayList<String> listServeurCalculIp() throws RemoteException;

    public boolean verify(String login, String password) throws RemoteException, AuthentificationFailedException;

    public void addServeurCalcul(String ip) throws RemoteException;
}