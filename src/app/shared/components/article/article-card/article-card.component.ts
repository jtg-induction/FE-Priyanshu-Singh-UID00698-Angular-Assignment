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

  get visibleTags(): string[] {
    return this.article.tags.slice(0, 3);
  }

  get remainingTagCount(): number {
    return this.article.tags.length > 3 ? this.article.tags.length - 3 : 0;
  }

  openArticleDetialsPage(): void {
    this.router.navigate(['/articles', this.article.id]);
  }
}
