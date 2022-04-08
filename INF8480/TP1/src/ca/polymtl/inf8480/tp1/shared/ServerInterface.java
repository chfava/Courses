package ca.polymtl.inf8480.tp1.shared;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.lang.String;

public interface ServerInterface extends Remote {
	int execute(byte[] load) throws RemoteException;
}
