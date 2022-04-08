/**
 * Classe de pixel en couleurs 
 * @author :
 * @date : 
 */

public class ColorPixel extends AbstractPixel
{
	public int[] rgb; // donnees de l'image
	
	/**
	 * Constructeur par defaut (pixel blanc)
	 */
	ColorPixel()
	{
		rgb = new int[3];
		rgb[0] = 255;
		rgb[1] = 255;
		rgb[2] = 255;
	}
	
	/**
	 * Assigne une valeur au pixel
	 * @param rgb: valeurs a assigner 
	 */
	ColorPixel(int[] rgb)
	{
		// compléter
		this.rgb = new int[3];
		this.rgb[0] = rgb[0];
		this.rgb[1] = rgb[1];
		this.rgb[2] = rgb[2];
		
		
	}
	
	/**
	 * Renvoie un pixel copie de type noir et blanc
	 */
	public BWPixel toBWPixel()
	{
		// compléter
		int average = (this.rgb[0] + this.rgb[1] + this.rgb[2]) / 3;
		if (average <= 127){
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
		int average = (this.rgb[0] + this.rgb[1] + this.rgb[2]) / 3;
		GrayPixel grayPixel = new GrayPixel(average);
		return grayPixel;
		
		
	}
	
	/**
	 * Renvoie un pixel copie de type couleurs
	 */
	public ColorPixel toColorPixel()
	{
		// compléter
		return this;
		
	}
	
	public TransparentPixel toTransparentPixel()
	{
		// compléter
		int[] array = {this.rgb[0], this.rgb[1], this.rgb[2], 255};
		TransparentPixel transparentPixel = new TransparentPixel(array);
		return transparentPixel;
		
	}
	
	/**
	 * Renvoie le negatif du pixel (255-pixel)
	 */
	public AbstractPixel Negative()
	{
		// compléter
		int[] array = {255- rgb[0], 255- rgb[1], 255- rgb[2]};
		ColorPixel colorPixel = new ColorPixel(array);
		return colorPixel;
		
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
		return  ((Integer)rgb[0]).toString() + " " + 
				((Integer)rgb[1]).toString() + " " +
				((Integer)rgb[2]).toString() + " ";
	}
}