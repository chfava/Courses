package repartiteur;

import java.util.ArrayList;

import shared.Operation;
import shared.ServeurCalculInterface;

public class OperationListToCompute {
    private ArrayList<Operation> operationList;
    private ServeurCalculInterface serveurCalculInterface1;
    private ServeurCalculInterface serveurCalculInterface2;
    private int result1;
    private int result2;

    public OperationListToCompute(ServeurCalculInterface serveurCalculInterface) { // utilisé
        reset();
        this.operationList = new ArrayList<Operation>();
        this.serveurCalculInterface1 = serveurCalculInterface;
    }

    public void reset() {
        serveurCalculInterface1 = null;
        serveurCalculInterface2 = null;
        result1 = -1;
        result2 = -1;
    }

    public ServeurCalculInterface getServeurCalculInterface1() {
        return serveurCalculInterface1;
    }

    public void setServeurCalculInterface1(ServeurCalculInterface serveurCalculInterface) {
        this.serveurCalculInterface1 = serveurCalculInterface;
    }

    public ServeurCalculInterface getServeurCalculInterface2() {
        return serveurCalculInterface2;
    }

    public void setServeurCalculInterface2(ServeurCalculInterface serveurCalculInterface) {
        this.serveurCalculInterface2 = serveurCalculInterface;
    }

    public int getResult1() {
        return result1;
    }

    public void setResult1(int result1) {
        this.result1 = result1;
    }

    public int getResult2() {
        return result2;
    }

    public void setResult2(int result2) {
        this.result2 = result2;
    }

    public boolean isResultValid() {
        return result1 == result2;
    }

    public ArrayList<Operation> getOperationList() {
        return operationList;
    }

    public void addOperation(Operation operation) {
        operationList.add(operation);
    }
}