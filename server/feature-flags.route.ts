import {Request, Response} from 'express';
import {FEATURE_FLAGS} from './db-data';

export function getFeatureFlags(req: Request, res: Response) {
    res.status(200).json(FEATURE_FLAGS);
}

export function saveFeatureFlags(req: Request, res: Response) {
    const updates = req.body as Record<string, boolean>;
    Object.assign(FEATURE_FLAGS, updates);
    res.status(200).json(FEATURE_FLAGS);
}
