/**
 * Classe de pixel en tons de gris
 * @author :
 * @date : 
 */

public class GrayPixel  extends AbstractPixel 
{
	int pixel; // donnee du pixel
	
	/**
	 * Constructeur par defaut (pixel blanc)
	 */
	GrayPixel()
	{
		this.pixel = 255;
	}
	
	/**
	 * Constructeur par parametre
	 * @param pixel : valeur du pixel
	 */
	GrayPixel(int pixel)
	{
		// compléter
		this.pixel = pixel;
		
	}
	
	/**
	 * Renvoie la valeur du pixel
	 */
	public int getPixel()
	{
		return pixel;
	}
	
	/**
	 * Assigne une valeur au pixel
	 * @param pixel: valeur a assigner 
	 */
	public void setPixel(int pixel)
	{
		this.pixel = pixel;
	}
	
	/**
	 * Renvoie un pixel copie de type noir et blanc
	 */
	public BWPixel toBWPixel()
	{
		// compléter
		
		if(this.pixel <= 127){
			boolean pix = false;
			BWPixel bwPixel = new BWPixel(pix);
			return bwPixel;
		}
		else{
			boolean pix = true;
			BWPixel bwPixel = new BWPixel(pix);
			return bwPixel;
		}
		
	}
	
	/**
	 * Renvoie un pixel copie de type tons de gris
	 */
	public GrayPixel toGrayPixel()
	{
		// compléter
		return this;
		
	}
	
	/**
	 * Renvoie un pixel copie de type couleurs
	 */
	public ColorPixel toColorPixel()
	{
		// compléter
		int[] rgb = {this.pixel,this.pixel,this.pixel};
		ColorPixel colorPixel = new ColorPixel(rgb);
		return colorPixel;
		
		
	}
	
	public TransparentPixel toTransparentPixel()
	{
		// compléter
		final int CST = 255;
		int[] rgb = {this.pixel,this.pixel,this.pixel, CST};
		TransparentPixel transparentPixel = new TransparentPixel(rgb);
		return transparentPixel;
	}
	
	/**
	 * Renvoie le negatif du pixel (255-pixel)
	 */
	public AbstractPixel Negative()
	{
		// compléter
		final int CST = 255;
		int pix = CST - this.pixel;
		this.setPixel(pix);
		return this;
	}
	
	public void setAlpha(int alpha)
	{
		//ne fait rien
	}
	
	/**
	 * Convertit le pixel en String (sert a ecrire dans un fichier 
	 * (avec un espace supplémentaire en fin)s
	 */
	public String toString()
	{
		return ((Integer)(pixel)).toString() + " ";
	}
}
