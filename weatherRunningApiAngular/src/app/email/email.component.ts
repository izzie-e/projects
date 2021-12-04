import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  @Output() sendParent = new EventEmitter<any>();

  user  = {
    email : ""
  };
  
  onSubmitTemplateBased(email: string) : void {
    this.sendParent.emit(email);
    //email can be sent to parent component (options)
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
