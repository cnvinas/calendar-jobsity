import { Component, Renderer2 } from '@angular/core';
import { Calendar } from '../classes/calendar';
import { NgbdModal } from '../modal/modal.component';
import { TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'calendar-root',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  registerForm: FormGroup;

  @ViewChild('content')
  private content: TemplateRef<any>;
  title = 'calendar-jobsity';
  public calendar: Calendar[] = [];
  public monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  public currentMonth = new Date().getMonth();
  public taskMap = {}
  private lastCellClicked;

  constructor(private formBuilder: FormBuilder, private modal: NgbdModal, private renderer:Renderer2) {
    this.registerForm = this.formBuilder.group({
      description: ['', Validators.required],
      color: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.generateCalendarDays();
  }

  private generateCalendarDays(): void {
    this.calendar = [];
    let day: Date = new Date();

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new Calendar(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 0) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 0);
    }

    return startingDateOfCalendar;
  }

  public isWeekend(day) {
    let actualMonth = day.getMonth() === this.currentMonth;
    let currentMonthWeekend = day.getDay() === 0 || day.getDay() === 6;
    return actualMonth && currentMonthWeekend;
  }

  public blurDate(day) {
    let today = new Date().getDate();
    let blurDay = (day.getMonth() != this.currentMonth) || (day.getDate() < today);
    return blurDay || this.isWeekend(day);
  }

  public scheduleATask(event) {
    this.lastCellClicked = event.currentTarget.children[0].attributes['id'].value;    ;
    this.modal.open(this.content, { size: 'sm' });
  }

  createTask(event) {
    if (this.registerForm.invalid) {
      return;
    }
    let controls = this.registerForm.value;
    this.addTaskToMap(controls);
  }

  addTaskToMap(controls){
    let ctrl = controls;
    let color;
    switch(ctrl.color){
      case(0):
        color = "green";
        break;
      case(1):
        color = "yellow";
        break;
      case(2):
        color = "red";
        break;
    }
    let node = this.renderer.createElement('div');               // Create a <li> node
    let textnode = document.createTextNode(ctrl.description); 
    node.classList = color;        // Create a text node
    node.appendChild(textnode);    
    document.getElementById(this.lastCellClicked).appendChild(node);
    this.modal.dismissAll();    
  }
}
