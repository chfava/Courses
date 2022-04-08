

public class EmptyStackException extends Exception
{
	public EmptyStackException() 
	{
	    super("Error: the stack is empty");
	}
	
	public EmptyStackException(String s) 
	{
		super(s);
	}
};
