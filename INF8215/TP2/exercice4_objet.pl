% Questions
ask(placard, X) :-
      format('Peut-on retrouver ~w dans un placard ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(cuisine, X) :-
      format('Peut-on retrouver ~w dans la cuisine ou la salle a manger ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(ecole, X) :-
      format('Peut-on apporter ~w en partant a ecole ou au travail ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.    
ask(salon, X) :-
      format('Peut-on retrouver ~w dans le salon ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(salle_de_bain, X) :-
      format('Peut-on retrouver ~w dans la salle de bain ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(chambre, X) :-
      format('Peut-on retrouver ~w dans la chambre a coucher ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(electrique, X) :-
      format('~w fonctionne-t-il a electricite ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(comptoir, X) :-
      format('~w se range-t-il sur le comptoir ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(breuvage, X) :-
      format('~w sert-il a preparer un breuvage ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(compartiment, X) :-
      format('~w est-il principalement constitue un compartiment ferme ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(manger, X) :-
      format('Se sert-on de ~w pour manger ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(ustensile, X) :-
      format('~w est-il un ustensile ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(laver, X) :-
      format('Se sert-on de ~w pour laver ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(poche, X) :-
      format('~w rentre-t-il dans les poches ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(papiers, X) :-
      format('~w peut-il contenir autres papiers ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(musique, X) :-
      format('~w est-il un instrument de musique ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.

% Raisonnement
objet(X) :- ask(placard, X) , placard(X).
objet(X) :- ask(cuisine, X) , cuisine(X).
objet(X) :- ask(ecole, X) , ecole(X).
objet(X) :- ask(salon, X) , salon(X).
objet(X) :- ask(salle_de_bain, X) , produit_nettoyant(X).
objet(X) :- ask(chambre, X) , meuble(X, chambre).
placard(X) :- ask(electrique, X) -> objet_menager(X, electrique) ; objet_menager(X, non_electrique).
cuisine(X) :- ask(electrique, X) -> cuisine_electrique(X) ; cuisine_non_electrique(X).
cuisine_electrique(X) :- ask(comptoir, X) -> cuisine_electrique_comptoir(X) ; cuisine_electrique_non_comptoir(X).
cuisine_electrique_comptoir(X) :- ask(breuvage, X) -> electromenager(X, petit, ferme) ; electromenager(X, petit, ouvert).
cuisine_electrique_non_comptoir(X) :- ask(compartiment, X) -> electromenager(X, gros, ferme) ; electromenager(X, gros, ouvert).
cuisine_non_electrique(X) :- ask(comptoir, X) -> cuisine_non_electrique_comptoir(X) ; meuble(X, salle_a_manger).
cuisine_non_electrique_comptoir(X) :- ask(manger, X) -> manger(X) ; non_manger(X).
manger(X) :- ask(ustensile, X) -> ustensile(X) ; recipient(X).
non_manger(X) :- ask(laver, X) -> produit_nettoyant(X, cuisine) ; instrument_cuisine(X).
ecole(X) :- ask(poche, X) -> poche(X) ; non_poche(X).
poche(X) :- ask(electrique, X) -> appareil_electronique(X, communication) ; poche_non_electrique(X).
poche_non_electrique(X) :- ask(papiers, X) -> objet_transport(X, petit) ; utilitaire(X).
non_poche(X) :- ask(electrique, X) -> appareil_electronique(X, travail) ; non_poche_non_electrique(X).
non_poche_non_electrique(X) :- ask(papiers, X) -> objet_transport(X, gros) ; materiel_ecriture(X).
salon(X) :- ask(electrique, X) -> objet_eclairage(X) ; salon_non_electrique(X).
salon_non_electrique(X) :- ask(musique, X) -> instrument_musique(X) ; vegetal(X).

% Bases de connaissances
objet_menager(aspirateur, electrique).
appareil_electronique(ordinateur, travail).
appareil_electronique(telephone, communication).
ustensile(fourchette).
objet_menager(balai, non_electrique).
vegetal(cactus).
recipient(assiette).
electromenager(four, gros, ferme).
electromenager(cuisiniere, gros, ouvert).
electromenager(cafetiere, petit, ferme).
electromenager(grille_pain, petit, ouvert).
meuble(table, salle_a_manger).
instrument_cuisine(casserole).
produit_nettoyant(shampooing, salle_de_bain).
produit_nettoyant(detergent_a_vaisselle, cuisine).
meuble(lit, chambre).
utilitaire(cle).
objet_transport(portefeuille, petit).
objet_transport(sac_a_dos, gros).
instrument_musique(piano).
objet_eclairage(lampe).
materiel_ecriture(papier).

objet_menager(X) :- objet_menager(X, _).
appareil_electronique(X) :- appareil_electronique(X, _).
meuble(X) :- meuble(X, _).
produit_nettoyant(X) :- produit_nettoyant(X, _).
electromenager(X) :- electromenager(X, _, _).
objet_transport(X) :- objet_transport(X, _).