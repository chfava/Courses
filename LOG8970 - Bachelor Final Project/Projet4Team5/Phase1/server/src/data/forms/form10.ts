// See p.66
// Title: Questionnaire sur la Santé du Patient - 9 (PHQ-9)

export const form10 = {
  axis: "Axis II",
  frontendId: "10",
  title: "Questionnaire sur la santé du patient - 9 (PHQ-9)",
  form: {
    nbSections: 1,
    section: {
      1: {
        1: {
          question:
            "Au cours des deux dernières semaines, à quelle fréquence avez-vous été ennuyé(e) par les problèmes " +
            "suivants? Veuillez mettre un crochet dans la case qui indique votre réponse. ",
          subquestion: {
            1: {
              question: "1. Avoir peu d'intérêt ou de plaisir à faire des choses",
              radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
            },
            2: {
              question: "2. Être triste, déprimé(e) ou désespéré(e)",
              radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
            },
            3: {
              question: "3. Avoir de la difficulté à vous endormir, à garder le sommeil, ou trop dormir",
              radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
            },
            4: {
              question: "4. Être fatigué ou avoir peu d'énergie",
              radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
            },
            5: {
              question: "5. Avoir peu d'appétit ou trop manger",
              radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
            },
            6: {
              question:
                "6. Être mal dans ma peau - ou penser avoir échoué ou m'être laissé aller ou avoir laissé tomber ma " +
                "famille",
              radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
            },
            7: {
              question:
                "7. Avoir de la difficulté à me concentrer tel qu'en lisant le journal ou en regardant la télévision",
              radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
            },
            8: {
              question:
                "8. Bouger ou parler si lentement que les autres l'ont remarqué. Ou au contraire – être tellement " +
                "agité(e) ou hyperactif(ve) au point de bouger beaucoup plus qu'à l'habitude",
              radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
            },
            9: {
              question: "9. Penser que je serais mieux mort(e) ou songer à me faire du mal d'une façon ou d'une autre",
              radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
            }
          }
        },
        2: {
          question: "SCORE TOTAL = ",
          automaticSum: ["10/1/1", "10/1/2", "10/1/3", "10/1/4", "10/1/5", "10/1/6", "10/1/7", "10/1/8", "10/1/9"]
        },
        3: {
          question:
            "Si vous avez coché n'importe quel de ces problèmes, \
                                   quelle difficulté ces problèmes vous ont causée pour faire votre travail, \
                                   prendre soin des choses à la maison, ou vous entendre avec les autres?",
          subquestion: {
            1: {
              radio: ["Pas du tout difficile", "Plutôt difficile", "Très difficile", "Extrêmement difficile"]
            }
          }
        }
      }
    }
  },
  disclaimer:
    "Copyright Pfizer Inc.  No permission required to reproduce, translate, display, or distribute. Source instrument \
                  available at http://www.phqscreeners.com/INFORMversion 12May2013. Translated by Goulet J-P, Univ. \
                  Laval, Quebec, Canada.Available at http://www.rdc-tmdinternational.org"
};
