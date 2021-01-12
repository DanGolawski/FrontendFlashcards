import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Technologies } from 'src/app/models/technologies';
import { TechnologiesService } from 'src/app/services/technologies.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  private container: HTMLElement;

  constructor(private techsService: TechnologiesService) { }

  ngOnInit(): void {
    this.container = document.querySelector('#buttonsContainer');
    this.controlMouseMove();
  }

  getStyleClasses(technology: string) {
    const techSelected = this.techsService.getTechnologyState(technology);
    return { 'active': techSelected, 'inactive': !techSelected };
  }

  toggleTechnology(technology: string): void {
    this.techsService.toggleTechnology(technology);
  }

  private controlMouseMove(): void {
    const containerHeight = this.container.offsetHeight;
    this.container.onmouseover = (event) => {
      if (window.innerWidth <= 800) {
        return;
      }
      if (event.clientY < 0.1 * containerHeight) {
        this.container.scrollTo(0, 0);
      } else if (event.clientY > 0.9 * containerHeight) {
        this.container.scrollTo(0, containerHeight);
      }
    }
  }

}
