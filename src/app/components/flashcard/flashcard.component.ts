import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TechnologiesService } from 'src/app/services/technologies.service';
import Data from '../../../assets/flashcardsdata.json';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {

  @Output() currentTechnologyEvent = new EventEmitter<string>();
  @Output() linkSetterEvent = new EventEmitter<string>();

  private paperSheet: HTMLElement;
  private questionField: HTMLElement;
  private answerField: HTMLElement;
  private BackgroundIcon: HTMLElement;
  cardColor: string;
  answerCardStyles: any;
  currentContent = {
    question: 'Naciśnij przycisk obok, aby rozpocząć',
    answer: 'Tutaj pojawi się odpowiedź na pytanie',
    technology: '',
    link: ''
  }
  rotateElement = false;

  constructor(readonly techService: TechnologiesService) { }

  ngOnInit(): void {
    this.paperSheet = document.querySelector('#papersheet');
    this.questionField = document.querySelector('#questionField');
    this.answerField = document.querySelector('#answerField');
    this.BackgroundIcon = document.querySelector('#backgroundLogo');
    this.startAnimation();
    this.handleWindowChanges();
  }


  showNextCard(): void {
    this.startAnimation();
    setTimeout(() => {
      this.getNextContent();
      this.changeBackgroundIcon();
      this.changeCardColor();
      this.fitTextForField(this.questionField);
      this.fitTextForField(this.answerField);
    }, 200);

  }

  private getNextContent(): void {
    const randomTechnology = this.getRandomTechnology();
    this.currentTechnologyEvent.emit(randomTechnology);
    const questionObj = this.getRandomContent(randomTechnology);
    this.currentContent = {
      question: questionObj.question,
      answer: questionObj.answer,
      technology: randomTechnology,
      link: questionObj.link
    }
    this.linkSetterEvent.emit(this.currentContent.link);
  }

  private getRandomTechnology(): string {
    const technologies = this.techService.getSelectedTechnologies();
    const randomTechnology = technologies[Math.floor(Math.random() * technologies.length)];
    return randomTechnology;
  }

  private getRandomContent(technologyName: string): any {
    const numOfQuestions = Data[technologyName].content.length;
    const randomChoice = Math.floor(Math.random() * numOfQuestions);
    return Data[technologyName].content[randomChoice];
  }

  private startAnimation(): void {
    this.rotateElement = !this.rotateElement;
  }

  private changeBackgroundIcon() {
    let imageUrl = '../../../assets/icons/';
    switch (this.currentContent.technology) {
      case 'javascript': imageUrl = `${imageUrl}javascript.png`; break;
      case 'html': imageUrl = `${imageUrl}html5.png`; break;
      case 'css': imageUrl = `${imageUrl}css3.png`; break;
      case 'jquery': imageUrl = `${imageUrl}jquery.png`; break;
      case 'angular': imageUrl = `${imageUrl}angular.png`; break;
      case 'react': imageUrl = `${imageUrl}react.png`; break;
    }
    this.BackgroundIcon.style.backgroundImage = `url(${imageUrl})`;
  }

  private fitTextForField(field: HTMLElement) {
    let fontSize = 50;
    field.style.fontSize = `${fontSize}px`;

    setTimeout(() => {
      while (field.offsetHeight > this.paperSheet.offsetHeight) {
        fontSize -= 1;
        field.style.fontSize = `${fontSize}px`;
      }
      while (field.scrollWidth > this.paperSheet.offsetWidth) {
        fontSize -= 1;
        field.style.fontSize = `${fontSize}px`;
      }
    }, 10);
  }

  private changeCardColor(): void {
    switch (this.currentContent.technology) {
      case 'javascript': {
        this.cardColor = '#EFD81D';
        this.answerCardStyles = { color: '#EFD81D', backgroundColor: 'black' }
      }; break;
      case 'html': {
        this.cardColor = '#F16529';
        this.answerCardStyles = { color: '#E44D26', backgroundColor: 'black' }
      }; break;
      case 'css': {
        this.cardColor = '#1B87C7';
        this.answerCardStyles = { color: '#1B87C7', backgroundColor: 'black' }
      }; break;
      case 'jquery': {
        this.cardColor = '#1169AE';
        this.answerCardStyles = { color: '#1169AE', backgroundColor: 'black' }
      }; break;
      case 'angular': {
        this.cardColor = '#DD0031';
        this.answerCardStyles = { color: '#DD0031', backgroundColor: 'black' }
      }; break;
      case 'react': {
        this.cardColor = '#39D8FF';
        this.answerCardStyles = { color: '#00D8FF', backgroundColor: 'black' }
      }; break;
    }
  }

  private handleWindowChanges(): void {
    window.addEventListener('resize', () => {
      this.fitTextForField(this.questionField);
      this.fitTextForField(this.answerField);
    });
  }

}
