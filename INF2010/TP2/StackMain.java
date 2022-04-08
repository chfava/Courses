
import java.util.logging.Level;
import java.util.logging.Logger;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author maitr
 */
public class StackMain {

    final static int COUNT = 10;

    public static void main(String[] args) {

        CustomStack<Integer> stack = new CustomStack<>();

        int pushCounter = 0;

        for (int i = 0; i < COUNT; i++) {
            pushCounter++;
            stack.push(pushCounter);
        }

        if (stack.size() != COUNT) {
            System.out.println("Erreur: La taille de la pile n'est pas egale a " + COUNT + " apres avoir ajoute " + COUNT + " elements");
        }

        for (int i = 0; i < COUNT; i++) {
            try {
                if (stack.peek() != pushCounter || stack.pop() != pushCounter) {
                    System.out.println("Erreur: l'ordre de sortie(LIFO) n'est pas respecte");
                    return;
                }
                pushCounter--;

            } catch (EmptyStackException e) {
                e.printStackTrace();
                return;
            }
        }

        if (!stack.empty()) {
            System.out.println("Erreur: la file devrait etre vide, mais elle ne l'est pas");
            return;
        }

        if (stack.peek() != null) {
            System.out.println("Erreur: peek doit retourner null lorsque la file est vide");
            return;
        }

        try {
            stack.pop();
            System.out.println("Erreur: Pop doit lancer une exception lorsque la file est vide");
            return;
        } catch (EmptyStackException e) {
        }

        // Exercice 2
        String phrase = "Ceci est une phrase";
        String phraseInverse = reverseString(phrase);

        if (!phraseInverse.equals("phrase une est Ceci")) {
            System.out.println("Erreur : la phrase retournée n'est pas correcte");
            return;
        }

        System.out.print("It's all good");

    }

    // Utilise une CustomStack<String> pour inverser l'ordre des mots dans la phrase
    // de départ
    public static String reverseString(String input) {
        String[] words = input.split("\\s");
        String output = "";
        
        CustomStack<String> stack = new CustomStack<>();

        for (String word : words) {
            // à compléter
            stack.push(word);
        }
        int stackSize = stack.size();
        for (int i = 0; i < stackSize; i++) {
            try {
                if (i < stackSize - 1)
                    output += stack.pop() + " ";
                else
                    output += stack.pop();
            } catch (EmptyStackException ex) {
                System.err.println("Oups erreur");
            }
        }

        return output;
    }

}
