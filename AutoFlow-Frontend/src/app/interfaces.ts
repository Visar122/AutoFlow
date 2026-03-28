
import { Injectable } from "@angular/core"

export interface signup {
    firstName: string,
    lastName: string,
    email:string,
    password:string,
    status: string
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
}

export interface CarShop{
    carId:number,
    carName:string,
    carModel:string,
    year:number,
    category:string,
    carDescription:string,
    imageUrl1: string,
    imageUrl2: string,
    imageUrl3: string,
    price:number,

}
export interface ReserveParts{
    id:number,
    name:string,
    category:string,
    price:number,
    description:string,
    imageUrl1: string,
    imageUrl2: string,
    imageUrl3: string,
    stock:number

}