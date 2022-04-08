package repartiteur;

import java.io.File;
import java.io.IOException;
import java.rmi.AccessException;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.nio.file.Files;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import shared.AuthentificationFailedException;
import shared.Operation;
import shared.OverloadException;
import shared.ServeurCalculInterface;
import shared.ServeurNomInterface;

public class Repartiteur {
    private String serveurNomIp;
    private static final String login = "user";
    private static final String password = "abcd";
    /**
     * boolean secured
     * 
     * true (default) : les serveurs de calcul sont considérés bons et valides, 1
     * seul résultat suffit
     * 
     * false : on ne fait pas confiance aux serveurs de calcul, 2 résultats
     * identiques sont requis pour valider un lot d'opérations
     */
    private static final boolean secured = true;
    private static File file;
    private ServeurNomInterface serveurNomInterface;
    private ArrayList<ServeurCalculInterface> serveurCalculInterfaces;
    private ArrayList<Operation> operations;
    private HashMap<ServeurCalculInterface, Integer> serveurCalculCapacityHashMap;
    private HashMap<ServeurCalculInterface, Boolean> serveurCalculWorkingHashMap;
    private ArrayList<OperationListToCompute> operationListToComputeToReassign;

    public static void main(String[] args) {

        if (args.length < 2) {
            System.out.println("Paramètre manquant");
            return;
        } else if (args.length == 2) {
            Repartiteur repartiteur = new Repartiteur(args);
            repartiteur.run();
        } else {
            System.out.println("Trop de paramètres");
            return;
        }
    }

    public Repartiteur(String[] args) {
        super();

        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }

        serveurNomIp = args[0];

        file = new File(args[1]);
        serveurNomInterface = loadServeurNomInterface();
        serveurCalculInterfaces = new ArrayList<ServeurCalculInterface>();

        try {
            for (String serveurCalculIp : serveurNomInterface.listServeurCalculIp()) {
                serveurCalculInterfaces.add(loadServeurCalculInterface(serveurCalculIp));
            }
        } catch (RemoteException e) {
            System.out.println("Erreur: " + e.getMessage());
        }

        serveurCalculCapacityHashMap = new HashMap<ServeurCalculInterface, Integer>();
        serveurCalculWorkingHashMap = new HashMap<ServeurCalculInterface, Boolean>();
        operationListToComputeToReassign = new ArrayList<OperationListToCompute>();
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

    private ServeurCalculInterface loadServeurCalculInterface(String serveurCalculIp) {
        ServeurCalculInterface stub = null;

        try {
            Registry registry = LocateRegistry.getRegistry(serveurCalculIp, 5017);
            stub = (ServeurCalculInterface) registry.lookup("serveurCalcul");

            System.out.println("Serveur de calcul " + serveurCalculIp);
        } catch (NotBoundException e) {
            System.out.println("Erreur: Le nom '" + e.getMessage() + "' n'est pas défini dans le registre.");
        } catch (AccessException e) {
            System.out.println("Erreur: " + e.getMessage());
        } catch (RemoteException e) {
            System.out.println("Erreur: " + e.getMessage());
        }

        return stub;
    }

    private void run() {
        if (!loadOperations()) {
            System.out.println("Impossible de charger les opérations");
            return;
        }

        if (!loadCapacities()) {
            System.out.println("Impossible de charger les capacités");
            return;
        }

        int result = 0;
        // Pool de thread, un par serveur de calcul
        ExecutorService executorService = Executors.newFixedThreadPool(serveurCalculInterfaces.size());
        // Liste des objets retournés
        List<Future<OperationListToCompute>> operationListToComputeResultList = new ArrayList<Future<OperationListToCompute>>();
        long startTime = System.nanoTime();

        do {
            OperationListToCompute operationListToCompute = null;

            for (Future<OperationListToCompute> resultFuture : operationListToComputeResultList) {
                if (resultFuture.isDone()) {
                    ServeurCalculInterface serveurCalculInterface;

                    try {
                        operationListToCompute = resultFuture.get();

                        // A partir d'ici on sait que l'on a pas eu d'exception à l'exécution
                        if (operationListToCompute.getServeurCalculInterface2() == null) {
                            serveurCalculWorkingHashMap.put(operationListToCompute.getServeurCalculInterface1(), false);
                        } else {
                            serveurCalculWorkingHashMap.put(operationListToCompute.getServeurCalculInterface2(), false);
                        }

                        if (secured) {
                            result = (result + operationListToCompute.getResult1()) % 4000;
                        } else {
                            if (operationListToCompute.getResult2() < 0) {
                                // Résultat à recalculer une seconde fois
                                operationListToComputeToReassign.add(operationListToCompute);
                            } else if (operationListToCompute.isResultValid()) {
                                // Résultat calculé deux fois correctement
                                result = (result + operationListToCompute.getResult1()) % 4000;
                            } else {
                                // Erreur de calcul entre les deux serveurs
                                operationListToCompute.reset();
                                operationListToComputeToReassign.add(operationListToCompute);
                            }
                        }
                    } catch (InterruptedException e) {
                        System.out.println("Erreur: " + e.getMessage());
                    } catch (ExecutionException e) { // interruption levée par un throw dans le code
                        Throwable t = e.getCause();

                        if (t instanceof LostServerException) {
                            /**
                             * Serveur perdu, on recupère l'opération qui était traitée et on supprime le
                             * serveur
                             */
                            LostServerException lostServerException = (LostServerException) t;
                            operationListToCompute = lostServerException.getOperationListToCompute();

                            // ServeurCalculInterface serveurCalculInterface;
                            if (operationListToCompute.getServeurCalculInterface2() == null) {
                                serveurCalculInterface = operationListToCompute.getServeurCalculInterface1();
                                operationListToCompute.setServeurCalculInterface1(null);
                            } else {
                                serveurCalculInterface = operationListToCompute.getServeurCalculInterface2();
                                operationListToCompute.setServeurCalculInterface2(null);
                            }

                            serveurCalculInterfaces.remove(serveurCalculInterface);
                            serveurCalculWorkingHashMap.remove(serveurCalculInterface);
                            serveurCalculCapacityHashMap.remove(serveurCalculInterface);
                            operationListToComputeToReassign.add(operationListToCompute);
                        }
                    }

                    operationListToComputeResultList.remove(resultFuture);
                    break;
                }
            }

            for (ServeurCalculInterface serveurCalculInterface : serveurCalculInterfaces) {
                if (!serveurCalculWorkingHashMap.get(serveurCalculInterface)) {
                    try {
                        operationListToCompute = getOperationListToCompute(serveurCalculInterface);
                        operationListToComputeResultList
                                .add(executorService.submit(new RemoteOperationTask(operationListToCompute)));
                        serveurCalculWorkingHashMap.put(serveurCalculInterface, true);
                    } catch (NoMoreOperationException e) {
                        break;
                    } catch (NoMatchingOperationException e) {
                        continue;
                    }
                }
            }
        } while (!operationListToComputeResultList.isEmpty() || !operationListToComputeToReassign.isEmpty());

        long endTime = System.nanoTime();
        System.out.println("Temps d'exécution : " + (endTime - startTime) + " ns");
        System.out.println("Résultat : " + result);
        executorService.shutdown();
    }

    private boolean loadOperations() {
        operations = new ArrayList<Operation>();
        List<String> lines = new ArrayList<String>();
        try {
            lines = Files.readAllLines(file.toPath());
        } catch (IOException e) {
            System.out.println("Erreur: " + e.getMessage());
        }
        for (String line : lines) {
            String[] lineContent = line.split(" ");
            Operation operation;
            if (lineContent[0].equals("pell")) {
                operation = new Operation(Operation.PELL, Integer.parseInt(lineContent[1]));
            } else if (lineContent[0].equals("prime")) {
                operation = new Operation(Operation.PRIME, Integer.parseInt(lineContent[1]));
            } else {
                return false;
            }
            operations.add(operation);
        }
        return true;
    }

    private boolean loadCapacities() {
        for (ServeurCalculInterface serveurCalculInterface : serveurCalculInterfaces) {
            try {
                serveurCalculCapacityHashMap.put(serveurCalculInterface,
                        serveurCalculInterface.getCapacity(login, password));
                serveurCalculWorkingHashMap.put(serveurCalculInterface, false);
            } catch (RemoteException e) {
                System.out.println("Erreur: " + e.getMessage());
                // et on laisse tomber ce serveur
                return false; // TODO
            } catch (AuthentificationFailedException e) {
                System.out.println("Erreur: " + e.getMessage());
                return false;
            }
        }
        return true;
    }

    private class RemoteOperationTask implements Callable<OperationListToCompute> {
        private OperationListToCompute operationListToCompute;

        RemoteOperationTask(OperationListToCompute operationListToCompute) {
            this.operationListToCompute = operationListToCompute;
        }

        @Override
        public OperationListToCompute call() throws LostServerException {
            int result;

            try {
                if (operationListToCompute.getResult1() < 0) {
                    // donne les calculs au premier serveur
                    result = operationListToCompute.getServeurCalculInterface1().computeOperations(login, password,
                            operationListToCompute.getOperationList());
                    operationListToCompute.setResult1(result);
                } else {
                    // donne les calculs au deuxième serveur
                    result = operationListToCompute.getServeurCalculInterface2().computeOperations(login, password,
                            operationListToCompute.getOperationList());
                    operationListToCompute.setResult2(result);
                }
            } catch (RemoteException e) {
                throw new LostServerException(operationListToCompute);
            } catch (AuthentificationFailedException e) {
                throw new LostServerException(operationListToCompute);
            } catch (OverloadException e) {
                // TODO: handle exception
            }

            return operationListToCompute;
        }
    }

    /**
     * @return OperationListToCompute un objet contenant une liste d'opérations que
     *         ce serveur n'a pas déjà exécuté, issue de la liste initiale
     *         d'opérations ou de l'ensemble des sous-listes d'opérations
     */
    private OperationListToCompute getOperationListToCompute(ServeurCalculInterface serveurCalculInterface)
            throws NoMoreOperationException, NoMatchingOperationException {
        OperationListToCompute tmpOperationListToCompute;

        if (operations.isEmpty()) {
            // La liste initiale est vide, on va prendre dans la sous-liste des opérations à
            // réassigner
            if (operationListToComputeToReassign.isEmpty()) {
                // Il n'y a plus de sous-liste d'opérations à réassigner, on a terminé
                throw new NoMoreOperationException();
            } else {
                for (OperationListToCompute operationListToCompute : operationListToComputeToReassign) {
                    if (operationListToCompute.getServeurCalculInterface1() == null) {
                        operationListToComputeToReassign.remove(operationListToCompute);
                        operationListToCompute.setServeurCalculInterface1(serveurCalculInterface);
                        return operationListToCompute;
                    } else if (!operationListToCompute.getServeurCalculInterface1().equals(serveurCalculInterface)) {
                        // Ce serveur de calcul n'a pas déjà été utilisé pour calculer le premier
                        // résultat
                        operationListToComputeToReassign.remove(operationListToCompute);
                        operationListToCompute.setServeurCalculInterface2(serveurCalculInterface);
                        return operationListToCompute;
                    }
                }
                // Pas de serveur de calcul compatible
                throw new NoMatchingOperationException();
            }
        } else {
            tmpOperationListToCompute = new OperationListToCompute(serveurCalculInterface);

            for (int i = 0; i < serveurCalculCapacityHashMap.get(serveurCalculInterface); i++) {
                if (operations.isEmpty()) {
                    // On a vidé la liste initiale sans atteindre la capacité du serveur de calcul
                    break;
                } else {
                    Operation operation = operations.remove(0);
                    tmpOperationListToCompute.addOperation(operation);
                }
            }
        }

        return tmpOperationListToCompute;
    }
}