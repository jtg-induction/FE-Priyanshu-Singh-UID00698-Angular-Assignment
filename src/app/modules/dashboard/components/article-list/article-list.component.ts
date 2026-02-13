import { Component, Input } from '@angular/core';

import { Article } from '@core/models/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  @Input() articles: Article[] = [];
}
