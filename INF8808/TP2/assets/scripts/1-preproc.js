"use strict";

/**
 * Fichier permettant de traiter les données provenant du fichier CSV.
 */

/**
 * Précise le domaine en associant un nom de rue à une couleur précise.
 *
 * @param color   Échelle de 10 couleurs.
 * @param data    Données provenant du fichier CSV.
 */
function domainColor(color, data) {
  // TODO: Définir le domaine de la variable "color" en associant un nom de rue à une couleur.  
  var tabVilles = d3.keys(data[0]).slice(1);
  color.domain(tabVilles);
  
}

/**
 * Convertit les dates se trouvant dans le fichier CSV en objet de type Date.
 *
 * @param data    Données provenant du fichier CSV.
 * @see https://www.w3schools.com/jsref/jsref_obj_date.asp
 */
function parseDate(data) {
  // TODO: Convertir les dates du fichier CSV en objet de type Date.

 for (var i = 0; i < data.length; i++) {
 
 data[i].Date = d3.timeParse("%d/%m/%y")(data[i].Date);

  }
}

/**
 * Trie les données par nom de rue puis par date.
 *
 * @param color     Échelle de 10 couleurs (son domaine contient les noms de rues).
 * @param data      Données provenant du fichier CSV.
 *
 * @return Array    Les données triées qui seront utilisées pour générer les graphiques.
 *                  L'élément retourné doit être un tableau d'objets comptant 10 entrées, une pour chaque rue
 *                  et une pour la moyenne. L'objet retourné doit être de la forme suivante:
 *
 *                  [
 *                    {
 *                      name: string      // Le nom de la rue,
 *                      values: [         // Le tableau compte 365 entrées, pour les 365 jours de l'année.
 *                        date: Date,     // La date du jour.
 *                        count: number   // Le nombre de vélos compté ce jour là (effectuer une conversion avec parseInt)
 *                      ]
 *                    },
 *                     ...
 *                  ]
 */
function createSources(color, data) {
  // TODO: Retourner l'objet ayant le format demandé.

  var tabResultat = [];
 // console.log(data);
  var tabVilles = d3.keys(data[0]).slice(1);

  // villes 1 - 10
  for (var i = 0; i < tabVilles.length; i++) {

    var tabValues = [];

    // data
    for (var j = 0; j < data.length; j++) {

      for (var prop in data[j]) {

        if (!data[j].hasOwnProperty(prop)) {
          continue
        };

        if (prop == tabVilles[i]) {
          tabValues.push({
            date: data[j].Date,
            count: parseInt(data[j][tabVilles[i]])
          });
        }

      }

    }

    tabResultat[i] = {
      name: tabVilles[i],
      values: tabValues
    };
  }
//console.log(tabResultat);
  return tabResultat;
}

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe X.
 *
 * @param xFocus      Échelle en X utilisée avec le graphique "focus".
 * @param xContext    Échelle en X utilisée avec le graphique "contexte".
 * @param data        Données provenant du fichier CSV.
 */
function domainX(xFocus, xContext, data) {
  // TODO: Préciser les domaines pour les variables "xFocus" et "xContext" pour l'axe X.

  var dateDebut = data[0].Date;
  var dateFin = data[data.length-1].Date;
  
  var domaines = [
    dateDebut,
    dateFin
  ];

  xFocus.domain(domaines);
  xContext.domain(domaines);
}

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe Y.
 *
 * @param yFocus      Échelle en Y utilisée avec le graphique "focus".
 * @param yContext    Échelle en Y utilisée avec le graphique "contexte".
 * @param sources     Données triées par nom de rue et par date (voir fonction "createSources").
 */
function domainY(yFocus, yContext, sources) {
  // TODO: Préciser les domaines pour les variables "yFocus" et "yContext" pour l'axe Y.

  var domainesMin = 0;
  var domainesMax =  d3.max(sources, function(d){
      return d3.max( 
            d.values,
            function(value) { 
              return value.count;
      });
    });

  var domaines = [domainesMin, domainesMax];

  yFocus.domain(domaines);
  yContext.domain(domaines);
}