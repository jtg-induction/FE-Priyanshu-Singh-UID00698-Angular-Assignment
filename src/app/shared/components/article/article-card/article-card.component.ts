import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from '@core/models/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: Article;
  private router = inject(Router);

  openArticleDetialsPage(): void {
    this.router.navigate(['/articles', this.article.id]);
  }
}
