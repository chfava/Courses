/**
 * nouvelles.component.ts - Composant représentant la liste des nouvelles.
 * 
 * @authors Mathieu KABORÉ
 * @date 2017/01/16
 */
import { Component, OnInit } from '@angular/core';
import { PolyDataService } from './poly-data.service';

@Component({
  selector: 'news-table',
  template: 'À compléter ',
  styles: ['À compléter si nénessaire ..'],
  providers: [PolyDataService]
})
export class NouvellesComponent implements OnInit {
  nouvelles: Object;
  menuItems: Object;

  // Construteur
  constructor(private polyDataService: PolyDataService) { }

  // Permet d'obtenir les nouvelles en utilisant le service dédié.
  getListeNouvelles(): void {
    this.polyDataService.getListeNouvelles()
      .then((response: Object) => this.nouvelles = response)
      .catch(this.handleError);
  }

  // À compléter 
  // ...

  ngOnInit(): void {
    this.getListeNouvelles();
    // À compléter ...
  }

  // Méthode de gestion d'erreur.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
