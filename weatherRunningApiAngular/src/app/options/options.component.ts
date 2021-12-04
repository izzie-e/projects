import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input() email!: string;

  constructor() { }
  
  sendParent(email :string) {
    this.email = email;
  }
  ngOnInit(): void {
  }
  

}
