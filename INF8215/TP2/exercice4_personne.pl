
ask(politique, X) :-
      format('~w est relie a la politique ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(politicien, X) :-
      format('~w est un politicien ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(president, X) :-
      format('~w est un president ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.    
ask(acteur, X) :-
      format('~w est un acteur ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(chanteur, X) :-
      format('~w est un chanteur ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(producer, X) :-
      format('~w est un producer ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(artiste, X) :-
      format('~w est un artiste ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(personnageJeuVideo, X) :-
      format('~w est un personnage de Jeu Video ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(ecrivain, X) :-
      format('~w est un ecrivain ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(personnageReligieux, X) :-
      format('~w est un personnage Religieux ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(conducteur, X) :-
      format('~w est un conducteur ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(personnageFilm, X) :-
      format('~w est un personnageFilm ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(personnage, X) :-
      format('~w est un personnage ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(artisteRue, X) :-
      format('~w est un artiste de rue ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(pharaon, X) :-
      format('~w est un pharaon ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(cinematographie, X) :-
      format('~w est relie a la cinematographie ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(homme, X) :-
      format('~w est un homme ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(americain, X) :-
      format('~w est americain ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(bresilien, X) :-
      format('~w est bresilien ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(russe, X) :-
      format('~w est russe ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(ww2, X) :-
      format('~w etait president lors de la seconde guerre mondiale ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(pape, X) :-
      format('~w est un pape ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(filsdedieu, X) :-
      format('~w est le fils de Dieu ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.
ask(mlettre, X) :-
      format('~w a un nom commencant par la lettre m ? ', [X]),
      read(Reponse),
      Reponse = 'oui'.

personne(X) :- ask(politique, X),politique(X).
personne(X) :- ask(cinematographie, X), cinematographie(X).
personne(X) :- ask(artiste, X), artiste(X).
personne(X) :- ask(personnageReligieux, X), personnageReligieuxGeneral(X).  
personne(X):- ask(ecrivain, X), ecrivainGeneral(X).
personne(X) :- ask(conducteur, X), conducteurGeneral(X).

politique(X) :- ask(politicien, X), politicienGeneral(X).
politique(X) :- ask(president, X), presidentGeneral(X).
politique(X) :- ask(pharaon, X), pharaon(X).
politicienGeneral(X) :- ask(russe, X), politicien(X), russe(X).
politicienGeneral(X) :- politicien(X).
presidentGeneral(X) :- ask(ww2, X), president(X), ww2(X).
presidentGeneral(X) :- president(X).

artiste(X) :-  ask(chanteur, X), chanteurGeneral(X).
artiste(X) :- ask(artisteRue, X), artisteRue(X).
chanteurGeneral(X) :- ask(homme, X),chanteur(X), homme(X).
chanteurGeneral(X) :- chanteur(X), femme(X).

cinematographie(X) :- ask(acteur, X), acteurGeneral(X).
cinematographie(X) :- ask(producer, X), producerGeneral(X).
cinematographie(X) :- ask(personnage, X), personnage(X).
acteurGeneral(X) :- ask(homme, X), acteur(X), homme(X).
acteurGeneral(X) :- acteur(X), femme(X).
producerGeneral(X) :- ask(americain, X), americain(X), producer(X).
producerGeneral(X)  :- producer(X).
personnage(X) :- ask(personnageFilm, X), personnageFilmGeneral(X).
personnage(X) :- ask(personnageJeuVideo, X), personnageJeuVideo(X).
personnageFilmGeneral(X) :- ask(homme, X), personnageFilm(X), homme(X).
personnageFilmGeneral(X) :- personnageFilm(X), femme(X).

personnageReligieuxGeneral(X) :- ask(pape, X), personnageReligieux(X), pape(X).
personnageReligieuxGeneral(X) :- ask(filsdedieu, X), personnageReligieux(X), filsdedieu(X).
personnageReligieuxGeneral(X) :- ask(mlettre, X), personnageReligieux(X), mlettre(X).

ecrivainGeneral(X) :- ask(homme, X), ecrivain(X), homme(X).
ecrivainGeneral(X) :- ecrivain(X), femme(X).

conducteurGeneral(X) :- ask(bresilien, X), bresilien(X), conducteur(X).
conducteurGeneral(X) :- conducteur(X).

chanteur(michael_jackson).          homme(michael_jackson).
chanteur(lady_gaga).                femme(lady_gaga).
politicien(joseph_staline).         homme(joseph_staline).
politicien(mikhail_gorbachev).      homme(mikhail_gorbachev).     russe(mikhail_gorbachev).
acteur(jennifer_lawrence).          femme(jennifer_lawrence).
acteur(denzel_washington).          homme(denzel_washington).
producer(hideo_kojima).             homme(hideo_kojima).
producer(quentin_tarantino).        homme(quentin_tarantino).   americain(quentin_tarantino).
artisteRue(banksy).                 homme(banksy).
personnageJeuVideo(mario).          homme(mario).
ecrivain(j_k_rowling).              femme(j_k_rowling).
ecrivain(victor_hugo).              homme(victor_hugo).
president(richard_nixon).           homme(richard_nixon).
president(dwight_d_eisenhower).     homme(dwight_d_eisenhower).   ww2(dwight_d_eisenhower).
pharaon(cleopatre).                 femme(cleopatre).
personnageReligieux(jesus).         homme(jesus).                 filsdedieu(jesus).
personnageReligieux(pape_prancois). homme(pape_prancois).         pape(pape_prancois).
personnageReligieux(moise).         homme(moise).                 mlettre(moise).
conducteur(fernando_alonso).        homme(fernando_alonso).
conducteur(ayrton_senna).           homme(ayrton_senna).          bresilien(ayrton_senna).
personnageFilm(lara_croft).         femme(lara_croft).
personnageFilm(james_bond).         homme(james_bond).






