package shared;

import java.io.Serializable;

public class Operation implements Serializable {
    public static final byte PELL = 0;
    public static final byte PRIME = 1;
    private byte operation;
    private int operande;

    public Operation(byte operation, int operande) {
        this.operation = operation;
        this.operande = operande;
    }

    public byte getOperation() {
        return operation;
    }

    public int getOperande() {
        return operande;
    }
}