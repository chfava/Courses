export const form4 = {
    form: {
        nbSections: 6,
        section: {
            1: {
                0: {
                    question: "1a. SITE DOULEUR: 30 derniers jours (Choisir tout ce qui s'applique)",
                    subquestion: {
                        D: {
                            question: "DOULEUR - DROIT",
                            checkbox: ["Non", "Temporal", "Masséter", "Autres musc mast", "ATM", "Structures non-mast"]
                        },
                        G: {
                            question: "DOULEUR - GAUCHE",
                            checkbox: ["Non", "Temporal", "Masséter", "Autres musc mast", "ATM", "Structures non-mast"]
                        }
                    }
                },
                1: {
                    question: "1b. SITE MAL DE TÊTE: 30 derniers jours (Choisir tout ce qui s'applique)",
                    subquestion: {
                        D: {
                            question: "DOULEUR - DROIT",
                            checkbox: ["Non", "Temporal", "Autre"]
                        },
                        G: {
                            question: "DOULEUR - GAUCHE",
                            checkbox: ["Non", "Temporal", "Autre"]
                        }
                    }
                },
                2: {
                    question: "2. RELATION INCISIVE",
                    subquestion: {
                        A: {
                            question: "Dent référence",
                            checkbox: ["FDI #11", "FDI #21", "Autre"]
                        },
                        B: {
                            question: "Surplomb incisif horizontal (en mm)",
                            inputType: "number"
                        },
                        C: {
                            question: "",
                            checkbox: ["Si négatif"]
                        },
                        D: {
                            question: "Surplomb incisif vertical (en mm)",
                            inputType: "number"
                        },
                        E: {
                            question: "",
                            checkbox: ["Si négatif"]
                        },
                        F: {
                            question: "Déviation médiane (en mm)",
                            inputType: "number"
                        },
                        G: {
                            question: "",
                            checkbox: ["Droite", "Gauche", "N/A"]
                        }
                    }
                },
                3: {
                    question: "3. PATRON OUVERTURE (Supplément; Choisir tout ce qui s'applique)",
                    subquestion: {
                        A: {
                            question: "",
                            checkbox: ["Rectiligne", "Déviation corrigée"]
                        },
                        B: {
                            question: "Déviation non-corrigée",
                            checkbox: ["Droit", "Gauche"]
                        }
                    }
                }
            },
            2: {
                4: {
                    question: "4. MOUVEMENTS OUVERTURE",
                    subquestion: {
                        A: {
                            question: "4A. Ouverture sans douleur (en mm)",
                            inputType: "number"
                        },
                        B: {
                            question: "4B.",
                            subquestion: {
                                0: {
                                    question: "Ouverture maxi. sans aide (en mm)",
                                    inputType: "number"
                                },
                                1: {
                                    question: "CÔTÉ DROIT",
                                    subquestion: {
                                        1: {
                                            question: "4BD.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "4BD.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "4BD.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "4BD.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "4BD.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "4BD.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "4BD.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "4BD.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "4BD.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "4BD.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "4BD.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                },
                                2: {
                                    question: "CÔTÉ GAUCHE",
                                    subquestion: {
                                        1: {
                                            question: "4BG.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "4BG.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "4BG.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "4BG.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "4BG.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "4BG.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "4BG.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "4BG.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "4BG.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "4BG.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "4BG.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                }
                            }
                        },
                        C: {
                            question: "4C.",
                            subquestion: {
                                0: {
                                    question: "Ouverture maxi. avec aide (en mm)",
                                    inputType: "number"
                                },
                                1: {
                                    question: "CÔTÉ DROIT",
                                    subquestion: {
                                        1: {
                                            question: "4CD.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "4CD.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "4CD.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "4CD.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "4CD.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "4CD.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "4CD.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "4CD.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "4CD.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "4CD.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "4CD.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                },
                                2: {
                                    question: "CÔTÉ GAUCHE",
                                    subquestion: {
                                        1: {
                                            question: "4CG.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "4CG.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "4CG.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "4CG.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "4CG.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "4CG.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "4CG.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "4CG.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "4CG.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "4CG.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "4CG.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                }
                            }
                        },
                        D: {
                            question: "4D. Interrompu?",
                            radio: ["Non", "Oui"]
                        }
                    }
                }
            },
            3: {
                5: {
                    question: "5. MOUVEMENTS LATÉRAUX ET PROTRUSION",
                    subquestion: {
                        A: {
                            question: "5A.",
                            subquestion: {
                                0: {
                                    question: "Latéral droit (en mm)",
                                    inputType: "number"
                                },
                                1: {
                                    question: "CÔTÉ DROIT",
                                    subquestion: {
                                        1: {
                                            question: "5AD.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "5AD.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "5AD.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "5AD.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "5AD.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "5AD.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "5AD.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "5AD.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "5AD.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "5AD.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "5AD.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                },
                                2: {
                                    question: "CÔTÉ GAUCHE",
                                    subquestion: {
                                        1: {
                                            question: "5AG.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "5AG.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "5AG.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "5AG.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "5AG.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "5AG.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "5AG.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "5AG.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "5AG.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "5AG.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "5AG.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                }
                            }
                        },
                        B: {
                            question: "5B.",
                            subquestion: {
                                0: {
                                    question: "Latéral gauche (en mm)",
                                    inputType: "number"
                                },
                                1: {
                                    question: "CÔTÉ DROIT",
                                    subquestion: {
                                        1: {
                                            question: "5BD.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "5BD.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "5BD.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "5BD.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "5BD.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "5BD.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "5BD.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "5BD.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "5BD.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "5BD.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "5BD.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                },
                                2: {
                                    question: "CÔTÉ GAUCHE",
                                    subquestion: {
                                        1: {
                                            question: "5BG.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "5BG.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "5BG.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "5BG.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "5BG.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "5BG.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "5BG.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "5BG.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "5BG.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "5BG.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "5BG.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                }
                            }
                        },
                        C: {
                            question: "5C.",
                            subquestion: {
                                0: {
                                    question: "Protrusion (en mm)",
                                    inputType: "number"
                                },
                                1: {
                                    question: "",
                                    checkbox: ["Si négatif"]
                                },
                                2: {
                                    question: "CÔTÉ DROIT",
                                    subquestion: {
                                        1: {
                                            question: "5CD.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "5CD.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "5CD.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "5CD.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "5CD.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "5CD.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "5CD.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "5CD.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "5CD.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "5CD.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "5CD.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                },
                                3: {
                                    question: "CÔTÉ GAUCHE",
                                    subquestion: {
                                        1: {
                                            question: "5CG.1 Temporal - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        2: {
                                            question: "5CG.2 Temporal - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        3: {
                                            question: "5CG.3 Temporal - Mal de tête habituel",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "5CG.4 Masséter - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "5CG.5 Masséter - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        6: {
                                            question: "5CG.6 ATM - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        7: {
                                            question: "5CG.7 ATM - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        8: {
                                            question: "5CG.8 Autres m mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        9: {
                                            question: "5CG.9 Autres m mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        },
                                        10: {
                                            question: "5CG.10 Non-mast - Douleur",
                                            radio: ["Non", "Oui"]
                                        },
                                        11: {
                                            question: "5CG.11 Non-mast - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            4: {
                6: {
                    question: "6. BRUITS ATM PENDANT MOUVEMENTS OUVERTURE & FERMETURE",
                    subquestion: {
                        D: {
                            question: "ATM DROITE",
                            subquestion: {
                                1: {
                                    question: "6D.1 Craque - Examinateur (ouvert)",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "6D.2 Craque - Examinateur (fermé)",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "6D.3 Craque - Patient",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "Si vous avez répondu oui à la dernière question, répondez aux deux questions suivantes :",
                                    subquestion: {
                                        4: {
                                            question: "6D.4 Craque - Douleur à craque",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "6D.5 Craque - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                },
                                6: {
                                    question: "6D.6 Crépite - Examinateur (ouvert)",
                                    radio: ["Non", "Oui"]
                                },
                                7: {
                                    question: "6D.7 Crépite - Examinateur (fermé)",
                                    radio: ["Non", "Oui"]
                                },
                                8: {
                                    question: "6D.8 Crépite - Patient",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        },
                        G: {
                            question: "ATM GAUCHE",
                            subquestion: {
                                1: {
                                    question: "6G.1 Craque - Examinateur (ouvert)",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "6G.2 Craque - Examinateur (fermé)",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "6G.3 Craque - Patient",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "Si vous avez répondu oui à la dernière question, répondez aux deux questions suivantes :",
                                    subquestion: {
                                        4: {
                                            question: "6G.4 Craque - Douleur à craque",
                                            radio: ["Non", "Oui"]
                                        },
                                        5: {
                                            question: "6G.5 Craque - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                },
                                6: {
                                    question: "6G.6 Crépite - Examinateur (ouvert)",
                                    radio: ["Non", "Oui"]
                                },
                                7: {
                                    question: "6G.7 Crépite - Examinateur (fermé)",
                                    radio: ["Non", "Oui"]
                                },
                                8: {
                                    question: "6G.8 Crépite - Patient",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        }
                    }
                },
                7: {
                    question: "7. BRUITS ATM PENDANT MOUVEMENTS LATÉRAUX & PROTRUSION",
                    subquestion: {
                        D: {
                            question: "ATM DROITE",
                            subquestion: {
                                1: {
                                    question: "7D.1 Craquement - Examinateur",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "7D.2 Craquement - Patient",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "Si vous avez répondu oui à la dernière question, répondez aux deux questions suivantes :",
                                    subquestion: {
                                        3: {
                                            question: "7D.3 Craquement - Douleur à craque",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "7D.4 Craquement - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                },
                                5: {
                                    question: "7D.5 Crépitement - Examinateur",
                                    radio: ["Non", "Oui"]
                                },
                                6: {
                                    question: "7D.6 Crépitement - Patient",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        },
                        G: {
                            question: "ATM GAUCHE",
                            subquestion: {
                                1: {
                                    question: "7G.1 Craquement - Examinateur",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "7G.2 Craquement - Patient",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "Si vous avez répondu oui à la dernière question, répondez aux deux questions suivantes :",
                                    subquestion: {
                                        3: {
                                            question: "7G.3 Craquement - Douleur à craque",
                                            radio: ["Non", "Oui"]
                                        },
                                        4: {
                                            question: "7G.4 Craquement - Douleur habituelle",
                                            radio: ["Non", "Oui"]
                                        }
                                    }
                                },
                                5: {
                                    question: "7G.5 Crépitement - Examinateur",
                                    radio: ["Non", "Oui"]
                                },
                                6: {
                                    question: "7G.6 Crépitement - Patient",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        }
                    }
                },
                8: {
                    question: "8. BLOCAGE ARTICULAIRE",
                    subquestion: {
                        D: {
                            question: "ATM DROITE",
                            subquestion: {
                                1: {
                                    question: "8D.1 En ouvrant - Blocage",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "8D.2 En ouvrant - Réduction (patient)",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "8D.3 En ouvrant - Réduction (examinateur)",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "8D.4 Position ouvert grand - Blocage",
                                    radio: ["Non", "Oui"]
                                },
                                5: {
                                    question: "8D.5 Position ouvert grand - Réduction (patient)",
                                    radio: ["Non", "Oui"]
                                },
                                6: {
                                    question: "8D.6 Position ouvert grand - Réduction (examinateur)",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        },
                        G: {
                            question: "ATM GAUCHE",
                            subquestion: {
                                1: {
                                    question: "8G.1 En ouvrant - Blocage",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "8G.2 En ouvrant - Réduction (patient)",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "8G.3 En ouvrant - Réduction (examinateur)",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "8G.4 Position ouvert grand - Blocage",
                                    radio: ["Non", "Oui"]
                                },
                                5: {
                                    question: "8G.5 Position ouvert grand - Réduction (patient)",
                                    radio: ["Non", "Oui"]
                                },
                                6: {
                                    question: "8G.6 Position ouvert grand - Réduction (examinateur)",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        }
                    }
                }
            },
            5: {
                9: {
                    question: "9. DOULEUR PALPATION MUSCLES & ATM",
                    subquestion: {
                        D: {
                            question: "CÔTÉ DROIT (1 kg)",
                            subquestion: {
                                1: {
                                    question: "9D.1 Temporal (postérieur) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "9D.2 Temporal (postérieur) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "9D.3 Temporal (postérieur) - Mal de tête habituel",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "9D.4 Temporal (postérieur) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                5: {
                                    question: "9D.5 Temporal (moyen) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                6: {
                                    question: "9D.6 Temporal (moyen) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                7: {
                                    question: "9D.7 Temporal (moyen) - Mal de tête habituel",
                                    radio: ["Non", "Oui"]
                                },
                                8: {
                                    question: "9D.8 Temporal (moyen) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                9: {
                                    question: "9D.9 Temporal (antérieur) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                10: {
                                    question: "9D.10 Temporal (antérieur) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                11: {
                                    question: "9D.11 Temporal (antérieur) - Mal de tête habituel",
                                    radio: ["Non", "Oui"]
                                },
                                12: {
                                    question: "9D.12 Temporal (antérieur) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                13: {
                                    question: "9D.13 Masséter (origine) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                14: {
                                    question: "9D.14 Masséter (origine) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                15: {
                                    question: "9D.15 Masséter (origine) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                16: {
                                    question: "9D.16 Masséter (corps) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                17: {
                                    question: "9D.17 Masséter (corps) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                18: {
                                    question: "9D.18 Masséter (corps) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                19: {
                                    question: "9D.19 Masséter (insertion) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                20: {
                                    question: "9D.20 Masséter (insertion) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                21: {
                                    question: "9D.21 Masséter (insertion) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        },
                        D2: {
                            question: "ATM DROITE",
                            subquestion: {
                                22: {
                                    question: "9D.22 Pôle latéral (0.5 kg) - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                23: {
                                    question: "9D.23 Pôle latéral (0.5 kg) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                24: {
                                    question: "9D.24 Pôle latéral (0.5 kg) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                25: {
                                    question: "9D.25 Autour du pôle latéral (1 kg) - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                26: {
                                    question: "9D.26 Autour du pôle latéral (1 kg) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                27: {
                                    question: "9D.27 Autour du pôle latéral (1 kg) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        },
                        G: {
                            question: "CÔTÉ GAUCHE (1 kg)",
                            subquestion: {
                                1: {
                                    question: "9G.1 Temporal (postérieur) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "9G.2 Temporal (postérieur) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "9G.3 Temporal (postérieur) - Mal de tête habituel",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "9G.4 Temporal (postérieur) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                5: {
                                    question: "9G.5 Temporal (moyen) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                6: {
                                    question: "9G.6 Temporal (moyen) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                7: {
                                    question: "9G.7 Temporal (moyen) - Mal de tête habituel",
                                    radio: ["Non", "Oui"]
                                },
                                8: {
                                    question: "9G.8 Temporal (moyen) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                9: {
                                    question: "9G.9 Temporal (antérieur) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                10: {
                                    question: "9G.10 Temporal (antérieur) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                11: {
                                    question: "9G.11 Temporal (antérieur) - Mal de tête habituel",
                                    radio: ["Non", "Oui"]
                                },
                                12: {
                                    question: "9G.12 Temporal (antérieur) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                13: {
                                    question: "9G.13 Masséter (origine) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                14: {
                                    question: "9G.14 Masséter (origine) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                15: {
                                    question: "9G.15 Masséter (origine) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                16: {
                                    question: "9G.16 Masséter (corps) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                17: {
                                    question: "9G.17 Masséter (corps) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                18: {
                                    question: "9G.18 Masséter (corps) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                19: {
                                    question: "9G.19 Masséter (insertion) - Douleur diffuse",
                                    radio: ["Non", "Oui"]
                                },
                                20: {
                                    question: "9G.20 Masséter (insertion) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                21: {
                                    question: "9G.21 Masséter (insertion) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        },
                        G2: {
                            question: "ATM GAUCHE",
                            subquestion: {
                                22: {
                                    question: "9G.22 Pôle latéral (0.5 kg) - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                23: {
                                    question: "9G.23 Pôle latéral (0.5 kg) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                24: {
                                    question: "9G.24 Pôle latéral (0.5 kg) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                25: {
                                    question: "9G.25 Autour du pôle latéral (1 kg) - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                26: {
                                    question: "9G.26 Autour du pôle latéral (1 kg) - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                27: {
                                    question: "9G.27 Autour du pôle latéral (1 kg) - Douleur référée",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        }
                    }
                },
                10: {
                    question: "10. DOULEUR PALPATION MUSCLES SUPPLÉMENTAIRES",
                    subquestion: {
                        D: {
                            question: "CÔTÉ DROIT (0.5 kg)",
                            subquestion: {
                                1: {
                                    question: "10D.1 Région mandibulaire post - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "10D.2 Région mandibulaire post - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "10D.3 Région mandibulaire post - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "10D.4 Région sous-mandibulaire - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                5: {
                                    question: "10D.5 Région sous-mandibulaire - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                6: {
                                    question: "10D.6 Région sous-mandibulaire - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                7: {
                                    question: "10D.7 Région ptérygoidien latéral - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                8: {
                                    question: "10D.8 Région ptérygoidien latéral - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                9: {
                                    question: "10D.9 Région ptérygoidien latéral - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                10: {
                                    question: "10D.10 Tendon du temporal - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                11: {
                                    question: "10D.11 Tendon du temporal - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                12: {
                                    question: "10D.12 Tendon du temporal - Douleur référée",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        },
                        G: {
                            question: "CÔTÉ GAUCHE (0.5 kg)",
                            subquestion: {
                                1: {
                                    question: "10G.1 Région mandibulaire post - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                2: {
                                    question: "10G.2 Région mandibulaire post - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                3: {
                                    question: "10G.3 Région mandibulaire post - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                4: {
                                    question: "10G.4 Région sous-mandibulaire - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                5: {
                                    question: "10G.5 Région sous-mandibulaire - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                6: {
                                    question: "10G.6 Région sous-mandibulaire - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                7: {
                                    question: "10G.7 Région ptérygoidien latéral - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                8: {
                                    question: "10G.8 Région ptérygoidien latéral - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                9: {
                                    question: "10G.9 Région ptérygoidien latéral - Douleur référée",
                                    radio: ["Non", "Oui"]
                                },
                                10: {
                                    question: "10G.10 Tendon du temporal - Douleur",
                                    radio: ["Non", "Oui"]
                                },
                                11: {
                                    question: "10G.11 Tendon du temporal - Douleur habituelle",
                                    radio: ["Non", "Oui"]
                                },
                                12: {
                                    question: "10G.12 Tendon du temporal - Douleur référée",
                                    radio: ["Non", "Oui"]
                                }
                            }
                        }
                    }
                }
            },
            6: {
                11: {
                    question: "11. DIAGNOSTICS",
                    subquestion: {
                        1: {
                            question: "11.1 Désordres douleureux",
                            checkbox: [
                                "Non",
                                "Myalgie",
                                "Myalgie Locale",
                                "Douleur Myofasciale",
                                "Douleur Myofasciale Référée",
                                "Arthralgie droite",
                                "Arthralgie gauche",
                                "Maux de tête attribués à DTM"
                            ]
                        },
                        2: {
                            question: "11.2 Désordres ATM droite",
                            checkbox: [
                                "Non",
                                "Déplacement du disque avec réduction",
                                "Déplacement du disque avec réduction, et blocage intermittent",
                                "Déplacement du disque sans réduction, avec ouverture limitée",
                                "Déplacement du disque sans réduction, sans ouverture limitée",
                                "Maladie articulaire dégénérative",
                                "Subluxation"
                            ]
                        },
                        3: {
                            question: "11.3 Désordres ATM gauche",
                            checkbox: [
                                "Non",
                                "Déplacement du disque avec réduction",
                                "Déplacement du disque avec réduction, et blocage intermittent",
                                "Déplacement du disque sans réduction, avec ouverture limitée",
                                "Déplacement du disque sans réduction, sans ouverture limitée",
                                "Maladie articulaire dégénérative",
                                "Subluxation"
                            ]
                        }
                    }
                },
                12: {
                    question: "12. TRAITEMENTS",
                    subquestion: {
                        1: {
                            question: "12.1 Éducation thérapeutique",
                            radio: ["Non", "Oui"]
                        },
                        2: {
                            question: "12.2 Gestion comportementale et psychologique",
                            checkbox: [
                                "Hypnothérapie",
                                "Thérapie cognitive et/ou comportementale réalisée par un tiers",
                                "Bio feedback"
                            ]
                        },
                        3: {
                            question: "12.3 Thérapie pharmacologique",
                            checkbox: [
                                "Anti-inflammatoires A.I.S.",
                                "Anti-inflammatoires A.I.N.S.",
                                "Antalgiques de paliers 1",
                                "Antalgiques de paliers 2",
                                "Antalgiques de paliers 3",
                                "Myo-relaxants",
                                "Anti-épileptiques",
                                "Anxiolytiques",
                                "Anti-dépresseurs",
                                "Anti-migraineux"
                            ],
                            linkedQuestion: {
                                question: "Si autres, indiquez lesquelles",
                                inputType: "text"
                            }
                        },
                        4: {
                            question: "12.4 Orthèses occlusales",
                            checkbox: [
                                "De reconditionnement neuro-musculaire",
                                "D'antéposition",
                                "De repositionnement vertical",
                                "Jig antérieur",
                                "Cales latérales"
                            ],
                            linkedQuestion: {
                                question: "Si autres, indiquez lesquelles",
                                inputType: "text"
                            }
                        },
                        5: {
                            question: "12.5 Physiothérapie",
                            checkbox: [
                                "Kinésithérapie maxillo-faciale et cervicale",
                                "Rééducation linguale",
                                "Ostéopathie - chiropractie",
                                "TENS",
                                "Cryothérapie"
                            ],
                            linkedQuestion: {
                                question: "Si autres, indiquez lesquelles",
                                inputType: "text"
                            }
                        },
                        6: {
                            question: "12.6 Thérapie occlusale",
                            checkbox: [
                                "Soustraction (meulages sélectifs)",
                                "Addition (adjonction de composite ou reconstruction prothétique)",
                                "Orthodontie",
                                "Chirurgie orthognathique"
                            ]
                        },
                        7: {
                            question: "12.7 Injections",
                            checkbox: ["Toxine botulique", "Bétaméthasone ", "Acide hyaluronique", "PRF"],
                            linkedQuestion: {
                                question: "Si autres, indiquez lesquels",
                                inputType: "text"
                            }
                        },
                        8: {
                            question: "12.8 Abord chirurgical de l'ATM",
                            checkbox: ["Arthrocentèse", "Arthroscopie", "Chirurgie à ciel ouvert"]
                        }
                    }
                },
                13: {
                    question: "13. COMMENTAIRES",
                    longText: "bidon"
                }
            }
        }
    },
    disclaimer:
        "Copyright International RDC/TMD Consortium Network. Translated by Goulet J-P, Univ. Laval, Quebec, Canada. \
                Available at http://www.rdc-tmdinternational.org. \
                Version 12May2013. No permission required to reproduce, translate, display, or distribute."
};
