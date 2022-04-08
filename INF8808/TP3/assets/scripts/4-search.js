"use strict";

/**
 * Fichier permettant de gérer l'affichage d'un résultat de recherche.
 */


/**
 * Permet de mettre en évidence le pays qui a été sélectionné via la barre de recherche.
 *
 * @param countrySelected     Le nom du pays qui a été sélectionné.
 * @param g                   Le groupe SVG dans lequel le graphique à bulles est dessiné.
 */
function search(countrySelected, g) {
  /* TODO:
       - Mettre en évidence le pays sélectionné en coloriant le cercle en noir et en appliquant une opacité de 100%.
       - Appliquez une opacité de 15% aux cercles associés aux autres pays.
   */
  g.selectAll("circle").style("opacity", .15);

  window.colorCountrySelected = g.select("#"+countrySelected).attr("fill");
  window.countrySelected ="#"+ countrySelected;

  g.select(window.countrySelected)
   .attr("fill", "black")
   .style("opacity", 1);
 
 
}

/**
 * Permet de réinitialiser l'affichage à celle par défaut.
 *
 * @param g   Le groupe SVG dans lequel le graphique à bulles est dessiné.
 */
function reset(g) {
  // TODO: Réinitialiser l'affichage du nuage de points à celle par défaut.
  g.selectAll("circle").style("opacity", 1);

  g.select(window.countrySelected)
   .attr("fill", window.colorCountrySelected);

   window.colorCountrySelected = undefined;
   window.countrySelected = undefined;

}
