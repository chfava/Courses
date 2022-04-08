% Use this editor as a MiniZinc scratch book
include "alldifferent.mzn";
include "inverse.mzn";

% Déclaration des constantes 
int: nbTeams = 14;
array[teams,teams] of int: pv;
set of int: teams = 1..nbTeams;
set of int: periods = 1..nbTeams-1;
set of int: periodsMinus = 1..nbTeams-4;

pv = [|
0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1|
1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1|
0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0|
0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0|
1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0|
1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0|
0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1|
1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0|
1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0|
1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1|
0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0|
0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0|
0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0|
0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0|];



% Déclaration des variables 
array[teams,periods] of var teams: contestant;

%%%% Contraintes du problème

% Une équipe ne peut pas jouer contre elle même durant une période t
constraint
  forall(i in teams)(
    forall(t in periods)(
      contestant[i,t]!=i
    )
  );

% Réciprocité dans les variable, si i joue contre j pendant t, alors j joue contre i aussi durant t 
constraint
  forall(p in periods)(
    inverse([contestant[t,p] | t in teams],[contestant[t,p] | t in teams])
  );
  
% Chaque équipe joue contre toutes les autres équipes 
constraint
  forall(t in teams)(
    alldifferent([contestant[t,p] | p in periods])
  );
  
% Pas plus de 4 matchs à domicile ou en extérieur 
constraint
  forall(t in teams)(
    forall(p in periodsMinus)(
      sum(z in p..p+3)(pv[t,contestant[t,z]]) <= 3
    )
  );

constraint
  forall(t in teams)(
    forall(p in periodsMinus)(
      sum(z in p..p+3)(pv[t,contestant[t,z]]) >= 1
    )
  );
  
constraint
  contestant[1,1]=11 /\
  contestant[2,1]=4 /\
  contestant[3,1]=6 /\
  contestant[4,1]=2 /\
  contestant[5,1]=7 /\
  contestant[6,1]=3 /\
  contestant[7,1]=5 /\
  contestant[8,1]=10 /\
  contestant[9,1]=12 /\
  contestant[10,1]=8 /\
  contestant[11,1]=1 /\
  contestant[12,1]=9 /\
  contestant[13,1]=14 /\
  contestant[14,1]=13;

  
