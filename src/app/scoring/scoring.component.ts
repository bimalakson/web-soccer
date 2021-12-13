import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
//Our aplication service and interfaces
import { Schedule } from '../interface/schedule';
import { SoccerService } from '../service/soccer.service';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit {
  private UsingAsync: boolean = false;
  private CurGame: number = 0;
  public MySchedule: Schedule[];
  public LeagueName: string;
  public HomeTeam: string;
  public AwayTeam: string;
  public HomeScore: number = 0;
  public AwayScore: number = 0;
  public SeasonStart: Date = new Date;
  public CurrentRole: number = 1;

  constructor(private _soccerService: SoccerService) {
    this.LeagueName = "Milan Match";
    this.MySchedule = [];
    this.HomeTeam = "";
    this.AwayTeam = "";
    this.getSchedule();
    this.SeasonStart.setTime(this.SeasonStart.getTime()+4 * 86400000);
    if(this.MySchedule.length>0){
      this.UpdVariables(0); //Default First Game
      this.CurGame = 1;
    }
   }

  ngOnInit(): void {
  }

  public onSchedChange(GameValue:number){
    if(GameValue>0){
      this.UpdVariables(GameValue);
      this.CurGame = GameValue;
    }
  }
  public onRecordScores(){  
      this.MySchedule[this.CurGame-1].AwayScore = Number(this.AwayScore);
      this.MySchedule[this.CurGame-1].HomeScore = Number(this.HomeScore);
    }
    //Update screen variable base on current game
    private UpdVariables(GameID:number){
      //Need to search Schedule array, Looking for game ID
      var x : number = 0;
      if(GameID > 0){
        x = GameID-1;
      }
      this.HomeTeam = this.MySchedule[x].HomeTeam;
      this.AwayTeam = this.MySchedule[x].AwayTeam;
      this.HomeScore = this.MySchedule[x].HomeScore;
      this.AwayScore = this.MySchedule[x].AwayScore;
    }

    //Get the schedule only showing games not yet scored
    private getSchedule(){
      if(this.UsingAsync){
        let xx = this._soccerService.getScheduleAsync();
          xx.then((Schedules:Schedule[])=> this.MySchedule = Schedules);
      }
      else{
        this.MySchedule = this._soccerService.getSchedule();
      }
    }
  }


