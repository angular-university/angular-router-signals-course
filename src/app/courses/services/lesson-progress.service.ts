import {computed, inject, Injectable, Service, signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable()
export class LessonProgressService {
    private readonly http = inject(HttpClient);
    private readonly courseUrl = signal('');

    constructor() {
      console.log("[LessonProgressService] created.");
    }

    private readonly progressResource = httpResource<number[]>(
        () => this.courseUrl() ? `/api/progress/${this.courseUrl()}` : undefined
    );

    readonly visited = computed(() => new Set(this.progressResource.value() ?? []));
    readonly visitedCount = computed(() => this.visited().size);

    initialize(courseUrl: string) {
        this.courseUrl.set(courseUrl);
    }

    isVisited(seqNo: number): boolean {
        return this.visited().has(seqNo);
    }

    async markVisited(seqNo: number) {
        if (this.visited().has(seqNo)) return;
        const updated = [...this.visited(), seqNo];
        await firstValueFrom(this.http.put(`/api/progress/${this.courseUrl()}`, {visited: updated}));
        this.progressResource.reload();
    }

    async toggleVisited(seqNo: number) {
        const current = this.visited();
        const updated = current.has(seqNo)
            ? [...current].filter(n => n !== seqNo)
            : [...current, seqNo];
        await firstValueFrom(this.http.put(`/api/progress/${this.courseUrl()}`, {visited: updated}));
        this.progressResource.reload();
    }
}
