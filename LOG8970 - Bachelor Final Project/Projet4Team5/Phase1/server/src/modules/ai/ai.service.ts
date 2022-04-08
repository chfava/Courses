import { Injectable, HttpService } from "@nestjs/common";
import { MedicalExamService } from "../medical-exam/medical-exam.service";
import { map } from "rxjs/operators";
import { FormTemplateService } from "../form-template/form-template.service";
import { ExamResultService } from "../exam-result/exam-result.service";
import { examResultProviders } from "../exam-result/exam-result.providers";
const {PythonShell} = require("python-shell")

import { LIST } from '../exam-result/dto/result-field-list'
import { ExamResultInterface } from "../exam-result/exam-result.interface";
import { examResultSchema } from "../exam-result/exam-result.schema";

@Injectable()
export class AIService {
  readonly DISORDER__IDS = { "Maladie douloureuse": "4/11/1", "ATM gauche": "4/11/2", "ATM droite": "4/11/3" };
  readonly TREATMENT_IDS = ["4/12/1", "4/12/2", "4/12/3", "4/12/4", "4/12/5", "4/12/6", "4/12/7", "4/12/8"];
  readonly FRONTEND_IDS = ["1", "2", "3", "4", "6", "8", "10", "11", "12", "13"];
  readonly TWO_FIELD_NUMERICAL_QUESTION_IDS = ["2/1/2", "2/2/6"];
  readonly TEXT_QUESTION_IDS = ["3/6", "4/13"];

  // it's easier to just copy this info here because if we read it from the DB we need to know
  // the section number but this info is not available from the formResults at the moment
  readonly DISORDER_NAMES = {
    // douloureux
    "4/11/1": [
      "Non",
      "Myalgie",
      "Myalgie Locale",
      "Douleur Myofasciale",
      "Douleur Myofasciale Référée",
      "Arthralgie droite",
      "Arthralgie gauche",
      "Maux de tête attribués à DTM"
    ],
    // droite
    "4/11/2": [
      "Non",
      "Déplacement du disque avec réduction",
      "Déplacement du disque avec réduction, et blocage intermittent",
      "Déplacement du disque sans réduction, avec ouverture limitée",
      "Déplacement du disque sans réduction, sans ouverture limitée",
      "Maladie dégénérative articulaire",
      "Subluxation"
    ],
    // gauche
    "4/11/3": [
      "Non",
      "Déplacement du disque avec réduction",
      "Déplacement du disque avec réduction, et blocage intermittent",
      "Déplacement du disque sans réduction, avec ouverture limitée",
      "Déplacement du disque sans réduction, sans ouverture limitée",
      "Maladie dégénérative articulaire",
      "Subluxation"
    ]
  };

  readonly TREATMENT_NAMES = {
    "4/12/1": ["Éducation thérapeutique", null],
    "4/12/2": ["Hypnothérapie", "Thérapie cognitive et/ou comportementale réalisée par un tiers", "Bio feedback"],
    "4/12/3": [
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
    "4/12/4": [
      "De reconditionnement neuro-musculaire",
      "D'antéposition",
      "De repositionnement vertical",
      "Jig antérieur",
      "Cales latérales"
    ],
    "4/12/5": [
      "Kinésithérapie maxillo-faciale et cervicale",
      "Rééducation linguale",
      "Ostéopathie - chiropractie",
      "TENS",
      "Cryothérapie"
    ],
    "4/12/6": [
      "Soustraction (meulages sélectifs)",
      "Addition (adjonction de composite ou reconstruction prothétique)",
      "Orthodontie",
      "Chirurgie orthognathique"
    ],
    "4/12/7": ["Toxine botulique", "Bétaméthasone ", "Acide hyaluronique", "PRF"],
    "4/12/8": ["Arthrocentèse", "Arthroscopie", "Chirurgie à ciel ouvert"]
  };

  readonly TREATMENT_TYPES = {
    "Éducation thérapeutique": "4/12/1",
    "Gestion comportementale et psychologique": "4/12/2",
    "Thérapie pharmacologique": "4/12/3",
    "Orthèses occlusales": "4/12/4",
    Physiothérapie: "4/12/5",
    "Thérapie occlusale": "4/12/6",
    Injections: "4/12/7",
    "Abord chirurgical de l'ATM": "4/12/8"
  };

  readonly DIAGNOSIS_RESULTS = "diagnosis results";
  readonly TREATMENT_RESULTS = "treatment results";
  readonly DOULOUREUX_DISEASES_ID = "4/11/1";
  readonly RIGHT_SIDE = "droite";
  readonly LEFT_SIDE = "gauche";
  readonly DOULOUREUX_DISEASE = "Maladie douloureuse";
  readonly LEFT_ATM = "ATM gauche";
  readonly RIGHT_ATM = "ATM droite";
  readonly CHECKBOX = "checkbox";
  readonly DIAGNOSTIC = "diagnostic";
  readonly TREATMENT = "treatment";
  readonly RESULTS = "results";
  readonly DIAGNOSTIC_AND_TREATMENTS = "diagnostic and treatments";


  constructor(
    private readonly medicalExamService: MedicalExamService,
    private readonly examService: ExamResultService,
    private readonly httpService: HttpService,
    private readonly formTemplateService: FormTemplateService
  ) {}

  async getAIResult(patientID: string) {    
    const recentExams = await this.examService.findCompletedByPatientId(patientID)
    const examResult = await this.prepInitialTrainingData(recentExams)

    for (let variable in LIST) {
      if (examResult["questions"][LIST[variable]] == undefined) {
        examResult["questions"][LIST[variable]] = "F"
      }
    }

    var options = {
      args: JSON.stringify(examResult["questions"])
    };
    
    return new Promise(resolve => {
      PythonShell.run('/root/Bayesian_Network_Diagnostic_Deployment.py', options, function (err, result) {
          if (err) throw err;
          resolve(result[0]);
      });
    });

    /*
    PythonShell.run('/root/Bayesian_Network_Diagnostic_Deployment.py', options, function (err, results) {
      if (err) throw console.log(err);
      return results
      
      console.log('finished');
    });
    */
    /*
    const pythonProcess = spawn('python',["/root/Bayesian_Network_Diagnostic_Deployment.py"]);
    let res = ""
    for await (const data of pythonProcess.stdout) {
      res += data.toString()
      return { "diagnostic": res.split("\n")[0] }
    }
    pythonProcess.stdout.on('close', (data) => {
      console.log(res)
    });
    pythonProcess.once('exit', (code: Number, signal: string) => {
      console.log(res)
      return res;
    });*/




    /*const medicalExamWithFormsResults = await this.medicalExamService.findById(medicalExamId, ["forms-results"]);

    const formTemplates = await this.formTemplateService.find({
      frontendId: {
        $in: this.FRONTEND_IDS
      }
    });

    const keys = this.getAllQuestionKeys(formTemplates);
    const checkboxOptionsSizes = this.getAllCheckboxKeys(formTemplates);

    const patientAnswers = medicalExamWithFormsResults["formsResults"];

    let data = this.prepPatientAnswerData(patientAnswers, keys, checkboxOptionsSizes)["patientResults"];

    data = [].concat.apply([], data); // flattens into 1d array

    return this.httpService
      .post("http://localhost:5000/predict", data)
      .pipe(map(response => response.data))
      .toPromise()
      .then(response => {
        return this.processAIPredictResponse(response);
      });
      */
  }
  
  async getAITreatmentResult(patientID: string) {
    const recentExams = await this.examService.findCompletedByPatientId(patientID)
    const examResult = await this.prepInitialTrainingData(recentExams)
    //const spawn = require("child_process").spawn;

    for (let variable in LIST) {
      if (examResult["questions"][LIST[variable]] == undefined) {
        examResult["questions"][LIST[variable]] = "F"
      }
    }

    var options = {
      args: JSON.stringify(examResult["questions"])
    };
    
    return new Promise(resolve => {
      PythonShell.run('/root/Bayesian_Network_Diagnostic_Deployment.py', options, function (err, result) {
          if (err) throw err;
          resolve(result[0]);
      });
    });

    /*const medicalExamWithFormsResults = await this.medicalExamService.findById(medicalExamId, ["forms-results"]);

    const formTemplates = await this.formTemplateService.find({
      frontendId: {
        $in: this.FRONTEND_IDS
      }
    });

    const keys = this.getAllQuestionKeys(formTemplates);
    const checkboxOptionsSizes = this.getAllCheckboxKeys(formTemplates);

    const patientAnswers = medicalExamWithFormsResults["formsResults"];

    let data = this.prepPatientAnswerData(patientAnswers, keys, checkboxOptionsSizes)["patientResults"];

    data = [].concat.apply([], data); // flattens into 1d array

    return this.httpService
      .post("http://localhost:5000/predict", data)
      .pipe(map(response => response.data))   
      .toPromise()
      .then(response => {
        return this.processAIPredictResponse(response);
      });
      */
  }


  async prepInitialTrainingData(recentExams) {
    let examResult: ExamResultInterface = {
      medicalExamID:"",
      questions: {}
    }
    for (let exam in recentExams) {
      for (let variable in recentExams[exam]) 
        if (variable != "date" && variable != "medicalExamID") {
          examResult["questions"][variable]  = recentExams[exam][variable]
        }
    }

    return examResult

    /*
    // ***************************************** //
    //  ***** Prepping for data processing ***** //
    // ***************************************** //
    const allLastFormResultsByPatient = await this.medicalExamService.getAllLastExamResultsByPatient();

    const formTemplates = await this.formTemplateService.find({
      frontendId: {
        $in: this.FRONTEND_IDS
      }
    });

    const keys = this.getAllQuestionKeys(formTemplates);
    const checkboxOptionsSizes = this.getAllCheckboxKeys(formTemplates);

    const initialResults = [];

    // ***************************************** //
    //  Big disgusting data cleaning starts here //
    // ***************************************** //

    allLastFormResultsByPatient.forEach(patientResults => {
      let currentPatientResults = [];
      let currentPatientDiagnostic = [];
      let currentPatientTreatments = [];

      const patientAnswers = this.prepPatientAnswerData(patientResults, keys, checkboxOptionsSizes);

      currentPatientResults = patientAnswers["patientResults"];
      currentPatientDiagnostic = patientAnswers["patientDiagnostic"];
      currentPatientTreatments = patientAnswers["patientTreatments"];

      currentPatientResults = [].concat.apply([], currentPatientResults); // flattens into 1d array
      currentPatientDiagnostic = [].concat.apply([], currentPatientDiagnostic); // flattens into 1d array
      currentPatientTreatments = [].concat.apply([], currentPatientTreatments); // flattens into 1d array

      // let's label the arrays so our data structure more human readable on the python end
      initialResults.push({
        diagnostic: currentPatientDiagnostic,
        results: currentPatientResults,
        treatments: currentPatientTreatments
      });
    });
      */
  }

  async trainAI() {
    // process the data
    /*
    const initialResults = await this.prepInitialTrainingData();
    // now let's send the cleaned data to python, which can process it even further
    const aiResults = this.httpService
      .post("http://localhost:5000/train", initialResults)
      .pipe(map(response => response.data));

    // was the training successful ?
    return aiResults;
  }

  async getTrainingData() {
    const formTemplates = await this.formTemplateService.find({
      frontendId: {
        $in: this.FRONTEND_IDS
      }
    });

    const initialResults = await this.prepInitialTrainingData();
    const lineArray = [];

    const keys = this.getAllQuestionKeys(formTemplates);
    const checkboxOptionsSizes = this.getAllCheckboxKeys(formTemplates);
    const idsWithOptions = [];

    keys.forEach((id, i) => {
      const ids = id.split("/");
      if (ids.length > 2) {
        const formNumber = ids[0];
        const questionId = ids.slice(2).join("/"); // ids without form id
        const cleanId = formNumber + "/" + questionId; // full id without section number

        if (cleanId in checkboxOptionsSizes) {
          // it's a checkbox
          for (let j = 0; j < checkboxOptionsSizes[cleanId]; j++) {
            idsWithOptions.push(cleanId + "-OPTION" + (j + 1)); // inserts
          }
        } else {
          idsWithOptions.push(cleanId);
        }
      }
    });
    idsWithOptions.push(this.DIAGNOSTIC_AND_TREATMENTS);

    lineArray.push("data:text/csv;charset=utf-8," + idsWithOptions.join(","));

    initialResults.forEach((results, index) => {
      results = results[this.RESULTS].concat(results[this.DIAGNOSTIC]).concat(results[this.TREATMENT]);
      const line = results.join(",");
      lineArray.push(line);
    });
    const csvContent = lineArray.join("\n");
    return csvContent;
    */
  }

  public processAIPredictResponse(response) {
    /*
    const diagnosis = response[this.DIAGNOSIS_RESULTS][0]; // 0 index because python sends a 2d array
    const treatments = response[this.TREATMENT_RESULTS][0] === undefined ? [] : response[this.TREATMENT_RESULTS][0];

    const right_atm_diagnosis = [];
    const left_atm_diagnosis = [];
    const douloureux_diagnosis = [];

    // rearrange diagnosis tables
    if (diagnosis !== null && diagnosis !== undefined) {
      diagnosis.forEach(recommendation => {
        if (recommendation !== null && recommendation !== undefined) {
          const splitRecommendation = recommendation.split(" ");
          // detect if douloureux type
          if (recommendation in this.DISORDER_NAMES[this.DOULOUREUX_DISEASES_ID]) {
            douloureux_diagnosis.push(recommendation);
            // detect if right side
          } else if (splitRecommendation.includes(this.RIGHT_SIDE)) {
            recommendation = recommendation.replace(this.RIGHT_SIDE, "");
            right_atm_diagnosis.push(recommendation);
            // detect if left side
          } else if (splitRecommendation.includes(this.LEFT_SIDE)) {
            recommendation = recommendation.replace(this.LEFT_SIDE, "");
            left_atm_diagnosis.push(recommendation);
          }
        }
      });
    }

    // store to return later
    const diagnosisList = [douloureux_diagnosis, right_atm_diagnosis, left_atm_diagnosis];

    const educationTherapeutiqueTreatments = [];
    const gestionComportementaleEtPsychologiqueTreatments = [];
    const therapiePharmacologiqueTreatments = [];
    const orthesesOcclusalesTreatments = [];
    const physiotherapieTreatments = [];
    const therapieOcclusaleTreatments = [];
    const injectionsTreatments = [];
    const abordChirurgicalDeLATM = [];

    // rearrange treatments tables, place each treatment in correct table by type
    if (treatments !== null && treatments !== undefined) {
      treatments.forEach(treatment => {
        if (this.TREATMENT_NAMES[this.TREATMENT_TYPES["Éducation thérapeutique"]].includes(treatment)) {
          educationTherapeutiqueTreatments.push(treatment);
        } else if (
          this.TREATMENT_NAMES[this.TREATMENT_TYPES["Gestion comportementale et psychologique"]].includes(treatment)
        ) {
          gestionComportementaleEtPsychologiqueTreatments.push(treatment);
        } else if (this.TREATMENT_NAMES[this.TREATMENT_TYPES["Thérapie pharmacologique"]].includes(treatment)) {
          therapiePharmacologiqueTreatments.push(treatment);
        } else if (this.TREATMENT_NAMES[this.TREATMENT_TYPES["Orthèses occlusales"]].includes(treatment)) {
          orthesesOcclusalesTreatments.push(treatment);
        } else if (this.TREATMENT_NAMES[this.TREATMENT_TYPES["Physiothérapie"]].includes(treatment)) {
          physiotherapieTreatments.push(treatment);
        } else if (this.TREATMENT_NAMES[this.TREATMENT_TYPES["Thérapie occlusale"]].includes(treatment)) {
          therapieOcclusaleTreatments.push(treatment);
        } else if (this.TREATMENT_NAMES[this.TREATMENT_TYPES["Injections"]].includes(treatment)) {
          injectionsTreatments.push(treatment);
        } else if (this.TREATMENT_NAMES[this.TREATMENT_TYPES["Abord chirurgical de l'ATM"]].includes(treatment)) {
          abordChirurgicalDeLATM.push(treatment);
        }
      });
    }

    // return as table of tables
    const treatmentList = [
      educationTherapeutiqueTreatments,
      gestionComportementaleEtPsychologiqueTreatments,
      therapiePharmacologiqueTreatments,
      therapieOcclusaleTreatments,
      physiotherapieTreatments,
      therapieOcclusaleTreatments,
      injectionsTreatments,
      abordChirurgicalDeLATM
    ];

    treatmentList.forEach(treatment => {
      if (treatment.length === 0) {
        treatment.push("Non");
      }
    });

    diagnosisList.forEach(diagnosis2 => {
      if (diagnosis2.length === 0) {
        diagnosis2.push("Non");
      }
    });

    response = [diagnosisList, treatmentList];

    return response;
    */
  }

  private getAllQuestionKeys(formTemplates) {
    /*
    let keys = [];
    formTemplates.forEach(template => {
      const currentKeys = this.getDeepKeysOfAllQuestions(template.form);

      currentKeys.forEach(key => {
        keys.push(template.frontendId + "/" + key);
      });
    });

    keys = [...new Set(keys)]; // removes duplicates from key traversal
    return keys;
    */
  }

  private getAllCheckboxKeys(formTemplates) {
    /*
    let checkboxOptionsSizes = [];
    formTemplates.forEach(template => {
      const allCheckboxKeys = this.getCheckboxOptionLengthsAndIds(template.form, template.frontendId);
      checkboxOptionsSizes.push(allCheckboxKeys);
    });

    checkboxOptionsSizes = checkboxOptionsSizes.reduce((acc, x) => {
      for (const key of Object.keys(x)) {
        acc[key] = x[key];
      }
      return acc;
    }, {}); // We have an array of objects and this converts it to one big object

    return checkboxOptionsSizes;
    */
  }

  private prepPatientAnswerData(patientAnswers, keys, checkboxOptionsSizes) {
    const currentPatientResults = [];
    const currentPatientDiagnostic = [];
    const currentPatientTreatments = [];
    keys.forEach(idKey => {
      const ids = idKey.split("/");
      if (ids.length > 1) {
        const formNumber = ids[0];
        const questionId = ids.slice(2).join("/"); // ids without form id

        const patientAnswersToCurrentForm = patientAnswers.find(answers => answers.formConfig === formNumber);
        let answer = null;
        if (patientAnswersToCurrentForm) {
          answer = this.getAnswerOfQuestionWithId(patientAnswersToCurrentForm.result, questionId);
        }

        if (answer instanceof Array && answer.length === 0) {
          answer = null; // just put null instead of [], easier for python
        }
        const cleanId = formNumber + "/" + questionId; // full id without section number
        // Push to appropriate table depending on source of answer
        if (cleanId === this.DISORDER__IDS[this.DOULOUREUX_DISEASE]) {
          // for each diagnostic or treatment, we have to replace the given key by the corresponding string value...
          if (answer !== null && answer !== undefined) {
            if (answer instanceof Array) {
              answer.forEach((element, index) => {
                answer[index] = this.DISORDER_NAMES[cleanId][answer[index]];
              });
            } else {
              answer = this.DISORDER_NAMES[cleanId][answer];
            }

            currentPatientDiagnostic.push(answer);
          }
        } else if (cleanId === this.DISORDER__IDS[this.LEFT_ATM]) {
          // do the same thing for ATM left disorders but specify it's on the left
          if (answer !== null && answer !== undefined) {
            if (answer instanceof Array) {
              answer.forEach((element, index) => {
                answer[index] = this.DISORDER_NAMES[cleanId][answer[index]] + " " + this.LEFT_SIDE;
              });
            } else {
              answer = this.DISORDER_NAMES[cleanId][answer] + " " + this.LEFT_SIDE;
            }

            currentPatientDiagnostic.push(answer);
          }
        } else if (cleanId === this.DISORDER__IDS[this.RIGHT_ATM]) {
          // do the same thing for ATM right disorders but specify it's on the right
          if (answer !== null && answer !== undefined) {
            if (answer instanceof Array) {
              answer.forEach((element, index) => {
                answer[index] = this.DISORDER_NAMES[cleanId][answer[index]] + " " + this.RIGHT_SIDE;
              });
            } else {
              answer = this.DISORDER_NAMES[cleanId][answer] + " " + this.RIGHT_SIDE;
            }
            currentPatientDiagnostic.push(answer);
          }
        } else if (this.TREATMENT_IDS[0].includes(cleanId)) {
          // do the same thing for treatments, but no need to specify the side
          if (answer !== null && answer !== undefined) {
            if (answer instanceof Array) {
              answer.forEach((element, index) => {
                answer[index] = this.TREATMENT_NAMES[cleanId][answer[index]];
              });
            } else {
              answer = this.TREATMENT_NAMES[cleanId][answer];
            }
          }
          if (answer !== null && answer !== undefined) {
            currentPatientTreatments.push(answer);
          } // ** SPECIAL CASE FOR CHECKBOX BUTTONS ** //
        } else {
          if (checkboxOptionsSizes[cleanId] !== undefined) {
            // detects checkboxes
            const checkboxOptionsSize = checkboxOptionsSizes[cleanId];
            // if no answer send -1
            const checkboxAnswers = new Array(+checkboxOptionsSize).fill(0); // prepare for one hot
            if (answer !== null && answer !== undefined && answer instanceof Array) {
              // some options were selected
              answer.forEach(selection => {
                checkboxAnswers[selection] = 1; // this means the option was selected
              });
            }
            answer = checkboxAnswers;
          } else if (this.TWO_FIELD_NUMERICAL_QUESTION_IDS[0].includes(cleanId)) {
            // it's a numerical question so we need two spaces
            if (answer === null) {
              answer = [NaN, NaN];
            }
          } else if (
            !this.TEXT_QUESTION_IDS[0].includes(cleanId) &&
            (typeof answer === "string" || answer instanceof String)
          ) {
            if (!isNaN(Number(answer))) {
              answer = Number(answer);
            }
          }
          currentPatientResults.push(answer === null ? NaN : answer); // -1 if no answer
        }
      }
    });

    return {
      patientDiagnostic: currentPatientDiagnostic,
      patientResults: currentPatientResults,
      patientTreatments: currentPatientTreatments
    };
  }

  private getCheckboxOptionLengthsAndIds(obj: any, formId: string) {
    let keys = this.getDeepKeysForCheckbox(obj);
    const result = {};
    keys = [...new Set(keys)]; // removes duplicates from key traversal
    keys = keys.filter((key: string) => {
      const separatedKey = key.split("/");
      // these are the keys that lead to a checkbox button
      return key.includes(this.CHECKBOX) && separatedKey[separatedKey.length - 1] !== this.CHECKBOX;
    });

    keys.forEach((key, i) => {
      let separatedKey = key.split("/");
      separatedKey = separatedKey.filter((id: string) => {
        return id.match(/^([A-Z][0-9]*|[0-9]+)$/); // remove random junk
      });
      separatedKey.splice(0, 1); // remove the 1st id because it's the section so we don't need it
      const numberOfOptions = separatedKey.pop(); // finally, we know how many options in the checkbox question!!!
      // let's store in a dict for easier access later:
      result[formId + "/" + separatedKey.join("/")] = numberOfOptions;
    });
    return result;
  }

  // specific intermediate function for getting keys of checkbox buttons
  private getDeepKeysForCheckbox(obj) {
    let keys = [];
    if (!obj) {
      return keys;
    }
    for (const key of Object.keys(obj)) {
      keys.push(key);
      if (typeof obj[key] === "object") {
        const subkeys = this.getDeepKeysForCheckbox(obj[key]);
        keys = keys.concat(
          subkeys.map(subkey => {
            if (key === this.CHECKBOX) {
              return key + "/" + obj[key].length;
            } else {
              return key + "/" + subkey;
            }
          })
        );
      }
    }
    return keys;
  }
  // gets the keys from the questions, such as 1/1/1 (i.e. form 1, question 1, subquestion 1)
  private getDeepKeysOfAllQuestions(obj: any): string[] {
    let keys = [];
    if (!obj) {
      return keys;
    }
    for (const key of Object.keys(obj)) {
      if (key.match(/^([A-Z][0-9]*|[0-9]+)$/)) {
        keys.push(key);
      }

      if (typeof obj[key] === "object" && !(obj[key] instanceof Array)) {
        const subkeys = this.getDeepKeysOfAllQuestions(obj[key]);
        keys = keys.concat(
          subkeys.map(subkey => {
            if (key.match(/^([A-Z][0-9]*|[0-9]+)$/)) {
              return key + "/" + subkey;
            } else {
              return subkey;
            }
          })
        );
      }
    }

    return keys;
  }

  // reads answer from form given key
  private getAnswerOfQuestionWithId(formAnswers: any, fullId: string): any {
    if (formAnswers === null || formAnswers === undefined) {
      return null;
    }
    const ids = fullId.split("/");

    let index = 0;
    for (const id of ids) {
      if (formAnswers[id] !== null && formAnswers[id] !== undefined) {
        if (index === ids.length - 1 && (formAnswers[id] instanceof Array || !(formAnswers[id] instanceof Object))) {
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

  // ** ONLY USE THIS FOR DEBUGGING / GENERATING REPORTS ** //
  async testAI() {
    const results = this.trainAI();

    return results;
  }
}
