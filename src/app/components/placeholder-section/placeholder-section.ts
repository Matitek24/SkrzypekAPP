import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-placeholder-section',
  standalone: true,
  template: `
    <div class="section-placeholder">
      <div class="placeholder-inner">
        <i [class]="icon" class="placeholder-icon"></i>
        <h2 class="placeholder-title">{{ title }}</h2>
        <p class="placeholder-desc">{{ description }}</p>
        <span class="placeholder-badge">Wkrotce</span>
      </div>
    </div>
  `,
  styles: [`
    .section-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 4rem);
    }
    .placeholder-inner {
      text-align: center;
      max-width: 340px;
    }
    .placeholder-icon {
      font-size: 2.5rem;
      color: var(--color-primary);
      opacity: 0.35;
      display: block;
      margin-bottom: 1.25rem;
    }
    .placeholder-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--color-text-main);
      letter-spacing: -0.4px;
      margin: 0 0 8px;
    }
    .placeholder-desc {
      font-size: 13.5px;
      color: var(--color-text-muted);
      margin: 0 0 1.25rem;
      line-height: 1.6;
    }
    .placeholder-badge {
      display: inline-block;
      padding: 4px 14px;
      background: var(--color-primary-light);
      color: var(--color-primary);
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
    }
  `]
})
export class PlaceholderSection {
  @Input() icon: string = 'bi bi-layers';
  @Input() title: string = 'Sekcja';
  @Input() description: string = 'Ta sekcja jest w trakcie budowy.';
}
