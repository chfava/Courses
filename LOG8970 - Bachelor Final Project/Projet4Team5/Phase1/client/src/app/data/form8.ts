// See p.62
// Title: Échelle de Limitation Fonctionnelle de la Mandibule-20 (JFLS-20)
export const form8 = {
    form: {
        nbSections: 1,
        section: {
            1: {
                1: {
                    question:
                        "Pour chaque énoncé ci-dessous, svp indiquez le niveau de limitation durant le dernier mois. Si une action est " +
                        "complètement évitée parce que trop difficile, sélectionnez '10'. 0 signifie 'Aucune limitation'. Si vous évitez " +
                        "de faire une action pour des raisons autres que la douleur ou la difficulté, laissez le champ vide. ",
                    subquestion: {
                        1: {
                            question: "1. Mastiquer des aliments coriaces.",
                            slider: "1",
                            min: 0,
                            max: 10
                        },
                        2: {
                            question: "2. Mastiquer du pain dur",
                            slider: "2",
                            min: 0,
                            max: 10
                        },
                        3: {
                            question: "3. Mastiquer du poulet (Ex.: cuit au four)",
                            slider: "3",
                            min: 0,
                            max: 10
                        },
                        4: {
                            question: "4. Mastiquer des biscottes",
                            slider: "4",
                            min: 0,
                            max: 10
                        },
                        5: {
                            question:
                                "5.  Mastiquer des aliments mous (Ex.: macaronis, fruits mous ou en conserve, légumes cuits, poisson)",
                            slider: "5",
                            min: 0,
                            max: 10
                        },
                        6: {
                            question:
                                "6. Manger des aliments mous qui n’ont pas à être mastiqués (Ex.: pommes de terre " +
                                "pilées, compote de pommes, pouding, aliments en purée)",
                            slider: "6",
                            min: 0,
                            max: 10
                        },
                        7: {
                            question: "7. Ouvrir assez grand pour mordre dans une pomme entière",
                            slider: "7",
                            min: 0,
                            max: 10
                        },
                        8: {
                            question: "8. Ouvrir assez grand pour mordre dans un sandwich",
                            slider: "8",
                            min: 0,
                            max: 10
                        },
                        9: {
                            question: "9. Ouvrir assez grand pour parler",
                            slider: "9",
                            min: 0,
                            max: 10
                        },
                        10: {
                            question: "10. Ouvrir assez grand pour boire avec une tasse",
                            slider: "10",
                            min: 0,
                            max: 10
                        },
                        11: {
                            question: "11. Avaler",
                            slider: "11",
                            min: 0,
                            max: 10
                        },
                        12: {
                            question: "12. Bâiller",
                            slider: "12",
                            min: 0,
                            max: 10
                        },
                        13: {
                            question: "13. Parler",
                            slider: "13",
                            min: 0,
                            max: 10
                        },
                        14: {
                            question: "14. Chanter",
                            slider: "14",
                            min: 0,
                            max: 10
                        },
                        15: {
                            question: "15. Avoir un visage heureux",
                            slider: "15",
                            min: 0,
                            max: 10
                        },
                        16: {
                            question: "16. Avoir un visage fâché",
                            slider: "16",
                            min: 0,
                            max: 10
                        },
                        17: {
                            question: "17. Froncer les sourcils",
                            slider: "17",
                            min: 0,
                            max: 10
                        },
                        18: {
                            question: "18. Embrasser",
                            slider: "18",
                            min: 0,
                            max: 10
                        },
                        19: {
                            question: "19. Sourire",
                            slider: "19",
                            min: 0,
                            max: 10
                        },
                        20: {
                            question: "20. Rire",
                            slider: "20",
                            min: 0,
                            max: 10
                        }
                    }
                },
                2: {
                    question: "SCORE TOTAL = ",
                    automaticSum: [
                        "8/1/1",
                        "8/1/2",
                        "8/1/3",
                        "8/1/4",
                        "8/1/5",
                        "8/1/6",
                        "8/1/7",
                        "8/1/8",
                        "8/1/9",
                        "8/1/10",
                        "8/1/11",
                        "8/1/12",
                        "8/1/13",
                        "8/1/14",
                        "8/1/15",
                        "8/1/16",
                        "8/1/17",
                        "8/1/18",
                        "8/1/19",
                        "8/1/20"
                    ]
                }
            }
        }
    },
    disclaimer:
        "Copyright Ohrbach R. Translated by Goulet J-P, Univ. Laval, Quebec, Canada. " +
        "Available at http://www.rdc-tmdinternational.org Version 12May2013. No permission required " +
        "to reproduce, translate, display, or distribute."
};
