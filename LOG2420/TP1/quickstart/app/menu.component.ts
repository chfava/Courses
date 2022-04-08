/**
 * menu.component.ts - Composant représentant le menu d'affichage de l'application
 * 
 * @authors Mathieu KABORÉ
 * @date 2017/01/16
 */
import { Component, OnInit } from '@angular/core';
import { PolyDataService } from './poly-data.service';

@Component({
  selector: 'menu-items',
  templateUrl: 'app/menu.html',
  styleUrls: ['app/menu.css'],
  providers: [ PolyDataService ]
})

export class MenuComponent implements OnInit {
  menuItems: Object;
  title: Title[];
  test: string;

  constructor(private polyDataService: PolyDataService) {

    
    this.polyDataService.getData().subscribe(data => {
      this.title = data;
      
    });
   }

  // À compléter 
  // ...

  ngOnInit(): void {
    // À compléter ...
  }
}

 interface Title{
    title : string;
    link : string;
  }