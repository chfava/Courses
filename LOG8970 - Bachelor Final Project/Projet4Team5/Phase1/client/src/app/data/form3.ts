// See p.15
// Title: Données démographiques

export const form3 = {
    form: {
        nbSections: 1,
        section: {
            1: {
                1: {
                    question: "1. Quel est votre état civil actuel?",
                    radio: ["Marié(e)", "Conjoint(e) de fait", "Divorcé(e)", "Séparé(e)", "Veuf/Veuve", "Jamais marié(e)"]
                },
                6: {
                    question: "2. Quel est votre lieu de naissance (pays et département, si applicable)?",
                    inputType: "text"
                },
                7: {
                    question: "3. Quel est le plus haut niveau de scolarité que vous avez complété? ",
                    radio: [
                        "CAP BEP",
                        "Baccalauréat",
                        "Universitaire premier cycle",
                        "Universitaire 2e ou 3e cycle"
                    ]
                },
                8: {
                    question: "4. Quelle est votre catégorie socioprofessionnelle?",
                    radio: [
                        "Agriculteurs exploitants",
                        "Artisans, commerçants et chefs d'entreprise",
                        "Professions libérales et assimilés",
                        "Cadres de la fonction publique, professions intellectuelles et artistiques",
                        "Cadres d'entreprise",
                        "Professions intermédiaires de l'enseignement, de la santé, de la fonction publique et assimilés",
                        "Professions intermédiaires administratives et commerciales des entreprises",
                        "Techniciens",
                        "Contremaîtres, agents de maîtrise",
                        "Employés",
                        "Ouvriers",
                        "Retraités",
                        "Autres personnes sans activité professionnelle"
                    ]
                }
            }
        },
        disclaimer:
            "Copyright INFORMNetwork. Translated by GouletJ-P, Univ. Laval, Quebec, \
    Canada. Available at http://www.rdc-tmdinternational.org. Version 12May2013.  \
    No permission required to reproduce, translate, display, or distribute."
    }
};
