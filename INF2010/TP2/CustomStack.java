
public class CustomStack<AnyType> {
    
    private int size = 0; // Nombre d'éléments dans la pile
    private final int DEFAULT_SIZE = 20;
    private int topStack;
    private AnyType[] table;
    
    // Initialisation de la pile
    public CustomStack() {
        // à compléter

        table = (AnyType[]) new Object[DEFAULT_SIZE];
        topStack = -1;
        
    }
    
    // Enlève l'élément au sommet de la pile et le renvoie
    public AnyType pop() throws EmptyStackException {
        // à compléter
        if (size == 0){
            EmptyStackException error = new EmptyStackException();
            throw error;
        }
        else {
            size--;
            return table[topStack--];
        }

    }
    
    // Ajoute un élément au sommet de la pile
    public void push(AnyType element) {
        // à compléter

        table[++topStack] = element;
        size++;
        
    }
    
    // Renvoie l'élément au sommet de la pile sans l'enlever
    public AnyType peek() {
        // à compléter

        return table[topStack];
        
    }
    
    // Renvoie le nombre d'éléments dans la pile
    public int size() {
        return size;        
    }
    
    // Indique si la pile est vide
    public boolean empty() {
        return size == 0;        
    }
    
}
