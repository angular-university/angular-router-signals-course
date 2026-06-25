import {inject} from '@angular/core';
import {CanMatchFn} from '@angular/router';
import {FeatureFlagService} from './feature-flag.service';

export const featureFlagGuard = (flag: string): CanMatchFn => () =>
    inject(FeatureFlagService).isEnabled(flag);
