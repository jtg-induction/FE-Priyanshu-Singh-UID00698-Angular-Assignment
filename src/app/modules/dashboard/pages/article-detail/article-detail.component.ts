import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleService } from '@modules/dashboard/services/article.service';

import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';

import { Subject, takeUntil } from 'rxjs';

import { Article } from '@core/models/article.model';
import { NotificationService } from '@core/services/notificationService/notification.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  article!: Article;

  sanitizedDescription!: SafeHtml;

  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);
  private sanitizer = inject(DomSanitizer);
  private title = inject(Title);
  private notification = inject(NotificationService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.loadArticle(id);
  }

  loadArticle(id: string): void {
    this.articleService
      .getArticleDetails(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.article = res.data;
          this.title.setTitle(`DevAlgo | ${this.article.title}`);
          this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(
            this.article.description
          );
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
