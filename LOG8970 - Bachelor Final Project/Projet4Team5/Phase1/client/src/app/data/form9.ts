// See p.64
// Title: Questionnaire sur la Santé du Patient-4 (PHQ-4)
// Not wanted according to Antonin 04-04-2019

export const form9 = {
    form: {
        nbSections: 1,
        section: {
            1: {
                1: {
                    question:
                        "Au cours des deux dernières semaines, à quelle fréquence avez vous été ennuyé(e) \
                par les problèmes suivants? Veuillez mettre un crochet dans la case qui indique votre réponse. ",
                    subquestion: {
                        1: {
                            question: "1. Être nerveux(se), anxieux(se) ou avoir les nerfs à vif",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        },
                        2: {
                            question: "2. Être incapable de cesser de m’inquiéter ou de contrôler mes inquiétudes",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        },
                        3: {
                            question: "3. Avoir peu d'intérêt ou de plaisir à faire des choses",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        },
                        4: {
                            question: "4. Être triste, déprimé(e), ou désespéré(e)",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        }
                    }
                },
                2: {
                    question: "SCORE TOTAL = ",
                    automaticSum: [
                        "9/1/1",
                        "9/1/2",
                        "9/1/3",
                        "9/1/4"
                    ]
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
        "Copyright Pfizer Inc. No permission required to reproduce, translate, display, or distribute. " +
        "Source instrument available at http://www.phqscreeners.com/ " +
        "INFORM version 12May2013. Translated by Goulet J-P, Univ. Laval, Quebec, Canada. Available at http://www.rdc-tmdinternational.org"
};
