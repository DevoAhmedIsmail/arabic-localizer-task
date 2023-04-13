import React from 'react';
import CardItem from './CardItem';

const DATA = [
    {
        name: "Ahmed Ismail Ali",
        title: "HR Head",
        details: "Business Development",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        attendance: "Absent",
        office: "Arabic localizer",
        role: "Employee",
        copiedManager: "Mohamed tarek",
        joinDate: "12/12/2018",
        manager: "Mohamed tarek"
    },
    {
        name: "Ahmed Ismail Ali",
        title: "HR Head",
        details: "Business Development",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        attendance: "Weekend",
        office: "Arabic localizer",
        role: "Employee",
        copiedManager: "Mohamed tarek",
        joinDate: "12/12/2018",
        manager: "Mohamed tarek"
    },
    {
        name: "Ahmed Ismail Ali",
        title: "HR Head",
        details: "Business Development",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        attendance: "Present",
        office: "Arabic localizer",
        role: "Employee",
        copiedManager: "Mohamed tarek",
        joinDate: "12/12/2018",
        manager: "Mohamed tarek"
    },
    {
        name: "Ahmed Ismail Ali",
        title: "HR Head",
        details: "Business Development",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        attendance: "Present",
        office: "Arabic localizer",
        role: "Employee",
        copiedManager: "Mohamed tarek",
        joinDate: "12/12/2018",
        manager: "Mohamed tarek"
    },
    {
        name: "Ahmed Ismail Ali",
        title: "HR Head",
        details: "Business Development",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        attendance: "Absent",
        office: "Arabic localizer",
        role: "Employee",
        copiedManager: "Mohamed tarek",
        joinDate: "12/12/2018",
        manager: "Mohamed tarek"
    },
    {
        name: "Ahmed Ismail Ali",
        title: "HR Head",
        details: "Business Development",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        attendance: "Present",
        office: "Arabic localizer",
        role: "Employee",
        copiedManager: "Mohamed tarek",
        joinDate: "12/12/2018",
        manager: "Mohamed tarek"
    },
    {
        name: "Ahmed Ismail Ali",
        title: "HR Head",
        details: "Business Development",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        attendance: "Weekend",
        office: "Arabic localizer",
        role: "Employee",
        copiedManager: "Mohamed tarek",
        joinDate: "12/12/2018",
        manager: "Mohamed tarek"
    },
    {
        name: "Ahmed Ismail Ali",
        title: "HR Head",
        details: "Business Development",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        attendance: "Absent",
        office: "Arabic localizer",
        role: "Employee",
        copiedManager: "Mohamed tarek",
        joinDate: "12/12/2018",
        manager: "Mohamed tarek"
    },
]

const CardList = () => {
  return (
    <div className='py-8'>
        <div className='grid grid-cols-4 gap-x-[45px] gap-y-[35px]'>

            {
                DATA.map((data,index)=>(
                    <CardItem data={data} key={index} />
                ))
            }
        </div>
    </div>
  )
}

export default CardList