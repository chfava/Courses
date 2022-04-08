# Intéraction Client-Serveur

Ce document vise à informer les développeurs du client léger des requêtes à envoyer au serveur pour implémenter les diverses fonctionnalités liées aux examens médicaux, à la gestion de patient et de cliniques et au traitement des données.

## Administrateurs
-----
### Création d'administrateur

URL: ```https://api.meditrinae.com/admins```

Type: ```POST```

Permission requise: ```meditrinae-api:admin:create```

Data Transfer Object (envoyé):

```
{
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
}

```
Data Transfer Object (reçu): 
```
{
  "_id": string,
  "clinic": string,
  "dateCreated": string,
  "dateModified": string,
  "firstName": string,
  "lastName": string,
  "user": string
}
```
-----

### Get tous les administrateurs

URL: ```https://api.meditrinae.com/admins```

Type: ```GET```

Permission requise: ```meditrinae-api:admin:get```

Data Transfer Object (reçu): 
```
[{
  "_id": string,
  "clinic: string,
  "dateCreated: string,
  "dateModified: string,
  "firstName: string,
  "lastName": string,
  "user": string
}, ...]
```
-----

### Get un administrateur

URL: ```https://api.meditrinae.com/admins/$id```

Type: ```GET```

Permission requise: ```meditrinae-api:admin:get```

Data Transfer Object (reçu): 
```
{
  "_id": string,
  "clinic": string,
  "dateCreated": string,
  "dateModified": string,
  "firstName": string,
  "lastName": string,
  "user": string
}
```
-----

### Mise à jour d'un administrateur

URL: ```https://api.meditrinae.com/admins```

Type: ```PUT```

Permission requise: ```meditrinae-api:admin:update```

Data Transfer Object (envoyé):

```
{
  "id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
}
```
Data Transfer Object (reçu):
```
{
    "_id": string,
    "clinic": string,
    "firstName": string,
    "lastName": string,
    "user": string,
    "dateCreated": string,
    "dateModified": string
}
```
----
### Suppression d'un administrateur

URL: ```https://api.meditrinae.com/admins/$id```

Type: ```DELETE```

Permission requise: ```meditrinae-api:admin:delete```

Data Transfer Object (envoyé):

Ici, le username et le password sont ceux du compte qui effectue la suppression, et non ceux du compte supprimé

```
{
  "username": string,
  "password": string
}
```
Data Transfer Object (reçu):
```
{
    "_id": string,
    "dateCreated": string,
    "dateModified": string,
    "clinic": string,
    "firstName": string,
    "lastName": string,
    "user": string
}
```
----
----
## Intelligence Artificielle

Le back end de ces routes doit être retravaillé

### Prédiction

URL: ```https://api.meditrinae.com/ai/predict/$id```

Type: ```GET```

Permission requise: ```meditrinae-api:ai:predict```

----

### Entraînement

URL: ```https://api.meditrinae.com/ai/train```

Type: ```POST```

Permission requise: ```meditrinae-api:ai:train```

----
### Données d'entraînement

URL: ```https://api.meditrinae.com/ai/training-data```

Type: ```GET```

Permission requise: ```meditrinae-api:ai:get```

Données reçues: ```CSV```

----
----

## Authentification

### Création de token

Le token reçu contient l'information quant au type de compte connecté

URL: ```https://api.meditrinae.com/auth/token```

Type: ```GEPOSTT```

Permission requise: ```aucune```

Data Transfer Object (envoyé):
```
{
    "username": string,
    "password": string
}
```

Data Transfer Object (reçu):
```
{
    "accessToken": string,
    "firstLogin": boolean
}
```
----
----

## Cliniques 

### Création de clinique
URL: ```https://api.meditrinae.com/clinics```

Type: ```POST```

Permission requise: ```meditrinae-api:clinic:create```

Data Transfer Object (envoyé):

```
{
  "address": string,
  "email": string,
  "name": string,
  "phone": string
}
```
Data Transfer Object (reçu): 
```
{
  "_id": string,
  "address": string,
  "email": string,
  "name": string,
  "phone": string
}
```
----
### Get une clinique

URL: ```https://api.meditrinae.com/clinics/$id```

Type: ```GET```

Permission requise: ```meditrinae-api:clinic:get```

Data Transfer Object (reçu): 
```
{
  "_id": string,
  "address": string,
  "email": string,
  "name": string,
  "phone": string
}
```
---
### Get toutes les cliniques

URL: ```https://api.meditrinae.com/clinics```

Type: ```GET```

Permission requise: ```meditrinae-api:clinic:get```

Data Transfer Object (reçu): 
```
[{
  "_id": string,
  "address": string,
  "email": string,
  "name": string,
  "phone": string
}]
```
---
### Get les secrétaires d'une clinique

URL: ```https://api.meditrinae.com/clinics/?id/secretaries```

Type: ```GET```

Permission requise: ```meditrinae-api:secretaries:get```
TODO
Data Transfer Object (reçu): 
```
[{
  "_id": string,
  "address": string,
  "email": string,
  "name": string,
  "phone": string
}]
```
---
### Get les praticiens d'une clinique

URL: ```https://api.meditrinae.com/clinics/?id/practicians```

Type: ```GET```

Permission requise: ```meditrinae-api:practicians:get```
TODO
Data Transfer Object (reçu): 
```
[{
  "_id": string,
  "address": string,
  "email": string,
  "name": string,
  "phone": string
}]
```
---
### Get les admins d'une clinique

URL: ```https://api.meditrinae.com/clinics/?id/admins```

Type: ```GET```

Permission requise: ```meditrinae-api:practicians:get```
TODO
Data Transfer Object (reçu): 
```
[{
  "_id": string,
  "address": string,
  "email": string,
  "name": string,
  "phone": string
}]
```
---
### Mise à jour d'une clinique 

URL: ```https://api.meditrinae.com/clinics```

Type: ```PUT```

Permission requise: ```meditrinae-api:clinic:update```

Data Transfer Object (envoyé):

```
{
  "id": string,
  "address": string,
  "email": string,
  "name": string,
  "phone": string,
}
```
Data Transfer Object (reçu):
```
{
  "_id": string,
  "address": string,
  "email": string,
  "name": string,
  "phone": string,
}
```
---
---
## Decision tree (depricated)

TODO
---
---
## Résultats d'examens

### Création de résultats

URL: ```https://api.meditrinae.com/exam-results```

Type: ```POST```

Permission requise: ```meditrinae-api:exam-results:create```

Data Transfer Object (envoyé):
```
{
  patientID: string,
  questions: {
    DD1: string,
    DD2: string,
    DD3A: string,
    DD3B: string,
    DD3C: string,
    DD3D: string,
    QS1: string,
    QS2: string,
    QS3: string,
    QS4A: string,
    QS4B: string,
    QS4C: string,
    QS5: string,
    QS6: string,
    QS7A: string,
    QS7B: string,
    QS7C: string,
    QS7D: string,
    QS8: string,
    QS8E: string,
    QS9: string,
    QS9E: string,
    QS10: string,
    QS10E: string,
    QS11: string,
    QS11E: string,
    QS12: string,
    QS12E: string,
    QS13: string,
    QS13E: string,
    QS14: string,
    QS14E: string,
    DEMO1: string,
    DEMO2: string,
    DEMO3: string,
    DEMO4: string,
    DEMO5: string,
    E1A_DOUL_D_DIGASTRIQUEPOS: string,
    E1A_DOUL_D_ATM: string,
    E1A_DOUL_G_PTERIGOIDIENMEDIAL: string,
    E2DIST_H: string,
    E1A_DOUL_D_PTERIGOIDIENMEDIAL: string,
    E1A_DOUL_G_MUSCMASS: string,
    E1B_D: string,
    E2REF: string,
    E1A_DOUL_G_TEMPORAL: string,
    E2DEVIA_MEDIA: string,
    E1A_DOUL_G_DIGASTRIQUEPOS: string,
    E2NEG_H: string,
    E1A_DOUL_D_MASSETER: string,
    E1A_DOUL_G_MASSETER: string,
    E1B_G: string,
    E2NEG_V: string,
    E2DIST_MEDIA: string,
    E31: string,
    E1A_DOUL_D_TEMPORAL: string,
    E32: string,
    E1A_DOUL_D_MUSCMASS: string,
    E1A_DOUL_G_ATM: string,
    E2DIST_V: string,
    E4_AVEC_TEMP_DH_D: string,
    E4_AVEC_MM_DH_D: string,
    E4A: string,
    E4_MA_G_DIGASTRIQUEPOS: string,
    E4_SANS_MAS_DH_G: string,
    E4_MA_G_TEMPORAL: string,
    E4_MS_G_ATM: string,
    E4_SANS_TEMP_MT_G: string,
    E4_MS_D_MUSCMASS: string,
    E4_SANS_TEMP_DH_G: string,
    E4_AVEC_TEMP_MT_G: string,
    E4_MA_D_MUSCMASS: string,
    E4_AVEC_TEMP_MT_D: string,
    E4_MA_D_DIGASTRIQUEPOS: string,
    E4_AVEC_ATM_DH_D: string,
    E4_MS_D_ATM: string,
    E4_MA_D_TEMPORAL: string,
    E4_MA_G_PTERIGOIDIENMEDIAL: string,
    E4_SANS_TEMP_MT_D: string,
    E4_AVEC_MAS_DH_G: string,
    E4_MS_G_MUSCMASS: string,
    E4B: string,
    E4_MA_G_MUSCMASS: string,
    E4_AVEC_ATM_DH_G: string,
    E4_MS_G_PTERIGOIDIENMEDIAL: string,
    E4_SANS_TEMP_DH_D: string,
    E4_MS_D_TEMPORAL: string,
    E4_MS_D_MASSETER: string,
    E4_SANS_MAS_DH_D: string,
    E4_SANS_ATM_DH_G: string,
    E4_SANS_TEMP_MM_G: string,
    E4_MA_D_ATM: string,
    E4_AVEC_AUTR_DH_G: string,
    E4_SANS_TEMP_MM_D: string,
    E4_AVEC_AUTR_DH_D: string,
    E4_MA_G_MASSETER: string,
    E4_SANS_ATM_DH_D: string,
    E4_MA_G_ATM: string,
    E4D: string,
    E4_MS_G_DIGASTRIQUEPOS: string,
    E4_MA_D_PTERIGOIDIENMEDIAL: string,
    E4C: string,
    E4_SANS_AUTR_DH_D: string,
    E4_AVEC_TEMP_MM_G: string,
    E4_MS_G_TEMPORAL: string,
    E4_SANS_AUTR_DH_G: string,
    E4_MS_D_PTERIGOIDIENMEDIAL: string,
    E4_AVEC_MAS_DH_D: string,
    E4_MA_D_MASSETER: string,
    E4_MS_D_DIGASTRIQUEPOS: string,
    E4_MS_G_MASSETER: string,
    E4_AVEC_TEMP_DH_G: string,
    E5_PROT_MAS_DH_G: string,
    E5_LG_D_ATM: string,
    E5_LD_G_TEMPORAL: string,
    E5_LG_D_DIGASTRIQUEPOS: string,
    E5_ATMD_TEMP_DH_D: string,
    E5_MASD_TEMP_DH_G: string,
    E5_PT_G_PTERIGOIDIENMEDIAL: string,
    E5_PROT_NM_DH_G: string,
    E5_AUTRG_TEMP_DH_G: string,
    E5_ATMG_TEMP_DH_D: string,
    E5_ATMG_TEMP_DH_G: string,
    E5_PROT_TEMP_DH_G: string,
    E5_LATD_MAl_TETE_G: string,
    E5_LG_D_MUSCMASS: string,
    E5_PT_D_MASSETER: string,
    E5_AUTRD_TEMP_DH_D: string,
    E5_LD_D_DIGASTRIQUEPOS: string,
    E5_LG_G_TEMPORAL: string,
    E5_PT_D_DIGASTRIQUEPOS: string,
    E5_LD_D_PTERIGOIDIENMEDIAL: string,
    E5_NMG_TEMP_DH_D: string,
    E5_MASG_TEMP_DH_G: string,
    E5_PT_G_MUSCMASS: string,
    E5_LD_D_MUSCMASS: string,
    E5_PT_D_MUSCMASS: string,
    E5B: string,
    E5_LATG_TEMP_DH_D: string,
    E5_LATD_TEMP_DH_D: string,
    E5_PT_G_ATM: string,
    E5_LD_G_MUSCMASS: string,
    E5_LG_G_MASSETER: string,
    E5_PROT_ATM_DH_D: string,
    E5_NMD_TEMP_DH_G: string,
    E5_PROT_MAl_TETE_D: string,
    E5_LD_G_MASSETER: string,
    E5_LG_G_MUSCMASS: string,
    E5_LATD_MAl_TETE_D: string,
    E5_LATG_MAl_TETE_D: string,
    E5_LG_D_MASSETER: string,
    E5_LD_D_MASSETER: string,
    E5_PT_D_ATM: string,
    E5_PT_D_TEMPORAL: string,
    E5_LG_G_DIGASTRIQUEPOS: string,
    E5_NMD_TEMP_DH_D: string,
    E5A: string,
    E5_MASD_TEMP_DH_D: string,
    E5_LG_G_PTERIGOIDIENMEDIAL: string,
    E5_LD_G_DIGASTRIQUEPOS: string,
    E5_LD_D_TEMPORAL: string,
    E5_PROT_AUTR_DH_G: string,
    E5_PT_G_MASSETER: string,
    E5_LATG_MAl_TETE_G: string,
    E5_LD_G_PTERIGOIDIENMEDIAL: string,
    E5_PROT_NM_DH_D: string,
    E5_PROT_MAl_TETE_G: string,
    E5C: string,
    E5_ATMD_TEMP_DH_G: string,
    E5_LD_G_ATM: string,
    E5_PROT_MAS_DH_D: string,
    E5D: string,
    E5_NMG_TEMP_DH_G: string,
    E5_PT_G_DIGASTRIQUEPOS: string,
    E5_LD_D_ATM: string,
    E5_AUTRG_TEMP_DH_D: string,
    E5_PROT_ATM_DH_G: string,
    E5_LG_D_TEMPORAL: string,
    E5_LATD_TEMP_DH_G: string,
    E5_PROT_AUTR_DH_D: string,
    E5_PT_G_TEMPORAL: string,
    E5_AUTRD_TEMP_DH_G: string,
    E5_LG_D_PTERIGOIDIENMEDIAL: string,
    E5_LG_G_ATM: string,
    E5_PT_D_PTERIGOIDIENMEDIAL: string,
    E5_MASG_TEMP_DH_D: string,
    E5_LATG_TEMP_DH_G: string,
    E5_PROT_TEMP_DH_D: string,
    E6_CRAQ_FERM_D: string,
    E7_CRAQ_DOUL_G: string,
    E7_CREP_DOUL_HAB_G: string,
    E6_CREP_OUV_G: string,
    E6_CREP_DOUL_G: string,
    E7_CRAQ_FERM_D: string,
    E7_CREP_DOUL_G: string,
    E6_CREP_DOUL_D: string,
    E6_CREP_OUV_D: string,
    E6_CREP_DOUL_HAB_G: string,
    E6_CREP_DOU_HAB_D: string,
    E6_CRAQ_OUV_G: string,
    E7_CRAQ_FERM_G: string,
    E6_CRAQ_DOUL_D: string,
    E6_CRAQ_DOUL_G: string,
    E6_CREP_PAT_G: string,
    E6_CRAQ_PAT_D: string,
    E6_CRAQ_FERM_G: string,
    E7_CRAQ_OUV_D: string,
    E7_CREP_PAT_D: string,
    E6_CREP_FERM_G: string,
    E7_CREP_DOUL_D: string,
    E7_CRAQ_PAT_G: string,
    E7_CREP_FERM_G: string,
    E6_CRAQ_DOUL_HAB_D: string,
    E6_CREP_PAT_D: string,
    E6_CRAQ_PAT_G: string,
    E7_CRAQ_OUV_G: string,
    E6_CRAQ_OUV_D: string,
    E7_CREP_OUV_D: string,
    E7_CRAQ_PAT_D: string,
    E7_CRAQ_DOUL_HAB_D: string,
    E7_CREP_DOUL_HAB_D: string,
    E7_CREP_FERM_D: string,
    E6_CRAQ_DOUL_HAB_G: string,
    E7_CRAQ_DOUL_D: string,
    E6_CREP_FERM_D: string,
    E7_CREP_PAT_G: string,
    E7_CREP_OUV_G: string,
    E7_CRAQ_DOUL_HAB_G: string,
    E8_OUVERT_BLOC_D: string,
    E8_OUVERT_PAT_D: string,
    E8_OUVERT_EXAM_D: string,
    E8_OUVRANT_EXAM_G: string,
    E8_OUVERT_EXAM_G: string,
    E8_OUVERT_PAT_G: string,
    E8_OUVERT_BLOC_G: string,
    E8_OUVERT_REDUC_G: string,
    E8_OUVRANT_PAT_G: string,
    E8_OUVRANT_BLOC_D: string,
    E8_OUVRANT_EXAM_D: string,
    E8_OUVRANT_REDUC_G: string,
    E8_OUVRANT_REDUC_D: string,
    E8_OUVRANT_BLOC_G: string,
    E8_OUVRANT_PAT_D: string,
    E8_OUVERT_REDUC_D: string,
    E9_AL_DH_D: string,
    E9_MASS_COR_MAL_TETE_HAB_G: string,
    E9_AL_MTH_G: string,
    E9_TEMP_POST_DOUL_HAB_G: string,
    E9_TEMP_ANT_DOUL_HAB_D: string,
    E9_TEMP_ANT_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_REF_G: string,
    E9_TEMP_ANT_DOUL_D: string,
    E9_MASS_INS_DOUL_REF_D: string,
    E9_MASS_INS_DOUL_REF_G: string,
    E9_TEMP_MOY_MAL_TETE_HAB_G: string,
    E9_MASS_COR_MAL_TETE_HAB_D: string,
    E9_MASS_ORIG_DOUL_D: string,
    E9_MASS_ORIG_MAL_TETE_HAB_D: string,
    E9_PL_MTH_D: string,
    E9_TEMP_MOY_DOUL_G: string,
    E9_MASS_INS_MAL_TETE_HAB_G: string,
    E9_AL_DOU_REF_D: string,
    E9_TEMP_ANT_DOUL_G: string,
    E9_AL_DH_G: string,
    E9_MASS_ORIG_DOUL_REF_D: string,
    E9_MASS_ORIG_DOUL_G: string,
    E9_TEMP_POST_DOUL_G: string,
    E9_TEMP_MOY_DOUL_HAB_D: string,
    E9_MASS_INS_DOUL_HAB_D: string,
    E9_MASS_INS_MAL_TETE_HAB_D: string,
    E9_TEMP_POST_DOUL_REF_D: string,
    E9_PL_DH_D: string,
    E9_MASS_COR_DOUL_HAB_G: string,
    E9_TEMP_POST_MAL_TETE_HAB_D: string,
    E9_PL_DOU_REF_D: string,
    E9_PL_DH_G: string,
    E9_TEMP_POST_DOUL_HAB_D: string,
    E9_TEMP_POST_MAL_TETE_HAB_G: string,
    E9_TEMP_MOY_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_HAB_D: string,
    E9_MASS_INS_DOUL_HAB_G: string,
    E9_MASS_ORIG_DOUL_HAB_D: string,
    E9_AL_MTH_D: string,
    E9_TEMP_ANT_MAL_TETE_HAB_D: string,
    E9_MASS_ORIG_MAL_TETE_HABG: string,
    E9_MASS_INS_DOUL_D: string,
    E9_MASS_INS_DOUL_G: string,
    E9_TEMP_MOY_DOUL_HAB_G: string,
    E9_TEMP_POST_DOUL_D: string,
    E9_PL_MTH_G: string,
    E9_TEMP_MOY_MAL_TETE_HAB_D: string,
    E9_PL_DOU_REF_G: string,
    E9_TEMP_POST_DOUL_REF_G: string,
    E9_TEMP_ANT_MAL_TETE_HAB_G: string,
    E9_MASS_COR_DOUL_D: string,
    E9_TEMP_MOY_DOUL_D: string,
    E9_TEMP_MOY_DOUL_REF_G: string,
    E9_TEMP_ANT_DOUL_HAB_G: string,
    E9_MASS_ORIG_DOUL_HAB_G: string,
    E9_TEMP_ANT_DOUL_REF_G: string,
    E12: string,
    E10_REG_MAND_DOUL_REF_D: string,
    E10_REG_SOUS_DOUL_REF_D: string,
    E9_DOUL_PALP_D_DIGASTRIQUEPOS: string,
    E9_DOUL_PALP_G_MASSETER: string,
    E10_REG_SOUS_DOUL_REF_G: string,
    E10_REG_MAND_DOUL_HAB_D: string,
    E10_TEND_DOUL_HAB_D: string,
    E9_DOUL_PALP_G_PTERIGOIDIENMEDIAL: string,
    E13_Trait: string,
    E9_DOUL_PALP_D_PTERIGOIDIENMEDIAL: string,
    E10_REG_SOUS_DOUL_HAB_D: string,
    E11_DATMG: string,
    E11_DD: string,
    E9_DOUL_PALP_D_TEMPORAL: string,
    E9_DOUL_PALP_D_MASSETER: string,
    E9_DOUL_PALP_D_MUSCMASS: string,
    E9_DOUL_PALP_G_TEMPORAL: string,
    E9_DOUL_PALP_G_DIGASTRIQUEPOS: string,
    E9_DOUL_PALP_D_ATM: string,
    E11_DATMD: string,
    E10_REG_SOUS_DOUL_HAB_G: string,
    E10_REG_PTER_DOUL_HAB_G: string,
    E10_REG_MAND_DOUL_REF_G: string,
    E10_REG_MAND_DOUL_HAB_G: string,
    E9_DOUL_PALP_G_MUSCMASS: string,
    E9_DOUL_PALP_G_ATM: string,
    E10_REG_PTER_DOUL_REF_G: string,
    E10_REG_PTER_DOUL_HAB_D: string,
    E10_REG_PTER_DOUL_REF_D: string,
    E10_TEND_DOUL_REF_D: string,
    COMMENT: string,
    MD_MOR_G_TEMPORAL: string,
    MD_MOR_G_ATM: string,
    MD_MOR_G_MASSETER: string,
    MD_MOR_G_PTERIGOIDIENMEDIAL: string,
    MD_MOR_G_DIGASTRIQUEPOS: string,
    MD_MOR_G_MUSCMASS: string,
    MD_MOR_D_TEMPORAL: string,
    MD_MOR_D_ATM: string,
    MD_MOR_D_MASSETER: string,
    MD_MOR_D_PTERIGOIDIENMEDIAL: string,
    MD_MOR_D_DIGASTRIQUEPOS: string,
    MD_MOR_D_MUSCMASS: string,
    MD1: string,
    DC1: string,
    DC2: string,
    DC3: string,
    DC4: string,
    DC5: string,
    DC6: string,
    DC7: string,
    DC8: string,
    FM81: string,
    FM82: string,
    FM83: string,
    FM84: string,
    FM85: string,
    FM86: string,
    FM87: string,
    FM88: string,
    FM201: string,
    FM202: string,
    FM203: string,
    FM204: string,
    FM205: string,
    FM206: string,
    FM207: string,
    FM208: string,
    FM209: string,
    FM2010: string,
    FM2011: string,
    FM2012: string,
    PHQ41: string,
    PHQ42: string,
    PHQ43: string,
    PHQ44: string,
    PHQ91: string,
    PHQ92: string,
    PHQ93: string,
    PHQ94: string,
    PHQ95: string,
    PHQ96: string,
    PHQ97: string,
    PHQ151: string,
    PHQ152: string,
    PHQ153: string,
    PHQ154: string,
    PHQ155: string,
    PHQ156: string,
    PHQ157: string,
    PHQ158: string,
    PHQ159: string,
    PHQ1510: string,
    PHQ1511: string,
    PHQ1512: string,
    PHQ1513: string,
    PHQ1514: string,
    PHQ1515: string,
    GAD1: string,
    GAD2: string,
    GAD3: string,
    GAD4: string,
    GAD5: string,
    GAD6: string,
    GAD7: string,
    OBC1: string,
    OBC2: string,
    OBC3: string,
    OBC4: string,
    OBC5: string,
    OBC6: string,
    OBC7: string,
    OBC8: string,
    OBC9: string,
    OBC10: string,
    OBC11: string,
    OBC12: string,
    OBC13: string,
    OBC14: string,
    OBC15: string,
    OBC16: string,
    OBC17: string,
    OBC18: string,
    OBC19: string,
    OBC20: string,
    OBC21: string
  }
}
```
Data Transfer Object (reçu):

```
{
  "_id"
  patientID: string,
  questions: {
    DD1: string,
    DD2: string,
    DD3A: string,
    DD3B: string,
    DD3C: string,
    DD3D: string,
    QS1: string,
    QS2: string,
    QS3: string,
    QS4A: string,
    QS4B: string,
    QS4C: string,
    QS5: string,
    QS6: string,
    QS7A: string,
    QS7B: string,
    QS7C: string,
    QS7D: string,
    QS8: string,
    QS8E: string,
    QS9: string,
    QS9E: string,
    QS10: string,
    QS10E: string,
    QS11: string,
    QS11E: string,
    QS12: string,
    QS12E: string,
    QS13: string,
    QS13E: string,
    QS14: string,
    QS14E: string,
    DEMO1: string,
    DEMO2: string,
    DEMO3: string,
    DEMO4: string,
    DEMO5: string,
    E1A_DOUL_D_DIGASTRIQUEPOS: string,
    E1A_DOUL_D_ATM: string,
    E1A_DOUL_G_PTERIGOIDIENMEDIAL: string,
    E2DIST_H: string,
    E1A_DOUL_D_PTERIGOIDIENMEDIAL: string,
    E1A_DOUL_G_MUSCMASS: string,
    E1B_D: string,
    E2REF: string,
    E1A_DOUL_G_TEMPORAL: string,
    E2DEVIA_MEDIA: string,
    E1A_DOUL_G_DIGASTRIQUEPOS: string,
    E2NEG_H: string,
    E1A_DOUL_D_MASSETER: string,
    E1A_DOUL_G_MASSETER: string,
    E1B_G: string,
    E2NEG_V: string,
    E2DIST_MEDIA: string,
    E31: string,
    E1A_DOUL_D_TEMPORAL: string,
    E32: string,
    E1A_DOUL_D_MUSCMASS: string,
    E1A_DOUL_G_ATM: string,
    E2DIST_V: string,
    E4_AVEC_TEMP_DH_D: string,
    E4_AVEC_MM_DH_D: string,
    E4A: string,
    E4_MA_G_DIGASTRIQUEPOS: string,
    E4_SANS_MAS_DH_G: string,
    E4_MA_G_TEMPORAL: string,
    E4_MS_G_ATM: string,
    E4_SANS_TEMP_MT_G: string,
    E4_MS_D_MUSCMASS: string,
    E4_SANS_TEMP_DH_G: string,
    E4_AVEC_TEMP_MT_G: string,
    E4_MA_D_MUSCMASS: string,
    E4_AVEC_TEMP_MT_D: string,
    E4_MA_D_DIGASTRIQUEPOS: string,
    E4_AVEC_ATM_DH_D: string,
    E4_MS_D_ATM: string,
    E4_MA_D_TEMPORAL: string,
    E4_MA_G_PTERIGOIDIENMEDIAL: string,
    E4_SANS_TEMP_MT_D: string,
    E4_AVEC_MAS_DH_G: string,
    E4_MS_G_MUSCMASS: string,
    E4B: string,
    E4_MA_G_MUSCMASS: string,
    E4_AVEC_ATM_DH_G: string,
    E4_MS_G_PTERIGOIDIENMEDIAL: string,
    E4_SANS_TEMP_DH_D: string,
    E4_MS_D_TEMPORAL: string,
    E4_MS_D_MASSETER: string,
    E4_SANS_MAS_DH_D: string,
    E4_SANS_ATM_DH_G: string,
    E4_SANS_TEMP_MM_G: string,
    E4_MA_D_ATM: string,
    E4_AVEC_AUTR_DH_G: string,
    E4_SANS_TEMP_MM_D: string,
    E4_AVEC_AUTR_DH_D: string,
    E4_MA_G_MASSETER: string,
    E4_SANS_ATM_DH_D: string,
    E4_MA_G_ATM: string,
    E4D: string,
    E4_MS_G_DIGASTRIQUEPOS: string,
    E4_MA_D_PTERIGOIDIENMEDIAL: string,
    E4C: string,
    E4_SANS_AUTR_DH_D: string,
    E4_AVEC_TEMP_MM_G: string,
    E4_MS_G_TEMPORAL: string,
    E4_SANS_AUTR_DH_G: string,
    E4_MS_D_PTERIGOIDIENMEDIAL: string,
    E4_AVEC_MAS_DH_D: string,
    E4_MA_D_MASSETER: string,
    E4_MS_D_DIGASTRIQUEPOS: string,
    E4_MS_G_MASSETER: string,
    E4_AVEC_TEMP_DH_G: string,
    E5_PROT_MAS_DH_G: string,
    E5_LG_D_ATM: string,
    E5_LD_G_TEMPORAL: string,
    E5_LG_D_DIGASTRIQUEPOS: string,
    E5_ATMD_TEMP_DH_D: string,
    E5_MASD_TEMP_DH_G: string,
    E5_PT_G_PTERIGOIDIENMEDIAL: string,
    E5_PROT_NM_DH_G: string,
    E5_AUTRG_TEMP_DH_G: string,
    E5_ATMG_TEMP_DH_D: string,
    E5_ATMG_TEMP_DH_G: string,
    E5_PROT_TEMP_DH_G: string,
    E5_LATD_MAl_TETE_G: string,
    E5_LG_D_MUSCMASS: string,
    E5_PT_D_MASSETER: string,
    E5_AUTRD_TEMP_DH_D: string,
    E5_LD_D_DIGASTRIQUEPOS: string,
    E5_LG_G_TEMPORAL: string,
    E5_PT_D_DIGASTRIQUEPOS: string,
    E5_LD_D_PTERIGOIDIENMEDIAL: string,
    E5_NMG_TEMP_DH_D: string,
    E5_MASG_TEMP_DH_G: string,
    E5_PT_G_MUSCMASS: string,
    E5_LD_D_MUSCMASS: string,
    E5_PT_D_MUSCMASS: string,
    E5B: string,
    E5_LATG_TEMP_DH_D: string,
    E5_LATD_TEMP_DH_D: string,
    E5_PT_G_ATM: string,
    E5_LD_G_MUSCMASS: string,
    E5_LG_G_MASSETER: string,
    E5_PROT_ATM_DH_D: string,
    E5_NMD_TEMP_DH_G: string,
    E5_PROT_MAl_TETE_D: string,
    E5_LD_G_MASSETER: string,
    E5_LG_G_MUSCMASS: string,
    E5_LATD_MAl_TETE_D: string,
    E5_LATG_MAl_TETE_D: string,
    E5_LG_D_MASSETER: string,
    E5_LD_D_MASSETER: string,
    E5_PT_D_ATM: string,
    E5_PT_D_TEMPORAL: string,
    E5_LG_G_DIGASTRIQUEPOS: string,
    E5_NMD_TEMP_DH_D: string,
    E5A: string,
    E5_MASD_TEMP_DH_D: string,
    E5_LG_G_PTERIGOIDIENMEDIAL: string,
    E5_LD_G_DIGASTRIQUEPOS: string,
    E5_LD_D_TEMPORAL: string,
    E5_PROT_AUTR_DH_G: string,
    E5_PT_G_MASSETER: string,
    E5_LATG_MAl_TETE_G: string,
    E5_LD_G_PTERIGOIDIENMEDIAL: string,
    E5_PROT_NM_DH_D: string,
    E5_PROT_MAl_TETE_G: string,
    E5C: string,
    E5_ATMD_TEMP_DH_G: string,
    E5_LD_G_ATM: string,
    E5_PROT_MAS_DH_D: string,
    E5D: string,
    E5_NMG_TEMP_DH_G: string,
    E5_PT_G_DIGASTRIQUEPOS: string,
    E5_LD_D_ATM: string,
    E5_AUTRG_TEMP_DH_D: string,
    E5_PROT_ATM_DH_G: string,
    E5_LG_D_TEMPORAL: string,
    E5_LATD_TEMP_DH_G: string,
    E5_PROT_AUTR_DH_D: string,
    E5_PT_G_TEMPORAL: string,
    E5_AUTRD_TEMP_DH_G: string,
    E5_LG_D_PTERIGOIDIENMEDIAL: string,
    E5_LG_G_ATM: string,
    E5_PT_D_PTERIGOIDIENMEDIAL: string,
    E5_MASG_TEMP_DH_D: string,
    E5_LATG_TEMP_DH_G: string,
    E5_PROT_TEMP_DH_D: string,
    E6_CRAQ_FERM_D: string,
    E7_CRAQ_DOUL_G: string,
    E7_CREP_DOUL_HAB_G: string,
    E6_CREP_OUV_G: string,
    E6_CREP_DOUL_G: string,
    E7_CRAQ_FERM_D: string,
    E7_CREP_DOUL_G: string,
    E6_CREP_DOUL_D: string,
    E6_CREP_OUV_D: string,
    E6_CREP_DOUL_HAB_G: string,
    E6_CREP_DOU_HAB_D: string,
    E6_CRAQ_OUV_G: string,
    E7_CRAQ_FERM_G: string,
    E6_CRAQ_DOUL_D: string,
    E6_CRAQ_DOUL_G: string,
    E6_CREP_PAT_G: string,
    E6_CRAQ_PAT_D: string,
    E6_CRAQ_FERM_G: string,
    E7_CRAQ_OUV_D: string,
    E7_CREP_PAT_D: string,
    E6_CREP_FERM_G: string,
    E7_CREP_DOUL_D: string,
    E7_CRAQ_PAT_G: string,
    E7_CREP_FERM_G: string,
    E6_CRAQ_DOUL_HAB_D: string,
    E6_CREP_PAT_D: string,
    E6_CRAQ_PAT_G: string,
    E7_CRAQ_OUV_G: string,
    E6_CRAQ_OUV_D: string,
    E7_CREP_OUV_D: string,
    E7_CRAQ_PAT_D: string,
    E7_CRAQ_DOUL_HAB_D: string,
    E7_CREP_DOUL_HAB_D: string,
    E7_CREP_FERM_D: string,
    E6_CRAQ_DOUL_HAB_G: string,
    E7_CRAQ_DOUL_D: string,
    E6_CREP_FERM_D: string,
    E7_CREP_PAT_G: string,
    E7_CREP_OUV_G: string,
    E7_CRAQ_DOUL_HAB_G: string,
    E8_OUVERT_BLOC_D: string,
    E8_OUVERT_PAT_D: string,
    E8_OUVERT_EXAM_D: string,
    E8_OUVRANT_EXAM_G: string,
    E8_OUVERT_EXAM_G: string,
    E8_OUVERT_PAT_G: string,
    E8_OUVERT_BLOC_G: string,
    E8_OUVERT_REDUC_G: string,
    E8_OUVRANT_PAT_G: string,
    E8_OUVRANT_BLOC_D: string,
    E8_OUVRANT_EXAM_D: string,
    E8_OUVRANT_REDUC_G: string,
    E8_OUVRANT_REDUC_D: string,
    E8_OUVRANT_BLOC_G: string,
    E8_OUVRANT_PAT_D: string,
    E8_OUVERT_REDUC_D: string,
    E9_AL_DH_D: string,
    E9_MASS_COR_MAL_TETE_HAB_G: string,
    E9_AL_MTH_G: string,
    E9_TEMP_POST_DOUL_HAB_G: string,
    E9_TEMP_ANT_DOUL_HAB_D: string,
    E9_TEMP_ANT_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_REF_G: string,
    E9_TEMP_ANT_DOUL_D: string,
    E9_MASS_INS_DOUL_REF_D: string,
    E9_MASS_INS_DOUL_REF_G: string,
    E9_TEMP_MOY_MAL_TETE_HAB_G: string,
    E9_MASS_COR_MAL_TETE_HAB_D: string,
    E9_MASS_ORIG_DOUL_D: string,
    E9_MASS_ORIG_MAL_TETE_HAB_D: string,
    E9_PL_MTH_D: string,
    E9_TEMP_MOY_DOUL_G: string,
    E9_MASS_INS_MAL_TETE_HAB_G: string,
    E9_AL_DOU_REF_D: string,
    E9_TEMP_ANT_DOUL_G: string,
    E9_AL_DH_G: string,
    E9_MASS_ORIG_DOUL_REF_D: string,
    E9_MASS_ORIG_DOUL_G: string,
    E9_TEMP_POST_DOUL_G: string,
    E9_TEMP_MOY_DOUL_HAB_D: string,
    E9_MASS_INS_DOUL_HAB_D: string,
    E9_MASS_INS_MAL_TETE_HAB_D: string,
    E9_TEMP_POST_DOUL_REF_D: string,
    E9_PL_DH_D: string,
    E9_MASS_COR_DOUL_HAB_G: string,
    E9_TEMP_POST_MAL_TETE_HAB_D: string,
    E9_PL_DOU_REF_D: string,
    E9_PL_DH_G: string,
    E9_TEMP_POST_DOUL_HAB_D: string,
    E9_TEMP_POST_MAL_TETE_HAB_G: string,
    E9_TEMP_MOY_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_HAB_D: string,
    E9_MASS_INS_DOUL_HAB_G: string,
    E9_MASS_ORIG_DOUL_HAB_D: string,
    E9_AL_MTH_D: string,
    E9_TEMP_ANT_MAL_TETE_HAB_D: string,
    E9_MASS_ORIG_MAL_TETE_HABG: string,
    E9_MASS_INS_DOUL_D: string,
    E9_MASS_INS_DOUL_G: string,
    E9_TEMP_MOY_DOUL_HAB_G: string,
    E9_TEMP_POST_DOUL_D: string,
    E9_PL_MTH_G: string,
    E9_TEMP_MOY_MAL_TETE_HAB_D: string,
    E9_PL_DOU_REF_G: string,
    E9_TEMP_POST_DOUL_REF_G: string,
    E9_TEMP_ANT_MAL_TETE_HAB_G: string,
    E9_MASS_COR_DOUL_D: string,
    E9_TEMP_MOY_DOUL_D: string,
    E9_TEMP_MOY_DOUL_REF_G: string,
    E9_TEMP_ANT_DOUL_HAB_G: string,
    E9_MASS_ORIG_DOUL_HAB_G: string,
    E9_TEMP_ANT_DOUL_REF_G: string,
    E12: string,
    E10_REG_MAND_DOUL_REF_D: string,
    E10_REG_SOUS_DOUL_REF_D: string,
    E9_DOUL_PALP_D_DIGASTRIQUEPOS: string,
    E9_DOUL_PALP_G_MASSETER: string,
    E10_REG_SOUS_DOUL_REF_G: string,
    E10_REG_MAND_DOUL_HAB_D: string,
    E10_TEND_DOUL_HAB_D: string,
    E9_DOUL_PALP_G_PTERIGOIDIENMEDIAL: string,
    E13_Trait: string,
    E9_DOUL_PALP_D_PTERIGOIDIENMEDIAL: string,
    E10_REG_SOUS_DOUL_HAB_D: string,
    E11_DATMG: string,
    E11_DD: string,
    E9_DOUL_PALP_D_TEMPORAL: string,
    E9_DOUL_PALP_D_MASSETER: string,
    E9_DOUL_PALP_D_MUSCMASS: string,
    E9_DOUL_PALP_G_TEMPORAL: string,
    E9_DOUL_PALP_G_DIGASTRIQUEPOS: string,
    E9_DOUL_PALP_D_ATM: string,
    E11_DATMD: string,
    E10_REG_SOUS_DOUL_HAB_G: string,
    E10_REG_PTER_DOUL_HAB_G: string,
    E10_REG_MAND_DOUL_REF_G: string,
    E10_REG_MAND_DOUL_HAB_G: string,
    E9_DOUL_PALP_G_MUSCMASS: string,
    E9_DOUL_PALP_G_ATM: string,
    E10_REG_PTER_DOUL_REF_G: string,
    E10_REG_PTER_DOUL_HAB_D: string,
    E10_REG_PTER_DOUL_REF_D: string,
    E10_TEND_DOUL_REF_D: string,
    COMMENT: string,
    MD_MOR_G_TEMPORAL: string,
    MD_MOR_G_ATM: string,
    MD_MOR_G_MASSETER: string,
    MD_MOR_G_PTERIGOIDIENMEDIAL: string,
    MD_MOR_G_DIGASTRIQUEPOS: string,
    MD_MOR_G_MUSCMASS: string,
    MD_MOR_D_TEMPORAL: string,
    MD_MOR_D_ATM: string,
    MD_MOR_D_MASSETER: string,
    MD_MOR_D_PTERIGOIDIENMEDIAL: string,
    MD_MOR_D_DIGASTRIQUEPOS: string,
    MD_MOR_D_MUSCMASS: string,
    MD1: string,
    DC1: string,
    DC2: string,
    DC3: string,
    DC4: string,
    DC5: string,
    DC6: string,
    DC7: string,
    DC8: string,
    FM81: string,
    FM82: string,
    FM83: string,
    FM84: string,
    FM85: string,
    FM86: string,
    FM87: string,
    FM88: string,
    FM201: string,
    FM202: string,
    FM203: string,
    FM204: string,
    FM205: string,
    FM206: string,
    FM207: string,
    FM208: string,
    FM209: string,
    FM2010: string,
    FM2011: string,
    FM2012: string,
    PHQ41: string,
    PHQ42: string,
    PHQ43: string,
    PHQ44: string,
    PHQ91: string,
    PHQ92: string,
    PHQ93: string,
    PHQ94: string,
    PHQ95: string,
    PHQ96: string,
    PHQ97: string,
    PHQ151: string,
    PHQ152: string,
    PHQ153: string,
    PHQ154: string,
    PHQ155: string,
    PHQ156: string,
    PHQ157: string,
    PHQ158: string,
    PHQ159: string,
    PHQ1510: string,
    PHQ1511: string,
    PHQ1512: string,
    PHQ1513: string,
    PHQ1514: string,
    PHQ1515: string,
    GAD1: string,
    GAD2: string,
    GAD3: string,
    GAD4: string,
    GAD5: string,
    GAD6: string,
    GAD7: string,
    OBC1: string,
    OBC2: string,
    OBC3: string,
    OBC4: string,
    OBC5: string,
    OBC6: string,
    OBC7: string,
    OBC8: string,
    OBC9: string,
    OBC10: string,
    OBC11: string,
    OBC12: string,
    OBC13: string,
    OBC14: string,
    OBC15: string,
    OBC16: string,
    OBC17: string,
    OBC18: string,
    OBC19: string,
    OBC20: string,
    OBC21:string
  }
}
```
---
### Get un examen 

URL: ```https://api.meditrinae.com/exam-results/?id```

Type: ```GET```

Permission requise: ```meditrinae-api:exam-results:get```

Data Transfer Object (reçu):
```
{
  "_id"
  patientID: string,
  questions: {
    DD1: string,
    DD2: string,
    DD3A: string,
    DD3B: string,
    DD3C: string,
    DD3D: string,
    QS1: string,
    QS2: string,
    QS3: string,
    QS4A: string,
    QS4B: string,
    QS4C: string,
    QS5: string,
    QS6: string,
    QS7A: string,
    QS7B: string,
    QS7C: string,
    QS7D: string,
    QS8: string,
    QS8E: string,
    QS9: string,
    QS9E: string,
    QS10: string,
    QS10E: string,
    QS11: string,
    QS11E: string,
    QS12: string,
    QS12E: string,
    QS13: string,
    QS13E: string,
    QS14: string,
    QS14E: string,
    DEMO1: string,
    DEMO2: string,
    DEMO3: string,
    DEMO4: string,
    DEMO5: string,
    E1A_DOUL_D_DIGASTRIQUEPOS: string,
    E1A_DOUL_D_ATM: string,
    E1A_DOUL_G_PTERIGOIDIENMEDIAL: string,
    E2DIST_H: string,
    E1A_DOUL_D_PTERIGOIDIENMEDIAL: string,
    E1A_DOUL_G_MUSCMASS: string,
    E1B_D: string,
    E2REF: string,
    E1A_DOUL_G_TEMPORAL: string,
    E2DEVIA_MEDIA: string,
    E1A_DOUL_G_DIGASTRIQUEPOS: string,
    E2NEG_H: string,
    E1A_DOUL_D_MASSETER: string,
    E1A_DOUL_G_MASSETER: string,
    E1B_G: string,
    E2NEG_V: string,
    E2DIST_MEDIA: string,
    E31: string,
    E1A_DOUL_D_TEMPORAL: string,
    E32: string,
    E1A_DOUL_D_MUSCMASS: string,
    E1A_DOUL_G_ATM: string,
    E2DIST_V: string,
    E4_AVEC_TEMP_DH_D: string,
    E4_AVEC_MM_DH_D: string,
    E4A: string,
    E4_MA_G_DIGASTRIQUEPOS: string,
    E4_SANS_MAS_DH_G: string,
    E4_MA_G_TEMPORAL: string,
    E4_MS_G_ATM: string,
    E4_SANS_TEMP_MT_G: string,
    E4_MS_D_MUSCMASS: string,
    E4_SANS_TEMP_DH_G: string,
    E4_AVEC_TEMP_MT_G: string,
    E4_MA_D_MUSCMASS: string,
    E4_AVEC_TEMP_MT_D: string,
    E4_MA_D_DIGASTRIQUEPOS: string,
    E4_AVEC_ATM_DH_D: string,
    E4_MS_D_ATM: string,
    E4_MA_D_TEMPORAL: string,
    E4_MA_G_PTERIGOIDIENMEDIAL: string,
    E4_SANS_TEMP_MT_D: string,
    E4_AVEC_MAS_DH_G: string,
    E4_MS_G_MUSCMASS: string,
    E4B: string,
    E4_MA_G_MUSCMASS: string,
    E4_AVEC_ATM_DH_G: string,
    E4_MS_G_PTERIGOIDIENMEDIAL: string,
    E4_SANS_TEMP_DH_D: string,
    E4_MS_D_TEMPORAL: string,
    E4_MS_D_MASSETER: string,
    E4_SANS_MAS_DH_D: string,
    E4_SANS_ATM_DH_G: string,
    E4_SANS_TEMP_MM_G: string,
    E4_MA_D_ATM: string,
    E4_AVEC_AUTR_DH_G: string,
    E4_SANS_TEMP_MM_D: string,
    E4_AVEC_AUTR_DH_D: string,
    E4_MA_G_MASSETER: string,
    E4_SANS_ATM_DH_D: string,
    E4_MA_G_ATM: string,
    E4D: string,
    E4_MS_G_DIGASTRIQUEPOS: string,
    E4_MA_D_PTERIGOIDIENMEDIAL: string,
    E4C: string,
    E4_SANS_AUTR_DH_D: string,
    E4_AVEC_TEMP_MM_G: string,
    E4_MS_G_TEMPORAL: string,
    E4_SANS_AUTR_DH_G: string,
    E4_MS_D_PTERIGOIDIENMEDIAL: string,
    E4_AVEC_MAS_DH_D: string,
    E4_MA_D_MASSETER: string,
    E4_MS_D_DIGASTRIQUEPOS: string,
    E4_MS_G_MASSETER: string,
    E4_AVEC_TEMP_DH_G: string,
    E5_PROT_MAS_DH_G: string,
    E5_LG_D_ATM: string,
    E5_LD_G_TEMPORAL: string,
    E5_LG_D_DIGASTRIQUEPOS: string,
    E5_ATMD_TEMP_DH_D: string,
    E5_MASD_TEMP_DH_G: string,
    E5_PT_G_PTERIGOIDIENMEDIAL: string,
    E5_PROT_NM_DH_G: string,
    E5_AUTRG_TEMP_DH_G: string,
    E5_ATMG_TEMP_DH_D: string,
    E5_ATMG_TEMP_DH_G: string,
    E5_PROT_TEMP_DH_G: string,
    E5_LATD_MAl_TETE_G: string,
    E5_LG_D_MUSCMASS: string,
    E5_PT_D_MASSETER: string,
    E5_AUTRD_TEMP_DH_D: string,
    E5_LD_D_DIGASTRIQUEPOS: string,
    E5_LG_G_TEMPORAL: string,
    E5_PT_D_DIGASTRIQUEPOS: string,
    E5_LD_D_PTERIGOIDIENMEDIAL: string,
    E5_NMG_TEMP_DH_D: string,
    E5_MASG_TEMP_DH_G: string,
    E5_PT_G_MUSCMASS: string,
    E5_LD_D_MUSCMASS: string,
    E5_PT_D_MUSCMASS: string,
    E5B: string,
    E5_LATG_TEMP_DH_D: string,
    E5_LATD_TEMP_DH_D: string,
    E5_PT_G_ATM: string,
    E5_LD_G_MUSCMASS: string,
    E5_LG_G_MASSETER: string,
    E5_PROT_ATM_DH_D: string,
    E5_NMD_TEMP_DH_G: string,
    E5_PROT_MAl_TETE_D: string,
    E5_LD_G_MASSETER: string,
    E5_LG_G_MUSCMASS: string,
    E5_LATD_MAl_TETE_D: string,
    E5_LATG_MAl_TETE_D: string,
    E5_LG_D_MASSETER: string,
    E5_LD_D_MASSETER: string,
    E5_PT_D_ATM: string,
    E5_PT_D_TEMPORAL: string,
    E5_LG_G_DIGASTRIQUEPOS: string,
    E5_NMD_TEMP_DH_D: string,
    E5A: string,
    E5_MASD_TEMP_DH_D: string,
    E5_LG_G_PTERIGOIDIENMEDIAL: string,
    E5_LD_G_DIGASTRIQUEPOS: string,
    E5_LD_D_TEMPORAL: string,
    E5_PROT_AUTR_DH_G: string,
    E5_PT_G_MASSETER: string,
    E5_LATG_MAl_TETE_G: string,
    E5_LD_G_PTERIGOIDIENMEDIAL: string,
    E5_PROT_NM_DH_D: string,
    E5_PROT_MAl_TETE_G: string,
    E5C: string,
    E5_ATMD_TEMP_DH_G: string,
    E5_LD_G_ATM: string,
    E5_PROT_MAS_DH_D: string,
    E5D: string,
    E5_NMG_TEMP_DH_G: string,
    E5_PT_G_DIGASTRIQUEPOS: string,
    E5_LD_D_ATM: string,
    E5_AUTRG_TEMP_DH_D: string,
    E5_PROT_ATM_DH_G: string,
    E5_LG_D_TEMPORAL: string,
    E5_LATD_TEMP_DH_G: string,
    E5_PROT_AUTR_DH_D: string,
    E5_PT_G_TEMPORAL: string,
    E5_AUTRD_TEMP_DH_G: string,
    E5_LG_D_PTERIGOIDIENMEDIAL: string,
    E5_LG_G_ATM: string,
    E5_PT_D_PTERIGOIDIENMEDIAL: string,
    E5_MASG_TEMP_DH_D: string,
    E5_LATG_TEMP_DH_G: string,
    E5_PROT_TEMP_DH_D: string,
    E6_CRAQ_FERM_D: string,
    E7_CRAQ_DOUL_G: string,
    E7_CREP_DOUL_HAB_G: string,
    E6_CREP_OUV_G: string,
    E6_CREP_DOUL_G: string,
    E7_CRAQ_FERM_D: string,
    E7_CREP_DOUL_G: string,
    E6_CREP_DOUL_D: string,
    E6_CREP_OUV_D: string,
    E6_CREP_DOUL_HAB_G: string,
    E6_CREP_DOU_HAB_D: string,
    E6_CRAQ_OUV_G: string,
    E7_CRAQ_FERM_G: string,
    E6_CRAQ_DOUL_D: string,
    E6_CRAQ_DOUL_G: string,
    E6_CREP_PAT_G: string,
    E6_CRAQ_PAT_D: string,
    E6_CRAQ_FERM_G: string,
    E7_CRAQ_OUV_D: string,
    E7_CREP_PAT_D: string,
    E6_CREP_FERM_G: string,
    E7_CREP_DOUL_D: string,
    E7_CRAQ_PAT_G: string,
    E7_CREP_FERM_G: string,
    E6_CRAQ_DOUL_HAB_D: string,
    E6_CREP_PAT_D: string,
    E6_CRAQ_PAT_G: string,
    E7_CRAQ_OUV_G: string,
    E6_CRAQ_OUV_D: string,
    E7_CREP_OUV_D: string,
    E7_CRAQ_PAT_D: string,
    E7_CRAQ_DOUL_HAB_D: string,
    E7_CREP_DOUL_HAB_D: string,
    E7_CREP_FERM_D: string,
    E6_CRAQ_DOUL_HAB_G: string,
    E7_CRAQ_DOUL_D: string,
    E6_CREP_FERM_D: string,
    E7_CREP_PAT_G: string,
    E7_CREP_OUV_G: string,
    E7_CRAQ_DOUL_HAB_G: string,
    E8_OUVERT_BLOC_D: string,
    E8_OUVERT_PAT_D: string,
    E8_OUVERT_EXAM_D: string,
    E8_OUVRANT_EXAM_G: string,
    E8_OUVERT_EXAM_G: string,
    E8_OUVERT_PAT_G: string,
    E8_OUVERT_BLOC_G: string,
    E8_OUVERT_REDUC_G: string,
    E8_OUVRANT_PAT_G: string,
    E8_OUVRANT_BLOC_D: string,
    E8_OUVRANT_EXAM_D: string,
    E8_OUVRANT_REDUC_G: string,
    E8_OUVRANT_REDUC_D: string,
    E8_OUVRANT_BLOC_G: string,
    E8_OUVRANT_PAT_D: string,
    E8_OUVERT_REDUC_D: string,
    E9_AL_DH_D: string,
    E9_MASS_COR_MAL_TETE_HAB_G: string,
    E9_AL_MTH_G: string,
    E9_TEMP_POST_DOUL_HAB_G: string,
    E9_TEMP_ANT_DOUL_HAB_D: string,
    E9_TEMP_ANT_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_REF_G: string,
    E9_TEMP_ANT_DOUL_D: string,
    E9_MASS_INS_DOUL_REF_D: string,
    E9_MASS_INS_DOUL_REF_G: string,
    E9_TEMP_MOY_MAL_TETE_HAB_G: string,
    E9_MASS_COR_MAL_TETE_HAB_D: string,
    E9_MASS_ORIG_DOUL_D: string,
    E9_MASS_ORIG_MAL_TETE_HAB_D: string,
    E9_PL_MTH_D: string,
    E9_TEMP_MOY_DOUL_G: string,
    E9_MASS_INS_MAL_TETE_HAB_G: string,
    E9_AL_DOU_REF_D: string,
    E9_TEMP_ANT_DOUL_G: string,
    E9_AL_DH_G: string,
    E9_MASS_ORIG_DOUL_REF_D: string,
    E9_MASS_ORIG_DOUL_G: string,
    E9_TEMP_POST_DOUL_G: string,
    E9_TEMP_MOY_DOUL_HAB_D: string,
    E9_MASS_INS_DOUL_HAB_D: string,
    E9_MASS_INS_MAL_TETE_HAB_D: string,
    E9_TEMP_POST_DOUL_REF_D: string,
    E9_PL_DH_D: string,
    E9_MASS_COR_DOUL_HAB_G: string,
    E9_TEMP_POST_MAL_TETE_HAB_D: string,
    E9_PL_DOU_REF_D: string,
    E9_PL_DH_G: string,
    E9_TEMP_POST_DOUL_HAB_D: string,
    E9_TEMP_POST_MAL_TETE_HAB_G: string,
    E9_TEMP_MOY_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_HAB_D: string,
    E9_MASS_INS_DOUL_HAB_G: string,
    E9_MASS_ORIG_DOUL_HAB_D: string,
    E9_AL_MTH_D: string,
    E9_TEMP_ANT_MAL_TETE_HAB_D: string,
    E9_MASS_ORIG_MAL_TETE_HABG: string,
    E9_MASS_INS_DOUL_D: string,
    E9_MASS_INS_DOUL_G: string,
    E9_TEMP_MOY_DOUL_HAB_G: string,
    E9_TEMP_POST_DOUL_D: string,
    E9_PL_MTH_G: string,
    E9_TEMP_MOY_MAL_TETE_HAB_D: string,
    E9_PL_DOU_REF_G: string,
    E9_TEMP_POST_DOUL_REF_G: string,
    E9_TEMP_ANT_MAL_TETE_HAB_G: string,
    E9_MASS_COR_DOUL_D: string,
    E9_TEMP_MOY_DOUL_D: string,
    E9_TEMP_MOY_DOUL_REF_G: string,
    E9_TEMP_ANT_DOUL_HAB_G: string,
    E9_MASS_ORIG_DOUL_HAB_G: string,
    E9_TEMP_ANT_DOUL_REF_G: string,
    E12: string,
    E10_REG_MAND_DOUL_REF_D: string,
    E10_REG_SOUS_DOUL_REF_D: string,
    E9_DOUL_PALP_D_DIGASTRIQUEPOS: string,
    E9_DOUL_PALP_G_MASSETER: string,
    E10_REG_SOUS_DOUL_REF_G: string,
    E10_REG_MAND_DOUL_HAB_D: string,
    E10_TEND_DOUL_HAB_D: string,
    E9_DOUL_PALP_G_PTERIGOIDIENMEDIAL: string,
    E13_Trait: string,
    E9_DOUL_PALP_D_PTERIGOIDIENMEDIAL: string,
    E10_REG_SOUS_DOUL_HAB_D: string,
    E11_DATMG: string,
    E11_DD: string,
    E9_DOUL_PALP_D_TEMPORAL: string,
    E9_DOUL_PALP_D_MASSETER: string,
    E9_DOUL_PALP_D_MUSCMASS: string,
    E9_DOUL_PALP_G_TEMPORAL: string,
    E9_DOUL_PALP_G_DIGASTRIQUEPOS: string,
    E9_DOUL_PALP_D_ATM: string,
    E11_DATMD: string,
    E10_REG_SOUS_DOUL_HAB_G: string,
    E10_REG_PTER_DOUL_HAB_G: string,
    E10_REG_MAND_DOUL_REF_G: string,
    E10_REG_MAND_DOUL_HAB_G: string,
    E9_DOUL_PALP_G_MUSCMASS: string,
    E9_DOUL_PALP_G_ATM: string,
    E10_REG_PTER_DOUL_REF_G: string,
    E10_REG_PTER_DOUL_HAB_D: string,
    E10_REG_PTER_DOUL_REF_D: string,
    E10_TEND_DOUL_REF_D: string,
    COMMENT: string,
    MD_MOR_G_TEMPORAL: string,
    MD_MOR_G_ATM: string,
    MD_MOR_G_MASSETER: string,
    MD_MOR_G_PTERIGOIDIENMEDIAL: string,
    MD_MOR_G_DIGASTRIQUEPOS: string,
    MD_MOR_G_MUSCMASS: string,
    MD_MOR_D_TEMPORAL: string,
    MD_MOR_D_ATM: string,
    MD_MOR_D_MASSETER: string,
    MD_MOR_D_PTERIGOIDIENMEDIAL: string,
    MD_MOR_D_DIGASTRIQUEPOS: string,
    MD_MOR_D_MUSCMASS: string,
    MD1: string,
    DC1: string,
    DC2: string,
    DC3: string,
    DC4: string,
    DC5: string,
    DC6: string,
    DC7: string,
    DC8: string,
    FM81: string,
    FM82: string,
    FM83: string,
    FM84: string,
    FM85: string,
    FM86: string,
    FM87: string,
    FM88: string,
    FM201: string,
    FM202: string,
    FM203: string,
    FM204: string,
    FM205: string,
    FM206: string,
    FM207: string,
    FM208: string,
    FM209: string,
    FM2010: string,
    FM2011: string,
    FM2012: string,
    PHQ41: string,
    PHQ42: string,
    PHQ43: string,
    PHQ44: string,
    PHQ91: string,
    PHQ92: string,
    PHQ93: string,
    PHQ94: string,
    PHQ95: string,
    PHQ96: string,
    PHQ97: string,
    PHQ151: string,
    PHQ152: string,
    PHQ153: string,
    PHQ154: string,
    PHQ155: string,
    PHQ156: string,
    PHQ157: string,
    PHQ158: string,
    PHQ159: string,
    PHQ1510: string,
    PHQ1511: string,
    PHQ1512: string,
    PHQ1513: string,
    PHQ1514: string,
    PHQ1515: string,
    GAD1: string,
    GAD2: string,
    GAD3: string,
    GAD4: string,
    GAD5: string,
    GAD6: string,
    GAD7: string,
    OBC1: string,
    OBC2: string,
    OBC3: string,
    OBC4: string,
    OBC5: string,
    OBC6: string,
    OBC7: string,
    OBC8: string,
    OBC9: string,
    OBC10: string,
    OBC11: string,
    OBC12: string,
    OBC13: string,
    OBC14: string,
    OBC15: string,
    OBC16: string,
    OBC17: string,
    OBC18: string,
    OBC19: string,
    OBC20: string,
    OBC21:string
  }
}
```
---
### Get tous les examens

URL: ```https://api.meditrinae.com/exam-results```

Type: ```GET```

Permission requise: ```meditrinae-api:exam-results:get```

Data Transfer Object (reçu):
```
[{
  "_id"
  patientID: string,
  questions: {
    DD1: string,
    DD2: string,
    DD3A: string,
    DD3B: string,
    DD3C: string,
    DD3D: string,
    QS1: string,
    QS2: string,
    QS3: string,
    QS4A: string,
    QS4B: string,
    QS4C: string,
    QS5: string,
    QS6: string,
    QS7A: string,
    QS7B: string,
    QS7C: string,
    QS7D: string,
    QS8: string,
    QS8E: string,
    QS9: string,
    QS9E: string,
    QS10: string,
    QS10E: string,
    QS11: string,
    QS11E: string,
    QS12: string,
    QS12E: string,
    QS13: string,
    QS13E: string,
    QS14: string,
    QS14E: string,
    DEMO1: string,
    DEMO2: string,
    DEMO3: string,
    DEMO4: string,
    DEMO5: string,
    E1A_DOUL_D_DIGASTRIQUEPOS: string,
    E1A_DOUL_D_ATM: string,
    E1A_DOUL_G_PTERIGOIDIENMEDIAL: string,
    E2DIST_H: string,
    E1A_DOUL_D_PTERIGOIDIENMEDIAL: string,
    E1A_DOUL_G_MUSCMASS: string,
    E1B_D: string,
    E2REF: string,
    E1A_DOUL_G_TEMPORAL: string,
    E2DEVIA_MEDIA: string,
    E1A_DOUL_G_DIGASTRIQUEPOS: string,
    E2NEG_H: string,
    E1A_DOUL_D_MASSETER: string,
    E1A_DOUL_G_MASSETER: string,
    E1B_G: string,
    E2NEG_V: string,
    E2DIST_MEDIA: string,
    E31: string,
    E1A_DOUL_D_TEMPORAL: string,
    E32: string,
    E1A_DOUL_D_MUSCMASS: string,
    E1A_DOUL_G_ATM: string,
    E2DIST_V: string,
    E4_AVEC_TEMP_DH_D: string,
    E4_AVEC_MM_DH_D: string,
    E4A: string,
    E4_MA_G_DIGASTRIQUEPOS: string,
    E4_SANS_MAS_DH_G: string,
    E4_MA_G_TEMPORAL: string,
    E4_MS_G_ATM: string,
    E4_SANS_TEMP_MT_G: string,
    E4_MS_D_MUSCMASS: string,
    E4_SANS_TEMP_DH_G: string,
    E4_AVEC_TEMP_MT_G: string,
    E4_MA_D_MUSCMASS: string,
    E4_AVEC_TEMP_MT_D: string,
    E4_MA_D_DIGASTRIQUEPOS: string,
    E4_AVEC_ATM_DH_D: string,
    E4_MS_D_ATM: string,
    E4_MA_D_TEMPORAL: string,
    E4_MA_G_PTERIGOIDIENMEDIAL: string,
    E4_SANS_TEMP_MT_D: string,
    E4_AVEC_MAS_DH_G: string,
    E4_MS_G_MUSCMASS: string,
    E4B: string,
    E4_MA_G_MUSCMASS: string,
    E4_AVEC_ATM_DH_G: string,
    E4_MS_G_PTERIGOIDIENMEDIAL: string,
    E4_SANS_TEMP_DH_D: string,
    E4_MS_D_TEMPORAL: string,
    E4_MS_D_MASSETER: string,
    E4_SANS_MAS_DH_D: string,
    E4_SANS_ATM_DH_G: string,
    E4_SANS_TEMP_MM_G: string,
    E4_MA_D_ATM: string,
    E4_AVEC_AUTR_DH_G: string,
    E4_SANS_TEMP_MM_D: string,
    E4_AVEC_AUTR_DH_D: string,
    E4_MA_G_MASSETER: string,
    E4_SANS_ATM_DH_D: string,
    E4_MA_G_ATM: string,
    E4D: string,
    E4_MS_G_DIGASTRIQUEPOS: string,
    E4_MA_D_PTERIGOIDIENMEDIAL: string,
    E4C: string,
    E4_SANS_AUTR_DH_D: string,
    E4_AVEC_TEMP_MM_G: string,
    E4_MS_G_TEMPORAL: string,
    E4_SANS_AUTR_DH_G: string,
    E4_MS_D_PTERIGOIDIENMEDIAL: string,
    E4_AVEC_MAS_DH_D: string,
    E4_MA_D_MASSETER: string,
    E4_MS_D_DIGASTRIQUEPOS: string,
    E4_MS_G_MASSETER: string,
    E4_AVEC_TEMP_DH_G: string,
    E5_PROT_MAS_DH_G: string,
    E5_LG_D_ATM: string,
    E5_LD_G_TEMPORAL: string,
    E5_LG_D_DIGASTRIQUEPOS: string,
    E5_ATMD_TEMP_DH_D: string,
    E5_MASD_TEMP_DH_G: string,
    E5_PT_G_PTERIGOIDIENMEDIAL: string,
    E5_PROT_NM_DH_G: string,
    E5_AUTRG_TEMP_DH_G: string,
    E5_ATMG_TEMP_DH_D: string,
    E5_ATMG_TEMP_DH_G: string,
    E5_PROT_TEMP_DH_G: string,
    E5_LATD_MAl_TETE_G: string,
    E5_LG_D_MUSCMASS: string,
    E5_PT_D_MASSETER: string,
    E5_AUTRD_TEMP_DH_D: string,
    E5_LD_D_DIGASTRIQUEPOS: string,
    E5_LG_G_TEMPORAL: string,
    E5_PT_D_DIGASTRIQUEPOS: string,
    E5_LD_D_PTERIGOIDIENMEDIAL: string,
    E5_NMG_TEMP_DH_D: string,
    E5_MASG_TEMP_DH_G: string,
    E5_PT_G_MUSCMASS: string,
    E5_LD_D_MUSCMASS: string,
    E5_PT_D_MUSCMASS: string,
    E5B: string,
    E5_LATG_TEMP_DH_D: string,
    E5_LATD_TEMP_DH_D: string,
    E5_PT_G_ATM: string,
    E5_LD_G_MUSCMASS: string,
    E5_LG_G_MASSETER: string,
    E5_PROT_ATM_DH_D: string,
    E5_NMD_TEMP_DH_G: string,
    E5_PROT_MAl_TETE_D: string,
    E5_LD_G_MASSETER: string,
    E5_LG_G_MUSCMASS: string,
    E5_LATD_MAl_TETE_D: string,
    E5_LATG_MAl_TETE_D: string,
    E5_LG_D_MASSETER: string,
    E5_LD_D_MASSETER: string,
    E5_PT_D_ATM: string,
    E5_PT_D_TEMPORAL: string,
    E5_LG_G_DIGASTRIQUEPOS: string,
    E5_NMD_TEMP_DH_D: string,
    E5A: string,
    E5_MASD_TEMP_DH_D: string,
    E5_LG_G_PTERIGOIDIENMEDIAL: string,
    E5_LD_G_DIGASTRIQUEPOS: string,
    E5_LD_D_TEMPORAL: string,
    E5_PROT_AUTR_DH_G: string,
    E5_PT_G_MASSETER: string,
    E5_LATG_MAl_TETE_G: string,
    E5_LD_G_PTERIGOIDIENMEDIAL: string,
    E5_PROT_NM_DH_D: string,
    E5_PROT_MAl_TETE_G: string,
    E5C: string,
    E5_ATMD_TEMP_DH_G: string,
    E5_LD_G_ATM: string,
    E5_PROT_MAS_DH_D: string,
    E5D: string,
    E5_NMG_TEMP_DH_G: string,
    E5_PT_G_DIGASTRIQUEPOS: string,
    E5_LD_D_ATM: string,
    E5_AUTRG_TEMP_DH_D: string,
    E5_PROT_ATM_DH_G: string,
    E5_LG_D_TEMPORAL: string,
    E5_LATD_TEMP_DH_G: string,
    E5_PROT_AUTR_DH_D: string,
    E5_PT_G_TEMPORAL: string,
    E5_AUTRD_TEMP_DH_G: string,
    E5_LG_D_PTERIGOIDIENMEDIAL: string,
    E5_LG_G_ATM: string,
    E5_PT_D_PTERIGOIDIENMEDIAL: string,
    E5_MASG_TEMP_DH_D: string,
    E5_LATG_TEMP_DH_G: string,
    E5_PROT_TEMP_DH_D: string,
    E6_CRAQ_FERM_D: string,
    E7_CRAQ_DOUL_G: string,
    E7_CREP_DOUL_HAB_G: string,
    E6_CREP_OUV_G: string,
    E6_CREP_DOUL_G: string,
    E7_CRAQ_FERM_D: string,
    E7_CREP_DOUL_G: string,
    E6_CREP_DOUL_D: string,
    E6_CREP_OUV_D: string,
    E6_CREP_DOUL_HAB_G: string,
    E6_CREP_DOU_HAB_D: string,
    E6_CRAQ_OUV_G: string,
    E7_CRAQ_FERM_G: string,
    E6_CRAQ_DOUL_D: string,
    E6_CRAQ_DOUL_G: string,
    E6_CREP_PAT_G: string,
    E6_CRAQ_PAT_D: string,
    E6_CRAQ_FERM_G: string,
    E7_CRAQ_OUV_D: string,
    E7_CREP_PAT_D: string,
    E6_CREP_FERM_G: string,
    E7_CREP_DOUL_D: string,
    E7_CRAQ_PAT_G: string,
    E7_CREP_FERM_G: string,
    E6_CRAQ_DOUL_HAB_D: string,
    E6_CREP_PAT_D: string,
    E6_CRAQ_PAT_G: string,
    E7_CRAQ_OUV_G: string,
    E6_CRAQ_OUV_D: string,
    E7_CREP_OUV_D: string,
    E7_CRAQ_PAT_D: string,
    E7_CRAQ_DOUL_HAB_D: string,
    E7_CREP_DOUL_HAB_D: string,
    E7_CREP_FERM_D: string,
    E6_CRAQ_DOUL_HAB_G: string,
    E7_CRAQ_DOUL_D: string,
    E6_CREP_FERM_D: string,
    E7_CREP_PAT_G: string,
    E7_CREP_OUV_G: string,
    E7_CRAQ_DOUL_HAB_G: string,
    E8_OUVERT_BLOC_D: string,
    E8_OUVERT_PAT_D: string,
    E8_OUVERT_EXAM_D: string,
    E8_OUVRANT_EXAM_G: string,
    E8_OUVERT_EXAM_G: string,
    E8_OUVERT_PAT_G: string,
    E8_OUVERT_BLOC_G: string,
    E8_OUVERT_REDUC_G: string,
    E8_OUVRANT_PAT_G: string,
    E8_OUVRANT_BLOC_D: string,
    E8_OUVRANT_EXAM_D: string,
    E8_OUVRANT_REDUC_G: string,
    E8_OUVRANT_REDUC_D: string,
    E8_OUVRANT_BLOC_G: string,
    E8_OUVRANT_PAT_D: string,
    E8_OUVERT_REDUC_D: string,
    E9_AL_DH_D: string,
    E9_MASS_COR_MAL_TETE_HAB_G: string,
    E9_AL_MTH_G: string,
    E9_TEMP_POST_DOUL_HAB_G: string,
    E9_TEMP_ANT_DOUL_HAB_D: string,
    E9_TEMP_ANT_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_REF_G: string,
    E9_TEMP_ANT_DOUL_D: string,
    E9_MASS_INS_DOUL_REF_D: string,
    E9_MASS_INS_DOUL_REF_G: string,
    E9_TEMP_MOY_MAL_TETE_HAB_G: string,
    E9_MASS_COR_MAL_TETE_HAB_D: string,
    E9_MASS_ORIG_DOUL_D: string,
    E9_MASS_ORIG_MAL_TETE_HAB_D: string,
    E9_PL_MTH_D: string,
    E9_TEMP_MOY_DOUL_G: string,
    E9_MASS_INS_MAL_TETE_HAB_G: string,
    E9_AL_DOU_REF_D: string,
    E9_TEMP_ANT_DOUL_G: string,
    E9_AL_DH_G: string,
    E9_MASS_ORIG_DOUL_REF_D: string,
    E9_MASS_ORIG_DOUL_G: string,
    E9_TEMP_POST_DOUL_G: string,
    E9_TEMP_MOY_DOUL_HAB_D: string,
    E9_MASS_INS_DOUL_HAB_D: string,
    E9_MASS_INS_MAL_TETE_HAB_D: string,
    E9_TEMP_POST_DOUL_REF_D: string,
    E9_PL_DH_D: string,
    E9_MASS_COR_DOUL_HAB_G: string,
    E9_TEMP_POST_MAL_TETE_HAB_D: string,
    E9_PL_DOU_REF_D: string,
    E9_PL_DH_G: string,
    E9_TEMP_POST_DOUL_HAB_D: string,
    E9_TEMP_POST_MAL_TETE_HAB_G: string,
    E9_TEMP_MOY_DOUL_REF_D: string,
    E9_MASS_COR_DOUL_HAB_D: string,
    E9_MASS_INS_DOUL_HAB_G: string,
    E9_MASS_ORIG_DOUL_HAB_D: string,
    E9_AL_MTH_D: string,
    E9_TEMP_ANT_MAL_TETE_HAB_D: string,
    E9_MASS_ORIG_MAL_TETE_HABG: string,
    E9_MASS_INS_DOUL_D: string,
    E9_MASS_INS_DOUL_G: string,
    E9_TEMP_MOY_DOUL_HAB_G: string,
    E9_TEMP_POST_DOUL_D: string,
    E9_PL_MTH_G: string,
    E9_TEMP_MOY_MAL_TETE_HAB_D: string,
    E9_PL_DOU_REF_G: string,
    E9_TEMP_POST_DOUL_REF_G: string,
    E9_TEMP_ANT_MAL_TETE_HAB_G: string,
    E9_MASS_COR_DOUL_D: string,
    E9_TEMP_MOY_DOUL_D: string,
    E9_TEMP_MOY_DOUL_REF_G: string,
    E9_TEMP_ANT_DOUL_HAB_G: string,
    E9_MASS_ORIG_DOUL_HAB_G: string,
    E9_TEMP_ANT_DOUL_REF_G: string,
    E12: string,
    E10_REG_MAND_DOUL_REF_D: string,
    E10_REG_SOUS_DOUL_REF_D: string,
    E9_DOUL_PALP_D_DIGASTRIQUEPOS: string,
    E9_DOUL_PALP_G_MASSETER: string,
    E10_REG_SOUS_DOUL_REF_G: string,
    E10_REG_MAND_DOUL_HAB_D: string,
    E10_TEND_DOUL_HAB_D: string,
    E9_DOUL_PALP_G_PTERIGOIDIENMEDIAL: string,
    E13_Trait: string,
    E9_DOUL_PALP_D_PTERIGOIDIENMEDIAL: string,
    E10_REG_SOUS_DOUL_HAB_D: string,
    E11_DATMG: string,
    E11_DD: string,
    E9_DOUL_PALP_D_TEMPORAL: string,
    E9_DOUL_PALP_D_MASSETER: string,
    E9_DOUL_PALP_D_MUSCMASS: string,
    E9_DOUL_PALP_G_TEMPORAL: string,
    E9_DOUL_PALP_G_DIGASTRIQUEPOS: string,
    E9_DOUL_PALP_D_ATM: string,
    E11_DATMD: string,
    E10_REG_SOUS_DOUL_HAB_G: string,
    E10_REG_PTER_DOUL_HAB_G: string,
    E10_REG_MAND_DOUL_REF_G: string,
    E10_REG_MAND_DOUL_HAB_G: string,
    E9_DOUL_PALP_G_MUSCMASS: string,
    E9_DOUL_PALP_G_ATM: string,
    E10_REG_PTER_DOUL_REF_G: string,
    E10_REG_PTER_DOUL_HAB_D: string,
    E10_REG_PTER_DOUL_REF_D: string,
    E10_TEND_DOUL_REF_D: string,
    COMMENT: string,
    MD_MOR_G_TEMPORAL: string,
    MD_MOR_G_ATM: string,
    MD_MOR_G_MASSETER: string,
    MD_MOR_G_PTERIGOIDIENMEDIAL: string,
    MD_MOR_G_DIGASTRIQUEPOS: string,
    MD_MOR_G_MUSCMASS: string,
    MD_MOR_D_TEMPORAL: string,
    MD_MOR_D_ATM: string,
    MD_MOR_D_MASSETER: string,
    MD_MOR_D_PTERIGOIDIENMEDIAL: string,
    MD_MOR_D_DIGASTRIQUEPOS: string,
    MD_MOR_D_MUSCMASS: string,
    MD1: string,
    DC1: string,
    DC2: string,
    DC3: string,
    DC4: string,
    DC5: string,
    DC6: string,
    DC7: string,
    DC8: string,
    FM81: string,
    FM82: string,
    FM83: string,
    FM84: string,
    FM85: string,
    FM86: string,
    FM87: string,
    FM88: string,
    FM201: string,
    FM202: string,
    FM203: string,
    FM204: string,
    FM205: string,
    FM206: string,
    FM207: string,
    FM208: string,
    FM209: string,
    FM2010: string,
    FM2011: string,
    FM2012: string,
    PHQ41: string,
    PHQ42: string,
    PHQ43: string,
    PHQ44: string,
    PHQ91: string,
    PHQ92: string,
    PHQ93: string,
    PHQ94: string,
    PHQ95: string,
    PHQ96: string,
    PHQ97: string,
    PHQ151: string,
    PHQ152: string,
    PHQ153: string,
    PHQ154: string,
    PHQ155: string,
    PHQ156: string,
    PHQ157: string,
    PHQ158: string,
    PHQ159: string,
    PHQ1510: string,
    PHQ1511: string,
    PHQ1512: string,
    PHQ1513: string,
    PHQ1514: string,
    PHQ1515: string,
    GAD1: string,
    GAD2: string,
    GAD3: string,
    GAD4: string,
    GAD5: string,
    GAD6: string,
    GAD7: string,
    OBC1: string,
    OBC2: string,
    OBC3: string,
    OBC4: string,
    OBC5: string,
    OBC6: string,
    OBC7: string,
    OBC8: string,
    OBC9: string,
    OBC10: string,
    OBC11: string,
    OBC12: string,
    OBC13: string,
    OBC14: string,
    OBC15: string,
    OBC16: string,
    OBC17: string,
    OBC18: string,
    OBC19: string,
    OBC20: string,
    OBC21:string
  }
}]
```
---
### Get un id de patient (prototype seulement)
TODO

URL: ```https://api.meditrinae.com/exam-results/patient-id```

Type: ```GET```

Permission requise: ```meditrinae-api:exam-results:create```

Data Transfer Object (reçu):
```
{
    "patientId": string
}
```
---
### Export des données

URL: ```https://api.meditrinae.com/exam-results/export-data```

Type: ```GET```

Permission requise: ```aucune```

Data Transfer Object (reçu):
TODO
```Changera sous peu côté serveur```

---
### Mise à jour d'un résultat d'examen
---
### Get tous les examens

URL: ```https://api.meditrinae.com/exam-results```

Type: ```GET```

Permission requise: ```meditrinae-api:exam-results:get```

Data Transfer Object (reçu):
TODO
```
[{
    "questions": {
        "nom de question": string,
        "nom de question": string,
        etc...
    },
    "patientID": string,
    "_id": string
}, ...]
```
note: seulement les variables peuplées (dans questions) sont envoyées.

---
---
## Résultat de formulaires (DEPRECATED, remplacé par résultats d'examens)
---
---
## Template de formulaire (DEPRECATED, fonctionnalité côté client seulement maintenant)
---
---
## Examen médical

### Création d'un examen médical

URL: ```https://api.meditrinae.com/medical-exams```

Type: ```POST```

Permission requise: ```meditrinae-api:medical-exams:create```

Data Transfer Object (envoyé):

```
{
    "diagnosis"?:string,
    "examResults"?: [{
        "patientId":string,
        "questions": {
            "nom de variable": string,
            ...
        }
    }, ...],
    "patient": string,
    "practician": string,
    "treatment": string
}
```

Data Transfer Object (reçu):
```
{
    "_id": string,
    "diagnosis"?:string,
    "examResults"?: [{
        "patientId":string,
        "questions": {
            "nom de variable": string,
            ...
        }
    }, ...],
    "patient": string,
    "practician": string,
    "treatment": string
}
```
---
### Mise à jour d'un examen médical

URL: ```https://api.meditrinae.com/medical-exams```

Type: ```PUT```

Permission requise: ```meditrinae-api:medical-exams:update```

Data Transfer Object (envoyé):

```
{
    "_id": string,
    "diagnosis"?:string,
    "examResults"?: [{
        "patientId":string,
        "questions": {
            "nom de variable": string,
            ...
        }
    }, ...],
    "patient": string,
    "practician": string,
    "treatment": string
}
```

Data Transfer Object (reçu):
```
{
    "_id": string,
    "diagnosis"?:string,
    "examResults"?: [{
        "patientId":string,
        "questions": {
            "nom de variable": string,
            ...
        }
    }, ...],
    "patient": string,
    "practician": string,
    "treatment": string
}
```
---
### Get un examen médical

URL: ```https://api.meditrinae.com/medical-exams/?id```

Type: ```GET```

Permission requise: ```meditrinae-api:medical-exams:get```

Data Transfer Object (reçu):
```
{
    "_id": string,
    "diagnosis"?:string,
    "examResults"?: [{
        "patientId":string,
        "questions": {
            "nom de variable": string,
            ...
        }
    }, ...],
    "patient": string,
    "practician": string,
    "treatment": string
}
```
---
### Get les résultats d'examens associés à un examen médical

URL: ```https://api.meditrinae.com/medical-exams/?id/exam-results```

Type: ```GET```

Permission requise: ```meditrinae-api:medical-exams:get```


Data Transfer Object (reçu):
```
[
    {
        "patientId":string,
        "questions": {
            "nom de variable": string,
            ...
        }
    }, ...
]
```
---

### Get les configurations de forms associés à un examen médical (DEPRECATED)

---
---

## Patients

### Get tous les patients
URL: ```https://api.meditrinae.com/patients```

Type: ```GET```

Permission requise: ```meditrinae-api:patients:get```

Data Transfer Object (reçu):
```
[
    {
        "address": string,
        "clinic": string,
        "dateCreated": string,
        "dateModified": string,
        "dateOfBirth": string,
        "email"?:string,
        "firstName": string,
        "gender": string,
        "lastName": string,
        "medicalexams": string[] ou ExamResultInterface[],
        "note": string
    }, ...
]
```
---
### Get la quantité totale de patients

URL: ```https://api.meditrinae.com/patients/count```

Type: ```GET```

Permission requise: ```meditrinae-api:patients:get```

Data Transfer Object (reçu):
```
TODO
mais risque fortement d'être simplement un nombre
```
---
---
### Get la quantité de patients d'une clinique particulière

URL: ```https://api.meditrinae.com/patients/clinics/?id/count```

Type: ```GET```

Permission requise: ```meditrinae-api:patients:get```

Data Transfer Object (reçu):
```
TODO
mais risque fortement d'être simplement un nombre
```

---
### Get la liste des patients actifs d'une clinique

URL: ```https://api.meditrinae.com/patients/active/?id```

Type: ```GET```

Permission requise: ```meditrinae-api:patients:get```

Data Transfer Object (reçu):
```
[
    {
        "address": string,
        "clinic": string,
        "dateCreated": string,
        "dateModified": string,
        "dateOfBirth": string,
        "email"?:string,
        "firstName": string,
        "gender": string,
        "lastName": string,
        "medicalexams": string[] ou ExamResultInterface[],
        "note": string
    }, ...
]
```

---

---
### Get tous les examens médicaux associés à un patient

URL: ```https://api.meditrinae.com/patients/?id/medical-exams```

Type: ```GET```

Permission requise: ```meditrinae-api:medical-exams:get```

Data Transfer Object (reçu):
```
[
    {
        "_id": string,
        "diagnosis"?:string,
        "examResults"?: [{
            "patientId":string,
            "questions": {
                "nom de variable": string,
                ...
            }
        }, ...],
        "patient": string,
        "practician": string,
        "treatment": string
    }, ...
```


---
### Get un patient spécifique
URL: ```https://api.meditrinae.com/patients/?id```

Type: ```GET```

Permission requise: ```meditrinae-api:patients:get```

Data Transfer Object (reçu):
```
{
    "address": string,
    "clinic": string,
    "dateCreated": string,
    "dateModified": string,
    "dateOfBirth": string,
    "email"?:string,
    "firstName": string,
    "gender": string,
    "lastName": string,
    "medicalexams": string[] ou ExamResultInterface[],
    "note": string
}
```

---
### Créer un nouveau patient
URL: ```https://api.meditrinae.com/patients```

Type: ```POST```

Permission requise: ```meditrinae-api:patients:create```

Data Transfer Object (envoyé):
```
{
    "address": string,
    "clinic": string,
    "dateCreated": string,
    "dateModified": string,
    "dateOfBirth": string,
    "email"?:string,
    "firstName": string,
    "gender": string,
    "lastName": string,
    "medicalexams": string[] ou ExamResultInterface[],
    "note": string
}
```

Data Transfer Object (reçu):
```
{
    "_id": string,
    "address": string,
    "clinic": string,
    "dateCreated": string,
    "dateModified": string,
    "dateOfBirth": string,
    "email"?:string,
    "firstName": string,
    "gender": string,
    "lastName": string,
    "medicalexams": string[] ou ExamResultInterface[],
    "note": string
}
```

---
### Post filter???? (à investiguer plus)
TODO
what do

---
### Supprimer un patient
URL: ```https://api.meditrinae.com/patients/?id```

Type: ```DELETE```

Permission requise: ```meditrinae-api:patients:delete```


Data Transfer Object (envoyé):

Ici, le username et le password sont ceux du compte qui effectue la suppression, et non ceux du compte supprimé

```
{
  "username": string,
  "password": string
}
```
Data Transfer Object (reçu):
```
{
    "_id": string,
    "address": string,
    "clinic": string,
    "dateCreated": string,
    "dateModified": string,
    "dateOfBirth": string,
    "email"?:string,
    "firstName": string,
    "gender": string,
    "lastName": string,
    "medicalexams": string[] ou ExamResultInterface[],
    "note": string
}
```
---
### Mise à jour d'un patient 

URL: ```https://api.meditrinae.com/patients```

Type: ```PUT```

Permission requise: ```meditrinae-api:patients:update```


Data Transfer Object (envoyé):
```
{
    "_id": string,
    "address": string,
    "clinic": string,
    "dateCreated": string,
    "dateModified": string,
    "dateOfBirth": string,
    "email"?:string,
    "firstName": string,
    "gender": string,
    "lastName": string,
    "medicalexams": string[] ou ExamResultInterface[],
    "note": string
}
```
Data Transfer Object (reçu):
```
{
    "_id": string,
    "address": string,
    "clinic": string,
    "dateCreated": string,
    "dateModified": string,
    "dateOfBirth": string,
    "email"?:string,
    "firstName": string,
    "gender": string,
    "lastName": string,
    "medicalexams": string[] ou ExamResultInterface[],
    "note": string
}
```
---
---
## Permission (pas nécessaire pour côté client)
---
---
## Praticiens

### Création d'un praticien

URL: ```https://api.meditrinae.com/practicians```

Type: ```POST```

Permission requise: ```meditrinae-api:practicians:create```


Data Transfer Object (envoyé):
```
{
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
  "phone": string
}
```
Data Transfer Object (reçu):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
  "phone": string
}
```

---
### Get tous les praticiens

URL: ```https://api.meditrinae.com/practicians```

Type: ```GET```

Permission requise: ```meditrinae-api:practicians:get```

Data Transfer Object (reçu):
```
[
    {
    "_id": string,
    "clinic": string,
    "firstName": string,
    "lastName": string,
    "user": string,
    "phone": string
    }, ...
]
```

---
### Get un praticien spécifique

URL: ```https://api.meditrinae.com/practicians/?id```

Type: ```GET```

Permission requise: ```meditrinae-api:practicians:get```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
  "phone": string
}
```

---
### Mise à jour d'un praticien

URL: ```https://api.meditrinae.com/practicians```

Type: ```PUT```

Permission requise: ```meditrinae-api:practicians:update```


Data Transfer Object (envoyé):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
  "phone": string
}
```
Data Transfer Object (reçu):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
  "phone": string
}
```

---
### Restaurer un praticien

URL: ```https://api.meditrinae.com/practicians/restore/?id```

Type: ```POST```

Permission requise: ```meditrinae-api:practicians:update```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
  "phone": string
}
```

---
### Suppression d'un praticien

URL: ```https://api.meditrinae.com/practicians/?id```

Type: ```DELETE```

Permission requise: ```meditrinae-api:practicians:delete```


Data Transfer Object (envoyé):

Ici, le username et le password sont ceux du compte qui effectue la suppression, et non ceux du compte supprimé

```
{
  "username": string,
  "password": string
}
```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
  "phone": string
}
```
---
---
## Rôles (pas nécessaire pour le fonctionnement du client léger)
---
---
## Secrétaires

### Création d'un secrétaire

URL: ```https://api.meditrinae.com/secretaries```

Type: ```POST```

Permission requise: ```meditrinae-api:secretaries:create```


Data Transfer Object (envoyé):
```
{
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
}
```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
}
```

---
### Get tous les secrétaires

URL: ```https://api.meditrinae.com/secretaries```

Type: ```GET```

Permission requise: ```meditrinae-api:secretaries:get```

Data Transfer Object (reçu):
```
[
    {
    "_id": string,
    "clinic": string,
    "firstName": string,
    "lastName": string,
    "user": string,
    }, ...
]
```

---
### Get un secrétaire spécifique

URL: ```https://api.meditrinae.com/secretaries/?id```

Type: ```GET```

Permission requise: ```meditrinae-api:secretaries:get```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
}
```

---
### Mettre à jour un secrétaire

URL: ```https://api.meditrinae.com/secretaries```

Type: ```PUT```

Permission requise: ```meditrinae-api:secretaries:update```


Data Transfer Object (envoyé):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
}
```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
}
```

---
### Supprimer un secrétaire

URL: ```https://api.meditrinae.com/secretaries```

Type: ```DELETE```

Permission requise: ```meditrinae-api:secretaries:delete```


Data Transfer Object (envoyé):

Ici, le username et le password sont ceux du compte qui effectue la suppression, et non ceux du compte supprimé

```
{
  "username": string,
  "password": string
}
```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "clinic": string,
  "firstName": string,
  "lastName": string,
  "user": string,
}
```

---
---
## Utilisateurs

### Créer un utilisateur

URL: ```https://api.meditrinae.com/users```

Type: ```POST```

Permission requise: ```meditrinae-api:users:create```


Data Transfer Object (envoyé):
```
{
  "role": string,
  "username": string,
  "password": string
}
```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "role": string,
  "username": string,
  "password": string
}
```
---
### Get tous les utilisateurs

URL: ```https://api.meditrinae.com/users```

Type: ```GET```

Permission requise: ```meditrinae-api:users:get```

Data Transfer Object (reçu):
```
[
    {
    "_id": string,
    "role": string,
    "username": string,
    "password": string
    }, ...
]
```

---
### Mettre le mot de passe de l'utilisateur courant à jour

URL: ```https://api.meditrinae.com/users/password```

Type: ```PUT```

Permission requise: ```meditrinae-api:users:update-password-self```


Data Transfer Object (envoyé):
```
{
  "actualPassword": string,
  "newPassword": string
}
```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "role": string,
  "firstLogin": boolean,
  "username": string,
  "password": string
}
```

---
### Mettre le mot de passe d'un autre utilisateur à jour

URL: ```https://api.meditrinae.com/users/password/?id```

Type: ```PUT```

Permission requise: ```meditrinae-api:users:update-password-other```


Data Transfer Object (envoyé):
```
{
  "newPassword": string
}
```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "role": string,
  "firstLogin": boolean,
  "username": string,
  "password": string
}
```
---
### Supprimer un utilisateur

URL: ```https://api.meditrinae.com/users/?id```

Type: ```DELETE```

Permission requise: ```meditrinae-api:users:delete```

Data Transfer Object (envoyé):

Ici, le username et le password sont ceux du compte qui effectue la suppression, et non ceux du compte supprimé

```
{
  "username": string,
  "password": string
}
```

Data Transfer Object (reçu):
```
{
  "_id": string,
  "firstLogin": boolean,
  "role": string,
  "username": string,
  "password": string
}
```

---