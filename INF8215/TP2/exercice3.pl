% Tous les cours
cours(inf1005c).
cours(inf1500).
cours(inf1010).
cours(log1000).
cours(inf1600).
cours(log2810).
cours(inf2010).
cours(log2410).
cours(mth1007).
cours(log2990).
cours(inf2705).
cours(inf2205).
cours(inf1900).

% Prerequis
prq(inf1005c, inf1010).
prq(inf1005c, log1000).
prq(inf1005c, inf1600).
prq(inf1500, inf1600).
prq(inf1010, inf2010).
prq(inf1010, log2410).
prq(log1000, log2410).
prq(inf2010, inf2705).
prq(mth1007, inf2705).

% Corequis
crq(log2810, inf2010).
crq(log2990, inf2705).
crq(inf1600, inf1900).
crq(log1000, inf1900).
crq(inf2205, inf1900).

% Corequis(X, Y): X est corequis a Y (et vice versa).
corequis(X, Y) :- cours(X) , cours(Y) , (crq(X, Y) ; crq(Y, X)).

% Prerequis(X, Y): X est prerequis a Y.
% Un corequis est considere comme prerequis.
prerequis(X, Y) :- cours(X) , cours(Y) , (prq(X, Y) ; corequis(X, Y)).
prerequis(X, Z) :- cours(X) , cours(Z) , (prq(X, Y) , prerequis(Y, Z)).
prerequis(X, Z) :- cours(X) , cours(Z) , (crq(X, Y) , prerequis(Y, Z)).

% Enumeration de tous les cours prerequis et corequis
coursAPrendreComplet(X) :- cours(X) ,
						   findall(P, prerequis(P, X), L) , 
						   delete(L, X, D) ,
						   sort(D, S) , 
						   format('Cours à suivre: ~w', [S]).