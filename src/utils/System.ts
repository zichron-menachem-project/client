export interface System{
    _id?: string;
    topic: string;
    urlName: string;
    urlImg: string;
    objectName: string;
    adminUid: string;
    description: string;
    communicationDetails: {email: string, phone: string};
}
