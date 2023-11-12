export default interface IRoute {
    path: string;
    exact: boolean;
    component: any;
    index: number;
    name: string; 
    protected: boolean; 
    children?: IRoute[];
}