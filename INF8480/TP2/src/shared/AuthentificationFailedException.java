package shared;

public class AuthentificationFailedException extends Exception {
    public AuthentificationFailedException(String login) {
        super("l'authentification pour l'utilisateur " + login + " a échoué");
    }
}