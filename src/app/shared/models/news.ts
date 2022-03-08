export interface News{
    uuid: string;
    title: string;
    description: string;
    isChecked?: boolean;
}

export interface CreateNews{
    newsUuid: string;
    title: string;
    description: string;
    isChecked: boolean;
}