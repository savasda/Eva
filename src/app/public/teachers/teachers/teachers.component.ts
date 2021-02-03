import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.less']
})
export class TeachersComponent implements OnInit {

	teachers$ = this.teacherService.getTeachersList();

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
  }

}
