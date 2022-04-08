

public class ArrayQueue<AnyType> implements Queue<AnyType>
{
	private int size = 0;		//Nombre d'elements dans la file.
	private int startindex = 0;	//Index du premier element de la file
	private final int DEFAULT_SIZE = 10;
	private AnyType[] table;
   
	@SuppressWarnings("unchecked")
	public ArrayQueue() 
	{
		//A completer
		table = (AnyType[]) new Object[DEFAULT_SIZE];
		
	}
	
	//Indique si la file est vide
	public boolean empty()
	{ 
		return size == 0; 
	}
	
	//Retourne la taille de la file
	public int size()
	{ 
		return size; 
	}
	
	//Retourne l'element en tete de file
	//Retourne null si la file est vide
	//complexit? asymptotique: O(1)
	public AnyType peek()
	{
		//A completer

		if (size == 0){
			return null;
		}

		else{
			return table[startindex];
		}
		
	}
	
	//Retire l'element en tete de file
	//complexit? asymptotique: O(1)
	public void pop() throws EmptyQueueException
	{
		//A completer

		if(size == 0){
			EmptyQueueException error = new EmptyQueueException();
			throw error ;
		}
		else {
			startindex++;
			size--;
		}

	}
	
	//Ajoute un element a la fin de la file
	//Double la taille de la file si necessaire (utiliser la fonction resize definie plus bas)
	//complexit? asymptotique: O(1) ( O(N) lorsqu'un redimensionnement est necessaire )
	public void push(AnyType item)
	{
		//A completer
		if(startindex + size >= table.length-1){
			resize(2);
		}
		size++;
		table[startindex + size-1] = item;


		
	}
   
	//Redimensionne la file. La capacite est multipliee par un facteur de resizeFactor.
	//Replace les elements de la file au debut du tableau
	//complexit? asymptotique: O(N)
	@SuppressWarnings("unchecked")
	private void resize(int resizeFactor)
	{
		//A completer

		AnyType[] arrayBig;
		arrayBig = (AnyType[]) new Object[size*2];
		for (int i = 0;i < size;i++){
			arrayBig[i] = table[startindex + i];
		}
		table = arrayBig;
		startindex = 0;

		
	}   
}

