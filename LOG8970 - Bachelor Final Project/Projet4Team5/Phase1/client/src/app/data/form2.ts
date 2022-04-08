// See p.12-13
// Title: Questionnaire Symptômes de DTM

export const form2 = {
    form: {
        nbSections: 1,
        section: {
            1: {
                1: {
                    question: "DOULEUR",
                    subquestion: {
                        1: {
                            question:
                                "1. Avez-vous déjà eu de la douleur à la mâchoire, à la tempe, à l’intérieur de l'oreille ou " +
                                "devant l'oreille, d’un côté ou de l’autre? Si vous avez répondu NON, passez à la Question 5.",
                            radio: ["Non", "Oui"]
                        },
                        2: {
                            question:
                                "2. Il y a combien d’années ou de mois qu’a commencé pour la première fois " +
                                "votre douleur à la mâchoire, à la tempe, à l’intérieur de l'oreille ou devant " +
                                "l'oreille?",
                            numerical: ["années", "mois"]
                        },
                        3: {
                            question:
                                "3. Au cours des 30 derniers jours, qu’est-ce qui décrit le " +
                                "mieux toute douleur à votre mâchoire, à la tempe, à " +
                                "l’intérieur de l'oreille ou devant l'oreille, d’un côté ou de " +
                                "l’autre? " +
                                "Choisissez UNE réponse. Si vous avez répondu NON à la Question 3, passez à la Question 5.",
                            radio: ["Aucune douleur", "Douleur qui vient et part", "Douleur toujours présente"]
                        },
                        4: {
                            question:
                                "4. Au cours des 30 derniers jours, est-ce que les activités suivantes ont modifié " +
                                "(c’est-à-dire amélioré ou aggravé) toute douleur à votre mâchoire, à la tempe, à l’intérieur " +
                                "de l'oreille ou devant l'oreille, d’un côté ou de l’autre?",
                            subquestion: {
                                1: {
                                    question: "A. Mastiquer des aliments durs ou coriaces",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "B. Ouvrir votre bouche ou déplacer votre mâchoire vers l'avant ou de côté",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question:
                                        "C. Habitudes de la mâchoire tel que tenir les dents ensemble, serrer/grincer des " +
                                        "dents, ou mâcher de la gomme",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "D. Autres activités de la mâchoire tel que parler, embrasser ou bâiller",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        }
                    }
                },
                2: {
                    question: "MAUX DE TÊTE",
                    subquestion: {
                        5: {
                            question:
                                "5. Au cours des 30 derniers jours, avez-vous eu des maux de tête qui comprenaient la " +
                                "région de la tempe? Si vous avez répondu NON à la Question 5, passez à la Question 8.",
                            radio: ["Non", "Oui"]
                        },
                        6: {
                            question:
                                "6. Depuis combien d’années ou de mois est-ce que vos maux de tête à la " +
                                "tempe ont commencé pour la première fois?",
                            numerical: ["années", "mois"]
                        },
                        7: {
                            question:
                                "7. Au cours des 30 derniers jours, est-ce que les activités suivantes ont modifié " +
                                "(c’est-à-dire amélioré ou aggravé) tout maux de tête dans la région de la tempe d’un côté ou de l’autre? ",
                            subquestion: {
                                1: {
                                    question: "A. Mastiquer des aliments durs ou coriaces",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "B. Ouvrir votre bouche ou déplacer votre mâchoire vers l'avant ou de côté",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question:
                                        "C. Habitudes de la mâchoire tel que tenir les dents ensemble, serrer/grincer des " +
                                        "dents, ou mâcher de la gomme",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "D. Autres activités de la mâchoire tel que parler, embrasser ou bâiller",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        }
                    }
                },
                3: {
                    question: "BRUITS ARTICULAIRES",
                    subquestion: {
                        1: {
                            question:
                                "8. Au cours des 30 derniers jours, avez-vous eu n’importe quel bruit articulaire " +
                                "en bougeant ou utilisant la mâchoire?",
                            radio: ["Non", "Oui"]
                        },
                        2: {
                            question: "Usage par l'examinateur",
                            checkbox: ["D", "G", "NSP"]
                        }
                    }
                },
                4: {
                    question: "BLOCAGE FERMÉ DE LA MÂCHOIRE",
                    subquestion: {
                        1: {
                            question:
                                "9. Avez-vous déjà eu la mâchoire bloquée ou coincée, même pour un instant, de " +
                                "sorte à ne pas pouvoir ouvrir AU COMPLET? Si vous avez répondu NON à la Question 9, " +
                                "passez à la Question 13.",
                            radio: ["Non", "Oui"]
                        },
                        2: {
                            question: "Usage par l'examinateur",
                            checkbox: ["D", "G", "NSP"]
                        },
                        3: {
                            question:
                                "10. Est-ce que le blocage ou le coincement de votre mâchoire, même pour un " +
                                "instant, a été suffisamment grave pour limiter votre ouverture de bouche et " +
                                "interférer avec votre habileté à manger?",
                            radio: ["Non", "Oui"]
                        },
                        4: {
                            question: "Usage par l'examinateur",
                            checkbox: ["D", "G", "NSP"]
                        },
                        5: {
                            question:
                                "11. Au cours des 30 derniers jours, est-ce que votre mâchoire a bloqué pour ne " +
                                "pas pouvoir ouvrir COMPLÈTEMENT, même un instant, pour ensuite " +
                                "débloquer et pouvoir ouvrir AU COMPLET? " +
                                "Si vous avez répondu NON à la Question 11, passez à la " +
                                "Question 13.",
                            radio: ["Non", "Oui"]
                        },
                        6: {
                            question: "Usage par l'examinateur",
                            checkbox: ["D", "G", "NSP"]
                        },
                        7: {
                            question:
                                "12. Est-ce que votre mâchoire est présentement bloquée ou limitée de sorte à ne " +
                                "pas pouvoir ouvrir AU COMPLET?",
                            radio: ["Non", "Oui"]
                        },
                        8: {
                            question: "Usage par l'examinateur",
                            checkbox: ["D", "G", "NSP"]
                        }
                    }
                },
                5: {
                    question: "BLOCAGE OUVERT DE LA MÂCHOIRE",
                    subquestion: {
                        1: {
                            question:
                                "13. Au cours des 30 derniers jours, est-ce que votre mâchoire a bloqué ou coincé " +
                                "en ouvrant la bouche toute grande, même un instant, de sorte à ne pas " +
                                "pouvoir fermer à partir de cette position grande ouverte? " +
                                "Si vous avez répondu NON à la Question 13, vous avez terminé.",
                            radio: ["Non", "Oui"]
                        },
                        2: {
                            question: "Usage par l'examinateur",
                            checkbox: ["D", "G", "NSP"]
                        },
                        3: {
                            question:
                                "14. Au cours des 30 derniers jours, lorsque votre mâchoire était bloquée ou " +
                                "coincée grande ouverte, avez-vous eu à faire quelque chose pour fermer tel " +
                                "que la mettre au repos, la bouger, la pousser ou la manipuler?",
                            radio: ["Non", "Oui"]
                        },
                        4: {
                            question: "Usage par l'examinateur",
                            checkbox: ["D", "G", "NSP"]
                        }
                    }
                },
                6: {
                    question: "AUTRES CONSULTATIONS",
                    subquestion: {
                        1: {
                            question:
                                "15. Avez-vous déjà consulté d'autres spécialistes pour vos maux de tête \
                                (neurologues, autres) sans solution apportée?",
                            radio: ["Non", "Oui"]
                        }
                    }
                }
            }
        }
    },
    disclaimer:
        "Copyright INfORM Network. Translated by Goulet J-P, Univ. Laval, Quebec, Canada. \
        Available at http://www.rdc-tmdinternational.org. \
        Version 12May2013. No permission required to reproduce, translate, display, or distribute."
};
