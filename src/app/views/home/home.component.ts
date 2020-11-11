import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {TwitterService} from '../../services/twitter.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('cardMovie', {read: ElementRef, static: false}) elementView: ElementRef;
  linesToWrite = [];
  private finishPage = 50;
  private actualPage: number;
  search = '';
  movie = {
    Poster: '',
    Title: '',
    Year: '',
    Plot: '',
    Genre: '',
    imdbRating: ''
  };
  showDetail = false;
  height = 0;
  rating = 0;

  constructor(private service: TwitterService) {
    this.actualPage = 1;
    console.log(this.rating);
  }

  ngOnInit(): void {
    this.service.getData('A').subscribe(res => {
      console.log(res);
      this.movie = res;
      if (localStorage.getItem(res.Title)) {
        console.log('existe');
        this.movie.imdbRating = localStorage.getItem(res.Title);
      } else {
        console.log('No existe');
      }
      setTimeout(() => {
        console.log(this.elementView.nativeElement.offsetHeight);
        this.height = this.elementView.nativeElement.offsetHeight;
        console.log(localStorage.getItem(res.Title));
      }, 100);
    });
    this.linesToWrite = new Array<string>();
    // this.add40lines();
  }

  searchMovie(): void {
    this.service.getData(this.search).subscribe(res => {
      console.log(res);
      if (res.Error) {
        if (res.Error === 'Movie not found!') {
          alert('No existen peliculas');
        } else {
          alert(res.Error);
        }
      } else {
        this.movie = res;
        if (localStorage.getItem(res.Title)) {
          console.log('existe');
          this.movie.imdbRating = localStorage.getItem(res.Title);
        } else {
          console.log('No existe');
        }
        setTimeout(() => {
          console.log(this.elementView.nativeElement.offsetHeight);
          this.height = this.elementView.nativeElement.offsetHeight;
        }, 300);
      }
    });
  }

  // add40lines(): void {
  //   const line = 'Another new line -- ';
  //   let lineCounter = this.linesToWrite.length;
  //   for (let i = 0; i < 40; i++) {
  //     this.linesToWrite.push(line + lineCounter);
  //     lineCounter++;
  //   }
  // }
  //
  // onScroll(): void {
  //   if (this.actualPage < this.finishPage) {
  //     this.add40lines();
  //     this.actualPage++;
  //   } else {
  //     console.log('No more lines. Finish page!');
  //   }
  // }

  specialCharOmit(event): boolean {
    const k = event.charCode;
    return (!(k === 64 || k === 35));
  }

  votar(): void {
    if (this.rating < 0) {
      this.rating = 0;
    } else if (this.rating > 10) {
      this.rating = 10;
    }
    localStorage.setItem(this.movie.Title, this.rating.toString());
  }
}
