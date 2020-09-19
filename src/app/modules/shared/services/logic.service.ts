import { Injectable } from '@angular/core';
import { Subscription, interval, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  grid = [[]]; // matrix n x n
  counterMap: { [id: string]: number } = {};
  alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
  letterChange = false;
  selectedLetter: string;
  sub: Subscription;

  width = 10;
  height = 10;

  private resultObs$: BehaviorSubject<string> = new BehaviorSubject(null);
  private gridObs$: BehaviorSubject<number[][]> = new BehaviorSubject(null);
  private canLetterChangeObs$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() { }

  getResultObs(): Observable<string> {
    return this.resultObs$.asObservable();
  }

  setResultObs(res: string): void {
    this.resultObs$.next(res);
  }

  getGridObs(): Observable<number[][]> {
    return this.gridObs$.asObservable();
  }

  setGridObs(res: number[][]): void {
    this.gridObs$.next(res);
  }

  getCanLetterChange(): Observable<boolean> {
    return this.canLetterChangeObs$.asObservable();
  }

  setCanLetterChange(res: boolean): void {
    this.canLetterChangeObs$.next(res);
  }

  start(): void {
    this.counterMap = {};
    this.generateGrid(this.width, this.height);
    this.sub = interval(2000)
      .subscribe(() => {
        this.counterMap = {};
        this.generateGrid(this.width, this.height);
      });
  }

  getRandomLetter(): string {
    return this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
  }

  generateGrid(height: number, width: number): void {
    if (this.letterChange) {
      this.setCanLetterChange(false);
      setTimeout(() => {
        this.setCanLetterChange(true);
        this.letterChange = false;
      }, 4000);
    }
    for (let i = 0; i < height; i++) {
      this.grid[i] = [];
      for (let j = 0; j < width; j++) {
        const letter = this.getRandomLetter();
        this.grid[i][j] = letter;

        if (this.counterMap[letter] != null) {
          this.counterMap[letter]++;
        } else {
          this.counterMap[letter] = 0;
        }
      }
    }

    if (this.selectedLetter) {
      this.setLetter(this.selectedLetter);
    } else {
      this.setGridObs(this.grid);
    }

    this.getResult();
  }

  setLetter(letter: string): void {
    if (this.counterMap[letter] == null) {
      this.counterMap[letter] = 0;
    }
    while (this.counterMap[letter] / (this.width * this.height) !== 0.2) {
      const pos1 = Math.floor(Math.random() * this.width);
      const pos2 = Math.floor(Math.random() * this.height);
      if (this.grid[pos1][pos2] !== letter) {
        this.grid[pos1][pos2] = letter;
        this.counterMap[letter]++;
      }
    }
    this.setGridObs(this.grid);
  }

  getResult(): void {
    const seconds = new Date().getSeconds();
    const splitSeconds = seconds < 10 ? [0, seconds] : [...seconds + ''].map(n => +n);
    const val1 = this.counterMap[this.grid[splitSeconds[0]][splitSeconds[1]]];
    const val2 = this.counterMap[this.grid[splitSeconds[1]][splitSeconds[0]]];
    this.setResultObs(`${val1}${val2}`);
  }

  getCurrentGrid(): number[][] {
    return this.grid;
  }
}
