"use strict";

/**
 * Fichier permettant de générer la légende et de gérer les interactions de celle-ci.
 */


/**
 * Crée une légende à partir de la source.
 *
 * @param svg       L'élément SVG à utiliser pour créer la légende.
 * @param sources   Données triées par nom de rue et par date.
 * @param color     Échelle de 10 couleurs.
 */
function legend(svg, sources, color) {
  // TODO: Créer la légende accompagnant le graphique.
//console.log(sources[0].values);
var legendRectSize = 8;
var legendSpacing = 10;
var legendX = 70;
var legendY = 30;
var legendMargin = 10;
var legend = d3.select('svg')
    .append("g")
    .selectAll("g")
    .data(color.domain())
    .enter()
    .append('g')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendMargin;
        var x = 0;
        var y = i * height;
        return 'translate(' + x + ',' + y + ')';
    })
    .on("click", function(d) {
      displayLine(this, color)
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .attr('x', legendX)
    .attr('y', legendY)
    .attr("id", function(d){ 
      //console.log(d);
      return d + "Rect";      
    })
    .attr("class", "legend")
    .style("fill", function(d){ 
         return d === "Moyenne" ? "black" : color(d);      
    })
    .style('stroke', "black")
    .attr("stroke-width", 1);

  //console.log(sources[9].name);

legend.append('text')
    .attr('x', legendX + legendRectSize + legendSpacing)
    .attr('y', legendY + legendRectSize - legendSpacing + legendMargin)
    .attr("class", "legend_text")
    .text(function(d) { return d; })
    .attr('font-size', 10);

}

/**
 * Permet d'afficher ou non la ligne correspondant au carré qui a été cliqué.
 *
 * En cliquant sur un carré, on fait disparaitre/réapparaitre la ligne correspondant et l'intérieur du carré
 * devient blanc/redevient de la couleur d'origine.
 *
 * @param element   Le carré qui a été cliqué.
 * @param color     Échelle de 10 couleurs.
 */
function displayLine(element, color) {
  // TODO: Compléter le code pour faire afficher ou disparaître une ligne en fonction de l'élément cliqué.
  var text = element.childNodes[1].childNodes[0].data;
  var active   = element.active ? false : true ;
  var newOpacity = active ? 0 : 1;
// Hide or show the elements
  d3.select("#" + text).style("opacity", newOpacity);
  d3.select("#" + text + "Context").style("opacity", newOpacity);
  d3.select("#" + text + "Rect").style("fill", function(d){ 
    if(newOpacity){return d === "Moyenne" ? "black" : color(d); }
    else{return "white";}       
  });
// Update whether or not the elements are active
  element.active = active;
}
