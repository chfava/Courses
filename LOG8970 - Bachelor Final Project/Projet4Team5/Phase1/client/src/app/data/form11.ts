// See p.68
// Title: Troubles anxieux généralisés - 7 (GAD-7)

export const form11 = {
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
                            question: "2. Être incapable de cesser de m'inquiéter ou de contrôler mes inquiétudes",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        },
                        3: {
                            question: "3. Trop m'inquiéter avec différentes choses",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        },
                        4: {
                            question: "4. Avoir de la difficulté à relaxer",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        },
                        5: {
                            question: "5. Être si énervé(e) qu'il est difficile de rester en place",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        },
                        6: {
                            question: "6. Être facilement dérangé(e) ou irritable",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        },
                        7: {
                            question: "7. Avoir peur comme si quelque chose de terrible allait arriver",
                            radio: ["Pas du tout", "Plusieurs jours", "Plus de la moitié des jours", "Presque tous les jours"]
                        }
                    }
                },
                2: {
                    question: "SCORE TOTAL = ",
                    automaticSum: ["11/1/1", "11/1/2", "11/1/3", "11/1/4", "11/1/5", "11/1/6", "11/1/7"]
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
        "Copyright Pfizer Inc.  No permission required to reproduce, translate, display, or distribute.\
    Source instrument available at http://www.phqscreeners.com/INFORM. Version 12May2013. \
    Translated by Goulet J-P, Univ. Laval, Quebec, Canada. Available at http://www.rdc-tmdinternational.org."
};
