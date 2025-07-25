import {Component, computed, inject} from '@angular/core';
import {JupiterApiService} from '../../services/jupiter-api';
import {
  MediaCategoryTimelineComponent
} from '../../components/media-category-timeline/media-category-timeline.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {Ribbon} from '../../models/front-page-models';

@Component({
    selector: 'app-front-page',
    standalone: true,
    imports: [MediaCategoryTimelineComponent],
    templateUrl: './front-page.component.html',
    styleUrl: './front-page.component.css'
})
export default class FrontPageComponent {
    private readonly jupiterApi = inject(JupiterApiService);

    private readonly initial = [] as Ribbon[];
    private readonly allRibbons = toSignal(this.jupiterApi.getFrontPageRibbons(), {initialValue: this.initial});

    readonly isLoading = computed(() => this.allRibbons() === this.initial);
    readonly hasError = computed(() => !this.isLoading() && this.allRibbons().length === 0);
    readonly visibleRibbons = computed(() => this.allRibbons().filter((ribbon: Ribbon) => ribbon.data?.length > 0));
}
