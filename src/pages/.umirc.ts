
export interface Student {
    id: number;
    firstname: string;
    lastname: string;
    midname?: string;
    email?: string;
    groupID: number;
    groupName?: string;
}

export interface GroupOption {
    value: number;
    label: string;
}
