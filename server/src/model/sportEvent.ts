export class SportEvent {
    public id: number;
    public name: string = "";
    public organizer: string = "";
    public date: string = "";

    constructor(name: string, organizer: string, date: string) {
        this.id = Date.now()
        this.name = name;
        this.organizer = organizer;
        this.date = date;
    }
}