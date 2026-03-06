import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../shared/models/project.model';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { StatusColorPipe } from '../../shared/pipes/status-color.pipe';
import { HighlightDirective } from '../../shared/directives/highlight.directive';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  imports: [CommonModule, TruncatePipe, StatusColorPipe, HighlightDirective],
  standalone: true
})
export class ProjectCardComponent {
  @Input() project!: Project;
}