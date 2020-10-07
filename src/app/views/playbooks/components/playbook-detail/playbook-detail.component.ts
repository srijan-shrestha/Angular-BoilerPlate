import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playbook-detail',
  templateUrl: './playbook-detail.component.html',
  styleUrls: ['./playbook-detail.component.scss']
})
export class PlaybookDetailComponent implements OnInit {
  @Input() data: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  updatePlaybook(e: Event) {
    return this.router.navigateByUrl('/playbooks/' + this.data.id);
  }

}
