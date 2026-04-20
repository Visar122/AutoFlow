
import { Injectable } from "@angular/core"

export interface signup {
    firstName: string,
    lastName: string,
    email:string,
    password:string,
    status: string,
    carPlate: string,
    carPlate2?: string
}
export interface login {
    email:string,
    password:string
}

export interface bookings{
    id?: number;
    bookingDate: string;
    bookingTime: string;
    customerName: string;
    serviceType: string;
    customerEmail: string;
    tlf: string;
    status: string;
    carPlate: string;
    note?: string;
    workImg?: string;
}

export interface CarShop{
    carId:number,
    carName:string,
    carModel:string,
    year:number,
    category:string,
    imageUrl1: string,
    imageUrl2: string,
    imageUrl3: string,
    km:number,
    fuel:string,
    horsepower:string,
    topSpeed:string,
    afgift:string,
    geartype:string,
    color:string,
    price:number,

}
export interface ReserveParts{
    id:number,
    name:string,
    category:string,
    carName: string,
    carModel: string,
    price:number,
    description:string,
    imageUrl1: string,
    imageUrl2: string,
    imageUrl3: string,
    stock:number

}