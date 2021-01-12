import { Component, OnInit } from '@angular/core';
import { Technologies } from 'src/app/models/technologies';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  private blogLinkURL: string;
  private blogButton: HTMLElement;

  backgroundColor: string;
  backgroundElement: HTMLElement;

  constructor() { }

  ngOnInit(): void {
    this.backgroundElement = document.querySelector('#technologyBackground');
    this.blogButton = document.querySelector('#blogButton');
  }

  changeTechnologyBackground(currTechnology: string): void {
    switch (currTechnology) {
      case 'javascript': this.backgroundColor = '#EFD81D'; break;
      case 'html': this.backgroundColor = '#F16529'; break;
      case 'css': this.backgroundColor = '#1B87C7'; break;
      case 'jquery': this.backgroundColor = '#1169AE'; break;
      case 'angular': this.backgroundColor = '#DD0031'; break;
      case 'react': this.backgroundColor = '#39D8FF'; break;
    }
  }

  setBlogLink(linkURL: string): void {
    console.log('BLOG')
    this.blogLinkURL = linkURL;
    this.blogButton.style.top = '-6vw';
    if (this.blogLinkURL) {
      this.blogButton.style.top = '2vw';
    }
  }

  redirectToBlog(): void {
    window.open(this.blogLinkURL, '_blank');
  }

}
