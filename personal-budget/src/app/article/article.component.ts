import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() title = 'Title';
  @Input() content = 'Content';

  constructor() {}
  ngOnInit(): void {

  }
}
