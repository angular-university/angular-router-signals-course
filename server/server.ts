
import express from 'express';
import {Application} from "express";
import {getAllCourses, getCourseByUrl} from "./get-courses.route";
import {searchLessons} from "./search-lessons.route";
import {saveCourse} from './save-course.route';
import {loginUser} from './login.route';
import {findLessonDetail} from "./get-lesson-detail.route";
import {getFeatureFlags, saveFeatureFlags} from "./feature-flags.route";
import {getProgress, saveProgress} from "./progress.route";

const bodyParser = require('body-parser');

const app: Application = express();

const cors = require('cors');

app.use(cors({origin: true}));

app.use(bodyParser.json());

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').get(getCourseByUrl);

app.route('/api/lessons').get(searchLessons);

app.route('/api/courses/:id').put(saveCourse);

app.route('/api/login').post(loginUser);

app.route('/api/lesson-details').get(findLessonDetail);

app.route('/api/feature-flags').get(getFeatureFlags).put(saveFeatureFlags);

app.route('/api/progress/:courseUrl').get(getProgress).put(saveProgress);

const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});



