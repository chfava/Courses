import { Injectable } from "@nestjs/common";
import { MedicalExamService } from "../medical-exam/medical-exam.service";
import { FormResultInterface } from "../form-result/form-result.interface";

@Injectable()
export class DecisionTreeService {
  constructor(private readonly medicalExamService: MedicalExamService) {}

  async getDecisionTreeResult(medicalExamId: string) {
    const medicalExamWithFormsResults = await this.medicalExamService.findById(medicalExamId, ["forms-results"]);

    const form2 = (medicalExamWithFormsResults.formsResults as FormResultInterface[]).find(
      form => form.formConfig === "2"
    );

    const form4 = (medicalExamWithFormsResults.formsResults as FormResultInterface[]).find(
      form => form.formConfig === "4"
    );

    const results: string[][] = [];
    for (let i = 0; i < 3; i++) {
      results.push([]);
    }

    this.evaluateTree1(form2 ? form2.result : null, form4 ? form4.result : null, results, true);
    this.evaluateTree1(form2 ? form2.result : null, form4 ? form4.result : null, results, false);

    this.evaluateTree2(form2 ? form2.result : null, form4 ? form4.result : null, results, true);
    this.evaluateTree2(form2 ? form2.result : null, form4 ? form4.result : null, results, false);

    this.evaluateTree3(form2 ? form2.result : null, form4 ? form4.result : null, results, true);
    this.evaluateTree3(form2 ? form2.result : null, form4 ? form4.result : null, results, false);

    this.evaluateTree4(form2 ? form2.result : null, form4 ? form4.result : null, results, true);
    this.evaluateTree4(form2 ? form2.result : null, form4 ? form4.result : null, results, false);

    results.forEach(result => {
      if (result.length === 0) {
        result.push("Non");
      }
    });

    return results;
  }

  private evaluateTree1(form2Answers: any, form4Answers: any, results: string[][], isLeft: boolean) {
    if (
      this.hasDouleurRegionaleQS3(form2Answers) &&
      this.hasDouleurModifieeParMouvementMandibuleFonctionOuParafonctionQS4(form2Answers)
    ) {
      if (this.hasConfirmationDuSiteDeDouleurE1aMuscle(form4Answers, isLeft)) {
        if (
          this.hasDouleurHabituelleAOuvertureE4Muscle(form4Answers, isLeft) ||
          this.hasDouleurHabituellePalpationE9Muscle(form4Answers, isLeft)
        ) {
          this.insertInTree1Or2(results, "Myalgie");
        }
        if (this.hasDouleurRefereeAuDelaDesLimitesE9Muscle(form4Answers, isLeft)) {
          this.insertInTree1Or2(results, "Douleur Myofasciale Référée");
        } else if (this.hasDouleurDiffuseAuDelaZoneStimuleeE9Muscle(form4Answers, isLeft)) {
          this.insertInTree1Or2(results, "Douleur Myofasciale");
        } else {
          this.insertInTree1Or2(results, "Myalgie Locale");
        }
      } else if (this.hasConfirmationDuSiteDeDouleurE1aATM(form4Answers, isLeft)) {
        if (
          this.hasDouleurHabituelleAOuvertureE4Art(form4Answers, isLeft) ||
          this.hasDouleurHabituelleMouvementsHorizontauxE5Art(form4Answers, isLeft) ||
          this.hasDouleurHabituellePalpationE9Art(form4Answers, isLeft)
        ) {
          results[0].push("Arthralgie" + isLeft ? "gauche" : "droite");
        } else if (this.hasDouleurHabituellePalpationE9Muscle(form4Answers, isLeft)) {
          if (this.hasDouleurRefereeAuDelaDesLimitesE9Muscle(form4Answers, isLeft)) {
            this.insertInTree1Or2(results, "Douleur Myofasciale Référée");
          } else if (this.hasDouleurDiffuseAuDelaZoneStimuleeE9Muscle(form4Answers, isLeft)) {
            this.insertInTree1Or2(results, "Douleur Myofasciale");
          } else {
            this.insertInTree1Or2(results, "Myalgie Locale");
          }
        }
      }
    }
  }

  private evaluateTree2(form2Answers: any, form4Answers: any, results: string[][], isLeft: boolean) {
    if (
      this.hasMauxDeTeteRegionTemporalQS5(form2Answers) &&
      this.hasMauxDeTeteParMouvementMandibuleFonctionOuParafonctionQS7(form2Answers)
    ) {
      if (this.hasConfirmationMauxDeTeteRegionTemporaleE1b(form4Answers, isLeft)) {
        if (
          this.hasMauxDeTeteHabituelsAOuvertureE4Temporal(form4Answers, isLeft) ||
          this.hasMauxDeTeteHabituelsAMouvementExcursionE5Temporal(form4Answers, isLeft) ||
          this.hasMauxDeTeteHabituelsAPalpationMuscleE9Temporal(form4Answers, isLeft)
        ) {
          if (this.hasMauxDeTetePasPrisEnCompteParAutreSpecialisteQS15(form2Answers)) {
            this.insertInTree1Or2(results, "Maux de tête attribués à DTM");
          }
        }
      }
    }
  }

  private evaluateTree3(form2Answers: any, form4Answers: any, results: string[][], isLeft: boolean) {
    const leftOrRightResult = !isLeft ? 1 : 2;

    if (this.patientSaidYesToQS9AndQS10(form2Answers)) {
      if (this.hasOMAGreaterThan40mmE4C(form4Answers)) {
        if (this.practicianSaidYesToQS9OrQS10OnCurrentSide(form2Answers, isLeft)) {
          results[leftOrRightResult].push("Déplacement du disque sans réduction, sans ouverture limitée");
        }
      } else {
        if (this.practicianSaidYesToQS9OrQS10OnCurrentSide(form2Answers, isLeft)) {
          results[leftOrRightResult].push("Déplacement du disque sans réduction, avec ouverture limitée");
        }
      }
    } else {
      if (this.patientSaidYesToQS8OrE6OrE7(form2Answers, form4Answers, isLeft)) {
        if (this.hasCombinationOfCraquementWhenOpenAndClosed(form4Answers, isLeft)) {
          if (this.hasBlocageIntermittentActuelAvecOuvertureLimitéeQS11QS12(form2Answers)) {
            if (this.hasOuvertureAvecManoeuvreE8(form4Answers, isLeft)) {
              results[leftOrRightResult].push("Déplacement du disque avec réduction, et blocage intermittent");
            } else {
              results[leftOrRightResult].push("Déplacement du disque sans réduction, sans ouverture limitée");
            }
          } else {
            results[leftOrRightResult].push("Déplacement du disque avec réduction");
          }
        }
      }
    }
  }

  private evaluateTree4(form2Answers: any, form4Answers: any, results: string[][], isLeft: boolean) {
    const leftOrRightResult = !isLeft ? 1 : 2;
    if (this.saidYesToQS8OrE6OrE7(form2Answers, form4Answers, isLeft)) {
      if (this.hasCrepitementDetecteParExaminateurE6OrE7(form4Answers, isLeft)) {
        results[leftOrRightResult].push("Maladie articulaire dégénérative");
      }
    }
  }

  private getAnswerOfQuestionWithId(formAnswers: any, fullId: string): any {
    if (formAnswers === null) {
      return null;
    }

    const ids = fullId.split("/");

    let index = 0;
    for (const id of ids) {
      if (formAnswers[id] !== null && formAnswers[id] !== undefined) {
        if (index === ids.length - 1) {
          return formAnswers[id];
        }
        formAnswers = formAnswers[id];
      } else {
        return null;
      }
      index++;
    }

    return null;
  }

  private insertInTree1Or2(results: string[][], elementToInsert: string) {
    if (results[0].indexOf(elementToInsert) < 0) {
      results[0].push(elementToInsert);
    }
  }

  // ** ARBRE 1 ** //

  private hasDouleurRegionaleQS3(form: any) {
    const QS3 = this.getAnswerOfQuestionWithId(form, "1/3");
    return QS3 !== null && (QS3 === 1 || QS3 === 2);
  }

  private hasDouleurModifieeParMouvementMandibuleFonctionOuParafonctionQS4(form: any) {
    const QS41 = this.getAnswerOfQuestionWithId(form, "1/4/1");
    const QS42 = this.getAnswerOfQuestionWithId(form, "1/4/2");
    const QS43 = this.getAnswerOfQuestionWithId(form, "1/4/3");
    const QS44 = this.getAnswerOfQuestionWithId(form, "1/4/4");

    return (
      (QS41 !== null && QS41 === 1) ||
      (QS42 !== null && QS42 === 1) ||
      (QS43 !== null && QS43 === 1) ||
      (QS44 !== null && QS44 === 1)
    );
  }

  private hasConfirmationDuSiteDeDouleurE1aMuscle(form: any, isLeft: boolean) {
    const E1a = this.getAnswerOfQuestionWithId(form, "0/" + (isLeft ? "G" : "D"));
    return (
      E1a !== null &&
      (E1a.find((e: number) => e === 1) || E1a.find((e: number) => e === 2) || E1a.find((e: number) => e === 3))
    );
  }

  private hasConfirmationDuSiteDeDouleurE1aATM(form: any, isLeft: boolean) {
    const E1a = this.getAnswerOfQuestionWithId(form, "0/" + (isLeft ? "G" : "D"));
    return E1a !== null && E1a.find((e: number) => e === 4);
  }

  private hasDouleurHabituelleAOuvertureE4Muscle(form: any, isLeft: boolean) {
    const E41 = this.getAnswerOfQuestionWithId(form, "4/B/" + (isLeft ? "2" : "1") + "/2");
    const E42 = this.getAnswerOfQuestionWithId(form, "4/B/" + (isLeft ? "2" : "1") + "/5");
    const E43 = this.getAnswerOfQuestionWithId(form, "4/B/" + (isLeft ? "2" : "1") + "/9");
    const E44 = this.getAnswerOfQuestionWithId(form, "4/C/" + (isLeft ? "2" : "1") + "/2");
    const E45 = this.getAnswerOfQuestionWithId(form, "4/C/" + (isLeft ? "2" : "1") + "/5");
    const E46 = this.getAnswerOfQuestionWithId(form, "4/C/" + (isLeft ? "2" : "1") + "/9");
    return (
      (E41 !== null && E41 === 1) ||
      (E42 !== null && E42 === 1) ||
      (E43 !== null && E43 === 1) ||
      (E44 !== null && E44 === 1) ||
      (E45 !== null && E45 === 1) ||
      (E46 !== null && E46 === 1)
    );
  }

  private hasDouleurHabituellePalpationE9Muscle(form: any, isLeft: boolean) {
    const E91 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/2");
    const E92 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/6");
    const E93 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/10");
    const E94 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/14");
    const E95 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/17");
    const E96 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/20");
    return (
      (E91 !== null && E91 === 1) ||
      (E92 !== null && E92 === 1) ||
      (E93 !== null && E93 === 1) ||
      (E94 !== null && E94 === 1) ||
      (E95 !== null && E95 === 1) ||
      (E96 !== null && E96 === 1)
    );
  }

  private hasDouleurRefereeAuDelaDesLimitesE9Muscle(form: any, isLeft: boolean) {
    const E91 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/4");
    const E92 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/8");
    const E93 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/12");
    const E94 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/15");
    const E95 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/18");
    const E96 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/21");
    return (
      (E91 !== null && E91 === 1) ||
      (E92 !== null && E92 === 1) ||
      (E93 !== null && E93 === 1) ||
      (E94 !== null && E94 === 1) ||
      (E95 !== null && E95 === 1) ||
      (E96 !== null && E96 === 1)
    );
  }

  private hasDouleurDiffuseAuDelaZoneStimuleeE9Muscle(form: any, isLeft: boolean) {
    const E91 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/1");
    const E92 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/5");
    const E93 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/9");
    const E94 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/13");
    const E95 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/16");
    const E96 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/19");
    return (
      (E91 !== null && E91 === 1) ||
      (E92 !== null && E92 === 1) ||
      (E93 !== null && E93 === 1) ||
      (E94 !== null && E94 === 1) ||
      (E95 !== null && E95 === 1) ||
      (E96 !== null && E96 === 1)
    );
  }

  private hasDouleurHabituelleAOuvertureE4Art(form: any, isLeft: boolean) {
    const E41 = this.getAnswerOfQuestionWithId(form, "4/B/" + (isLeft ? "2" : "1") + "/7");
    const E42 = this.getAnswerOfQuestionWithId(form, "4/C/" + (isLeft ? "2" : "1") + "/7");
    return (E41 !== null && E41 === 1) || (E42 !== null && E42 === 1);
  }

  private hasDouleurHabituelleMouvementsHorizontauxE5Art(form: any, isLeft: boolean) {
    const E51 = this.getAnswerOfQuestionWithId(form, "5/A/" + (isLeft ? "2" : "1") + "/7");
    const E52 = this.getAnswerOfQuestionWithId(form, "5/B/" + (isLeft ? "2" : "1") + "/7");
    const E53 = this.getAnswerOfQuestionWithId(form, "5/C/" + (isLeft ? "3" : "2") + "/7");
    return (E51 !== null && E51 === 1) || (E52 !== null && E52 === 1) || (E53 !== null && E53 === 1);
  }

  private hasDouleurHabituellePalpationE9Art(form: any, isLeft: boolean) {
    const E91 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "2/23");
    const E92 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "2/26");
    return (E91 !== null && E91 === 1) || (E92 !== null && E92 === 1);
  }

  // ** ARBRE 2 ** //

  private hasMauxDeTeteRegionTemporalQS5(form: any) {
    const QS5 = this.getAnswerOfQuestionWithId(form, "2/5");
    return QS5 !== null && QS5 === 1;
  }

  private hasMauxDeTeteParMouvementMandibuleFonctionOuParafonctionQS7(form: any) {
    const QS71 = this.getAnswerOfQuestionWithId(form, "2/7/1");
    const QS72 = this.getAnswerOfQuestionWithId(form, "2/7/2");
    const QS73 = this.getAnswerOfQuestionWithId(form, "2/7/3");
    const QS74 = this.getAnswerOfQuestionWithId(form, "2/7/4");

    return (
      (QS71 !== null && QS71 === 1) ||
      (QS72 !== null && QS72 === 1) ||
      (QS73 !== null && QS73 === 1) ||
      (QS74 !== null && QS74 === 1)
    );
  }

  private hasConfirmationMauxDeTeteRegionTemporaleE1b(form: any, isLeft: boolean) {
    const E1b = this.getAnswerOfQuestionWithId(form, "1/" + (isLeft ? "G" : "D"));
    return E1b !== null && (E1b.find((e: number) => e === 1) || E1b.find((e: number) => e === 2));
  }

  private hasMauxDeTeteHabituelsAOuvertureE4Temporal(form: any, isLeft: boolean) {
    const E41 = this.getAnswerOfQuestionWithId(form, "4/B/" + (isLeft ? "2" : "1") + "/3");
    const E42 = this.getAnswerOfQuestionWithId(form, "4/C/" + (isLeft ? "2" : "1") + "/3");
    return (E41 !== null && E41 === 1) || (E42 !== null && E42 === 1);
  }

  private hasMauxDeTeteHabituelsAMouvementExcursionE5Temporal(form: any, isLeft: boolean) {
    const E51 = this.getAnswerOfQuestionWithId(form, "5/A/" + (isLeft ? "2" : "1") + "/3");
    const E52 = this.getAnswerOfQuestionWithId(form, "5/B/" + (isLeft ? "2" : "1") + "/3");
    const E53 = this.getAnswerOfQuestionWithId(form, "5/C/" + (isLeft ? "3" : "2") + "/3");
    return (E51 !== null && E51 === 1) || (E52 !== null && E52 === 1) || (E53 !== null && E53 === 1);
  }

  private hasMauxDeTeteHabituelsAPalpationMuscleE9Temporal(form: any, isLeft: boolean) {
    const E91 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/3");
    const E92 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/7");
    const E93 = this.getAnswerOfQuestionWithId(form, "9/" + (isLeft ? "G" : "D") + "/11");
    return (E91 !== null && E91 === 1) || (E92 !== null && E92 === 1) || (E93 !== null && E93 === 1);
  }

  private hasMauxDeTetePasPrisEnCompteParAutreSpecialisteQS15(form: any) {
    const QS15 = this.getAnswerOfQuestionWithId(form, "6/1");
    return QS15 !== null && QS15 === 1;
  }

  // ** ARBRE 3 ** //

  private patientSaidYesToQS9AndQS10(form: any) {
    return this.hasAntecedentDeBlocagePositionFermeeQS9(form) && this.hasInterferenceAvecMasticationQS10(form);
  }

  private practicianSaidYesToQS9OrQS10OnCurrentSide(form: any, isLeft: boolean) {
    const currentSide = !isLeft ? 0 : 1;

    const QS9Examiner = this.getAnswerOfQuestionWithId(form, "4/2");
    const QS10Examiner = this.getAnswerOfQuestionWithId(form, "4/4");

    return (
      (typeof QS9Examiner === "number" && QS9Examiner === currentSide) ||
      (QS9Examiner !== null && Array.isArray(QS9Examiner) && QS9Examiner.find((e: number) => e === currentSide)) ||
      ((typeof QS10Examiner === "number" && QS10Examiner === currentSide) ||
        (QS10Examiner !== null && Array.isArray(QS10Examiner) && QS10Examiner.find((e: number) => e === currentSide)))
    );
  }

  private hasAntecedentDeBlocagePositionFermeeQS9(form: any) {
    const QS9Patient = this.getAnswerOfQuestionWithId(form, "4/1");
    return QS9Patient !== null && QS9Patient === 1;
  }

  private hasInterferenceAvecMasticationQS10(form: any) {
    const QS10Patient = this.getAnswerOfQuestionWithId(form, "4/3");
    return QS10Patient !== null && QS10Patient === 1;
  }

  private hasOMAGreaterThan40mmE4C(form: any) {
    const E4C = this.getAnswerOfQuestionWithId(form, "4/B/1/1");
    return E4C !== null && E4C > 40;
  }

  private patientSaidYesToQS8OrE6OrE7(form2: any, form4, isLeft: boolean) {
    return (
      this.hasBruitsATMActuelsParHistoireQS8(form2) || this.hasBruitDetecteParPatientPendantExamenE6OrE7(form4, isLeft)
    );
  }

  private hasBruitsATMActuelsParHistoireQS8(form: any) {
    const QS8Patient = this.getAnswerOfQuestionWithId(form, "3/1");
    return QS8Patient !== null && QS8Patient === 1;
  }

  private hasBruitDetecteParPatientPendantExamenE6OrE7(form: any, isLeft: boolean) {
    const craqueQuestionID = !isLeft ? "6/D/4/4" : "6/G/4/4";
    const crepiteQuestionID = !isLeft ? "6/D/8" : "6/G/8";
    const craque = this.getAnswerOfQuestionWithId(form, craqueQuestionID);
    const crepite = this.getAnswerOfQuestionWithId(form, crepiteQuestionID);

    return (craque !== null && craque === 1) || (crepite !== null && crepite === 1);
  }

  private hasCombinationOfCraquementWhenOpenAndClosed(form: any, isLeft: boolean) {
    const craqueOuvertID = !isLeft ? "6/D/1" : "6/G/1";
    const craqueFermeID = !isLeft ? "6/D/2" : "6/G/2";

    const craqueOuvert = this.getAnswerOfQuestionWithId(form, craqueOuvertID);
    const craqueFerme = this.getAnswerOfQuestionWithId(form, craqueFermeID);

    const craqueOuvertEtFerme =
      craqueOuvert !== null && craqueOuvert === 1 && (craqueFerme !== null && craqueFerme === 1);

    return craqueOuvertEtFerme || (this.hasAnyCraquementE6(form, isLeft) && this.hasAnyCraquementE7(form, isLeft));
  }

  private hasAnyCraquementE6(form: any, isLeft: boolean) {
    const craqueOuvertID = !isLeft ? "6/D/1" : "6/G/1";
    const craqueFermeID = !isLeft ? "6/D/2" : "6/G/2";
    const craquePatientID = !isLeft ? "6/D/3" : "6/G/3";
    const douleurACraqueID = !isLeft ? "6/D/4/4" : "6/G/4/4";
    const douleurHabituelleID = !isLeft ? "6/D/4/5" : "6/G/4/5";

    const craqueOuvert = this.getAnswerOfQuestionWithId(form, craqueOuvertID);
    const craqueFerme = this.getAnswerOfQuestionWithId(form, craqueFermeID);
    const craquePatient = this.getAnswerOfQuestionWithId(form, craquePatientID);
    const douleurACraque = this.getAnswerOfQuestionWithId(form, douleurACraqueID);
    const douleurHabituelle = this.getAnswerOfQuestionWithId(form, douleurHabituelleID);

    return (
      (craqueOuvert !== null && craqueOuvert === 1) ||
      (craqueFerme !== null && craqueFerme === 1) ||
      (craquePatient !== null && craquePatient === 1) ||
      (douleurACraque !== null && douleurACraque === 1) ||
      (douleurHabituelle !== null && douleurHabituelle === 1)
    );
  }

  private hasAnyCraquementE7(form: any, isLeft: boolean) {
    const craqueID = !isLeft ? "7/D/1" : "7/G/1";
    const craquePatientID = !isLeft ? "7/D/2" : "7/G/2";
    const douleurACraqueID = !isLeft ? "7/D/3/3" : "7/G/3/3";
    const douleurHabituelleID = !isLeft ? "7/D/3/4" : "7/G/3/4";

    const craque = this.getAnswerOfQuestionWithId(form, craqueID);
    const craquePatient = this.getAnswerOfQuestionWithId(form, craquePatientID);
    const douleurACraque = this.getAnswerOfQuestionWithId(form, douleurACraqueID);
    const douleurHabituelle = this.getAnswerOfQuestionWithId(form, douleurHabituelleID);

    return (
      (craque !== null && craque === 1) ||
      (craquePatient !== null && craquePatient === 1) ||
      (douleurACraque !== null && douleurACraque === 1) ||
      (douleurHabituelle !== null && douleurHabituelle === 1)
    );
  }

  private hasBlocageIntermittentActuelAvecOuvertureLimitéeQS11QS12(form: any) {
    const QS11ID = "4/3";
    const QS12ID = "4/7";

    const QS11 = this.getAnswerOfQuestionWithId(form, QS11ID);
    const QS12 = this.getAnswerOfQuestionWithId(form, QS12ID);

    return QS11 !== null && QS11 === 1 && (QS12 !== null && QS12 === 0);
  }

  private hasOuvertureAvecManoeuvreE8(form: any, isLeft: boolean) {
    const _8D1ID = !isLeft ? "8/D/1" : "8/G/1";
    const _8D2ID = !isLeft ? "8/D/2" : "8/G/2";
    const _8D3ID = !isLeft ? "8/D/3" : "8/G/3";
    const _8D4ID = !isLeft ? "8/D/4" : "8/G/4";
    const _8D5ID = !isLeft ? "8/D/5" : "8/G/5";
    const _8D6ID = !isLeft ? "8/D/6" : "8/G/6";

    const _8D1 = this.getAnswerOfQuestionWithId(form, _8D1ID);
    const _8D2 = this.getAnswerOfQuestionWithId(form, _8D2ID);
    const _8D3 = this.getAnswerOfQuestionWithId(form, _8D3ID);
    const _8D4 = this.getAnswerOfQuestionWithId(form, _8D4ID);
    const _8D5 = this.getAnswerOfQuestionWithId(form, _8D5ID);
    const _8D6 = this.getAnswerOfQuestionWithId(form, _8D6ID);

    return (
      (_8D1 !== null && _8D1 === 1) ||
      (_8D2 !== null && _8D2 === 1) ||
      (_8D3 !== null && _8D3 === 1) ||
      (_8D4 !== null && _8D4 === 1) ||
      (_8D5 !== null && _8D5 === 1) ||
      (_8D6 !== null && _8D6 === 1)
    );
  }

  // ** ARBRE 4 ** //

  private saidYesToQS8OrE6OrE7(form2: any, form4: any, isLeft: boolean) {
    const QS8 = this.hasBruitsATMActuelsParHistoireQS8(form2);

    const openCrepiteQuestionID = !isLeft ? "6/D/6" : "6/G/6";
    const closedCrepiteQuestionID = !isLeft ? "6/D/7" : "6/G/7";
    const patientCrepiteQuestionID = !isLeft ? "6/D/8" : "6/G/8";

    const openCrepite = this.getAnswerOfQuestionWithId(form4, openCrepiteQuestionID);
    const closedCrepite = this.getAnswerOfQuestionWithId(form4, closedCrepiteQuestionID);
    const patientCrepite = this.getAnswerOfQuestionWithId(form4, patientCrepiteQuestionID);

    const E6 =
      (openCrepite !== null && openCrepite === 1) ||
      (closedCrepite !== null && closedCrepite === 1) ||
      (patientCrepite !== null && patientCrepite === 1);

    const crepitementQuestionID = !isLeft ? "7/D/5" : "7/G/5";
    const patientCrepitementQuestionID = !isLeft ? "7/D/6" : "7/G/6";

    const crepitement = this.getAnswerOfQuestionWithId(form4, crepitementQuestionID);
    const patientCrepitement = this.getAnswerOfQuestionWithId(form4, patientCrepitementQuestionID);

    const E7 = (crepitement !== null && crepitement === 1) || (patientCrepitement !== null && patientCrepitement === 1);

    return QS8 || E6 || E7;
  }

  private hasCrepitementDetecteParExaminateurE6OrE7(form: any, isLeft: boolean) {
    return (
      this.hasCrepitementDetecteParExaminateurE6(form, isLeft) ||
      this.hasCrepitementDetecteParExaminateurE7(form, isLeft)
    );
  }

  private hasCrepitementDetecteParExaminateurE6(form: any, isLeft: boolean) {
    const crepitementOuvertExaminateurID = !isLeft ? "6/D/6" : "6/G/6";
    const crepitementFermeExaminateurID = !isLeft ? "6/D/7" : "6/G/7";

    const crepitementOuvertExaminateur = this.getAnswerOfQuestionWithId(form, crepitementOuvertExaminateurID);
    const crepitementFermeExaminateur = this.getAnswerOfQuestionWithId(form, crepitementFermeExaminateurID);

    return (
      (crepitementOuvertExaminateur !== null && crepitementOuvertExaminateur === 1) ||
      (crepitementFermeExaminateur !== null && crepitementFermeExaminateur === 1)
    );
  }

  private hasCrepitementDetecteParExaminateurE7(form: any, isLeft: boolean) {
    const craquementExaminateurID = !isLeft ? "7/D/1" : "7/G/1";
    const crepitementExaminateurID = !isLeft ? "7/D/5" : "7/G/5";

    const craquementExaminateur = this.getAnswerOfQuestionWithId(form, craquementExaminateurID);
    const crepitementExaminateur = this.getAnswerOfQuestionWithId(form, crepitementExaminateurID);

    return (
      (craquementExaminateur !== null && craquementExaminateur === 1) ||
      (crepitementExaminateur !== null && crepitementExaminateur === 1)
    );
  }
}
