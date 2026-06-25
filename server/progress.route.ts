import {Request, Response} from 'express';
import {PROGRESS} from './db-data';

export function getProgress(req: Request, res: Response) {
    const courseUrl = req.params['courseUrl'];
    res.status(200).json(PROGRESS[courseUrl] ?? []);
}

export function saveProgress(req: Request, res: Response) {
    const courseUrl = req.params['courseUrl'];
    const {visited} = req.body as {visited: number[]};
    PROGRESS[courseUrl] = visited;
    res.status(200).json(PROGRESS[courseUrl]);
}
