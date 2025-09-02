import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buscar-personas',
  templateUrl: './buscar-personas.component.html',
  styleUrls: ['./buscar-personas.component.css']
})
export class BuscarPersonasComponent implements OnInit {
  search=new FormControl('');
  @Output('search') searchEmiter = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.subscribe(value=>this.searchEmiter.emit(value!));
  }

}
