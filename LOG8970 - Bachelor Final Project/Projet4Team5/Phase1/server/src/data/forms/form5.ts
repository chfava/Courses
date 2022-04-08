// See p.56
// Title: MORPHOGRAPHIE DE LA DOULEUR

export const form5 = {
  axis: "Axis II",
  frontendId: "5",
  title: "Morphographie de la douleur",
  form: {
    nbSections: 5,
    section: {
      1: {
        1: {
          question: "Bouche et dents",
          imgSrc: "../../../../assets/img/bouche_dents.png",
          imgWidth: "454px",
          imgHeight: "719px",
          nbRows: 65,
          nbCols: 38
        }
      },
      2: {
        2: {
          question: "Corps (vue de derrière)",
          imgSrc: "../../../../assets/img/corps_derriere.png",
          imgWidth: "268px",
          imgHeight: "679px",
          nbRows: 62,
          nbCols: 24
        }
      },
      3: {
        3: {
          question: "Corps (vue de devant)",
          imgSrc: "../../../../assets/img/corps_devant.png",
          imgWidth: "272px",
          imgHeight: "678px",
          nbRows: 62,
          nbCols: 24
        }
      },
      4: {
        4: {
          question: "Visage (droit)",
          imgSrc: "../../../../assets/img/visage_droit.png",
          imgWidth: "556px",
          imgHeight: "707px",
          nbRows: 64,
          nbCols: 48
        }
      },
      5: {
        5: {
          question: "Visage (gauche)",
          imgSrc: "../../../../assets/img/visage_gauche.png",
          imgWidth: "556px",
          imgHeight: "707px",
          nbRows: 64,
          nbCols: 48
        }
      }
    }
  },
  disclaimer:
    "Copyright Von Korff M. Translated by Goulet J-P, Univ. Laval, Quebec, Canada. Available at " +
    "http://www.rdc-tmdinternational.org Version 12May2013. No permission required to reproduce, translate, display, " +
    "or distribute."
};
