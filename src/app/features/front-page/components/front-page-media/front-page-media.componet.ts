import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FrontPageModels, PhotoType} from '../../models/front-page-models';

@Component({
  selector: 'app-front-page-media', changeDetection: ChangeDetectionStrategy.OnPush, host: {
    class: 'front-page-media', role: 'list item'
  }, imports: [], styleUrl: './front-page-media.component.css', template: `
    <img
      [src]="getPhotoByType(60)?.url ?? ''"
      [srcset]="buildSrcset()"
      alt="{{ item().heading }}"
      class="poster"
      loading="lazy"
    />
  `
})
export class FrontPageMediaComponent {
  readonly item = input.required<FrontPageModels>();

  getPhotoByType(typeId: number): PhotoType | undefined {
    const first = this.item()?.verticalPhotos?.[0];
    return first?.photoTypes?.[typeId]
  }

  buildSrcset(): string {
    const small = this.getPhotoByType(60)?.url;
    const large = this.getPhotoByType(80)?.url;

    const parts: string[] = [];
    if (small) parts.push(`${small} 180w`);
    if (large) parts.push(`${large} 400w`);
    return parts.join(', ');
  }
}
