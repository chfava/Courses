// See p.58
// Title: Échelle Graduée de Douleur Chronique (version 2) (GCPSv2)

export const form6 = {
  axis: "Axis II",
  frontendId: "6",
  title: "Échelle graduée de douleur chronique - version 2.0",
  form: {
    nbSections: 1,
    section: {
      1: {
        1: {
          question: "1. Combien de jours au cours des 6 derniers mois avez-vous eu de la douleur au visage?",
          numerical: ["jours"]
        },
        2: {
          question:
            "2. Comment évaluez-vous votre douleur au visage PRÉSENTEMENT? Utilisez une échelle de 0 à 10, où 0 est " +
            "« aucune douleur » et 10 « douleur aussi insupportable que cela peut l’être ».",
          slider: "2",
          min: 0,
          max: 10
        },
        3: {
          question:
            "3. Au cours des 30 DERNIERS JOURS, comment évaluez-vous votre PIRE douleur au visage? Utilisez la " +
            "même échelle où 0 est « aucune douleur » et 10 « douleur aussi insupportable que cela peut l’être ».",
          slider: "3",
          min: 0,
          max: 10
        },
        4: {
          question:
            "4. Au cours des 30 DERNIERS JOURS, EN MOYENNE, comment évaluez-vous votre douleur au visage? " +
            "Utilisez la même échelle où 0 est « aucune douleur » et 10 « douleur aussi insupportable que cela peut " +
            "l’être ». [C'est-à-dire votre douleur habituelle au moment où vous ressentez de la douleur].",
          slider: "4",
          min: 0,
          max: 10
        },
        5: {
          question:
            "5. Au cours des 30 DERNIERS JOURS, combien de jours votre douleur au visage vous a-t-elle empêché de " +
            "faire\nvos ACTIVITÉS NORMALES telles que travailler, aller à l'école ou faire des travaux domestiques? " +
            "(tous les\njours = 30 jours)",
          numerical: ["jours"]
        },
        6: {
          question:
            "6. Au cours des 30 DERNIERS JOURS, jusqu’à quel point votre douleur au visage a-t-elle interféré avec " +
            "vos ACTIVITÉS QUOTIDIENNES. Utilisez une échelle de 0 à 10, où 0 est « aucune interférence » et 10 « " +
            "incapable de faire aucune activité ».",
          slider: "6",
          min: 0,
          max: 10
        },
        7: {
          question:
            "7. Au cours des 30 DERNIERS JOURS, jusqu’à quel point votre douleur au visage a-t-elle interféré avec " +
            "VOS LOISIRS, VOS ACTIVITÉS SOCIALES ET FAMILIALES? Utilisez la même échelle où 0 est « aucune " +
            "interférence » et 10 « incapable de faire aucune activité ».",
          slider: "7",
          min: 0,
          max: 10
        },
        8: {
          question:
            "8. Au cours des 30 DERNIERS JOURS, jusqu’à quel point votre douleur au visage a-t-elle interféré avec " +
            "VOTRE CAPACITÉ À TRAVAILLER, y compris les travaux domestiques? Utilisez la même échelle où 0 est « " +
            "aucune interférence » et 10 « incapable de faire aucune activité ».",
          slider: "8",
          min: 0,
          max: 10
        }
      }
    }
  },
  disclaimer:
    "Copyright Von Korff M. Translated by Goulet J-P, Univ. Laval, Quebec, Canada. Available at " +
    "http://www.rdc-tmdinternational.org Version 12May2013. No permission required to reproduce, translate, display, " +
    "or distribute."
};
