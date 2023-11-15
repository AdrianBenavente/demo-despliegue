import { Person } from 'src/app/model/person';
export class Task{
    idTask:number=0
    nameTask:string=""
    startTask:Date=new Date(Date.now());
    endDateTask: Date = new Date(Date.now())
    difficultyLevelTask:number=0
    person:Person=new Person()
    
}