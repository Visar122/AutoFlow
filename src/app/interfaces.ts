import { Injectable } from "@angular/core"

export interface signup {
    name:string,
    email:string,
    password:string,
    status:''
}
export interface login {
    email:string,
    password:string
}

export interface CarShop{
    carId:number,
    cartype:string,
    carModel:string,
    modelYear:number,
    carDescription:string,
    image1:string,
    image2:string,
    image3:string,
    image4:string,
    price:number,

}
export interface bookings{
    BookingDate:Date,
    BookingTime:string,
    UserName:string,
    Servicetype:string,
    Mail:string,
    Tlf:number|null;


    

}