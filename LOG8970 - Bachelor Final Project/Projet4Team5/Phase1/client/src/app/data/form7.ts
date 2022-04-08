// See p.60
// Title: Échelle de Limitation Fonctionnelle de la Mandibule-8 (JFLS-8)
// Not wanted according to Antonin 04-04-2019

export const form7 = {
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
                            question: "2. Mastiquer du poulet (Ex.: cuit au four)",
                            slider: "2",
                            min: 0,
                            max: 10
                        },
                        3: {
                            question:
                                "3. Manger des aliments mous qui n’ont pas à être mastiqués (Ex.: pommes de terre " +
                                "pilées, compote de pommes, pouding, aliments en purée",
                            slider: "3",
                            min: 0,
                            max: 10
                        },
                        4: {
                            question: "4. Ouvrir assez grand pour boire avec une tasse",
                            slider: "4",
                            min: 0,
                            max: 10
                        },
                        5: {
                            question: "5. Avaler",
                            slider: "2",
                            min: 0,
                            max: 10
                        },
                        6: {
                            question: "6. Bâiller",
                            slider: "6",
                            min: 0,
                            max: 10
                        },
                        7: {
                            question: "7. Parler",
                            slider: "7",
                            min: 0,
                            max: 10
                        },
                        8: {
                            question: "8. Sourire",
                            slider: "8",
                            min: 0,
                            max: 10
                        }
                    }
                }
            }
        }
    },
    disclaimer:
        "Copyright Ohrbach R. Translated by Goulet J-P, Univ. Laval, Quebec, Canada. Available at http://www.rdc-tmdinternational.org " +
        "Version 12May2013. No permission required to reproduce, translate, display, or distribute."
};
