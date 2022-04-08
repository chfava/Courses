// See p.10
// Title: Dépistage de douleur de DTM

export const form1 = {
  axis: "Axis I",
  frontendId: "1",
  title: "Dépistage de douleur de DTM",
  form: {
    nbSections: 1,
    section: {
      1: {
        1: {
          question:
            "1. Au cours des 30 derniers jours, combien de temps a duré toute douleur à votre mâchoire ou à la tempe, \
                             d'un côté ou de l'autre?",
          radio: ["a. Aucune douleur", "b. La douleur apparait et disparait", "c. Douleur toujours présente"]
        },
        2: {
          question:
            "2. Au cours des 30 derniers jours, avez-vous eu de la douleur ou une raideur à la mâchoire au réveil?",
          radio: ["a. Non", "b. Oui"]
        },
        3: {
          question:
            "3. Au cours des 30 derniers jours, est-ce que les activités suivantes ont modifié (amélioré ou aggravé) \
                                   toute douleur à la mâchoire ou à la tempe d'un côté ou de l'autre?",
          subquestion: {
            A: {
              question: "A. Mastiquer des aliments durs ou coriaces.",
              radio: ["a. Non", "b. Oui"]
            },
            B: {
              question: "B. Ouvrir votre bouche ou bouger votre mâchoire vers l'avant ou sur le côté.",
              radio: ["a. Non", "b. Oui"]
            },
            C: {
              question:
                "C. Habitudes de la mâchoire tel que garder les dents ensemble, serrer, \
                                     grincer des dents, ou mâcher de la gomme.",
              radio: ["a. Non", "b. Oui"]
            },
            D: {
              question: "D. Autres activités de la mâchoire tel que parler, embrasser ou bâiller.",
              radio: ["a. Non", "b. Oui"]
            }
          }
        }
      }
    }
  },
  disclaimer:
    "Copyright Gonzalez YM. Translated by Goulet J-P, Univ. Laval, Quebec, Canada. \
                          Available at http://www.rdc-tmdinternational.org. \
                          Version 11Oct2013. No permission required to reproduce, translate, display, or distribute."
};
