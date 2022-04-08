"use strict";

/**
 * Fichier permettant de dessiner le diagramme à cordes.
 */


/**
 * Crée les groupes du diagramme à cordes.
 *
 * @param g               Le groupe SVG dans lequel le diagramme à cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param arc             Fonction permettant de dessiner les arcs.
 * @param color           L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 *
 * @see https://bl.ocks.org/mbostock/4062006
 */
function createGroups(g, data, layout, arc, color, total, formatPercent) {
  /* TODO:
     - Créer les groupes du diagramme qui sont associés aux stations de BIXI fournies.
     - Utiliser un "textPath" pour que les nom de stations suivent la forme des groupes.
     - Tronquer les noms des stations de BIXI qui sont trop longs (Pontiac et Métro Mont-Royal).
     - Afficher un élément "title" lorsqu'un groupe est survolé par la souris.
  */

//ajouter un groupe chaque voisin
var group = g.selectAll(".group")
              .data(layout.groups)
              .enter()
              .append("g")
              .attr("class", "group");

// Ajouter un mouseover title.
group.append("svg:title").text(function(d, i) {
                let dTotal = d3.sum(data[i].destinations, s => s.count);
                return data[i].name + ": " + formatPercent(dTotal/total) + " des départ";
              });



// ajouter le group arc.
group.append("svg:path")
              .attr("id", function(d, i) {  return "group" + i; })
              .attr("d", arc)
              .style("fill", function(d,i) {  return color(data[i].name); });

// Ajouter un texte label.
group.append("svg:text")
      .attr("x", 6)
      .attr("dy", 15)
      .append("textPath")
      .attr("xlink:href", function(d, i) { return "#group" + i; })
      .style("font-size", "12px")
      .text(function(d, i) {//console.log(d,i,data[i].name); 
        let res = data[i].name
        if(i==5){ //console.log(res.substring(0, 16))
          return res.substring(0,16);
        } else if(i==8){
          return res.substring(0, 8);
        } else{return res;}
         });
}

/**
 * Crée les cordes du diagramme à cordes.
 *
 * @param g               Le groupe SVG dans lequel le diagramme à cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param path            Fonction permettant de dessiner les cordes.
 * @param color           L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 *
 * @see https://beta.observablehq.com/@mbostock/d3-chord-dependency-diagram
 */
function createChords(g, data, layout, path, color, total, formatPercent) {
  /* TODO:
     - Créer les cordes du diagramme avec une opacité de 80%.
     - Afficher un élément "title" lorsqu'une corde est survolée par la souris.

  */

// Ajouter les chords.
window.chord =  g
  .datum(layout)
  .append("g")
  .selectAll("path")
  .data(function(d) { return d; })
  .enter()
  .append("svg:path")
  .attr("d", path)
  .attr("class", "chord")
  .style("fill", function(d) { return color(data[d.source.index].name); });

  
  // ajouter un elaborate mouseover title pour chaque chord.
chord.append("svg:title").text(function(d) {  
    return data[d.source.index].name
        + " → " + data[d.target.index].name
        + ": " + formatPercent(d.source.value/total)
        + "\n" + data[d.target.index].name
        + " → " + data[d.source.index].name
        + ": " + formatPercent(d.target.value/total);
  });

}

/**
 * Initialise la logique qui doit être réalisée lorsqu'un groupe du diagramme est survolé par la souris.
 *
 * @param g     Le groupe SVG dans lequel le diagramme à cordes est dessiné.
 */
function initializeGroupsHovered(g) {
  /* TODO:
     - Lorsqu'un groupe est survolé par la souris, afficher les cordes entrant et sortant de ce groupe avec une
       opacité de 80%. Toutes les autres cordes doivent être affichées avec une opacité de 10%.
     - Rétablir l'affichage du diagramme par défaut lorsque la souris sort du cercle du diagramme.
  */
 g.selectAll(".group")
  .on("mouseover", function(d, i) {
    window.chord.classed("fade", function(s) {
      return s.source.index != i
          && s.target.index != i;
    });
  });

}


