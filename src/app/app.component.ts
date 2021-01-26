import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chrono';

  public isStarted = false;
  public isPaused = false;
  public boolTab = false;
  public time = 0;
  public dateAjour: Date|null = null;
  public dateLancement: Date|null = null;
  public diff: Date|number|null = null;
  public ecart = '0 : 0 : 0 : 000';
  public tabTemps: Array<string> = [];

  private idInterval: number|null = null;

  public start(): void {
    this.isStarted = true;
    this.isPaused = false;
    this.boolTab = false;

    this.dateLancement = new Date();

    this.time = 0;
    this.tabTemps = [];

    this.startTimer();
  }

  public stop(): void {
    this.isStarted = false;

    this.tabTemps.push(this.ecart);

    this.boolTab = true;

    this.stopTimer();
  }

  public keep(): void {
    this.tabTemps.push(this.ecart);

    this.boolTab = true;
  }

  public pause(): void {
    this.isPaused = true;

    this.stopTimer();
  }

  public continue(): void {
    this.isPaused = false;

    this.startTimer();
  }

  private startTimer(): void{
    this.stopTimer();
    this.idInterval = setInterval(() => {
      // this.time++;
      this.dateAjour = new Date();
      // @ts-ignore
      this.diff = this.dateAjour - this.dateLancement;
      this.diff = new Date(this.diff);
      // tslint:disable-next-line:max-line-length
      this.ecart = (this.diff.getHours() - 1) + ' : ' + this.diff.getMinutes() + ' : ' + this.diff.getSeconds() + ' : ' + this.diff.getMilliseconds();
    }, 1);
  }

  private stopTimer(): void {
    if (this.idInterval !== null) {
      clearInterval(this.idInterval);
    }
  }

  public suppItem(index: number): void{
    // const index = this.todoArray.indexOf(item);
    if (index !== -1){
      this.tabTemps.splice(index, 1);
    }
  }

  /*public startChrono(): void{
    // @ts-ignore
    document.getElementById('button_start').style.display = 'none';
    // @ts-ignore
    document.getElementById('button_stop').style.display = 'inline-block';
    // @ts-ignore
    document.getElementById('button_keep').style.display = 'inline-block';
  }*/
}
