%INF8215 TP2 Exercice 1
include "globals.mzn";

array[1..5] of 1 ..5 : Nationalite = [1,2,3,4,5]; %["Anglais", "Espagnol", "Ukrainien", "Norvegien", "Japonais"]
array[1..5] of var 1 ..5: Maisons; %["Rouge", "Verte", "Jaune", "Bleu", "Blanche"]
array[1..5] of var 1 ..5: Breuvages; %["Cafe", "The", "Lait", "Jus d'orange", "eau"]
array[1..5] of var 1 ..5: Animaux; %["Escargot", "Renard", "Cheval", "Chien", "Zebre"]
array[1..5] of var 1 ..5: Professions; %["Sculpteur", "Diplomate", "Medecin", "Violoniste", "Acrobate"]
array[1..5] of var 1 ..5: PositionMaison; % [1,2,3,4,5]


array[1..5] of string : Nationalite_String = ["Anglais", "Espagnol", "Ukrainien", "Norvegien", "Japonais"];
array[1..5] of string : Breuvages_String = ["Cafe", "The", "Lait", "Jus d'orange", "eau"];
array[1..5] of string : Animaux_String = ["Escargot", "Renard", "Cheval", "Chien", "Zebre"];
array[1..5] of string : Professions_String = ["Sculpteur", "Diplomate", "Medecin", "Violoniste", "Acrobate"];


%Contraintes

constraint Maisons[1] = Nationalite[1];
constraint Animaux[4] = Nationalite[2];
constraint Maisons[2] = Breuvages[1];
constraint Breuvages[2] = Nationalite[3];
var 1..6 : X;
var 1..6 : Y;
constraint PositionMaison[X] = Maisons[2]/\ PositionMaison[Y] = Maisons[5] /\ X = Y + 1;
constraint Professions[1] = Animaux[1];
constraint Professions[2] = Maisons[3];
constraint PositionMaison[3] = Breuvages[3];
constraint Nationalite[4] = PositionMaison[1];
var 1..6 : A;
var 1..6 : B;
constraint PositionMaison[A] = Professions[3] /\ abs(B - A) = 1 /\ PositionMaison[B] = Animaux[2];
var 1..6 : C;
var 1..6 : D;
constraint PositionMaison[C] = Professions[2] /\ abs(D - C) = 1 /\ PositionMaison[D] = Animaux[3];
constraint Professions[4] = Breuvages[4];
constraint Professions[5] = Nationalite[5];
var 1..6 : R;
var 1..6 : S;
constraint PositionMaison[S] = Nationalite[4] /\ abs(R - S) = 1 /\ PositionMaison[R] = Maisons[4];

constraint all_different(Nationalite);
constraint all_different(Maisons);
constraint all_different(Breuvages);
constraint all_different(Animaux);
constraint all_different(Professions);
constraint all_different(PositionMaison);

solve satisfy;


output [
  "Nationalite :   ", show(Nationalite), "\n",
  "Maisons :       ", show(Maisons), "\n",
  "Breuvages :     ", show(Breuvages), "\n",
  "Animaux :       ", show(Animaux), "\n",
  "Professions :   ", show(Professions), "\n",
  "PositionMaison :", show(PositionMaison), "\n","\n",
  "Qui boit de l'eau ? :", "\n", show(Nationalite_String[fix(Breuvages[5])]),"\n","\n",
  "Qui possède le zèbre ? : ", "\n", show(Nationalite_String[fix(Animaux[5])])
]