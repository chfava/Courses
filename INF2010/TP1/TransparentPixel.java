/**
 * Classe de pixel transparent
 * @author :
 * @date : 
 */

public class TransparentPixel extends AbstractPixel
{
	public int[] rgba; // donnees de l'image
	
	/**
	 * Constructeur par defaut (pixel blanc)
	 */
	TransparentPixel()
	{
		rgba = new int[4];
		rgba[0] = 255;
		rgba[1] = 255;
		rgba[2] = 255;
		rgba[3] = 255;
	}
	
	/**
	 * Assigne une valeur au pixel
	 * @param rgb: valeurs a assigner 
	 */
	TransparentPixel(int[] rgba)
	{
		// compléter
		this.rgba = rgba;
		
	}
	
	/**
	 * Renvoie un pixel copie de type noir et blanc
	 */
	public BWPixel toBWPixel()
	{
		// compléter
		int average = (this.rgba[0] + this.rgba[1] + this.rgba[2]) / 3;
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
		int average = (this.rgba[0] + this.rgba[1] + this.rgba[2]) / 3;
		GrayPixel grayPixel = new GrayPixel(average);
		return grayPixel;
		
	}
	
	/**
	 * Renvoie un pixel copie de type couleurs
	 */
	public ColorPixel toColorPixel()
	{
		// compléter
		int[] array = {this.rgba[0], this.rgba[1], this.rgba[2]};
		ColorPixel colorPixel = new ColorPixel(array);
		return colorPixel;
		
	}
	
	/**
	 * Renvoie le negatif du pixel (255-pixel)
	 */
	public TransparentPixel Negative()
	{
		// compléter
		int[] array = {255 - rgba[0], 255 - rgba[1], 255 - rgba[2], rgba[3]};
		TransparentPixel transparentPixel = new TransparentPixel(array);
		return transparentPixel;
		
	}
	
	public TransparentPixel toTransparentPixel()
	{
		// compléter
		return this;
		
	}
	
	public void setAlpha(int alpha)
	{
		rgba[3] = alpha;
	}
	
	/**
	 * Convertit le pixel en String (sert a ecrire dans un fichier 
	 * (avec un espace supplémentaire en fin)s
	 */
	public String toString()
	{
		return  ((Integer)rgba[0]).toString() + " " + 
				((Integer)rgba[1]).toString() + " " +
				((Integer)rgba[2]).toString() + " " +
				((Integer)rgba[3]).toString() + " ";
	}
}
