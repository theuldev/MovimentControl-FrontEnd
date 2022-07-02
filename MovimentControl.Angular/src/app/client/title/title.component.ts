import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'client-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

@Input() title! : String;
  constructor() { }

  ngOnInit(): void {
  }

}
