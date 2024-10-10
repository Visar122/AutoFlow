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
    carType:string,
    carmodel:string,
    modelyear:number,
    cardescription:string,
    image1:string,
    image2:string,
    image3:string,
    image4:string,
    price:number,

}
export interface bookings{
    name:string,
    bookingdate:Date,
    bookingtime:string,
    service:string,
    confirmation:boolean

}