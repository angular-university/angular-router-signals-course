import {inject, Service} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Service()
export class FeatureFlagService {
    private readonly http = inject(HttpClient);

    private readonly flagsResource = httpResource<Record<string, boolean>>(
        () => '/api/feature-flags'
    );

    readonly flags = this.flagsResource.value;

    isEnabled(flag: string): boolean {
        return this.flags()?.[flag] ?? false;
    }

    keys(): string[] {
        return Object.keys(this.flags() ?? {});
    }

    async toggle(flag: string) {
        const current = this.flags() ?? {};
        const updated = {...current, [flag]: !current[flag]};
        await firstValueFrom(this.http.put<Record<string, boolean>>('/api/feature-flags', updated));
        this.flagsResource.reload();
    }
}
