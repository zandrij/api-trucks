import {faker} from '@faker-js/faker/locale/es_MX';
import { Request, Response } from 'express';

export function getFaker(req: Request, res: Response) {
    const response = {
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        coors: {
            lat: faker.location.latitude(),
            lng: faker.location.longitude()
        }
    }

    res.status(200).json(response);
}