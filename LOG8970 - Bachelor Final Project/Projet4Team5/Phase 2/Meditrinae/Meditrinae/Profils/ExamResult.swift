//
//  ExamResult.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-18.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class ExamResult {
    
    var medicalExamID: String!
    var examResultID: String!
    var listQuestionnaire: ListQuestionnaires!
    
    init() {
        self.medicalExamID = ""
        self.listQuestionnaire = initialiseQuestionnaires()
    }
    
    init(medicalExamID: String) {
         self.medicalExamID = medicalExamID
         self.listQuestionnaire = initialiseQuestionnaires()
    }
    
    init(medicalExamID: String, questions: ListQuestionnaires) {
        self.medicalExamID = medicalExamID
        self.listQuestionnaire = questions
    }
    
    func initialiseQuestionnaires() -> ListQuestionnaires?{
        
        var questionnaires = [String : Questionnaire]()
        questionnaires["OBC"] = buildQuestionnaireOBC()
        questionnaires["DD"] = buildQuestionnaireDepistageDouleur()
        questionnaires["QS"] = buildQuestionnaireSymptomes()
        questionnaires["GAD7"] = buildQuestionnaireGAD7()
        questionnaires["PHQ9"] = buildQuestionnairePHQ9()
        questionnaires["PHQ4"] = buildQuestionnairePHQ4()
        questionnaires["ELFMAN20"] = buildQuestionnaireELFMan20()
        questionnaires["ELFMAN8"] = buildQuestionnaireELFMan8()
        questionnaires["GCPS"] = buildQuestionnaireGCPS()
        questionnaires["MORPHO"] = buildQuestionnaireMorphologie()
        questionnaires["DEMO"] = buildQuestionnaireDemographics()
        questionnaires["SS"] = buildQuestionnaireSS()
        questionnaires["IS"] = buildQuestionnairesIS()
        questionnaires["FDI"] = buildFDIQuestionnaire()
        
        return ListQuestionnaires(questionnaires: questionnaires)
        
    }
    
    func buildQuestionnairesIS() -> Questionnaire {
         let questionList = [
        Question(text: "Difficulté à s'endormir", answer: AnswerRangeInt(min: 0, max: 4), ID: "IS1"),
        Question(text: "Difficulté à rester endormi", answer: AnswerRangeInt(min: 0, max: 4), ID: "IS2"),
        Question(text: "Problèmes se réveiller trop tôt", answer: AnswerRangeInt(min: 0, max: 4), ID: "IS3"),
        Question(text: "Comment satisfait / insatisfait êtes-vous avec votre sommeil actuel", answer: AnswerRangeInt(min: 0, max: 4), ID: "IS4"),
        Question(text: "Dans quelle mesure pensez-vous que votre problème de sommeil est susceptible de nuire à la qualité de votre vie", answer: AnswerRangeInt(min: 0, max: 4), ID: "IS5"),
        Question(text: "A quel point êtes-vous inquiet / déçu par votre problème de sommeil actuel?", answer: AnswerRangeInt(min: 0, max: 4), ID: "IS6"),
        Question(text: "Présentement, dans quelle mesure considérez-vous que votre problème de sommeil interfère avec dans votre fonctionnement quotidien (par exemple: votre fatigue, humeur, capacité de fonctionner au travail / tâches quotidiennes, concentration, mémoire, humeur, etc.)", answer: AnswerRangeInt(min: 0, max: 4), ID: "IS7")
        ]
        return Questionnaire(name: "Insomnia Severity Index", ID: "IS", questions: questionList, maxScore: 28)
    }
    
    func buildQuestionnaireSS() -> Questionnaire {
        let questionList = [
        Question(text: "Assis et lecture", answer: AnswerRangeInt(min: 0, max: 3), ID: "SS1"),
        Question(text: "Regarder la télévision", answer: AnswerRangeInt(min: 0, max: 3), ID: "SS2"),
        Question(text: "Assis, inactif dans un lieu public (par exemple un théâtre ou une réunion", answer: AnswerRangeInt(min: 0, max: 3), ID: "SS3"),
        Question(text: "En tant que passager dans une voiture pendant une heure sans pause", answer: AnswerRangeInt(min: 0, max: 3), ID: "SS4"),
        Question(text: "Allongé pour se reposer l'après-midi lorsque les circonstances le permettent", answer: AnswerRangeInt(min: 0, max: 3), ID: "SS5"),
        Question(text: "S'asseoir et parler à quelqu'un", answer: AnswerRangeInt(min: 0, max: 3), ID: "SS6"),
        Question(text: "Assis tranquillement après un déjeuner sans alcool", answer: AnswerRangeInt(min: 0, max: 3), ID: "SS7"),
        Question(text: "Dans une voiture, tout en étant arrêté pendant quelques minutes dans la circulation", answer: AnswerRangeInt(min: 0, max: 3), ID: "SS8")
        ]
        
        return Questionnaire(name: "Epworth Sleepiness Scale", ID: "SS", description: " Quelle est la probabilité que vous dormiez ou dormiez dans les situations suivantes, contrairement à ce que vous êtes seulement fatigué?", questions: questionList, maxScore: 24)
    }
    
    func buildQuestionnaireOBC()-> Questionnaire {
        let questionList = [
            Question(text: "Serrer ou grincer des dents en dormant",answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["Jamais", "1 Nuit/mois", "1-3 Nuit/mois", "1-3 Nuit/semaine", "4-7 Nuit/semaine"]), ID: "OBC1"),
            Question(text: "Dormir dans une position qui fait pression sur la mâchoire ",answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["Jamais", "1 Nuit/mois", "1-3 Nuit/mois", "1-3 Nuit/semaine", "4-7 Nuit/semaine"]), ID: "OBC2"),
            Question(text: "Grincer des dents durant les heures d’éveil", answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC3"),
            Question(text: "Serrer les dents durant les heures d’éveil", answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC4"),
            Question(text: "Serrer, toucher ou garder les dents ensemble quand vous ne mangez pas", answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC5"),
            Question(text: "Tenir, crisper ou contracter les muscles sans serrer ou rapprocher les dents ensemble", answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC6"),
            Question(text: "Tenir ou déplacer la mâchoire vers l'avant ou sur le côté", answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC7"),
            Question(text: "Presser la langue avec force contre les dents", answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC8"),
            Question(text: "Placer la langue entre les dents", answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC9"),
            Question(text: "Mordre, mordiller ou jouer avec votre langue, vos joues et vos lèvres", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC10"),
            Question(text: "Tenir la mâchoire dans une position rigide ou tendue comme pour supporter ou protéger la mâchoire", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC11"),
            Question(text: "Tenir entre les dents ou mordre des objets tels que cheveux, pipe, crayon, stylo, doigts, ongles, etc.", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC12"),
            Question(text: "Utiliser de la gomme à mâcher", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC13"),
            Question(text: "Jouer d'un instrument de musique qui requiert l'usage de la bouche ou de la mâchoire (par exemple, bois, cuivre, instruments à corde)", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC14"),
            Question(text: "Mettre votre main sur la mâchoire en formant un creux pour appuyer le menton dans votre main", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC15"),
            Question(text: "Mâcher les aliments d'un côté seulement", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC16"),
            Question(text: "Manger entre les repas (des aliments qui demandent à être mastiqués)", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC17"),
            Question(text: "Parler sans arrêt (par exemple, enseigner, faire de la vente, service à la clientèle)", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC18"),
            Question(text: "Chanter", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC19"),
            Question(text: "Bâiller", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC20"),
            Question(text: "Tenir le téléphone entre votre tête et votre épaule", answer: AnswerMultipleChoices(answerCount: 4, possibleValues: ["Jamais", "Un peu de temps", "Une partie du temps", "La pluspart du temps", "Tout le temps"]), ID: "OBC21")
        ]
        return Questionnaire(name: "OBC - Inventaire des habitudes orales", ID: "OBC", description: "En vous basant sur le dernier mois, à quelle fréquence faites vous chacune des activités suivantes ? Si la fréquence d’une activité varie, choisissez l’option la plus élevée.",
                             questions: questionList)
    }
    
    func buildQuestionnaireDepistageDouleur()-> Questionnaire {
        let questionList = [
            Question(text: "Combien de temps a duré toute douleur à votre mâchoire ou à la tempe, d’un côté ou de l’autre?",answer: AnswerMultipleChoices(answerCount: 3, possibleValues:["Aucune douleur", "La douleur apparait et disparait", "Douleur toujours présente"]), ID: "DD1"),
            Question(text: "Avez-vous eu de la douleur ou une raideur à la mâchoire au réveil?", answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID : "DD2"),
            Question(text: "Est-ce que les activités suivantes ont modifié (amélioré ou aggravé) toute douleur à la mâchoire ou à la tempe d’un côté ou de l’autre?", answer:
                [
                    Question(text: "Mastiquer des aliments durs ou coriaces.",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "DD3A"),
                    Question(text: "Ouvrir votre bouche ou bouger votre mâchoire vers l'avant ou sur le côté.",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "DD3B"),
                    Question(text: "Garder les dents ensemble, serrer, grincer des dents, ou mâcher du chewing-gum",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "DD3C"),
                    Question(text: "Parler, embrasser ou bâiller.", answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID : "DD3D")
                    
                ])
        ]
        let depistageDouleur = Questionnaire(name: "Questionnaire Dépistage Douleur",ID: "DD",description: "Au cours de 30 derniers jours : ",questions: questionList)
        return depistageDouleur
    }
    
    func buildQuestionnaireSymptomes()-> Questionnaire {
        let q5 = Question(text: "Au cours des 30 derniers jours, avez-vous eu des maux de tête qui comprenaient la région de la tempe?",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:  ["Non", "Oui"]), ID: "QS5")
        let q2 = Question(text: "Il y a combien de mois qu’a commencé pour la première fois votre douleur à la mâchoire, à la tempe, à l’intérieur de l'oreille ou devant l'oreille?",answer:AnswerInput(answerCount: 2, type: Int.self, placeHolder: "Nombre de mois"), ID: "QS2")
        
        let q3 = Question(text: "Au cours des 30 derniers jours, qu’est-ce qui décrit le mieux toute douleur à votre mâchoire, à la tempe, à l’intérieur de l'oreille ou devant l'oreille, d’un côté ou de l’autre? Choisissez UNE réponse",answer: AnswerMultipleChoices(answerCount: 3, possibleValues:["Aucune douleur", "Douleur qui vient et part", "Douleur toujours présente"]), ID: "QS3")
        
        let q4 = Question(text: "Au cours des 30 derniers jours, est-ce que les activités suivantes ont modifié (c’est-à-dire amélioré ou aggravé) toute douleur à votre mâchoire, à la tempe, à l’intérieur de l'oreille ou devant l'oreille, d’un côté ou de l’autre?", answer:[
            Question(text: "Mastiquer des aliments durs ou coriaces",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS4A"),
            Question(text: "Ouvrir votre bouche ou déplacer votre mâchoire vers l'avant ou de côté",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS4B"),
            Question(text: "Habitudes de la mâchoire tel que tenir les dents ensemble, serrer/grincer des dents, ou mâcher de la gomme",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS4C"),
            Question(text: "Autres activités de la mâchoire tel que parler, embrasser ou bâiller",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS4D")
            ])
        let q10 = Question(text: "Est-ce que le blocage, même pour un instant, a été suffisamment grave pour limiter votre ouverture de bouche et interférer avec votre habileté à manger?",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS10")
        
        let q12 =  Question(text: "Est-ce que votre mâchoire est actuellement  bloquée ou limitée de sorte à ne pas pouvoir ouvrir AU COMPLET?",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS12")
        
        
        let q11 = Question(text: "Au cours des 30 derniers jours, est-ce que votre mâchoire a bloqué pour ne pas pouvoir ouvrir COMPLÈTEMENT, même un instant, pour ensuite débloquer et pouvoir ouvrir AU COMPLET?",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS11")
        

        
        
        let questionList = [
            Question(text: "DOULEUR", answer:[
                Question(text: "Avez-vous déjà eu de la douleur à la mâchoire, à la tempe, à l’intérieur de l'oreille ou devant l'oreille, d’un côté ou de l’autre?",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS1", skip: [q2, q3, q4], skipValue: "Non"),
                q2,
                q3
                ]),
            q4,
            Question(text: "MAUX DE TÊTE", answer:[
                q5,
                Question(text: "Depuis combien de mois est-ce que vos maux de tête à la tempe ont commencé pour la première fois?",answer: AnswerInput(answerCount: 2, type: Int.self), ID: "QS6"),
                Question(text: "Au cours des 30 derniers jours, est-ce que les activités suivantes ont modifié (c’est-à-dire amélioré ou aggravé) tout maux de tête dans la région de la tempe d’un côté ou de l’autre?",answer:  [Question(text: "Mastiquer des aliments durs ou coriaces",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS7A"),
                                                                                                                                                                                                                                                             Question(text: "Ouvrir votre bouche ou déplacer votre mâchoire vers l'avant ou de côté",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS7B"),
                                                                                                                                                                                                                                                             Question(text: "Habitudes de la mâchoire tel que tenir les dents ensemble, serrer/grincer des dents, ou mâcher de la gomme",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS7C"),
                                                                                                                                                                                                                                                             Question(text: "Autres activités de la mâchoire tel que parler, embrasser ou bâiller",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS7D")
                    ])
                ]),
            Question(text: "BRUITS ARTICULAIRES", answer:[
                Question(text: "Au cours des 30 derniers jours, avez-vous eu n’importe quel bruit articulaire en bougeant ou utilisant la mâchoire?",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS8")]),
            Question(text: "BLOCAGE FERMÉ DE LA MÂCHOIRE", answer:[
                Question(text: "Avez-vous déjà eu la mâchoire bloquée ou coincée, même pour un instant, de sorte à ne pas pouvoir ouvrir AU COMPLET?",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS9"),
            q10,
            q11,
            q12]),
            Question(text: "BLOCAGE OUVERT DE LA MÂCHOIRE", answer:[
                Question(text: "Au cours des 30 derniers jours, est-ce que votre mâchoire a bloqué ou coincé en ouvrant la bouche toute grande, même un instant, de sorte à ne pas pouvoir fermer à partir de cette position grande ouverte?",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS13"),
                Question(text: "Au cours des 30 derniers jours, lorsque votre mâchoire était bloquée ou coincée grande ouverte, avez-vous eu à faire quelque chose pour fermer tel que la mettre au repos, la bouger, la pousser ou la manipuler?",answer: AnswerMultipleChoices(answerCount: 2, possibleValues:["Oui", "Non"]), ID: "QS14")])
        ]
        return Questionnaire(name: "Questionnaire des symptômes de DTM", ID: "QS", questions: questionList)
    }
    
    
    func buildQuestionnaireGAD7()-> Questionnaire {
        let questionList = [
            Question(text: "Être nerveux(se), anxieux(se) ou avoir les nerfs à vif",answer: AnswerRangeInt(min: 0, max: 3), ID: "GAD1"),
            Question(text: "Être incapable de cesser de m’inquiéter ou de contrôler mes inquiétudes",answer: AnswerRangeInt(min: 0, max: 3), ID: "GAD2"),
            Question(text: "Trop m’inquiéter avec différentes choses", answer: AnswerRangeInt(min: 0, max: 3), ID: "GAD3"),
            Question(text: "Avoir de la difficulté à relaxer", answer: AnswerRangeInt(min: 0, max: 3), ID: "GAD4"),
            Question(text: "Être si énervé(e) qu’il est difficile de rester en place", answer: AnswerRangeInt(min: 0, max: 3), ID: "GAD5"),
            Question(text: "Être facilement dérangé(e) ou irritable", answer: AnswerRangeInt(min: 0, max: 3), ID: "GAD6"),
            Question(text: "Avoir peur comme si quelque chose de terrible allait arriver", answer: AnswerRangeInt(min: 0, max: 3), ID: "GAD7")
        ]
        return Questionnaire(name: "GAD7 - Troubles Anxieux Généralisés", ID: "GAD7", description: " Au cours des 2 dernières semaines, à quelle fréquence avez-vous été ennuyé(e) par les problèmes suivants?", questions: questionList, maxScore: 28)
    }
    
    func buildQuestionnairePHQ9()-> Questionnaire {
        let questionList = [
            Question(text: "Avoir de la difficulté à vous endormir, à garder le sommeil, ou trop dormir", answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ91"),
            Question(text: "Être fatigué ou avoir peu d'énergie",answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ92"),
            Question(text: "Avoir peu d'appétit ou trop manger", answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ93"),
            Question(text: "Être mal dans ma peau – ou penser avoir échoué ou m’être laissé aller ou avoir laissé tomber ma famille", answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ94"),
            Question(text: "Avoir de la difficulté à me concentrer tel qu’en lisant le journal ou en regardant la télévision", answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ95"),
            Question(text: "Bouger ou parler si lentement que les autres l'ont remarqué. Ou au contraire – être tellement agité(e) ou hyperactif(ve) au point de bouger beaucoup plus qu'à l'habitude",answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ96"),
            Question(text: "Penser que je serais mieux mort(e) ou songer à me faire du mal d'une façon ou d'une autre", answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ97")
        ]
        return Questionnaire(name: "PHQ9 - Questionnaire sur la Santé du Patient", ID: "PHQ9", description: " Au cours des 2 dernières semaines, à quel point avez-vous été ennuyé(e) par n'importe quel des problèmes suivants?", questions: questionList, maxScore: 27)
    }
    
    func buildQuestionnairePHQ4()-> Questionnaire {
        let questionList = [
            Question(text: "Être nerveux(se), anxieux(se) ou avoir les nerfs à vif",answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ41"),
            Question(text: "Être incapable de cesser de m’inquiéter ou de contrôler mes inquiétudes",answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ42"),
            Question(text: "Avoir peu d'intérêt ou de plaisir à faire des choses", answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ43"),
            Question(text: "Être triste, déprimé(e), ou désespéré(e)", answer: AnswerRangeInt(min: 0, max: 3), ID: "PHQ44")
        ]
        return Questionnaire(name: "PHQ4 - Questionnaire sur la Santé du Patient", ID: "PHQ4", description: "Au cours des 6 dernières semaines, à quel point avez-vous été ennuyé par les problèmes suivants ?",questions: questionList, maxScore: 12)
    }

    func buildQuestionnairePHQ15()-> Questionnaire {
        let questionList = [
            Question(text: "Douleur à l'estomac",answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ151"),
            Question(text: "Douleur au dos", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ152"),
            Question(text: "Douleur aux bras, aux jambes ou aux articulations (genoux, hanches, etc.)", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ153"),
            Question(text: "Douleur menstruelles ou autres problèmes reliés à votre cycle menstruel (femmes seulement)", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ154"),
            Question(text: "Maux de tête", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ155"),
            Question(text: "Douleur à la poitrine", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ156"),
            Question(text: "Étourdissements", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ157"),
            Question(text: "Évanouissements", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ158"),
            Question(text: "Senter vitre coeur battre fort ou très vite", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ159"),
            Question(text: "Essoufflement", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ1510"),
            Question(text: "Douleur ou problèmes lors des relations sexuelles", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ1511"),
            Question(text: "Constipation, selles molles ou diarrhée", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ1512"),
            Question(text: "Nausées, flatulences ou indigestion", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ1513"),
            Question(text: "Sensation de fatigue ou avoir peu d'énergie", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ1514"),
            Question(text: "Problèmes de sommeil", answer: AnswerRangeInt(min: 0, max: 2), ID: "PHQ1515")
        ]
        return Questionnaire(name: "PHQ15 - Questionnaire sur la Santé du Patient", ID: "PHQ15", description: " Au cours des 4 dernières semaines, à quel point avez-vous été ennuyé(e) par n'importe quel des problèmes suivants?",questions: questionList)
    }
    
    func buildQuestionnaireELFMan20()-> Questionnaire {
        let questionList = [
            Question(text: "Mastiquer du pain dur",answer: AnswerRangeInt(min: 0, max: 10), ID: "FM201"),
            Question(text: "Mastiquer des biscottes",answer: AnswerRangeInt(min: 0, max: 10), ID: "FM202"),
            Question(text: "Mastiquer des aliments mous (Ex.: macaronis, fruits mous ou en conserve, légumes cuits, puisson)", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM203"),
            Question(text: "Ouvrir assez grand pour mordre dans une pomme entière", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM204"),
            Question(text: "Ouvrir assez grand pour mordre dans un sandwich", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM205"),
            Question(text: "Ouvrir assez grand pour parler", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM206"),
            Question(text: "Chanter", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM207"),
            Question(text: "Avoir un visage heureux", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM208"),
            Question(text: "Avoir un visage fâché", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM209"),
            Question(text: "Froncer les sourcils", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM2010"),
            Question(text: "Embrasser", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM2011"),
            Question(text: "Rire", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM2012")
        ]
        return Questionnaire(name: "JFLS20 - Échelle de limitation de fonctionelle de la mandibulle", ID: "ELFMAN20", description: " Pour chaque énoncé ci-dessous, svp indiquez le niveau de limitation durant le dernier mois. Si une action est complètement évitée parce que trop difficile, choisissez l'option la plus élevée.",questions: questionList, maxScore: 170)
    }
    
    func buildQuestionnaireELFMan8()-> Questionnaire {
        let questionList = [
            Question(text: "Mastiquer des aliments coriaces",answer: AnswerRangeInt(min: 0, max: 10), ID: "FM81"),
            Question(text: "Mastiquer du poulet (Ex.: cuit au four)",answer: AnswerRangeInt(min: 0, max: 10), ID: "FM82"),
            Question(text: "Manger des aliments mous qui n’ont pas à être mastiqués (Ex.: pommes de terre pilées, compote de pommes, pouding, aliments en purée)", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM83"),
            Question(text: "Ouvrir assez grand pour boire avec une tasse", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM84"),
            Question(text: "Avaler", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM85"),
            Question(text: "Bâiller", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM86"),
            Question(text: "Parler", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM87"),
            Question(text: "Sourire", answer: AnswerRangeInt(min: 0, max: 10), ID: "FM88")
        ]
        return Questionnaire(name: "JFLS8 - Échelle de limitation fonctionnelle de la mandibule", ID: "ELFMAN8", description: " Pour chaque énoncé ci-dessous, svp indiquez le niveau de limitation durant le dernier mois. Si une action est complètement évitée parce que trop difficile, choisissez l'option la plus élevée.", questions: questionList, maxScore: 80)
    }
    
    func buildQuestionnaireGCPS()-> Questionnaire {
        let questionList = [
            Question(text: "Au cours de ces 6 derniers mois, combien de jours avez-vous eu des douleurs au visage ?",answer: AnswerInput(answerCount: 1, type: Int.self), ID: "DC1"),
            Question(text: "Comment évaluez-vous votre douleur au visage actuellement ?",answer: AnswerRangeInt(min: 0, max: 10), ID: "DC2"),
            Question(text: "Au cours des 30 DERNIERS JOURS, comment évaluez-vous votre PIRE douleur au visage ?", answer: AnswerRangeInt(min: 0, max: 10), ID: "DC3"),
            Question(text: "Au cours des 30 DERNIERS JOURS, EN MOYENNE, comment évaluez-vous votre douleur au visage ?", answer: AnswerRangeInt(min: 0, max: 10), ID: "DC4"),
            Question(text: "Au cours des 30 DERNIERS JOURS, combien de jours votre douleur au visage vous a-t-elle empêché de faire vos ACTIVITÉS NORMALES telles que travailler, aller è l'école ou faire des travaux domestiques ?", answer: AnswerInput(answerCount: 1, type: Int.self), ID: "DC5"),
            Question(text: "Au cours des 30 DERNIERS JOURS, jusqu'à quel point votre douleur au visage a-t-elle interféré avec vos ACTIVITÉ QUOTIDIENNE ?", answer: AnswerRangeInt(min: 0, max: 10), ID: "DC6"),
            Question(text: "Au cours des 30 DERNIERS JOURS, jusqu'à quel point votre douleur au visage a-t-elle interféré avec VOS LOISIR, VOS ACTIVITÉS SOCIALES ET FAMILIALES ?", answer: AnswerRangeInt(min: 0, max: 10), ID: "DC7"),
            Question(text: "Au cours des 30 DERNIERS JOURS, jusqu’à quel point votre douleur au visage a-t-elle interféré avec VOTRE CAPACITÉ À TRAVAILLER, y compris les travaux domestiques ?", answer: AnswerRangeInt(min: 0, max: 10), ID: "DC8")
        ]
        return Questionnaire(name: "GCPS - Échelle graduée de douleur chronique", ID: "GCPS",questions: questionList, maxScore: 80)
    }
    
    func buildQuestionnaireMorphologie()-> Questionnaire {
        let questionList = [
            Question(text: "Au cours de ces 6 derniers mois, combien de jours avez-vous eu des douleurs au visage ?",answer: AnswerInput(answerCount: 1, type: Int.self), ID: "MD1")
        ]
        return Questionnaire(name: "Morphologie de la Douleur", ID: "MORPHO", questions: questionList, headPreName: "MD", maxScore: 5)
    }
    
    func buildQuestionnaireDemographics()-> Questionnaire {
        let questionList = [
            Question(text: "Quel est votre état civil actuel ?",  answer: AnswerMultipleChoices(answerCount: 6, possibleValues:["Marié(e)", "Séparé(e)", "Conjoint(e) de fait", "Veuf / veuve", "Divorcé(e)", "Jamais marié(e)"]), ID: "DEMO1"),
             Question(text: "Quel est votre lieu de naissance (pays et département, si applicable) ?",  answer: AnswerInput(answerCount: 1, type: String.self), ID: "DEMO2"),
                       
            Question(text: "Quelle est votre catégorie socioprofessionnelle ?",  answer: AnswerMultipleChoices(answerCount: 13, possibleValues:["Agriculteurs exploitants", "Artisans, commerçants et chefs d'entreprise", "Professions libérales et assimilés", "Cadres d'entreprise", "Professions intermédiaires de l'enseignement, de la santé, de la fonction publique et asimilés", "Professions intermédiaires administratives et commerciales des entreprises", "Techniciens", "Contremaître, agents de maîtrise", "Employés", "Ouvriers", "Retraités", "Autres personnes sans activité professionnelle"]), ID: "DEMO3"),
            
            Question(text: "Quel est le plus haut niveau de scolarité que vous avez complété?",  answer: AnswerMultipleChoices(answerCount: 4, possibleValues:["CAP BEP", "Baccalauréat", "Universitaire premier cycle", "Universitaire 2e ou 3e cycle"]), ID: "DEMO4")
        ]
        return Questionnaire(name: "Données Démographiques",ID: "DEMO",questions: questionList)
    }
    
    func buildDataDiagnostic()-> Questionnaire {

        let q1 = Question(text: "Aucun (en santé)", answer: "N", ID: "E11_NO", intID: 1)
        let q2 = Question(text: "Myalgie Masseter Droit", answer: "N", ID: "E11_MY_M_D", intID: 2712)
        let q3 = Question(text: "Myalgie Masseter Gauche", answer: "N", ID: "E11_MY_M_G", intID: 2713)
        let q4 = Question(text: "Myalgie Temporal Droit", answer: "N", ID: "E11_MY_T_D", intID: 2812)
        let q5 = Question(text: "Myalgie Temporal Gauche", answer: "N", ID: "E11_MY_T_G", intID: 2813)
        let q6 = Question(text: "Myalgie Pterigoidien Medial Droit", answer: "N", ID: "E11_MY_P_D", intID: 2912)
        let q7 = Question(text: "Myalgie Pterigoidien Medial Gauche", answer: "N", ID: "E11_MY_P_G", intID: 2913)
        let q8 = Question(text: "Myalgie Digastrique Droit", answer: "N", ID: "E11_MY_D_D", intID: 21012)
        let q9 = Question(text: "Myalgie Digastrique Gauche", answer: "N", ID: "E11_MY_D_G", intID: 21013)
        let q10 = Question(text: "Douleur Myofasciale Réf Masseter Droit", answer: "N", ID: "E11_MYO_M_D", intID: 3712)
        let q11 = Question(text: "Douleur Myofasciale Réf Masseter Gauche", answer: "N", ID: "E11_MYO_M_G", intID: 3713)
        let q12 = Question(text: "Douleur Myofasciale Réf Temporal Droit", answer: "N", ID: "E11_MYO_T_D", intID: 3812)
        let q13 = Question(text: "Douleur Myofasciale Réf Temporal Gauche", answer: "N", ID: "E11_MYO_T_G", intID: 3813)
        let q14 = Question(text: "Douleur Myofasciale Réf Pterigoidien Medial Droit", answer: "N", ID: "E11_MYO_M_D", intID: 3912)
        let q15 = Question(text: "Douleur Myofasciale Réf Pterigoidien Medial Gauche", answer: "N", ID: "E11_MYO_M_G", intID: 3913)
        let q16 = Question(text: "Douleur Myofasciale Réf Digastrique Droit", answer: "N", ID: "E11_MYO_D_D", intID: 31012)
        let q17 = Question(text: "ouleur Myofasciale Réf Digastrique Gauche", answer: "N", ID: "E11_MYO_D_G", intID: 31013)
        let q18 = Question(text: "Arthralgie droite", answer: "N", ID: "E11_AD", intID: 4)
        let q19 = Question(text: "Arthralgie gauche", answer: "N", ID: "E11_AG", intID: 5)
        let q20 = Question(text: "Maux de tête attribués à DTM", answer: "N", ID: "E11_MTAD", intID: 6)
        
        let listQuestions: [Question] = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20]
        
        let questionnaire = Questionnaire(name: "Diagnostic",ID: "DIA" , questions: listQuestions)
        
        return questionnaire
    }
    
    func buildDataTraitement()-> Questionnaire {
        let q1 = Question(text: "Education thérapeutique", answer: "N", ID: "E13_ET", intID: 7)
        let q2 = Question(text: "Kinésithérapie (physiothérapie)", answer: "N", ID: "E13_KIN", intID: 8)
        let q3 = Question(text: "Orthèse occlusale", answer: "N", ID: "E13_OO", intID: 9)
        let q4 = Question(text: "Thérapies cognitives et comportementales (TCC)", answer: "N", ID: "E13_TCC", intID: 10)
        let q5 = Question(text: "Hypnose", answer: "N", ID: "E13_HYP", intID: 11)
        let q6 = Question(text: "Traitement pharmocologique", answer: "N", ID: "E13_TP", intID: 12)
        let q7 = Question(text: "Toxine Botulique", answer: "N", ID: "E13_TB", intID: 13)
        let q8 = Question(text: "Physchothérapie", answer: "N", ID: "E13_PSY", intID: 14)
        
        let listQuestions: [Question] = [q1, q2, q3, q4, q5, q6, q7, q8]
        let questionnaire = Questionnaire(name: "Traitement",ID: "TRAI", questions: listQuestions)
    
        return questionnaire
    }
    
    func buildQuesitonnaireIDS() -> [optionsID] {
        let ids = [1,2,3,4,5,6,7,8,9,10,11,12,13]
        let quesitonnaires = ["DEMO", "DD", "QS", "MORPHO", "PHQ4", "PHQ9", "ELFMAN8", "ELFMAN20", "GCPS", "GAD7", "OBC"]
        let optionID = optionsID(ids: ids, strings: quesitonnaires)
        
        return [optionID]
    }
    
    func buildFDIQuestionnaire() -> Questionnaire{
        
        let q1 = Question(text: "", answer: "N", ID: "E1B_D")
        let q2 = Question(text: "", answer: "N", ID: "E1B_G")
        let q3 = Question(text: "", answer: "N" , ID:"E2NEG_H")
        let q4 = Question(text: "", answer: "N", ID:"E2NEG_V")
        let q5 = Question(text: "", answer: "NA", ID: "E2DIST_H")
        let q6 = Question(text: "", answer: "NA", ID: "E2DIST_V")
        let q7 = Question(text: "", answer: "NA", ID: "E2DIST_MEDIA")
        let q8 = Question(text: "", answer: "NA", ID: "E2DEVIA_MEDIA")
        let q9 = Question(text: "", answer: "N", ID: "E31")
        let q10 = Question(text: "", answer: "N", ID: "E4A")
        let q11 = Question(text: "", answer: "N", ID: "E4D")
        let q12 = Question(text: "", answer: "N", ID: "E5D")
        let q13 = Question(text: "", answer: "N", ID: "E6_CRAQ_OUV_D")
        let q14 = Question(text: "", answer: "N", ID: "E6_CRAQ_FERM_D")
        let q15 = Question(text: "", answer: "N", ID: "E6_CRAQ_PAT_D")
        let q16 = Question(text: "", answer: "N", ID: "E6_CRAQ_DOUL_D")
        let q17 = Question(text: "", answer: "N", ID: "E6_CRAQ_DOUL_HAB_D")
        
        let q18 = Question(text: "", answer: "N", ID: "E6_CREP_OUV_D")
        let q19 = Question(text: "", answer: "N", ID: "E6_CREP_FERM_D")
        let q20 = Question(text: "", answer: "N", ID: "E6_CREP_PAT_D")
        let q21 = Question(text: "", answer: "N", ID: "E6_CREP_DOUL_D")
        let q22 = Question(text: "", answer: "N", ID: "E6_CREP_DOU_HAB_D")
             
        let q23 = Question(text: "", answer: "N", ID: "E6_CRAQ_OUV_G")
        let q24 = Question(text: "", answer: "N", ID: "E6_CRAQ_FERM_G")
        let q25 = Question(text: "", answer: "N", ID: "E6_CRAQ_PAT_G")
        let q26 = Question(text: "", answer: "N", ID: "E6_CRAQ_DOUL_G")
        let q27 = Question(text: "", answer: "N", ID: "E6_CRAQ_DOUL_HAB_G")
        
        let q28 = Question(text: "", answer: "N", ID: "E6_CREP_OUV_G")
        let q29 = Question(text: "", answer: "N", ID: "E6_CREP_FERM_G")
        let q30 = Question(text: "", answer: "N", ID: "E6_CREP_PAT_G")
        let q31 = Question(text: "", answer: "N", ID: "E6_CREP_DOUL_G")
        let q32 = Question(text: "", answer: "N", ID: "E6_CREP_DOUL_HAB_G")
        
        
        let q33 = Question(text: "", answer: "N", ID: "E7_CRAQ_OUV_D")
        let q34 = Question(text: "", answer:"N", ID: "E7_CRAQ_FERM_D")
        let q35 = Question(text: "", answer: "N", ID: "E7_CRAQ_PAT_D")
        let q36 = Question(text: "", answer: "N", ID: "E7_CRAQ_DOUL_D")
        let q37 = Question(text: "", answer: "N", ID: "E7_CRAQ_DOUL_HAB_D")
        
        let q38 = Question(text: "", answer: "N", ID: "E7_CREP_OUV_D")
        let q39 = Question(text: "", answer: "N", ID: "E7_CREP_FERM_D")
        let q40 = Question(text: "", answer: "N", ID: "E7_CREP_PAT_D")
        let q41 = Question(text: "", answer: "N", ID: "E7_CREP_DOUL_D")
        let q42 = Question(text: "", answer: "N", ID: "E7_CREP_DOUL_HAB_D")
        
        let q43 = Question(text: "", answer: "N", ID: "E7_CRAQ_OUV_G")
        let q44 = Question(text: "", answer: "N", ID: "E7_CRAQ_FERM_G")
        let q45 = Question(text: "", answer: "N", ID: "E7_CRAQ_PAT_G")
        let q46 = Question(text: "", answer: "N", ID: "E7_CRAQ_DOUL_G")
        let q47 = Question(text: "", answer: "N", ID: "E7_CRAQ_DOUL_HAB_G")
        
        let q48 = Question(text: "", answer: "N", ID: "E7_CREP_OUV_G")
        let q49 = Question(text: "", answer: "N", ID: "E7_CREP_FERM_G")
        let q50 = Question(text: "", answer: "N", ID: "E7_CREP_PAT_G")
        let q51 = Question(text: "", answer: "N", ID: "E7_CREP_DOUL_G")
        let q52 = Question(text: "", answer: "N", ID: "E7_CREP_DOUL_HAB_G")
        
        let q53 = Question(text: "", answer: "N", ID: "E8_OUVRANT_BLOC_D")
        let q54 = Question(text: "", answer: "N", ID: "E8_OUVRANT_PAT_D")
        let q55 = Question(text: "", answer: "N", ID: "E8_OUVRANT_EXAM_D")
        
        let q56 = Question(text: "", answer: "N", ID: "E8_OUVERT_BLOC_D")
        let q57 = Question(text: "", answer: "N", ID: "E8_OUVERT_PAT_D")
        let q58 = Question(text: "", answer: "N", ID: "E8_OUVERT_EXAM_D")
        
        let q59 = Question(text: "", answer: "N", ID: "E8_OUVRANT_BLOC_G")
        let q60 = Question(text: "", answer: "N", ID: "E8_OUVRANT_PAT_G")
        let q61 = Question(text: "", answer: "N", ID: "E8_OUVRANT_EXAM_G")
        
        let q62 = Question(text: "", answer: "N", ID: "E8_OUVERT_BLOC_G")
        let q63 = Question(text: "", answer: "N", ID: "E8_OUVERT_PAT_G")
        let q64 = Question(text: "", answer: "N", ID: "E8_OUVERT_EXAM_G")
        
        let q65 = Question(text: "", answer: "N", ID: "E9_PL_DH_D")
        let q66 = Question(text: "", answer: "N", ID: "E9_PL_MTH_D")
        let q67 = Question(text: "", answer: "N", ID: "E9_PL_DOU_REF_D")
        let q68 = Question(text: "", answer: "N", ID: "E9_AL_DH_D")
        let q69 = Question(text: "", answer: "N", ID: "E9_AL_MTH_D")
        let q70 = Question(text: "", answer: "N", ID: "E9_AL_DOU_REF_D")
        
        let q71 = Question(text: "", answer: "N", ID: "E9_PL_DH_G")
        let q72 = Question(text: "", answer: "N", ID: "E9_PL_MTH_G")
        let q73 = Question(text: "", answer: "N", ID: "E9_PL_DOU_REF_G")
        let q74 = Question(text: "", answer: "N", ID: "E9_AL_DH_G")
        let q75 = Question(text: "", answer: "N", ID: "E9_AL_MTH_G")
        let q76 = Question(text: "", answer: "N", ID: "E9_AL_DOU_REF_D")
        
        let q77 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_D")
        let q78 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_HAB_D")
        let q79 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_REF_D")

        let q80 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_G")
        let q81 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_HAB_G")
        let q82 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_REF_G")

        let q83 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_D")
        let q84 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_HAB_D")
        let q85 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_REF_D")

        let q86 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_G")
        let q87 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_HAB_G")
        let q88 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_REF_G")

        let q89 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_D")
        let q90 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_HAB_D")
        let q91 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_REF_D")

        let q92 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_G")
        let q93 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_HAB_G")
        let q94 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_REF_G")

        let q95 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_D")
        let q96 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_HAB_D")
        let q97 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_REF_D")

        let q98 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_G")
        let q99 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_HAB_G")
        let q100 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_REF_G")
        
        let q101 = Question(text: "", answer: "NA", ID: "E12")
        
        let questionList = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29, q30, q31, q32, q33, q34, q35, q36, q37, q38, q39, q40, q41, q42, q43, q44, q45, q46, q47, q48, q49, q50, q51, q52, q53, q54, q55, q56, q57, q58, q59, q60, q61, q62, q63, q64, q65, q66, q67, q68, q69, q70, q71, q72, q73, q74, q75, q76, q77, q78, q79, q80, q81, q82, q83, q84, q85, q86, q87, q88, q89, q90, q91, q92, q93, q94, q95, q96, q97, q98, q99, q100, q101]
        
        let questionnaire = Questionnaire(name: "FDI",ID: "FDI", questions: questionList)
        
        return questionnaire
        
    }
    
    func addQuestionnaireInfo(questionnaireID: String, medicalExamID: String, date: Date) {
        listQuestionnaire?.questionnaires[questionnaireID]?.medicalExamID = medicalExamID
        listQuestionnaire?.questionnaires[questionnaireID]?.date = date
    }
    
    func calculateAllScores() {
        for (key, _) in self.listQuestionnaire.questionnaires {
            calculateScoreQuestionnaire(id: key)
        }
    }
    
    func calculateScoreQuestionnaire(id: String) {
        var score = 0
        let dict = self.listQuestionnaire.questionnaires[id]?.exportedData ?? [:]
        for (_, value) in dict {
            if let value = Int(value) {
                score += value
            }
        }
        self.listQuestionnaire.questionnaires[id]?.score = score
    }
    
    func deleteQuestionnaire(questionnaire: Questionnaire) {
        listQuestionnaire?.questionnaires[questionnaire.ID!]?.exportedData = [:]
    }
  
    
    func mappedExamResultsToQuestionnaires(dict: [String: String]) {
        print(dict)
        var date = Date()
        if let dateItem = dict["date"] {
            date = dateItem.iso8601 ?? Date()
        }
        var medicalExamID = ""
        if let medicalExamIDitem = dict["medicalExamID"] {
            medicalExamID = medicalExamIDitem
        }
        if let DEMO1Item = dict["DEMO1"] {
            listQuestionnaire?.questionnaires["DEMO"]?.exportedData["DEMO1"] = DEMO1Item
            addQuestionnaireInfo(questionnaireID: "DEMO", medicalExamID: medicalExamID, date: date)
        }
        if let DEMO2Item = dict["DEMO2"] {
            listQuestionnaire?.questionnaires["DEMO"]?.exportedData["DEMO2"] = DEMO2Item
            addQuestionnaireInfo(questionnaireID: "DEMO", medicalExamID: medicalExamID, date: date)
        }
        if let DEMO3Item = dict["DEMO3"] {
            listQuestionnaire?.questionnaires["DEMO"]?.exportedData["DEMO3"] = DEMO3Item
            addQuestionnaireInfo(questionnaireID: "DEMO", medicalExamID: medicalExamID, date: date)
        }
        if let DEMO4Item = dict["DEMO4"] {
            listQuestionnaire?.questionnaires["DEMO"]?.exportedData["DEMO4"] = DEMO4Item
            addQuestionnaireInfo(questionnaireID: "DEMO",  medicalExamID: medicalExamID, date: date)
        }
        if let OBC1Item = dict["OBC1"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC1"] = OBC1Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC2Item = dict["OBC2"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC2"] = OBC2Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC3Item = dict["OBC3"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC3"] = OBC3Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC4Item = dict["OBC4"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC4"] = OBC4Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC5Item = dict["OBC5"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC5"] = OBC5Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC6Item = dict["OBC6"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC6"] = OBC6Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC7Item = dict["OBC7"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC7"] = OBC7Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC8Item = dict["OBC8"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC8"] = OBC8Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC9Item = dict["OBC9"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC9"] = OBC9Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC10Item = dict["OBC10"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC10"] = OBC10Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC11Item = dict["OBC11"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC11"] = OBC11Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC12Item = dict["OBC12"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC12"] = OBC12Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC13Item = dict["OBC13"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC13"] = OBC13Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC14Item = dict["OBC14"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC14"] = OBC14Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC15Item = dict["OBC15"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC15"] = OBC15Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC16Item = dict["OBC16"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC16"] = OBC16Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC17Item = dict["OBC17"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC17"] = OBC17Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC18Item = dict["OBC18"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC18"] = OBC18Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC19Item = dict["OBC19"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC19"] = OBC19Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC20Item = dict["OBC20"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC20"] = OBC20Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let OBC21Item = dict["OBC21"] {
            listQuestionnaire?.questionnaires["OBC"]?.exportedData["OBC21"] = OBC21Item
            addQuestionnaireInfo(questionnaireID: "OBC", medicalExamID: medicalExamID, date: date)
        }
        if let DD1Item = dict["DD1"] {
            listQuestionnaire?.questionnaires["DD"]?.exportedData["DD1"] = DD1Item
            addQuestionnaireInfo(questionnaireID: "DD", medicalExamID: medicalExamID, date: date)
        }
        if let DD2Item = dict["DD2"] {
            listQuestionnaire?.questionnaires["DD"]?.exportedData["DD2"] = DD2Item
            addQuestionnaireInfo(questionnaireID: "DD", medicalExamID: medicalExamID, date: date)
        }
        if let DD3Item = dict["DD3A"] {
            listQuestionnaire?.questionnaires["DD"]?.exportedData["DD3A"] = DD3Item
            addQuestionnaireInfo(questionnaireID: "DD", medicalExamID: medicalExamID, date: date)
        }
        if let DD3AItem = dict["DD3B"] {
            listQuestionnaire?.questionnaires["DD"]?.exportedData["DD3B"] = DD3AItem
            addQuestionnaireInfo(questionnaireID: "DD", medicalExamID: medicalExamID, date: date)
        }
        if let DD3BItem = dict["DD3C"] {
            listQuestionnaire?.questionnaires["DD"]?.exportedData["DD3C"] = DD3BItem
            addQuestionnaireInfo(questionnaireID: "DD", medicalExamID: medicalExamID, date: date)
        }
        if let DD3CItem = dict["DD3D"] {
            listQuestionnaire?.questionnaires["DD"]?.exportedData["DD3D"] = DD3CItem
            addQuestionnaireInfo(questionnaireID: "DD", medicalExamID: medicalExamID, date: date)
        }
        if let QS1Item = dict["QS1"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS1"] = QS1Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS2Item = dict["QS2"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS2"] = QS2Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS3Item = dict["QS3"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS3"] = QS3Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS4AItem = dict["QS4A"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS4A"] = QS4AItem
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QSABItem = dict["QS4B"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS4B"] = QSABItem
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS4CItem = dict["QS4C"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS4C"] = QS4CItem
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS4DItem = dict["QS4D"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS4D"] = QS4DItem
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS5Item = dict["QS5"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS5"] = QS5Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS6Item = dict["QS6"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS6"] = QS6Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS7AItem = dict["QS7A"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS7A"] = QS7AItem
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS7BItem = dict["QS7B"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS7B"] = QS7BItem
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS7CItem = dict["QS7C"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS7C"] = QS7CItem
            addQuestionnaireInfo(questionnaireID: "QS",  medicalExamID: medicalExamID, date: date)
        }
        if let QS7DItem = dict["QS7D"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS7D"] = QS7DItem
            addQuestionnaireInfo(questionnaireID: "QS",  medicalExamID: medicalExamID, date: date)
        }
        if let QS8Item = dict["QS8"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS8"] = QS8Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS9Item = dict["QS9"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS9"] = QS9Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS10Item = dict["QS10"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS10"] = QS10Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS11Item = dict["QS11"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS11"] = QS11Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS12Item = dict["QS12"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS12"] = QS12Item
            addQuestionnaireInfo(questionnaireID: "QS", medicalExamID: medicalExamID, date: date)
        }
        if let QS13Item = dict["QS13"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS13"] = QS13Item
            addQuestionnaireInfo(questionnaireID: "QS",  medicalExamID: medicalExamID, date: date)
        }
        if let QS14Item = dict["QS14"] {
            listQuestionnaire?.questionnaires["QS"]?.exportedData["QS14"] = QS14Item
            addQuestionnaireInfo(questionnaireID: "QS",  medicalExamID: medicalExamID, date: date)
        }
        if let MAN81Item = dict["FM81"] {
            listQuestionnaire?.questionnaires["ELFMAN8"]?.exportedData["FM81"] = MAN81Item
            print(date.print())
            addQuestionnaireInfo(questionnaireID: "ELFMAN8", medicalExamID: medicalExamID, date: date)
        }
        if let MAN82Item = dict["FM82"] {
            listQuestionnaire?.questionnaires["ELFMAN8"]?.exportedData["FM82"] = MAN82Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN8", medicalExamID: medicalExamID, date: date)
        }
        if let MAN83Item = dict["FM83"] {
            listQuestionnaire?.questionnaires["ELFMAN8"]?.exportedData["FM83"] = MAN83Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN8", medicalExamID: medicalExamID, date: date)
        }
        if let MAN84Item = dict["FM84"] {
            listQuestionnaire?.questionnaires["ELFMAN8"]?.exportedData["FM84"] = MAN84Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN8", medicalExamID: medicalExamID, date: date)
        }
        if let MAN85Item = dict["FM85"] {
            listQuestionnaire?.questionnaires["ELFMAN8"]?.exportedData["FM85"] = MAN85Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN8", medicalExamID: medicalExamID, date: date)
        }
        if let MAN86Item = dict["FM86"] {
            listQuestionnaire?.questionnaires["ELFMAN8"]?.exportedData["FM86"] = MAN86Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN8", medicalExamID: medicalExamID, date: date)
        }
        if let MAN87Item = dict["FM87"] {
            listQuestionnaire?.questionnaires["ELFMAN8"]?.exportedData["FM87"] = MAN87Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN8", medicalExamID: medicalExamID, date: date)
        }
        if let MAN88Item = dict["FM88"] {
            listQuestionnaire?.questionnaires["ELFMAN8"]?.exportedData["FM88"] = MAN88Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN8", medicalExamID: medicalExamID, date: date)
        }
        if let MAN201Item = dict["FM201"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM201"] = MAN201Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN202Item = dict["FM202"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM202"] = MAN202Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN203Item = dict["FM203"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM203"] = MAN203Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN204Item = dict["FM204"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM204"] = MAN204Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN205Item = dict["FM205"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM205"] = MAN205Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN206Item = dict["FM206"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM206"] = MAN206Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN207Item = dict["FM207"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM207"] = MAN207Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN208Item = dict["FM208"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM208"] = MAN208Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN209Item = dict["FM209"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM209"] = MAN209Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN2010Item = dict["FM2010"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM2010"] = MAN2010Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN2011Item = dict["FM2011"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM2011"] = MAN2011Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20", medicalExamID: medicalExamID, date: date)
        }
        if let MAN2012Item = dict["FM2012"] {
            listQuestionnaire?.questionnaires["ELFMAN20"]?.exportedData["FM2012"] = MAN2012Item
            addQuestionnaireInfo(questionnaireID: "ELFMAN20",  medicalExamID: medicalExamID, date: date)
        }
        if let MORPHOItems = dict["MD1"] {
            listQuestionnaire?.questionnaires["MORPHO"]?.exportedData["MD1"] = MORPHOItems
            addQuestionnaireInfo(questionnaireID: "MORPHO", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ1Item = dict["PHQ41"] {
            listQuestionnaire?.questionnaires["PHQ4"]?.exportedData["PHQ41"] = PHQ1Item
            addQuestionnaireInfo(questionnaireID: "PHQ4", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ2Item = dict["PHQ42"] {
            listQuestionnaire?.questionnaires["PHQ4"]?.exportedData["PHQ42"] = PHQ2Item
            addQuestionnaireInfo(questionnaireID: "PHQ4", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ3Item = dict["PHQ43"] {
            listQuestionnaire?.questionnaires["PHQ4"]?.exportedData["PHQ43"] = PHQ3Item
            addQuestionnaireInfo(questionnaireID: "PHQ4", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ4Item = dict["PHQ44"] {
            listQuestionnaire?.questionnaires["PHQ4"]?.exportedData["PHQ44"] = PHQ4Item
            addQuestionnaireInfo(questionnaireID: "PHQ4", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ1Item = dict["PHQ91"] {
            listQuestionnaire?.questionnaires["PHQ9"]?.exportedData["PHQ91"] = PHQ1Item
            addQuestionnaireInfo(questionnaireID: "PHQ9", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ2Item = dict["PHQ92"] {
            listQuestionnaire?.questionnaires["PHQ9"]?.exportedData["PHQ92"] = PHQ2Item
            addQuestionnaireInfo(questionnaireID: "PHQ9", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ3Item = dict["PHQ93"] {
            listQuestionnaire?.questionnaires["PHQ9"]?.exportedData["PHQ93"] = PHQ3Item
            addQuestionnaireInfo(questionnaireID: "PHQ9", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ4Item = dict["PHQ94"] {
            listQuestionnaire?.questionnaires["PHQ9"]?.exportedData["PHQ94"] = PHQ4Item
            addQuestionnaireInfo(questionnaireID: "PHQ9", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ5Item = dict["PHQ95"] {
            listQuestionnaire?.questionnaires["PHQ9"]?.exportedData["PHQ95"] = PHQ5Item
            addQuestionnaireInfo(questionnaireID: "PHQ9", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ6Item = dict["PHQ96"] {
            listQuestionnaire?.questionnaires["PHQ9"]?.exportedData["PHQ96"] = PHQ6Item
            addQuestionnaireInfo(questionnaireID: "PHQ9", medicalExamID: medicalExamID, date: date)
        }
        if let PHQ7Item = dict["PHQ97"] {
            listQuestionnaire?.questionnaires["PHQ9"]?.exportedData["PHQ97"] = PHQ7Item
            addQuestionnaireInfo(questionnaireID: "PHQ9", medicalExamID: medicalExamID, date: date)
        }
        if let GAD71Item = dict["GAD1"] {
            listQuestionnaire?.questionnaires["GAD7"]?.exportedData["GAD71"] = GAD71Item
            addQuestionnaireInfo(questionnaireID: "GAD7", medicalExamID: medicalExamID, date: date)
        }
        if let GAD72Item = dict["GAD2"] {
            listQuestionnaire?.questionnaires["GAD7"]?.exportedData["GAD72"] = GAD72Item
            addQuestionnaireInfo(questionnaireID: "GAD7", medicalExamID: medicalExamID, date: date)
        }
        if let GAD73Item = dict["GAD3"] {
            listQuestionnaire?.questionnaires["GAD7"]?.exportedData["GAD73"] = GAD73Item
            addQuestionnaireInfo(questionnaireID: "GAD7", medicalExamID: medicalExamID, date: date)
        }
        if let GAD74Item = dict["GAD4"] {
            listQuestionnaire?.questionnaires["GAD7"]?.exportedData["GAD74"] = GAD74Item
            addQuestionnaireInfo(questionnaireID: "GAD7", medicalExamID: medicalExamID, date: date)
        }
        if let GAD75Item = dict["GAD5"] {
            listQuestionnaire?.questionnaires["GAD7"]?.exportedData["GAD75"] = GAD75Item
            addQuestionnaireInfo(questionnaireID: "GAD7", medicalExamID: medicalExamID, date: date)
        }
        if let GAD76Item = dict["GAD6"] {
            listQuestionnaire?.questionnaires["GAD7"]?.exportedData["GAD76"] = GAD76Item
            addQuestionnaireInfo(questionnaireID: "GAD7", medicalExamID: medicalExamID, date: date)
        }
        if let GAD77Item = dict["GAD7"] {
            listQuestionnaire?.questionnaires["GAD7"]?.exportedData["GAD77"] = GAD77Item
            addQuestionnaireInfo(questionnaireID: "GAD7", medicalExamID: medicalExamID, date: date)
        }
        if let CGPS1Item = dict["DC1"] {
            listQuestionnaire?.questionnaires["GCPS"]?.exportedData["DC1"] = CGPS1Item
            addQuestionnaireInfo(questionnaireID: "GCPS", medicalExamID: medicalExamID, date: date)
        }
        if let CGPS2Item = dict["DC2"] {
            listQuestionnaire?.questionnaires["GCPS"]?.exportedData["DC2"] = CGPS2Item
            addQuestionnaireInfo(questionnaireID: "GCPS", medicalExamID: medicalExamID, date: date)
        }
        if let CGPS3Item = dict["DC3"] {
            listQuestionnaire?.questionnaires["GCPS"]?.exportedData["DC3"] = CGPS3Item
            addQuestionnaireInfo(questionnaireID: "GCPS", medicalExamID: medicalExamID, date: date)
        }
        if let CGPS4Item = dict["DC4"] {
            listQuestionnaire?.questionnaires["GCPS"]?.exportedData["DC4"] = CGPS4Item
            addQuestionnaireInfo(questionnaireID: "GCPS", medicalExamID: medicalExamID, date: date)
        }
        if let CGPS5Item = dict["DC5"] {
            listQuestionnaire?.questionnaires["GCPS"]?.exportedData["DC5"] = CGPS5Item
            addQuestionnaireInfo(questionnaireID: "GCPS", medicalExamID: medicalExamID, date: date)
        }
        if let CGPS6Item = dict["DC6"] {
            listQuestionnaire?.questionnaires["GCPS"]?.exportedData["DC6"] = CGPS6Item
            addQuestionnaireInfo(questionnaireID: "GCPS", medicalExamID: medicalExamID, date: date)
        }
        if let CGPS7Item = dict["DC7"] {
            listQuestionnaire?.questionnaires["GCPS"]?.exportedData["DC7"] = CGPS7Item
            addQuestionnaireInfo(questionnaireID: "GCPS", medicalExamID: medicalExamID, date: date)
        }
        if let CGPS8Item = dict["DC8"] {
            listQuestionnaire?.questionnaires["GCPS"]?.exportedData["DC8"] = CGPS8Item
            addQuestionnaireInfo(questionnaireID: "GCPS", medicalExamID: medicalExamID, date: date)
        }
        if let IS1Item = dict["IS1"] {
            listQuestionnaire?.questionnaires["IS"]?.exportedData["IS1"] = IS1Item
            addQuestionnaireInfo(questionnaireID: "IS", medicalExamID: medicalExamID, date: date)
        }
        if let IS2Item = dict["IS2"] {
            listQuestionnaire?.questionnaires["IS"]?.exportedData["IS2"] = IS2Item
            addQuestionnaireInfo(questionnaireID: "IS", medicalExamID: medicalExamID, date: date)
        }
        if let IS3Item = dict["IS3"] {
            listQuestionnaire?.questionnaires["IS"]?.exportedData["IS3"] = IS3Item
            addQuestionnaireInfo(questionnaireID: "IS", medicalExamID: medicalExamID, date: date)
        }
        if let IS4Item = dict["IS4"] {
            listQuestionnaire?.questionnaires["IS"]?.exportedData["IS4"] = IS4Item
            addQuestionnaireInfo(questionnaireID: "IS", medicalExamID: medicalExamID, date: date)
        }
        if let IS5Item = dict["IS5"] {
            listQuestionnaire?.questionnaires["IS"]?.exportedData["IS5"] = IS5Item
            addQuestionnaireInfo(questionnaireID: "IS", medicalExamID: medicalExamID, date: date)
        }
        if let IS6Item = dict["IS6"] {
            listQuestionnaire?.questionnaires["IS"]?.exportedData["IS6"] = IS6Item
            addQuestionnaireInfo(questionnaireID: "IS", medicalExamID: medicalExamID, date: date)
        }
        if let IS7Item = dict["IS7"] {
            listQuestionnaire?.questionnaires["IS"]?.exportedData["IS7"] = IS7Item
            addQuestionnaireInfo(questionnaireID: "IS", medicalExamID: medicalExamID, date: date)
        }
        if let SS1Item = dict["SS1"] {
            listQuestionnaire?.questionnaires["SS"]?.exportedData["SS1"] = SS1Item
            addQuestionnaireInfo(questionnaireID: "SS", medicalExamID: medicalExamID, date: date)
        }
        if let SS2Item = dict["SS2"] {
            listQuestionnaire?.questionnaires["SS"]?.exportedData["SS2"] = SS2Item
            addQuestionnaireInfo(questionnaireID: "SS", medicalExamID: medicalExamID, date: date)
        }
        if let SS3Item = dict["SS3"] {
            listQuestionnaire?.questionnaires["SS"]?.exportedData["SS3"] = SS3Item
            addQuestionnaireInfo(questionnaireID: "SS", medicalExamID: medicalExamID, date: date)
        }
        if let SS4Item = dict["SS4"] {
            listQuestionnaire?.questionnaires["SS"]?.exportedData["SS4"] = SS4Item
            addQuestionnaireInfo(questionnaireID: "SS", medicalExamID: medicalExamID, date: date)
        }
        if let SS5Item = dict["SS5"] {
            listQuestionnaire?.questionnaires["SS"]?.exportedData["SS5"] = SS5Item
            addQuestionnaireInfo(questionnaireID: "SS", medicalExamID: medicalExamID, date: date)
        }
        if let SS6Item = dict["SS6"] {
            listQuestionnaire?.questionnaires["SS"]?.exportedData["SS6"] = SS6Item
            addQuestionnaireInfo(questionnaireID: "SS", medicalExamID: medicalExamID, date: date)
        }
        if let SS7Item = dict["SS7"] {
            listQuestionnaire?.questionnaires["SS"]?.exportedData["SS7"] = SS7Item
            addQuestionnaireInfo(questionnaireID: "SS", medicalExamID: medicalExamID, date: date)
        }
        if let SS8Item = dict["SS8"] {
            listQuestionnaire?.questionnaires["SS"]?.exportedData["SS8"] = SS8Item
            addQuestionnaireInfo(questionnaireID: "SS", medicalExamID: medicalExamID, date: date)
        }
        if let FDI_E1_Item = dict["E1B_D"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E1B_D"] = FDI_E1_Item
        }
        if let FDI_E1D_Item = dict["E1B_G"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E1B_G"] = FDI_E1D_Item
        }
        if let FDI_E2_NEG_H_Item = dict["E2NEG_H"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E2NEG_H"] = FDI_E2_NEG_H_Item
        }
        if let FDI_E2_NEG_V_Item = dict["E2NEG_V"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E2NEG_V"] = FDI_E2_NEG_V_Item
        }
        if let FDI_E2_DIST_H_Item = dict["E2DIST_H"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E2DIST_H"] = FDI_E2_DIST_H_Item
        }
        if let FDI_E2_DIST_V_Item = dict["E2DIST_V"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E2DIST_V"] = FDI_E2_DIST_V_Item
        }
        if let FDI_E2_DIST_MED_Item = dict["E2DIST_MEDIA"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E2DIST_MEDIA"] = FDI_E2_DIST_MED_Item
        }
        if let FDI_E2_DEVIA_Item = dict["E2DEVIA_MEDIA"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E2DEVIA_MEDIA"] = FDI_E2_DEVIA_Item
        }
       
        
    
//        let q9 = Question(text: "", answer: "N", ID: "E31")
//        let q10 = Question(text: "", answer: "N", ID: "E4A")
//        let q11 = Question(text: "", answer: "N", ID: "E4D")
//        let q12 = Question(text: "", answer: "N", ID: "E5D")
//        let q13 = Question(text: "", answer: "N", ID: "E6_CRAQ_OUV_D")
//        let q14 = Question(text: "", answer: "N", ID: "E6_CRAQ_FERM_D")
//        let q15 = Question(text: "", answer: "N", ID: "E6_CRAQ_PAT_D")
//        let q16 = Question(text: "", answer: "N", ID: "E6_CRAQ_DOUL_D")
//        let q17 = Question(text: "", answer: "N", ID: "E6_CRAQ_DOUL_HAB_D")
//
//        let q18 = Question(text: "", answer: "N", ID: "E6_CREP_OUV_D")
//        let q19 = Question(text: "", answer: "N", ID: "E6_CREP_FERM_D")
//        let q20 = Question(text: "", answer: "N", ID: "E6_CREP_PAT_D")
//        let q21 = Question(text: "", answer: "N", ID: "E6_CREP_DOUL_D")
//        let q22 = Question(text: "", answer: "N", ID: "E6_CREP_DOU_HAB_D")
//
//        let q23 = Question(text: "", answer: "N", ID: "E6_CRAQ_OUV_G")
//        let q24 = Question(text: "", answer: "N", ID: "E6_CRAQ_FERM_G")
//        let q25 = Question(text: "", answer: "N", ID: "E6_CRAQ_PAT_G")
//        let q26 = Question(text: "", answer: "N", ID: "E6_CRAQ_DOUL_G")
//        let q27 = Question(text: "", answer: "N", ID: "E6_CRAQ_DOUL_HAB_G")
//
//        let q28 = Question(text: "", answer: "N", ID: "E6_CREP_OUV_G")
//        let q29 = Question(text: "", answer: "N", ID: "E6_CREP_FERM_G")
//        let q30 = Question(text: "", answer: "N", ID: "E6_CREP_PAT_G")
//        let q31 = Question(text: "", answer: "N", ID: "E6_CREP_DOUL_G")
//        let q32 = Question(text: "", answer: "N", ID: "E6_CREP_DOUL_HAB_G")
//
//
//        let q33 = Question(text: "", answer: "N", ID: "E7_CRAQ_OUV_D")
//        let q34 = Question(text: "", answer:"N", ID: "E7_CRAQ_FERM_D")
//        let q35 = Question(text: "", answer: "N", ID: "E7_CRAQ_PAT_D")
//        let q36 = Question(text: "", answer: "N", ID: "E7_CRAQ_DOUL_D")
//        let q37 = Question(text: "", answer: "N", ID: "E7_CRAQ_DOUL_HAB_D")
//
//        let q38 = Question(text: "", answer: "N", ID: "E7_CREP_OUV_D")
//        let q39 = Question(text: "", answer: "N", ID: "E7_CREP_FERM_D")
//        let q40 = Question(text: "", answer: "N", ID: "E7_CREP_PAT_D")
//        let q41 = Question(text: "", answer: "N", ID: "E7_CREP_DOUL_D")
//        let q42 = Question(text: "", answer: "N", ID: "E7_CREP_DOUL_HAB_D")
//
//        let q43 = Question(text: "", answer: "N", ID: "E7_CRAQ_OUV_G")
//        let q44 = Question(text: "", answer: "N", ID: "E7_CRAQ_FERM_G")
//        let q45 = Question(text: "", answer: "N", ID: "E7_CRAQ_PAT_G")
//        let q46 = Question(text: "", answer: "N", ID: "E7_CRAQ_DOUL_G")
//        let q47 = Question(text: "", answer: "N", ID: "E7_CRAQ_DOUL_HAB_G")
//
//        let q48 = Question(text: "", answer: "N", ID: "E7_CREP_OUV_G")
//        let q49 = Question(text: "", answer: "N", ID: "E7_CREP_FERM_G")
//        let q50 = Question(text: "", answer: "N", ID: "E7_CREP_PAT_G")
//        let q51 = Question(text: "", answer: "N", ID: "E7_CREP_DOUL_G")
//        let q52 = Question(text: "", answer: "N", ID: "E7_CREP_DOUL_HAB_G")
//
//        let q53 = Question(text: "", answer: "N", ID: "E8_OUVRANT_BLOC_D")
//        let q54 = Question(text: "", answer: "N", ID: "E8_OUVRANT_PAT_D")
//        let q55 = Question(text: "", answer: "N", ID: "E8_OUVRANT_EXAM_D")
//
//        let q56 = Question(text: "", answer: "N", ID: "E8_OUVERT_BLOC_D")
//        let q57 = Question(text: "", answer: "N", ID: "E8_OUVERT_PAT_D")
//        let q58 = Question(text: "", answer: "N", ID: "E8_OUVERT_EXAM_D")
//
//        let q59 = Question(text: "", answer: "N", ID: "E8_OUVRANT_BLOC_G")
//        let q60 = Question(text: "", answer: "N", ID: "E8_OUVRANT_PAT_G")
//        let q61 = Question(text: "", answer: "N", ID: "E8_OUVRANT_EXAM_G")
//
//        let q62 = Question(text: "", answer: "N", ID: "E8_OUVERT_BLOC_G")
//        let q63 = Question(text: "", answer: "N", ID: "E8_OUVERT_PAT_G")
//        let q64 = Question(text: "", answer: "N", ID: "E8_OUVERT_EXAM_G")
//
//        let q65 = Question(text: "", answer: "N", ID: "E9_PL_DH_D")
//        let q66 = Question(text: "", answer: "N", ID: "E9_PL_MTH_D")
//        let q67 = Question(text: "", answer: "N", ID: "E9_PL_DOU_REF_D")
//        let q68 = Question(text: "", answer: "N", ID: "E9_AL_DH_D")
//        let q69 = Question(text: "", answer: "N", ID: "E9_AL_MTH_D")
//        let q70 = Question(text: "", answer: "N", ID: "E9_AL_DOU_REF_D")
//
//        let q71 = Question(text: "", answer: "N", ID: "E9_PL_DH_G")
//        let q72 = Question(text: "", answer: "N", ID: "E9_PL_MTH_G")
//        let q73 = Question(text: "", answer: "N", ID: "E9_PL_DOU_REF_G")
//        let q74 = Question(text: "", answer: "N", ID: "E9_AL_DH_G")
//        let q75 = Question(text: "", answer: "N", ID: "E9_AL_MTH_G")
//        let q76 = Question(text: "", answer: "N", ID: "E9_AL_DOU_REF_D")
//
//        let q77 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_D")
//        let q78 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_HAB_D")
//        let q79 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_REF_D")
//
//        let q80 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_G")
//        let q81 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_HAB_G")
//        let q82 = Question(text: "", answer: "N", ID: "E10_REG_MAND_DOUL_REF_G")
//
//        let q83 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_D")
//        let q84 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_HAB_D")
//        let q85 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_REF_D")
//
//        let q86 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_G")
//        let q87 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_HAB_G")
//        let q88 = Question(text: "", answer: "N", ID: "E10_REG_SOUS_DOUL_REF_G")
//
//        let q89 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_D")
//        let q90 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_HAB_D")
//        let q91 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_REF_D")
//
//        let q92 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_G")
//        let q93 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_HAB_G")
//        let q94 = Question(text: "", answer: "N", ID: "E10_REG_PTER_DOUL_REF_G")
//
//        let q95 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_D")
//        let q96 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_HAB_D")
//        let q97 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_REF_D")
//
//        let q98 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_G")
//        let q99 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_HAB_G")
//        let q100 = Question(text: "", answer: "N", ID: "E10_TEND_DOUL_REF_G")
        
        
        
        
        
        
        
        if let FDI_E11_AD = dict["E11_AD"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E11_AD"] = FDI_E11_AD
            addQuestionnaireInfo(questionnaireID: "FDI", medicalExamID: medicalExamID, date: date)
        }
        if let FDI_E11_ATMD = dict["E11_ATMD"] {
            listQuestionnaire?.questionnaires["FDI"]?.exportedData["E11_AD"] = FDI_E11_ATMD
            addQuestionnaireInfo(questionnaireID: "FDI", medicalExamID: medicalExamID, date: date)
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }
}
