export class SportEvent {
    public id: string = "";
    public name: string = "";
    public organizer: string = "";
    public date: string = "";

    constructor(id: string, name: string, organizer: string, date: string) {
        this.id = id;
        this.name = name;
        this.organizer = organizer;
        this.date = date;
    }
}