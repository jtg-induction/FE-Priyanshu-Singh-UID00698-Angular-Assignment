import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleService } from '@modules/dashboard/services/article.service';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Article } from '@core/models/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit {
  article!: Article;

  sanitizedDescription!: SafeHtml;

  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    console.log(this.route);
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.loadArticle(id);
  }

  loadArticle(id: string): void {
    this.articleService.getArticleDetails(id).subscribe({
      next: (res) => {
        this.article = res.data;
        this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(
          this.article.description
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
