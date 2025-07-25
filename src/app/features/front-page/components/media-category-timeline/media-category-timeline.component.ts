import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import {FrontPageModels} from '../../models/front-page-models';
import {FrontPageMediaComponent} from '../front-page-media/front-page-media.componet';

@Component({
  selector: 'app-media-category-timeline',
  imports: [FrontPageMediaComponent],
  templateUrl: './media-category-timeline.component.html',
  styleUrl: './media-category-timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaCategoryTimelineComponent implements AfterViewInit {
  readonly title = input<string>();
  readonly data = input<FrontPageModels[]>();

  readonly scrollLeftVisible = signal(false);
  readonly scrollRightVisible = signal(false);

  readonly canScrollLeft = computed(() => this.scrollLeftVisible());
  readonly canScrollRight = computed(() => this.scrollRightVisible());

  @ViewChild('track', {static: true}) private readonly trackRef!: ElementRef<HTMLElement>;

  private readonly scrollStep = signal(0);

  ngAfterViewInit(): void {
    const track = this.trackRef.nativeElement;

    const updateScrollState = () => {
      const {scrollLeft, scrollWidth, clientWidth} = track;
      const EPSILON = 8;
      this.scrollLeftVisible.set(scrollLeft > EPSILON);
      this.scrollRightVisible.set(scrollLeft + clientWidth < scrollWidth - 1);
    };

    track.addEventListener('scroll', updateScrollState, {passive: true});
    window.addEventListener('resize', updateScrollState);

    queueMicrotask(() => {
      this.scrollStep.set(track.clientWidth);
      updateScrollState();
    });
  }

  scrollLeft(): void {
    this.scrollBy(-this.calculateScrollAmount());
  }

  scrollRight(): void {
    this.scrollBy(this.calculateScrollAmount());
  }

  private scrollBy(offset: number): void {
    this.trackRef.nativeElement.scrollBy({
      left: offset, behavior: 'smooth',
    });
  }

  private calculateScrollAmount(): number {
    const track = this.trackRef.nativeElement;
    const firstItem = track.children[0] as HTMLElement | undefined;

    if (!firstItem) return 300;

    const style = window.getComputedStyle(firstItem);
    const marginLeft = parseFloat(style.marginLeft || '0');
    const marginRight = parseFloat(style.marginRight || '0');
    const totalItemWidth = firstItem.offsetWidth + marginLeft + marginRight;

    const containerWidth = track.clientWidth;
    const fullItemsVisible = Math.floor(containerWidth / totalItemWidth);

    return fullItemsVisible * totalItemWidth;
  }
}
