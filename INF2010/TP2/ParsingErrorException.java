/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author maitr
 */
public class ParsingErrorException extends Exception {

    public ParsingErrorException() {
        super("Error: the input is invalid ");
    }

    public ParsingErrorException(String s) {
        super(s);
    }
}
