import express, { Request, Response } from 'express';

const app = express();

type Data = {
    name: string;
    age: number;
};

const sendData: Data = {
    name: 'test',
    age: 25,
};

app.get('/get', (req: Request, res: Response) => {
    res.send(sendData);
});

app.listen(8090)