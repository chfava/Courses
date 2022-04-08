// See p.70
// Title: Questionnaire sur la santé du patient - 15 (PHQ-15)

export const form12 = {
    form: {
        nbSections: 1,
        section: {
            1: {
                1: {
                    question:
                        "Au cours des 4 dernières semaines, \
                        à quel point avez-vous été ennuyé(e)par n'importe quel des problèmes suivants? \
                        Veuillez mettre un crochet dans la case qui indique votre réponse",
                    subquestion: {
                        1: {
                            question: "1. Douleur à l'estomac",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        2: {
                            question: "2. Douleur au dos",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        3: {
                            question: "3. Douleur aux bras, aux jambes ou aux articulations (genoux, hanches, etc.)",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        4: {
                            question: "4. Douleurs menstruelles ou autres problèmes reliés à votre cycle menstruel (femmes seulement)",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        5: {
                            question: "5. Mot de tête",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        6: {
                            question: "6. Douleur à la poitrine",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        7: {
                            question: "7. Étourdissements",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        8: {
                            question: "8. Évanouissements",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        9: {
                            question: "9. Sentir votre coeur battre fort ou très vite",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        10: {
                            question: "10. Essoufflement",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        11: {
                            question: "11. Douleur ou problèmes lors des relations sexuelles",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        12: {
                            question: "12. Constipation, selles molles ou diarrhé",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        13: {
                            question: "13. Nausées, flatulences ou indigestion",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        14: {
                            question: "14. Sensation de fatigue ou avoir peu d'énergie",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        },
                        15: {
                            question: "15. Problèmes de sommeil",
                            radio: ["Pas ennuyé(e)", "Ennuyé(e) un peu", "Ennuyé(e) beaucoup"]
                        }
                    }
                }
            },
            2: {
                question: "SCORE TOTAL = ",
                automaticSum: [
                    "12/1/1",
                    "12/1/2",
                    "12/1/3",
                    "12/1/4",
                    "12/1/5",
                    "12/1/6",
                    "12/1/7",
                    "12/1/8",
                    "12/1/9",
                    "12/1/10",
                    "12/1/11",
                    "12/1/12",
                    "12/1/13",
                    "12/1/14",
                    "12/1/15"
                ]
            }
        }
    },
    disclaimer:
        "Copyright Pfizer Inc.  No permission required to reproduce, translate, display, or distribute. \
        Source instrument available at http://www.phqscreeners.com/INFORMversion 12May2013. \
        Translated by Goulet J-P, Univ. Laval, Quebec, Canada. Available at http://www.rdc-tmdinternational.org"
};
