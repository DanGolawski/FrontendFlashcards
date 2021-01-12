import { Injectable } from '@angular/core';
import { Technologies } from '../models/technologies';

@Injectable({
  providedIn: 'root'
})
export class TechnologiesService {

  private technologyStates: Technologies = {
    javascript: true,
    html: false,
    css: false,
    jquery: false,
    angular: false,
    react: false
  }

  constructor() { }

  public toggleTechnology(technology: string): void {
    this.technologyStates[technology] = !this.technologyStates[technology];
  }

  public getTechnologyState(technologyName: string): boolean {
    return this.technologyStates[technologyName];
  }

  public getSelectedTechnologies(): Array<string> {
    return Object.keys(this.technologyStates).filter(techName => this.technologyStates[techName]);
  }
}
