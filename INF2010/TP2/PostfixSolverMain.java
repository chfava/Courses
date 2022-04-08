import java.io.*;
import java.util.*;



public class PostfixSolverMain {
    public static void main(String[] args) throws IOException {

        String s1 = "0 1 or";
        String s2 = "0 0 or";
        String s3 = "1 1 or";
        String s4 = "1 0 or";

        try {
            if (!solve(s1) || solve(s2) || !solve(s3) || !solve(s4)) {
                System.out.println("Erreur : résultat de l'opération or invalide");
                return;
            }
        } catch (ParsingErrorException ex) {
            System.out.println("Erreur : le solveur a rencontré un problème");
        }

        String s5 = "0 0 and";
        String s6 = "0 1 and";
        String s7 = "1 0 and";
        String s8 = "1 1 and";

        try {
            if (solve(s5) || solve(s6) || solve(s7) || !solve(s8)) {
                System.out.println("Erreur : résultat de l'opération and invalide");
                return;
            }
        } catch (ParsingErrorException ex) {
            System.out.println("Erreur : le solveur a rencontré un problème");
        }

        String s9 = "0 not";
        String s10 = "1 not";

        try {
            if (!solve(s9) || solve(s10)) {
                System.out.println("Erreur : résultat de l'opération not invalide");
                return;
            }
        } catch (ParsingErrorException ex) {
            System.out.println("Erreur : le solveur a rencontré un problème");
        }

        System.out.println("Tout est bon !");
    }

    public static boolean solve(String input) throws ParsingErrorException {
        // à compléter

        boolean solution = false;


            CustomStack Stack = new CustomStack();
            Boolean iVal1 = null;
            Boolean iVal2 = null;
            Boolean auxVal = null;
            int index = 0;


            //CustomStack<Boolean> stackBool = new CustomStack<>();

            String[] tokens = input.split("\\s");
            String equation = "";
            for (int i = 0; i < tokens.length; i++) {
                equation += tokens[i];
            }
            char[] array = equation.toCharArray();

        try {
            for (index = 0; index < array.length; index++)
            {
                System.out.println("C: " + array[index]);

                String operation = "";
                boolean found = false;
                while (array[index] != '1' && array[index] != '0' && !found){
                   operation += array[index];
                    if (index < array.length-1) {
                        index++;
                    }
                    else{
                        found = true;
                    }
                }

                if(operation != ""){
                   switch (operation){
                       case ("or") :
                           iVal1 = (boolean)Stack.pop();
                           iVal2 = (boolean)Stack.pop();
                           Stack.push(iVal1 || iVal2);
                           break;
                       case ("and") :
                           iVal1 = (boolean)Stack.pop();
                           iVal2 = (boolean)Stack.pop();
                           Stack.push(iVal1 && iVal2);
                           break;
                       case ("not") :
                           iVal1 = (boolean)Stack.pop();
                           Stack.push(!iVal1);
                           break;
                   }
               }

                if(!found) {
                    Integer val = new Integer(Character.digit(array[index], 10));
                    auxVal = (val != 0);
                    Stack.push(auxVal);
                }
            }


            solution = (boolean) Stack.pop();
        }
        catch (EmptyStackException e){}
        return solution;
    }


}

