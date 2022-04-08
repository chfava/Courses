package repartiteur;

public class LostServerException extends Exception {
    private OperationListToCompute operationListToCompute;

    public LostServerException(OperationListToCompute operationListToCompute) {
        super();
        this.operationListToCompute = operationListToCompute;
    }

    public OperationListToCompute getOperationListToCompute() {
        return operationListToCompute;
    }
}